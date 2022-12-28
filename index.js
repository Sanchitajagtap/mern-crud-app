const http = require("http");
const { getMaxListeners } = require("process");
http
  .createServer((req, res) => {
    console.log("server started");
    res.writeHead(200, { "content-Type": "applicationjson" });
    res.write(JSON.stringify({ name: "abc abc", email: "abc@gmail.com" }));
    res.end();
  })
  .listen(5000);
