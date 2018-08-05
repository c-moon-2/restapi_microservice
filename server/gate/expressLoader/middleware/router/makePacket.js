module.exports = function(identifyNum, method, uri, params) {
    var packet = {
        identifyNum: identifyNum,
        method: method,
        uri: uri,
        params: params
    }
    return packet;
}