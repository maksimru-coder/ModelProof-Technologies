import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Radar, ChevronDown, Upload, Loader2, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import sanitizeHtml from 'sanitize-html';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Types
interface BiasIssue {
  word: string;
  bias_type: string;
  severity: string;
  explanation: string;
  position: number;
}

interface ScanResponse {
  score: number;
  severity: string;
  issues: BiasIssue[];
  heatmap: {
    word: string;
    biased: boolean;
    severity: string;
    bias_types: string[];
  }[];
  summary: string;
}

interface FixResponse {
  original_text: string;
  fixed_text: string;
  improvements: string[];
}

const allBiasTypes = [
  { id: 'gender', label: 'Gender', description: 'Detects gender stereotypes and biased language' },
  { id: 'race', label: 'Race', description: 'Identifies racial bias and problematic terms' },
  { id: 'age', label: 'Age', description: 'Finds age-related discrimination' },
  { id: 'disability', label: 'Disability', description: 'Catches ableist language' },
  { id: 'lgbtq', label: 'Sexual Orientation/Gender Identity', description: 'Catches biases related to LGBTQ+ communities or non-binary identities' },
  { id: 'religion', label: 'Religion', description: 'Identifies faith-based stereotypes' },
  { id: 'socioeconomic', label: 'Socioeconomic/Class', description: 'Spots assumptions about income, class, or economic status' },
  { id: 'culture', label: 'Culture', description: 'Spots cultural insensitivities or Western-centric assumptions' },
  { id: 'intersectional', label: 'Intersectional', description: 'Analyzes combined biases (e.g., race + gender) for overlapping discriminations' },
  { id: 'political', label: 'Political/Ideological', description: 'Detects partisan slants or ideological assumptions' },
  { id: 'ideological_neutrality', label: 'Ideological Neutrality', description: 'Identifies partisan slants, ideological dogmas, or non-neutral framing' },
  { id: 'truth_seeking', label: 'Truth-Seeking', description: 'Detects deviations from factual accuracy, unsubstantiated claims, or non-truthful language' }
];

