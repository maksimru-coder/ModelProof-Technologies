export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const organizations = [];

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BiasRadar API Admin Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      padding: 2rem;
    }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #00D4FF;
    }
    table {
      width: 100%;
      background: #1e293b;
      border-radius: 8px;
      overflow: hidden;
      border-collapse: collapse;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #334155;
    }
    th {
      background: #1e40af;
      color: white;
      font-weight: 600;
    }
    tr:hover { background: #2d3748; }
    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .badge-free { background: #94a3b8; color: #0f172a; }
    .badge-paid { background: #10b981; color: white; }
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      margin-right: 0.5rem;
    }
    .btn-upgrade { background: #10b981; color: white; }
    .btn-downgrade { background: #f59e0b; color: white; }
    .btn-revoke { background: #ef4444; color: white; }
    .btn:hover { opacity: 0.8; }
    .api-key {
      font-family: monospace;
      font-size: 0.875rem;
      background: #334155;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: #1e293b;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #00D4FF;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #00D4FF;
    }
    .stat-label {
      color: #94a3b8;
      margin-top: 0.5rem;
    }
    .create-form {
      background: #1e293b;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border: 2px solid #00D4FF;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #e2e8f0;
      font-weight: 500;
    }
    .form-group input {
      width: 100%;
      padding: 0.75rem;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 6px;
      color: #e2e8f0;
      font-size: 1rem;
    }
    .form-group input:focus {
      outline: none;
      border-color: #00D4FF;
    }
    .btn-create {
      background: #00D4FF;
      color: #0f172a;
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-create:hover {
      opacity: 0.9;
    }
    .btn-create:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .form-hint {
      color: #94a3b8;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    h2 {
      color: #00D4FF;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 BiasRadar API Admin Dashboard</h1>
    
    <div class="create-form">
      <h2>➕ Create New Organization</h2>
      <form id="createForm" onsubmit="createOrganization(event)">
        <div class="form-group">
          <label for="orgName">Organization Name *</label>
          <input type="text" id="orgName" required placeholder="e.g., Acme Corporation">
          <div class="form-hint">The company or organization name</div>
        </div>
        <div class="form-group">
          <label for="orgEmail">Contact Email *</label>
          <input type="email" id="orgEmail" required placeholder="e.g., contact@acme.com">
          <div class="form-hint">Main contact email for this organization</div>
        </div>
        <div class="form-group">
          <div class="form-hint">✨ API Key will be automatically generated (format: bdr_xxxxx...)</div>
        </div>
        <button type="submit" class="btn-create">Create Organization</button>
      </form>
    </div>
    
    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">${organizations.length}</div>
        <div class="stat-label">Total Organizations</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${organizations.filter(o => o.is_paid).length}</div>
        <div class="stat-label">Paid Customers</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${organizations.reduce((sum, o) => sum + o.requests_made, 0)}</div>
        <div class="stat-label">Total Requests Today</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>API Key</th>
          <th>Plan</th>
          <th>Requests</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${organizations.map(org => `
          <tr>
            <td><strong>${org.name}</strong></td>
            <td>${org.email}</td>
            <td><span class="api-key">${org.api_key.substring(0, 20)}...</span></td>
            <td><span class="badge ${org.is_paid ? 'badge-paid' : 'badge-free'}">${org.is_paid ? 'PAID' : 'FREE'}</span></td>
            <td>${org.requests_made}${org.is_paid ? '' : ' / 20'}</td>
            <td>${new Date(org.created_at).toLocaleDateString()}</td>
            <td>
              <button class="btn ${org.is_paid ? 'btn-downgrade' : 'btn-upgrade'}" onclick="togglePaid('${org.email}', ${!org.is_paid})">
                ${org.is_paid ? 'Downgrade' : 'Upgrade'}
              </button>
              <button class="btn btn-revoke" onclick="revokeKey('${org.email}', '${org.name}')">Revoke</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <script>
    let passcode = null;
    let organizations = [];

    async function loadOrganizations() {
      if (!passcode) {
        passcode = prompt('Enter admin passcode:');
        if (!passcode) {
          alert('Admin passcode required');
          return;
        }
      }

      try {
        const res = await fetch('/api/admin', {
          method: 'GET',
          headers: {
            'X-Admin-Passcode': passcode
          }
        });

        const data = await res.json();

        if (res.status === 403) {
          passcode = null;
          alert('Invalid passcode. Please try again.');
          return loadOrganizations();
        }

        if (res.status === 500 && data.details?.includes('DATABASE_URL')) {
          alert('Server configuration error: DATABASE_URL not set in Vercel.\n\nPlease add DATABASE_URL to your Vercel environment variables.');
          passcode = null;
          document.body.innerHTML = '<div style="padding:40px;font-family:sans-serif;"><h1>⚠️ Configuration Error</h1><p>The API is missing the <code>DATABASE_URL</code> environment variable.</p><p><strong>To fix:</strong></p><ol><li>Go to your Vercel project settings</li><li>Navigate to Environment Variables</li><li>Add <code>DATABASE_URL</code> with your Postgres connection string</li><li>Redeploy the application</li></ol></div>';
          return;
        }

        if (!res.ok) {
          throw new Error(data.error || data.details || 'Failed to load organizations');
        }

        organizations = data.organizations || [];
        renderTable();
        updateStats();
      } catch (error) {
        console.error('Dashboard error:', error);
        alert('Error: ' + error.message);
        passcode = null;
      }
    }

    function renderTable() {
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = organizations.map(org => \`
        <tr>
          <td><strong>\${org.name}</strong></td>
          <td>\${org.email}</td>
          <td><span class="api-key">\${org.api_key.substring(0, 20)}...</span></td>
          <td><span class="badge \${org.is_paid ? 'badge-paid' : 'badge-free'}">\${org.is_paid ? 'PAID' : 'FREE'}</span></td>
          <td>\${org.requests_made}\${org.is_paid ? '' : ' / 20'}</td>
          <td>\${new Date(org.created_at).toLocaleDateString()}</td>
          <td>
            <button class="btn \${org.is_paid ? 'btn-downgrade' : 'btn-upgrade'}" onclick="togglePaid('\${org.email}', \${!org.is_paid})">
              \${org.is_paid ? 'Downgrade' : 'Upgrade'}
            </button>
            <button class="btn btn-revoke" onclick="revokeKey('\${org.email}', '\${org.name}')">Revoke</button>
          </td>
        </tr>
      \`).join('');
    }

    function updateStats() {
      document.querySelector('.stat-value').textContent = organizations.length;
      document.querySelectorAll('.stat-value')[1].textContent = organizations.filter(o => o.is_paid).length;
      document.querySelectorAll('.stat-value')[2].textContent = organizations.reduce((sum, o) => sum + o.requests_made, 0);
    }

    async function togglePaid(email, isPaid) {
      if (!confirm(\`Are you sure you want to \${isPaid ? 'upgrade' : 'downgrade'} this organization?\`)) return;
      
      try {
        const res = await fetch('/api/admin', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Passcode': passcode
          },
          body: JSON.stringify({ email, is_paid: isPaid })
        });

        if (res.ok) {
          alert('Organization updated successfully!');
          await loadOrganizations();
        } else {
          const error = await res.json();
          alert('Error: ' + error.error);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }

    async function revokeKey(email, name) {
      if (!confirm(\`Are you sure you want to REVOKE the API key for \${name}? This action cannot be undone.\`)) return;
      
      try {
        const res = await fetch('/api/admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Passcode': passcode
          },
          body: JSON.stringify({ email, name, action: 'revoke' })
        });

        if (res.ok) {
          alert('API key revoked successfully!');
          await loadOrganizations();
        } else {
          const error = await res.json();
          alert('Error: ' + error.error);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }

    async function createOrganization(event) {
      event.preventDefault();
      
      const name = document.getElementById('orgName').value.trim();
      const email = document.getElementById('orgEmail').value.trim();
      
      if (!name || !email) {
        alert('Please fill in all required fields');
        return;
      }

      try {
        const res = await fetch('/api/admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Passcode': passcode
          },
          body: JSON.stringify({ name, email })
        });

        const data = await res.json();

        if (res.ok) {
          alert(\`✅ Organization created successfully!\n\nName: \${data.organization.name}\nEmail: \${data.organization.email}\nAPI Key: \${data.organization.api_key}\n\nThe API key has been generated. Share this with the customer.\`);
          document.getElementById('createForm').reset();
          await loadOrganizations();
        } else {
          alert('Error: ' + (data.error || 'Failed to create organization'));
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }

    // Force passcode prompt on page load
    window.addEventListener('DOMContentLoaded', function() {
      console.log('Dashboard loaded, requesting passcode...');
      loadOrganizations();
    });
  </script>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
}
