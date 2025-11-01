import { useState, useCallback } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || (
  typeof window !== 'undefined' && window.location.hostname.includes('replit')
    ? window.location.origin.replace(/:\d+/, ':8000')
    : 'http://localhost:8000'
)

function App() {
  const [text, setText] = useState('')
  const [biasTypes, setBiasTypes] = useState(['gender', 'race', 'age', 'disability', 'culture', 'political', 'religion', 'lgbtq', 'socioeconomic', 'intersectional'])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [fixedText, setFixedText] = useState(null)
  const [fixLoading, setFixLoading] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState(null)

  const allBiasTypes = [
    { id: 'gender', label: 'Gender', description: 'Detects gender stereotypes and biased language' },
    { id: 'race', label: 'Race', description: 'Identifies racial bias and problematic terms' },
    { id: 'age', label: 'Age', description: 'Finds age-related discrimination' },
    { id: 'disability', label: 'Disability', description: 'Catches ableist language' },
    { id: 'culture', label: 'Culture', description: 'Detects cultural bias and Western-centric views' },
    { id: 'political', label: 'Political/Ideological', description: 'Detects partisan slants and ideological assumptions' },
    { id: 'religion', label: 'Religion', description: 'Identifies faith-based stereotypes and discrimination' },
    { id: 'lgbtq', label: 'LGBTQ+', description: 'Catches biases related to sexual orientation and gender identity' },
    { id: 'socioeconomic', label: 'Socioeconomic/Class', description: 'Spots assumptions about income and economic status' },
    { id: 'intersectional', label: 'Intersectional', description: 'Analyzes combined biases for overlapping discrimination' }
  ]

  const handleBiasTypeToggle = (typeId) => {
    if (biasTypes.includes(typeId)) {
      setBiasTypes(biasTypes.filter(t => t !== typeId))
    } else {
      setBiasTypes([...biasTypes, typeId])
    }
  }

  const handleScan = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to scan')
      return
    }

    if (biasTypes.length === 0) {
      toast.error('Please select at least one bias type')
      return
    }

    setLoading(true)
    setResults(null)
    setFixedText(null)

    try {
      const response = await axios.post(`${API_URL}/scan`, {
        text: text,
        bias_types: biasTypes
      })
      setResults(response.data)
      
      if (response.data.score === 0) {
        toast.success('Great! No significant biases detected')
      } else if (response.data.score < 30) {
        toast.success('Scan complete - Low risk detected')
      } else if (response.data.score < 60) {
        toast('Scan complete - Medium risk detected', { icon: '⚠️' })
      } else {
        toast.error('Scan complete - High risk detected')
      }
    } catch (error) {
      console.error('Scan error:', error)
      toast.error(error.response?.data?.detail || 'Failed to scan text. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFix = async () => {
    setFixLoading(true)
    try {
      const response = await axios.post(`${API_URL}/fix`, {
        text: text
      })
      setFixedText(response.data)
      toast.success('Text has been rewritten to remove bias!')
    } catch (error) {
      console.error('Fix error:', error)
      toast.error(error.response?.data?.detail || 'Failed to fix text. Please try again.')
    } finally {
      setFixLoading(false)
    }
  }

  const handleFileUpload = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      toast.error(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is 5MB.`)
      return
    }

    // Check file type
    const validTypes = ['.pdf', '.doc', '.docx', '.txt']
    const fileExt = '.' + file.name.split('.').pop().toLowerCase()
    if (!validTypes.includes(fileExt)) {
      toast.error('Invalid file type. Please upload PDF, DOC, DOCX, or TXT files.')
      return
    }

    setLoading(true)
    setResults(null)
    setFixedText(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bias_types', JSON.stringify(biasTypes))

      const response = await axios.post(`${API_URL}/upload-and-scan`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // Set the extracted text in the textarea
      setText(response.data.extracted_text)
      setUploadedFileName(response.data.original_file_name)
      
      // Set the results
      setResults(response.data)

      if (response.data.score === 0) {
        toast.success(`File "${file.name}" scanned - No biases detected!`)
      } else {
        toast.success(`File "${file.name}" scanned successfully!`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.response?.data?.detail || 'Failed to process file. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    handleFileUpload(acceptedFiles)
  }, [biasTypes])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false
  })

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getScoreColor = (score) => {
    if (score < 30) return 'text-green-600'
    if (score < 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressBarColor = (score) => {
    if (score < 30) return 'bg-green-500'
    if (score < 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getBiasTypeColor = (biasType) => {
    const colors = {
      gender: 'bg-purple-100 text-purple-700',
      race: 'bg-orange-100 text-orange-700',
      age: 'bg-blue-100 text-blue-700',
      disability: 'bg-green-100 text-green-700',
      culture: 'bg-pink-100 text-pink-700',
      political: 'bg-red-100 text-red-700',
      religion: 'bg-indigo-100 text-indigo-700',
      lgbtq: 'bg-fuchsia-100 text-fuchsia-700',
      socioeconomic: 'bg-teal-100 text-teal-700',
      intersectional: 'bg-slate-100 text-slate-700'
    }
    return colors[biasType] || 'bg-gray-100 text-gray-700'
  }

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <h1 className="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 drop-shadow-sm">
                BiasRadar
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 rounded-lg blur opacity-20"></div>
            </div>
          </div>
          <p className="text-xl text-gray-600 mb-2">
            Detect hidden bias across 10 dimensions in seconds
          </p>
          <p className="text-sm text-gray-500">
            Free • No login required • Powered by AI
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Paste your text here
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="E.g., 'The best engineers are aggressive, dominant, and work 80-hour weeks.'"
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                maxLength={10000}
              />
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => {
                    setText('')
                    setUploadedFileName(null)
                    setResults(null)
                    setFixedText(null)
                    toast.success('All cleared!')
                  }}
                  className="text-sm text-gray-600 hover:text-red-600 font-medium underline transition-colors"
                >
                  🗑️ Clear All
                </button>
                <div className={`text-sm font-medium ${
                  text.length >= 9500 ? 'text-red-600' : 
                  text.length >= 8000 ? 'text-yellow-600' : 
                  'text-gray-500'
                }`}>
                  {text.length}/10,000 characters
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {isDragActive ? (
                      <p className="text-blue-600 font-semibold">Drop your file here...</p>
                    ) : (
                      <>
                        <p className="text-gray-600 font-medium mb-1">
                          Drag & drop a file here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports PDF, DOC, DOCX, TXT (max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {uploadedFileName && (
                  <div className="mt-3 flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-green-800 font-medium">File loaded: {uploadedFileName}</span>
                    </div>
                    <button
                      onClick={() => {
                        setText('')
                        setUploadedFileName(null)
                        setResults(null)
                        setFixedText(null)
                      }}
                      className="text-xs text-green-600 hover:text-green-700 underline"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Select bias types to scan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allBiasTypes.map((type) => (
                  <label
                    key={type.id}
                    className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      biasTypes.includes(type.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={biasTypes.includes(type.id)}
                      onChange={() => handleBiasTypeToggle(type.id)}
                      className="mt-1 mr-3 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{type.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{type.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleScan}
              disabled={loading || !text.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white text-xl font-bold py-5 px-8 rounded-xl hover:from-blue-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transform transition-all hover:scale-105 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Scanning...
                </span>
              ) : (
                '🔍 Scan Now'
              )}
            </button>
          </div>

          <div className="space-y-6">
            {results && (
              <>
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Bias Score</h2>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-5xl font-bold ${getScoreColor(results.score)}`}>
                      {results.score}/100
                    </span>
                    <span className={`text-lg font-semibold ${getScoreColor(results.score)}`}>
                      {results.severity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full ${getProgressBarColor(results.score)} transition-all duration-1000 ease-out`}
                      style={{ width: `${results.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{results.summary}</p>
                </div>

                {results.issues && results.issues.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Detected Issues ({results.issues.length})
                    </h2>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {results.issues.map((issue, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border-2 ${getSeverityColor(issue.severity)}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-bold text-gray-900">"{issue.word}"</span>
                            <div className="flex gap-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${getBiasTypeColor(issue.bias_type)}`}>
                                {issue.bias_type}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(issue.severity)}`}>
                                {issue.severity}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{issue.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {results.heatmap && results.heatmap.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Visual Heatmap</h2>
                    <div className="p-4 bg-gray-50 rounded-xl leading-relaxed">
                      {results.heatmap.map((item, idx) => (
                        <span
                          key={idx}
                          className={`inline-block mr-1 mb-1 px-2 py-1 rounded ${
                            item.biased
                              ? item.severity === 'high'
                                ? 'bg-red-200 text-red-900 font-semibold'
                                : item.severity === 'medium'
                                ? 'bg-yellow-200 text-yellow-900 font-semibold'
                                : 'bg-blue-200 text-blue-900'
                              : 'bg-white text-gray-700'
                          }`}
                          title={item.biased ? `Bias: ${item.bias_types.join(', ')}` : ''}
                        >
                          {item.word}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-200 rounded" />
                        <span>High Risk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-200 rounded" />
                        <span>Medium Risk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-200 rounded" />
                        <span>Low Risk</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleFix}
                  disabled={fixLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white text-lg font-bold py-4 px-8 rounded-xl hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transform transition-all hover:scale-105 shadow-lg"
                >
                  {fixLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    '✨ Fix This Text'
                  )}
                </button>

                {fixedText && (
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Bias-Free Version</h2>
                    <div className="p-4 bg-green-50 rounded-xl mb-4">
                      <p className="text-gray-800 leading-relaxed">{fixedText.fixed_text}</p>
                    </div>
                    
                    {fixedText.improvements && fixedText.improvements.length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Key Improvements:</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {fixedText.improvements.map((improvement, idx) => (
                            <li key={idx} className="text-sm text-gray-600">{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => copyToClipboard(fixedText.fixed_text)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        📋 Copy Text
                      </button>
                      <button
                        onClick={() => {
                          setText(fixedText.fixed_text)
                          setResults(null)
                          setFixedText(null)
                          toast.success('Text replaced! Scan again to verify.')
                        }}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        🔄 Replace Original Text
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {!results && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Ready to scan for bias
                </h3>
                <p className="text-gray-600">
                  Enter your text and click "Scan Now" to detect hidden biases
                </p>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-3">Try an example:</h4>
                  <button
                    onClick={() => setText("The best engineers are aggressive, dominant, and work 80-hour weeks. We need young digital natives who can handle the fast-paced environment.")}
                    className="text-sm text-blue-600 hover:text-blue-700 underline"
                  >
                    Load sample biased text
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Built with ❤️ using Replit, FastAPI, and React</p>
          <p className="mt-2">Helping create more inclusive and fair content</p>
        </footer>
      </div>
    </div>
  )
}

export default App
