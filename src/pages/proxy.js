const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/v3/leagues', createProxyMiddleware({
  target: 'https://api-football.com',
  changeOrigin: true,
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': 'dcae5708933639629a715178535f464b'
  }
}));

app.listen(8000, () => {
  console.log('Proxy server started on port 8000');
});
