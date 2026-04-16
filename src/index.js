module.exports = {
  onLoad: (callisto) => {
    console.log('[TEST-PLUGIN] Hello from test plugin!');

    // Register a test route: GET /api/plugins/callisto-test-plugin/hello
    callisto.registerRoute('GET', '/hello', (_req, res) => {
      res.json({ 
        message: 'Hello from Callisto Test Plugin!', 
        timestamp: new Date().toISOString(),
        plugin: callisto.name,
      });
    });

    // Register a test route: POST /api/plugins/callisto-test-plugin/echo
    callisto.registerRoute('POST', '/echo', (req, res) => {
      res.json({ 
        echo: req.body,
        plugin: callisto.name,
      });
    });

    console.log('[TEST-PLUGIN] Routes registered: /hello, /echo');
  }
};
