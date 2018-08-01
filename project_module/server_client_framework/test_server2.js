class testServer extends require('./server') {
    constructor() {
        super(9001, "client", ["GET/client"]);
        this.connectToDistributor("192.168.0.11", 9000);
    }
}
new testServer();