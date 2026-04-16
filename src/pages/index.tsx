import React, { useState, useEffect } from 'react';

function TestPluginPage({ callisto }) {
  const [response, setResponse] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchHello = async () => {
    setLoading(true);
    try {
      const res = await callisto.api.fetch('/hello');
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.message });
    }
    setLoading(false);
  };

  const sendEcho = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await callisto.api.fetch('/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setResponse(data);
      setInput('');
    } catch (err) {
      setResponse({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>🧪 Test Plugin</h1>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>
        This is a test plugin page running inside Callisto
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Hello button */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>GET /hello</h2>
          <button
            onClick={fetchHello}
            disabled={loading}
            style={{ 
              padding: '10px 20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '12px', 
              color: 'white', fontSize: '14px', cursor: 'pointer', fontWeight: 500 
            }}
          >
            {loading ? 'Loading...' : 'Say Hello'}
          </button>
        </div>

        {/* Echo input */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>POST /echo</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendEcho()}
              placeholder="Type something..."
              style={{ 
                flex: 1, padding: '10px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '12px', color: 'white', fontSize: '14px', outline: 'none' 
              }}
            />
            <button
              onClick={sendEcho}
              disabled={loading || !input.trim()}
              style={{ 
                padding: '10px 20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '12px', 
                color: 'white', fontSize: '14px', cursor: 'pointer', fontWeight: 500,
                opacity: loading || !input.trim() ? 0.3 : 1
              }}
            >
              Echo
            </button>
          </div>
        </div>

        {/* Response */}
        {response && (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>Response</h2>
            <pre style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap', fontFamily: 'monospace', margin: 0 }}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestPluginPage;
