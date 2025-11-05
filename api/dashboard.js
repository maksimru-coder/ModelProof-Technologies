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
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 BiasRadar API Admin Dashboard</h1>
    
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

        if (res.status === 403) {
          passcode = null;
          alert('Invalid passcode. Please try again.');
          return loadOrganizations();
        }

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || 'Failed to load organizations');
        }

        const data = await res.json();
        organizations = data.organizations || [];
        renderTable();
        updateStats();
      } catch (error) {
        console.error('Dashboard error:', error);
        if (error.message.includes('fetch')) {
          alert('Cannot connect to API. Please check your deployment.');
        } else {
          alert('Error: ' + error.message);
        }
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

    loadOrganizations();
  </script>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
}
