import http from "http";
import httpProxy from "http-proxy";

const servers = ["http://localhost:3001", "http://localhost:3002"];

let i = 0;
const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  const target = servers[i % servers.length];
  i++;
  proxy.web(req, res, { target }, (err) => {
    res.writeHead(502);
    res.end("Bad Gateway");
  });
});

server.listen(8080, () => console.log("Load balancer running on port 8080"));
