const express = require("express");
const fs = require("fs");
const path = require("path");
const soap = require("soap");
const http = require("http");

const app = express();

const wsdlPath = path.join(__dirname, "service.wsdl");
const wsdlXml = fs.readFileSync(wsdlPath, "utf8");

const service = {
  MyService: {
    MyServicePort: {
      MyFunction(args) {
        console.log("Received:", args);
        return { result: "OK" };
      }
    }
  }
};

app.get("/", (req, res) => res.send("SOAP Service is running"));

app.get("/wsdl", (req, res) => {
  res.set("Content-Type", "text/xml");
  res.send(wsdlXml);
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server running on port", port);
  soap.listen(server, "/wsdl", service, wsdlXml);
});