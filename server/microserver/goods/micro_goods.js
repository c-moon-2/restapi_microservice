const goodsBusiness = require('./goods_business');

class goods extends require('../../../project_module/server_client_framework/server') {
    constructor(name, uri) {
        super(process.argv[2] ? Number(process.argv[2]) : 9020, "goods" + (process.argv[2] ? process.argv[2] : 9020), ["GET/goods", "POST/goods", "PUT/goods", "DELETE/goods"]);
        this.connectToDistributor("192.168.0.11", 9000);
    }
    onRead(socket, data) {
        var packet = { identifyNum: data.identifyNum }
        goodsBusiness(data.method, data.uri, data.params, (responseData) => {
            packet.responseData = responseData;
            socket.write(JSON.stringify(packet) + "¶");
        })
    }
}
new goods();