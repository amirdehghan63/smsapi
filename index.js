const http = require('http');
const soap = require('soap');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.raw({ type: function () { return true; }, limit: '5mb' }));

const service = {
  MyService: {
    MyServicePortType: {
      MyFunction(args) {
        console.log('SOAP Request:', args);
        return { result: 'ok' };
      }
    }
  }
};

const wsdl = fs.readFileSync('service.wsdl', 'utf8');

app.listen(port, function () {
  const soapServer = http.createServer(app);
  soap.listen(soapServer, '/wsdl', service, wsdl);
  soapServer.listen(port);
  console.log(`SOAP service running on http://localhost:${port}/wsdl?wsdl`);
});