export default function BiasRadar() {
  const [text, setText] = useState("");
  const [biasTypes, setBiasTypes] = useState<string[]>([
    'gender', 'race', 'age', 'disability', 'lgbtq', 'religion',
    'socioeconomic', 'culture', 'intersectional', 'political',
    'ideological_neutrality', 'truth_seeking'
  ]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ScanResponse | null>(null);
  const [fixedText, setFixedText] = useState<FixResponse | null>(null);
  const [fixLoading, setFixLoading] = useState(false);
  const { toast } = useToast();

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  };

  const extractTextFromDOC = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const sanitizeText = (text: string): string => {
    // Remove any HTML tags and scripts
    const sanitized = sanitizeHtml(text, {
      allowedTags: [],
      allowedAttributes: {},
    });
    
    // Remove any potential script-like content
    return sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Security check: validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      let extractedText = '';

      if (file.type === 'application/pdf') {
        extractedText = await extractTextFromPDF(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        extractedText = await extractTextFromDOC(file);
      } else if (file.type === 'text/plain') {
        extractedText = await file.text();
      } else {
        toast({
          title: "Unsupported file type",
          description: "Please upload a PDF, DOCX, or TXT file. Legacy .doc files are not supported.",
          variant: "destructive",
        });
        return;
      }

      // Sanitize the extracted text
      const sanitizedText = sanitizeText(extractedText);

      if (!sanitizedText || sanitizedText.length === 0) {
        toast({
          title: "No text found",
          description: "The file appears to be empty or contains no readable text",
          variant: "destructive",
        });
        return;
      }

      setText(sanitizedText);
      toast({
        title: "File uploaded successfully",
        description: `Loaded ${file.name}`,
      });
    } catch (error) {
      console.error('File processing error:', error);
      toast({
        title: "Error processing file",
        description: "Failed to extract text from the file. Please try a different file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    multiple: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTool = () => {
    const toolSection = document.getElementById("biasradar-tool");
    if (toolSection) {
      toolSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBiasTypeToggle = (typeId: string) => {
    if (biasTypes.includes(typeId)) {
      setBiasTypes(biasTypes.filter(t => t !== typeId));
    } else {
      setBiasTypes([...biasTypes, typeId]);
    }
  };

  const handleScan = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to scan",
        variant: "destructive"
      });
      return;
    }

    if (biasTypes.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one bias type",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setResults(null);
    setFixedText(null);

    try {
      const response = await axios.post<ScanResponse>('/api/biasradar/scan', {
        text: text,
        bias_types: biasTypes
      });
      setResults(response.data);

      if (response.data.score === 0) {
        toast({
          title: "Success",
          description: "Great! No significant biases detected"
        });
      } else if (response.data.score < 30) {
        toast({
          title: "Scan Complete",
          description: "Low risk detected"
        });
      } else if (response.data.score < 60) {
        toast({
          title: "Scan Complete",
          description: "Medium risk detected"
        });
      } else {
        toast({
          title: "Scan Complete",
          description: "High risk detected",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Scan error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || 'Failed to scan text. Please try again.',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFix = async () => {
    setFixLoading(true);
    try {
      const response = await axios.post<FixResponse>('/api/biasradar/fix', {
        text: text
      });
      setFixedText(response.data);
      toast({
        title: "Success",
        description: "Text has been rewritten to remove bias!"
      });
    } catch (error: any) {
      console.error('Fix error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || 'Failed to fix text. Please try again.',
        variant: "destructive"
      });
    } finally {
      setFixLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (score: number) => {
    if (score < 30) return 'bg-green-500';
    if (score < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBiasTypeColor = (biasType: string) => {
    const colors: Record<string, string> = {
      gender: 'bg-purple-100 text-purple-700',
      race: 'bg-orange-100 text-orange-700',
      age: 'bg-blue-100 text-blue-700',
      disability: 'bg-green-100 text-green-700',
      culture: 'bg-pink-100 text-pink-700',
      political: 'bg-red-100 text-red-700',
      religion: 'bg-indigo-100 text-indigo-700',
      lgbtq: 'bg-fuchsia-100 text-fuchsia-700',
      socioeconomic: 'bg-teal-100 text-teal-700',
      intersectional: 'bg-slate-100 text-slate-700',
      truth_seeking: 'bg-cyan-100 text-cyan-700',
      ideological_neutrality: 'bg-amber-100 text-amber-700'
    };
    return colors[biasType] || 'bg-gray-100 text-gray-700';
  };

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard"
    });
  };

  return (
    <div className="min-h-screen">
      <div className="relative bg-primary text-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <Radar 
                className="h-16 w-16 stroke-[1.5]" 
                style={{
                  filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.3))"
                }}
              />
            </div>
            <h1 className="text-5xl font-bold mb-6">BiasRadar™</h1>
            <p className="text-2xl mb-8 text-white/90">
              AI Bias Detection Tool by ModelProof Technologies
            </p>
            <p className="text-lg mb-10 text-white/80 max-w-3xl mx-auto">
              Analyze your text or document for bias across multiple categories — gender, race, age, disability, culture, and more. Detect, analyze, and fix biases to ensure your content, AI outputs, communications, and business operations are fair, neutral, bias-free, and compliant with ethical standards and current regulations—empowering any company to maintain neutrality and fairness across all operations.
            </p>
            <Button 
              size="lg"
              onClick={scrollToTool}
              className="px-8 py-3 font-semibold bg-white text-primary hover:bg-white/90 rounded-lg transform transition-all hover:-translate-y-0.5 hover:shadow-lg border-2 border-white/20 hover:border-white/40"
              data-testid="button-scroll-to-tool"
            >
              Launch BiasRadar Tool
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      <div id="biasradar-tool" className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enter or upload your text</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    {...getRootProps()} 
                    className={`mb-4 p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all ${
                      isDragActive 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    {isDragActive ? (
                      <p className="text-sm text-primary font-medium">Drop your file here...</p>
                    ) : (
                      <>
                        <p className="text-sm font-medium mb-1">Drag & drop a file here, or click to browse</p>
                        <p className="text-xs text-muted-foreground">Supports: PDF, DOCX, TXT (max 10MB)</p>
                      </>
                    )}
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="E.g., 'The best engineers are aggressive, dominant, and work 80-hour weeks.'"
                    className="w-full h-48 p-4 border-2 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    maxLength={10000}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="no-underline"
                      onClick={() => {
                        setText('');
                        setResults(null);
                        setFixedText(null);
                        toast({ title: "Cleared", description: "All text and results cleared" });
                      }}
                    >
                      🗑️ Clear All
                    </Button>
                    <div className={`text-sm font-medium ${
                      text.length >= 9500 ? 'text-red-600' : 
                      text.length >= 8000 ? 'text-yellow-600' : 
                      'text-muted-foreground'
                    }`}>
                      {text.length}/10,000 characters
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select bias types to scan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {allBiasTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          biasTypes.includes(type.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={biasTypes.includes(type.id)}
                          onChange={() => handleBiasTypeToggle(type.id)}
                          className="mt-1 mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{type.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button 
                  onClick={handleScan}
                  disabled={loading || !text.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Radar className="mr-2 h-5 w-5" />
                      Scan Now
                    </>
                  )}
                </Button>
                {results && (
                  <Button 
                    onClick={handleFix}
                    disabled={fixLoading || !text.trim()}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    size="lg"
                  >
                    {fixLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Fixing...
                      </>
                    ) : (
                      'Fix Text'
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Bias Analysis Results</span>
                        <span className={`text-3xl font-bold ${getScoreColor(results.score)}`}>
                          {results.score}/100
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all ${getProgressBarColor(results.score)}`}
                            style={{ width: `${results.score}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{results.summary}</p>
                      </div>

                      {results.heatmap && results.heatmap.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-semibold text-sm mb-3">Text Heatmap:</h3>
                          <div className="p-4 bg-gray-50 rounded-lg border">
                            <div className="flex flex-wrap gap-1 text-sm leading-relaxed">
                              {results.heatmap.map((item, idx) => {
                                const bgColor = item.biased 
                                  ? item.severity === 'high' 
                                    ? 'bg-red-200 hover:bg-red-300' 
                                    : item.severity === 'medium'
                                    ? 'bg-yellow-200 hover:bg-yellow-300'
                                    : 'bg-blue-100 hover:bg-blue-200'
                                  : '';
                                
                                return (
                                  <span
                                    key={idx}
                                    className={`${bgColor} ${item.biased ? 'px-1 rounded cursor-help font-medium' : ''} transition-colors`}
                                    title={item.biased ? `Bias types: ${item.bias_types.join(', ')}` : ''}
                                  >
                                    {item.word}
                                  </span>
                                );
                              })}
                            </div>
                            <div className="flex gap-4 mt-4 pt-4 border-t text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-200 rounded"></div>
                                <span>High Severity</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                                <span>Medium Severity</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-100 rounded"></div>
                                <span>Low Severity</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {results.issues.length > 0 && (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          <h3 className="font-semibold text-sm">Issues Detected ({results.issues.length}):</h3>
                          {results.issues.map((issue, idx) => (
                            <div key={idx} className={`p-3 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                              <div className="flex items-start justify-between mb-1">
                                <span className="font-semibold text-sm">"{issue.word}"</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${getBiasTypeColor(issue.bias_type)}`}>
                                  {issue.bias_type}
                                </span>
                              </div>
                              <p className="text-xs">{issue.explanation}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {fixedText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>AI-Fixed Text</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(fixedText.fixed_text)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4 relative">
                        <p className="text-sm">{fixedText.fixed_text}</p>
                        <Button
                          onClick={() => copyToClipboard(fixedText.fixed_text)}
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2">Improvements Made:</h4>
                        <ul className="space-y-1">
                          {fixedText.improvements.map((imp, idx) => (
                            <li key={idx} className="text-sm flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{imp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setText(fixedText.fixed_text)}
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                        >
                          Replace Original Text
                        </Button>
                        <Button
                          onClick={() => copyToClipboard(fixedText.fixed_text)}
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Fixed Text
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {!results && !fixedText && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Radar className="h-24 w-24 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
                      Ready to scan for bias
                    </h3>
                    <p className="text-muted-foreground">
                      Enter your text and click "Scan Now" to detect hidden biases
                    </p>
                    <div className="mt-8 pt-8 border-t">
                      <h4 className="font-semibold mb-3">Try an example:</h4>
                      <button
                        className="text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-4 hover:decoration-blue-700 font-medium transition-all"
                        onClick={() => setText("The best engineers are aggressive, dominant, and work 80-hour weeks. We need young digital natives who can handle the fast-paced environment.")}
                      >
                        Load sample biased text
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">Multi-Category Bias Detection</h3>
                <p className="text-muted-foreground">
                  Identifies bias across gender, race, age, disability, culture, political/ideological leanings, and more in your text and documents.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">Real-Time Analysis</h3>
                <p className="text-muted-foreground">
                  Get instant feedback on potential bias in your content with detailed explanations and suggestions.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">AI-Powered Text Fixing</h3>
                <p className="text-muted-foreground">
                  Automatically rewrite your text to remove detected biases while preserving your core message and intent.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">Compliance Ready</h3>
                <p className="text-muted-foreground">
                  Ensure your content meets ethical AI standards and regulatory requirements for fairness and inclusivity.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
