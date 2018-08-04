const http = require('http');
const expressLoader = require('./expressLoader/expressLoader');

var gateInfo = {
    PORT: 8000,
    name: 'gate',
    uri: []
}

const client = require('../../project_module/server_client_framework/client');

var MicroserverApiClient = global.MicroserverApiClient;

var server = http.createServer(expressLoader).listen(8000, () => {
    console.log("express server is working!! on PORT:8000")

    var isConnectedToDistributor = false;
    var clientForDistributor = new client("192.168.0.11", 9000, () => {
        isConnectedToDistributor = true;
        clientForDistributor.write(gateInfo);
    }, () => {
        isConnectedToDistributor = false;
    }, () => {
        isConnectedToDistributor = false;
    }, (data) => {
        for (var node in data) {
            var nodeInfo = data[node];
            if (nodeInfo.name === "gate") continue;

            var clientForMicroserver = new client(nodeInfo.IP, nodeInfo.port, () => {

            }, () => {

            }, (IP, port) => {
                for (var ApiEl in MicroserverApiClient) {
                    ApiInfo = MicroserverApiClient[ApiEl];
                    for (var clientEl in ApiInfo) {
                        if (ApiInfo[clientEl].nodeInfo === IP + ":" + port) {
                            ApiInfo.splice(clientEl, 1);
                        }
                    }
                }
            }, (data) => {
                var resQueue = global.resQueue;
                var resNum = data.identifyNum;
                resQueue[resNum].writeHead(200, { 'Content-type': 'text/html; utf8' });
                resQueue[resNum].write(JSON.stringify(data.responseData));
                resQueue[resNum].end();
                delete resQueue[resNum];
                /*resNum = data.identifyNum;
                console.log(JSON.stringify(data.responseData));
                global.resQueue[resNum].writeHead(200, { 'Content-type': 'text/html; utf8' });
                global.resQueue[resNum].write(JSON.stringify(data.responseData));
                global.resQueue[resNum].end();
                delete global.resQueue[resNum];*/
            })
            clientForMicroserver.connect();
            for (var El in nodeInfo.uri) {
                if (MicroserverApiClient[nodeInfo.uri[El]] === undefined) {
                    MicroserverApiClient[nodeInfo.uri[El]] = [];
                }
                MicroserverApiClient[nodeInfo.uri[El]].push({ client: clientForMicroserver, nodeInfo: nodeInfo.IP + ":" + nodeInfo.port });
            }
            //console.log("gate", global.MicroserverApiClient);
        }
    })

    setInterval(() => {
        if (isConnectedToDistributor === false) {
            console.log("try connecting Distributor Server");
            clientForDistributor.connect();
        }
    }, 3000)
})