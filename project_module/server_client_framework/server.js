var net = require('net');
var tcpClient = require('./client');

class server {
    constructor(PORT, name, uri) {
        this.PORT = PORT;
        this.name = name;
        this.uri = uri;

        this.server = net.createServer((socket) => {
            console.log(socket.remoteAddress, socket.remotePort, "- Server Connect!!");
            //콘솔과 로그에 남긴다.
            socket.on('data', (data) => {
                var tempData = this.requestingData ? this.requestingData + data.toString() : data.toString();
                var tempDataArray = tempData.split("¶");
                for (var ElNum in tempDataArray) {
                    if (ElNum === tempDataArray.length - 1 && tempData.charAt(tempData.length - 1) !== "¶") {
                        this.requestingData = tempDataArray[n];
                        break;
                    } else if (tempDataArray[ElNum] === "") {
                        break;
                    } else {
                        this.onRead(socket, JSON.parse(tempDataArray[ElNum]));
                    }
                }
            })
            socket.on('close', () => {
                this.onClose(socket);
            });
        }).listen(PORT, () => {
            console.log(name, "server is working :", PORT)
        });
        this.server.on("error", () => {

        });
        this.server.on("close", () => {

        });
    }
    connectToDistributor(IP, PORT) {
        var microServerInfo = {
            port: this.PORT,
            name: this.name,
            uri: this.uri
        }
        var isConnectedToDistributor = false;

        var clientToDistributor = new tcpClient(IP, PORT, () => {
            isConnectedToDistributor = true;
            clientToDistributor.write(microServerInfo);
        }, () => {
            isConnectedToDistributor = false;
        }, () => {
            isConnectedToDistributor = false;
        });

        setInterval(() => {
            if (isConnectedToDistributor === false) {
                console.log("try connecting Distributor Server");
                //로그에 남긴다.
                clientToDistributor.connect();
            }
        }, 3000)
    }
    onClose(socket) {
        console.log("Detect to disconnect on", socket.remoteAddress, ":", socket.remotePort);
        //로그에 남긴다.
    }
}
module.exports = server;