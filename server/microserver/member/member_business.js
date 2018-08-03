const DAOmember = require('./dao_member');

module.exports = (method, uri, params, callback) => {
    switch (method) {
        case "POST":
            if (uri === "/login") {
                findMember(params, (response) => {
                    process.nextTick(callback, response);
                });
            } else if (uri === "/member") {
                registMember(params, (response) => {
                    process.nextTick(callback, response);
                })
            }
        case "PUT":
            updateMember(params, (response) => {
                process.nextTick(callback, response);
            })
        case "DELETE":
            deleteMember(params, (response) => {
                process.nextTick(callback, response);
            })
    }
}

function findMember(params, callback) {
    DAOmember.findMember(params.id, params.member, callback)
}

function registMember(params, callback) {
    DAOmember.registMember(params.id, params.pw, params.name, callback);
}

function updateMember(params, callback) {
    DAOmember.updateMember(params.id, params.pw, callback);
}

function deleteMember(params, callback) {
    DAOmember.deleteMember(params.id, callback);
}