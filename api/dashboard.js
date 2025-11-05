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
    .badge-demo { background: #f59e0b; color: white; }
    .badge-expired { background: #ef4444; color: white; }
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
          <label for="planType">Plan Type *</label>
          <select id="planType" required style="width: 100%; padding: 0.75rem; background: #0f172a; border: 1px solid #334155; border-radius: 6px; color: #e2e8f0; font-size: 1rem;">
            <option value="demo">Demo (20 req/day for 5 days, then auto-expires)</option>
            <option value="free">Free (20 req/day, no expiration)</option>
            <option value="paid">Paid (Unlimited, no expiration)</option>
          </select>
          <div class="form-hint">Choose the plan type for this organization</div>
        </div>
        <div class="form-group">
          <div class="form-hint">✨ API Key will be automatically generated (format: bdr_xxxxx...)</div>
        </div>
        <button type="submit" class="btn-create">Create Organization</button>
      </form>
    </div>
    
    <div class="stats">
      <div class="stat-card">
        <div class="stat-value" id="stat-total">0</div>
        <div class="stat-label">Total Organizations</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="stat-paid">0</div>
        <div class="stat-label">Paid Customers</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="stat-requests">0</div>
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
          <th>Expires</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr><td colspan="8" style="text-align: center; padding: 2rem; color: #94a3b8;">Loading organizations...</td></tr>
      </tbody>
    </table>
  </div>

  <script>
    let passcode = null;
    let organizations = [];

    async function loadOrganizations() {
      if (!passcode) {
        passcode = prompt('🔐 Enter Admin Passcode:');
        if (!passcode || passcode.trim() === '') {
          alert('⚠️ Admin passcode is required to access the dashboard.');
          document.body.innerHTML = '<div style="padding: 40px; font-family: sans-serif; text-align: center;"><h1>🔒 Access Denied</h1><p>Admin passcode is required to access this dashboard.</p><p><a href="/api/dashboard" style="color: #00D4FF;">Refresh to try again</a></p></div>';
          return;
        }
        passcode = passcode.trim();
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
      
      if (organizations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem; color: #94a3b8;">No organizations yet. Create one above!</td></tr>';
        return;
      }
      
      tbody.innerHTML = organizations.map(org => {
        const planType = org.plan_type || (org.is_paid ? 'paid' : 'free');
        const isExpired = org.demo_expires_at && new Date(org.demo_expires_at) < new Date();
        const daysLeft = org.demo_expires_at ? Math.ceil((new Date(org.demo_expires_at) - new Date()) / (1000 * 60 * 60 * 24)) : null;
        
        let badgeClass = 'badge-free';
        let badgeText = 'FREE';
        
        if (isExpired) {
          badgeClass = 'badge-expired';
          badgeText = 'EXPIRED';
        } else if (planType === 'paid') {
          badgeClass = 'badge-paid';
          badgeText = 'PAID';
        } else if (planType === 'demo') {
          badgeClass = 'badge-demo';
          badgeText = \`DEMO (\${daysLeft}d left)\`;
        }
        
        const requestsText = planType === 'paid' ? org.requests_made : \`\${org.requests_made} / 20\`;
        const expiresText = org.demo_expires_at 
          ? new Date(org.demo_expires_at).toLocaleDateString() 
          : '—';
        
        return \`
          <tr>
            <td><strong>\${org.name}</strong></td>
            <td>\${org.email}</td>
            <td><span class="api-key">\${org.api_key.substring(0, 20)}...</span></td>
            <td><span class="badge \${badgeClass}">\${badgeText}</span></td>
            <td>\${requestsText}</td>
            <td>\${new Date(org.created_at).toLocaleDateString()}</td>
            <td>\${expiresText}</td>
            <td>
              \${planType !== 'paid' ? \`<button class="btn btn-upgrade" onclick="upgradeToPaid('\${org.email}')">Upgrade to Paid</button>\` : ''}
              <button class="btn btn-revoke" onclick="revokeKey('\${org.email}', '\${org.name}')">Revoke</button>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function updateStats() {
      document.getElementById('stat-total').textContent = organizations.length;
      document.getElementById('stat-paid').textContent = organizations.filter(o => o.plan_type === 'paid' || o.is_paid).length;
      document.getElementById('stat-requests').textContent = organizations.reduce((sum, o) => sum + o.requests_made, 0);
    }

    async function upgradeToPaid(email) {
      if (!confirm('Are you sure you want to upgrade this organization to PAID (unlimited requests)?')) return;
      
      try {
        const res = await fetch('/api/admin', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Passcode': passcode
          },
          body: JSON.stringify({ email, plan_type: 'paid' })
        });

        if (res.ok) {
          alert('✅ Organization upgraded to PAID successfully!');
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
      const planType = document.getElementById('planType').value;
      
      if (!name || !email || !planType) {
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
          body: JSON.stringify({ name, email, plan_type: planType })
        });

        const data = await res.json();

        if (res.ok) {
          const org = data.organization;
          let message = \`✅ Organization created successfully!\n\nName: \${org.name}\nEmail: \${org.email}\nPlan: \${planType.toUpperCase()}\nAPI Key: \${org.api_key}\n\`;
          
          if (planType === 'demo') {
            const expiresDate = new Date(org.demo_expires_at).toLocaleDateString();
            message += \`\n⏰ Demo expires: \${expiresDate} (5 days)\n20 requests/day limit\`;
          } else if (planType === 'free') {
            message += \`\n20 requests/day limit (no expiration)\`;
          } else {
            message += \`\n✨ Unlimited requests\`;
          }
          
          message += \`\n\nShare the API key with the customer.\`;
          
          alert(message);
          document.getElementById('createForm').reset();
          await loadOrganizations();
        } else {
          alert('Error: ' + (data.error || 'Failed to create organization'));
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }

    // Execute immediately - prompt for passcode as soon as script runs
    (function() {
      console.log('🔐 Dashboard script executing, requesting passcode now...');
      console.log('Document ready state:', document.readyState);
      
      // Prompt immediately
      loadOrganizations();
    })();
  </script>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
}
