class distributor extends require('../../project_module/server_client_framework/server') {

    constructor() {
        super(process.argv[2] ? Number(process.argv[2]) : 9000, "distributor");
        this.microInfo = {};
        this.gateSocket = null;
    }
    onRead(socket, data) {
        //gate 따로 다시 다루어야 겠다.(gate가 여러대일 경우)
        data.IP = socket.remoteAddress;
        this.microInfo[socket.remoteAddress + ":" + socket.remotePort] = data;
        if (data.name === "gate") {
            this.gateSocket = socket;
        }
        if (this.gateSocket !== null) {
            this.gateSocket.write(JSON.stringify(this.microInfo) + "¶");
        }
    }
    onClose(socket) {
        var key = socket.remoteAddress + ":" + socket.remotePort;
        if (this.microInfo[key].name === "gate") {
            this.gateSocket = null;
        }
        console.log(this.microInfo[key].name, "server down!!");
        //로그에 남긴다.
        delete this.microInfo[key];
    }
}
new distributor();