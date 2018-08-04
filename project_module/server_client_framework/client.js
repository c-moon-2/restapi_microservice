var net = require('net');

class client {
    constructor(IP, PORT, onCreate, onError, onClose, onRead) {
        this.IP = IP;
        this.PORT = PORT;
        this.onCreate = onCreate;
        this.onError = onError;
        this.onClose = onClose;
        this.onRead = onRead;
    }
    connect() {
        this.client = net.connect(this.PORT, this.IP, () => {
            this.onCreate();
            console.log(this.IP, ":", this.PORT, " - connect success");
            //console.log(new Date(), IP, ":", PORT, " - connect success");
            //log에 남긴다.
        });
        this.client.on("data", (data) => {
            var tempData = this.requestingData ? this.requestingData + data.toString() : data.toString();
            var tempDataArray = tempData.split("¶");
            for (var ElNum in tempDataArray) {
                if (ElNum === tempDataArray.length - 1 && tempData.charAt(tempData.length - 1) !== "¶") {
                    this.requestingData = tempDataArray[n];
                    break;
                } else if (tempDataArray[ElNum] === "") {
                    break;
                } else {
                    this.onRead(JSON.parse(tempDataArray[ElNum]));
                }
            }
        });
        this.client.on("error", (err) => {
            this.onError();
            console.log(new Date(), err);
            //log에 남긴다.
        })
        this.client.on('close', () => {
            this.onClose(this.IP, this.PORT);
            console.log(new Date(), "server connect fail");
            //log에 남긴다.
        })
    }
    write(data) {
        this.client.write(JSON.stringify(data) + "¶");
    }
}

module.exports = client;