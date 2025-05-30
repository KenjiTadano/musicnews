const { createServer } = require("https");

const { parse } = require("url");

const next = require("next");

const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

// 証明書を読み込み

const httpsOptions = {
  key: fs.readFileSync("./cert/key.pem"),

  cert: fs.readFileSync("./cert/cert.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;

    console.log("> Ready on https://localhost:3000");
  });
});
