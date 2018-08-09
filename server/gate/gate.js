const http = require('http');
const expressLoader = require('./expressLoader/expressLoader');

var gateInfo = {
    PORT: 8000,
    name: 'gate',
    uri: []
}

const client = require('../../project_module/server_client_framework/client');

var MicroserverApiClient = global.MicroserverApiClient;
var ApiRequestCount = global.ApiRequestCount;
var ConnectedNode = [];

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
        Node: for (var node in data) {
            var nodeInfo = data[node];
            if (nodeInfo.name === "gate") continue;

            for (var El in ConnectedNode) {
                if (ConnectedNode[El] === nodeInfo.IP + ":" + nodeInfo.port) {
                    continue Node;
                }
            }
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
                ConnectedNode.splice(ConnectedNode.indexOf(IP + ":" + port), 1)
            }, (data) => {
                var resQueue = global.resQueue;
                var resNum = data.identifyNum;
                if (resQueue[resNum].template === "login") {
                    if (data.responseData === "fail") {
                        resQueue[resNum].redirect("loginfail");
                    } else {
                        resQueue[resNum].req.session.userInfo = data.responseData;
                        resQueue[resNum].redirect("/");
                    }
                } else {
                    resQueue[resNum].context.serverData = data.responseData;
                    resQueue[resNum].render(resQueue[resNum].template, resQueue[resNum].context, function(err, html) {
                        resQueue[resNum].writeHead(200, { 'Content-type': 'text/html; utf8' });
                        resQueue[resNum].end(html);
                    });
                }
                delete resQueue[resNum];
            })
            clientForMicroserver.connect();
            ConnectedNode.push(nodeInfo.IP + ":" + nodeInfo.port)
            for (var El in nodeInfo.uri) {
                if (MicroserverApiClient[nodeInfo.uri[El]] === undefined) {
                    MicroserverApiClient[nodeInfo.uri[El]] = [];
                    MicroserverApiClient[nodeInfo.uri[El]].push({ client: clientForMicroserver, nodeInfo: nodeInfo.IP + ":" + nodeInfo.port });
                    ApiRequestCount[nodeInfo.uri[El]] = 0;
                }
                if (MicroserverApiClient[nodeInfo.uri[El]].length === 0) {
                    MicroserverApiClient[nodeInfo.uri[El]].push({ client: clientForMicroserver, nodeInfo: nodeInfo.IP + ":" + nodeInfo.port });
                }

                MicroserverApiClient[nodeInfo.uri[El]].forEach(function(clientInfo) {
                    currentNodeInfo = nodeInfo.IP + ":" + nodeInfo.port;
                    if (clientInfo.nodeInfo === currentNodeInfo) {

                    } else {
                        MicroserverApiClient[nodeInfo.uri[El]].push({ client: clientForMicroserver, nodeInfo: nodeInfo.IP + ":" + nodeInfo.port });
                    }
                })
            }
            console.log(MicroserverApiClient);
        }
    })

    setInterval(() => {
        if (isConnectedToDistributor === false) {
            console.log("try connecting Distributor Server");
            clientForDistributor.connect();
        }
    }, 3000)
})