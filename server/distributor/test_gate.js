class testServer extends require('../../project_module/server_client_framework/server') {
    constructor() {
        super(9002, "gate", []);
        this.connectToDistributor("192.168.0.11", 9000);
    }
}
new testServer();