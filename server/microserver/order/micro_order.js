const orderBusiness = require('./order_business');

class order extends require('../../../project_module/server_client_framework/server') {
    constructor(name, uri) {
        super(process.argv[2] ? Number(process.argv[2]) : 9030, "order" + (process.argv[2] ? process.argv[2] : 9030), ["GET/order", "POST/order", "DELETE/order"]);
        this.connectToDistributor("192.168.0.11", 9000);
    }
    onRead(socket, data) {
        var packet = { identifyNum: data.identifyNum }
        orderBusiness(data.method, data.uri, data.params, (responseData) => {
            packet.responseData = responseData;
            socket.write(JSON.stringify(packet) + "¶");
        })
    }
}
new order();