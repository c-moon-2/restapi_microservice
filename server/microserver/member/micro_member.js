const memberBusiness = require('./member_business');
const distributorInfo = require('../distributorinfo');

class member extends require('../../../project_module/server_client_framework/server') {
    constructor(name, uri) {
        super(process.argv[2] ? Number(process.argv[2]) : 9010, "member" + (process.argv[2] ? process.argv[2] : 9010), ["GET/authid", "POST/login", "POST/member", "PUT/member", "DELETE/member"]);
        this.connectToDistributor(distributorInfo.IP, distributorInfo.PORT);
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