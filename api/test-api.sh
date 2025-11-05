#!/bin/bash

# Test script for BiasRadar API
echo "🧪 Testing BiasRadar API..."
echo

# Start server in background
echo "Starting server..."
node server.js > /tmp/api_server.log 2>&1 &
SERVER_PID=$!
sleep 3

# Test 1: Register a test organization
echo "📝 Test 1: Registering test organization..."
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:3001/api/v1/register \
  -H "X-Admin-Passcode: changeme123" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Organization","email":"test@biasradar.test"}')

echo "Response: $REGISTER_RESPONSE"
API_KEY=$(echo $REGISTER_RESPONSE | grep -o '"api_key":"[^"]*"' | cut -d'"' -f4)
echo "✅ API Key: $API_KEY"
echo

# Test 2: Scan endpoint (would fail because we need the backend running)
echo "📊 Test 2: Testing scan endpoint (mock test)..."
SCAN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/v1/scan \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"The chairman should lead his team.","bias_types":["gender"]}')
echo "Response: $SCAN_RESPONSE"
echo

# Test 3: Check dashboard (just verify it loads)
echo "🎯 Test 3: Checking admin dashboard..."
DASHBOARD_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  "http://localhost:3001/api/dashboard?passcode=changeme123")
echo "Dashboard HTTP Status: $DASHBOARD_STATUS"
if [ "$DASHBOARD_STATUS" = "200" ]; then
  echo "✅ Dashboard accessible"
else
  echo "❌ Dashboard not accessible"
fi
echo

# Test 4: Check docs
echo "📚 Test 4: Checking Swagger docs..."
DOCS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3001/api/docs")
echo "Docs HTTP Status: $DOCS_STATUS"
if [ "$DOCS_STATUS" = "200" ]; then
  echo "✅ Swagger docs accessible"
else
  echo "❌ Swagger docs not accessible"
fi
echo

# Cleanup
echo "🧹 Cleaning up..."
kill $SERVER_PID 2>/dev/null
echo "✅ Tests complete!"
