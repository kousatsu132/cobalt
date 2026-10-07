const http = require("http");

const BGUTIL_URL =
  process.env.BGUTIL_URL || "https://bgutil-pot-0ceo.onrender.com";

const PORT = process.env.PORT || 10000;

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/ping") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method === "POST" && req.url === "/get_pot") {
    try {
      const response = await fetch(`${BGUTIL_URL}/get_pot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "{}",
      });

      const text = await response.text();

      res.writeHead(response.status, {
        "Content-Type": "application/json",
      });
      res.end(text);
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          error: String(error),
        })
      );
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Session adapter listening on ${PORT}`);
});
