import React, { useState, useEffect } from 'react';

function TestPluginPage({ callisto }) {
  const [response, setResponse] = useState(null);
  const [echoInput, setEchoInput] = useState('');
  const [echoResponse, setEchoResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHello = async () => {
    setLoading(true);
    try {
      const res = await callisto.api.fetch('/hello');
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const sendEcho = async () => {
    if (!echoInput.trim()) return;
    try {
      const res = await callisto.api.fetch('/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: echoInput }),
      });
      const data = await res.json();
      setEchoResponse(data);
      setEchoInput('');
    } catch (err) {
      setEchoResponse({ error: err.message });
    }
  };

  useEffect(() => { fetchHello(); }, []);

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
        🧪 Test Plugin
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '32px' }}>
        This plugin was installed from GitHub and is running inside Callisto.
      </p>

      {/* Hello endpoint */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>
          GET /hello
        </h2>
        <button
          onClick={fetchHello}
          style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px', marginBottom: '12px' }}
        >
          {loading ? 'Loading...' : 'Fetch'}
        </button>
        {response && (
          <pre style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '12px', fontSize: '12px', overflow: 'auto', color: 'rgba(255,255,255,0.7)' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>

      {/* Echo endpoint */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
        <h2 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>
          POST /echo
        </h2>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            type="text"
            value={echoInput}
            onChange={(e) => setEchoInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendEcho()}
            placeholder="Type a message..."
            style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '13px', outline: 'none' }}
          />
          <button
            onClick={sendEcho}
            style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px' }}
          >
            Send
          </button>
        </div>
        {echoResponse && (
          <pre style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '12px', fontSize: '12px', overflow: 'auto', color: 'rgba(255,255,255,0.7)' }}>
            {JSON.stringify(echoResponse, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

export default TestPluginPage;
