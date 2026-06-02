import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3002;
const ROOT = process.cwd();

const MIME = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "text/javascript",
  ".mjs":  "text/javascript",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico":  "image/x-icon",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
};

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const filePath = path.join(ROOT, url === "/" ? "index.html" : url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fall back to index.html for SPA-style routing
      fs.readFile(path.join(ROOT, "index.html"), (err2, html) => {
        if (err2) { res.writeHead(404); return res.end("Not found"); }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
