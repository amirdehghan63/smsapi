const http = require('http');
const soap = require('soap');
const fs = require('fs');
const path = require('path');

const service = {
  MyService: {
    MyServicePort: {
      MyFunction(args) {
        console.log("== دریافت پارامترها ==");
        console.log("param1:", args.param1);
        console.log("param2:", args.param2);
        console.log("param3:", args.param3);
        console.log("param4:", args.param4);
        return { result: "OK" };
      }
    }
  }
};

const wsdlPath = path.join(__dirname, 'service.wsdl');
const wsdlXml = fs.readFileSync(wsdlPath, 'utf8');

const server = http.createServer(function (req, res) {
  res.statusCode = 404;
  res.end("404: Not Found");
});

server.listen(8000, function () {
  console.log("SOAP Server running at http://localhost:8000/wsdl");
  soap.listen(server, '/wsdl', service, wsdlXml);
});