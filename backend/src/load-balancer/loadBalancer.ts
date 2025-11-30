import http from "http";
import httpProxy from "http-proxy";

const PORT = 3000;
const WORKERS = [3001, 3002];
let current = 0;

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,x-worker-id"
  );

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const targetPort = WORKERS[current];
  req.headers["x-worker-id"] = String(targetPort);
  current = (current + 1) % WORKERS.length;
  proxy.web(req, res, { target: `http://localhost:${targetPort}` });
});

server.listen(PORT, () => {
  console.log(`Load balancer listening on http://localhost:${PORT}`);
});
