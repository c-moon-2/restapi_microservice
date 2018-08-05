const memberBusiness = require('./member_business');

class member extends require('../../../project_module/server_client_framework/server') {
    constructor(name, uri) {
        super(process.argv[2] ? Number(process.argv[2]) : 9010, "member" + (process.argv[2] ? process.argv[2] : 9010), ["POST/login", "POST/member", "PUT/member", "DELETE/member"]);
        this.connectToDistributor("192.168.0.11", 9000);
    }
    onRead(socket, data) {
        var packet = { identifyNum: data.identifyNum }
        memberBusiness(data.method, data.uri, data.params, (responseData) => {
            packet.responseData = responseData;
            socket.write(JSON.stringify(packet) + "¶");
        })
    }
}
new member();