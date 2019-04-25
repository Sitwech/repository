"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var MongoHelper = /** @class */ (function () {
    function MongoHelper() {
    }
    MongoHelper.connect = function (url) {
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(url, { useNewUrlParser: true })
                .then(function (client) {
                MongoHelper.client = client;
                resolve(client);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    MongoHelper.getDb = function () {
        return MongoHelper.client.db();
    };
    MongoHelper.prototype.disconnect = function () {
        MongoHelper.client.close();
    };
    return MongoHelper;
}());
exports.MongoHelper = MongoHelper;
//# sourceMappingURL=mongoHelper.js.map