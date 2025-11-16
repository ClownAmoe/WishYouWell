import http from "http";
import httpProxy from "http-proxy";

const PORT = 3000;
const WORKERS = [3001, 3002];
let current = 0;

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  const targetPort = WORKERS[current];
  current = (current + 1) % WORKERS.length;
  proxy.web(req, res, { target: `http://localhost:${targetPort}` });
});

server.listen(PORT, () => {
  console.log(`Load balancer listening on http://localhost:${PORT}`);
});
