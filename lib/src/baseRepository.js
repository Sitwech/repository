"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var mongoHelper_1 = require("./mongoHelper");
var types_1 = require("./types");
var MongoRepository = /** @class */ (function () {
    /**
     * Creates an instance of MongoRepository.
     * @memberof MongoRepository
     */
    function MongoRepository() {
        this.collection = this.getCollection();
    }
    Object.defineProperty(MongoRepository.prototype, "options", {
        get: function () {
            return Reflect.getMetadata(types_1.COLLECTION_KEY, this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Finds a record by id
     *
     * @param {string} id
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.findById = function (id) {
        return this.findOne({ _id: new mongodb_1.ObjectID(id) });
    };
    /**
     * Find multiple documents by a list of ids
     *
     * @param {string[]} ids
     * @returns {Promise<T[]>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.findManyById = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, found, results, _i, found_1, result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _c.sent();
                        return [4 /*yield*/, collection.find({ _id: { $in: ids.map(function (id) { return new mongodb_1.ObjectID(id); }) } }).toArray()];
                    case 2:
                        found = _c.sent();
                        results = [];
                        _i = 0, found_1 = found;
                        _c.label = 3;
                    case 3:
                        if (!(_i < found_1.length)) return [3 /*break*/, 6];
                        result = found_1[_i];
                        _b = (_a = results).push;
                        return [4 /*yield*/, this.invokeEvents(types_1.POST_KEY, ['find', 'findMany'], this.toggleId(result, false))];
                    case 4:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * Finds a record by a list of conditions
     *
     * @param {object} conditions
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.findOne = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, cursor, document, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        cursor = collection.find(conditions).limit(1);
                        return [4 /*yield*/, cursor.toArray()];
                    case 2:
                        res = _a.sent();
                        if (!(res && res.length)) return [3 /*break*/, 4];
                        document = res[0];
                        document = this.toggleId(document, false);
                        return [4 /*yield*/, this.invokeEvents(types_1.POST_KEY, ['find', 'findOne'], document)];
                    case 3:
                        document = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, document];
                }
            });
        });
    };
    /**
     * Find records by a list of conditions
     *
     * @param {FindRequest} [req={ conditions: {} }]
     * @returns {Promise<T[]>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.find = function (req) {
        if (req === void 0) { req = { conditions: {} }; }
        return __awaiter(this, void 0, void 0, function () {
            var collection, conditions, cursor, newDocuments, results, _i, newDocuments_1, document_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        conditions = this.toggleId(req.conditions, true);
                        cursor = collection.find(conditions);
                        if (req.projection) {
                            cursor = cursor.project(req.projection);
                        }
                        if (req.sort) {
                            cursor = cursor.sort(req.sort);
                        }
                        if (req.skip) {
                            cursor = cursor.skip(req.skip);
                        }
                        if (req.limit) {
                            cursor = cursor.limit(req.limit);
                        }
                        return [4 /*yield*/, cursor.toArray()];
                    case 2:
                        newDocuments = _a.sent();
                        results = [];
                        _i = 0, newDocuments_1 = newDocuments;
                        _a.label = 3;
                    case 3:
                        if (!(_i < newDocuments_1.length)) return [3 /*break*/, 6];
                        document_1 = newDocuments_1[_i];
                        document_1 = this.toggleId(document_1, false);
                        return [4 /*yield*/, this.invokeEvents(types_1.POST_KEY, ['find', 'findMany'], document_1)];
                    case 4:
                        document_1 = _a.sent();
                        results.push(document_1);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * Create a document of type T
     *
     * @param {DTO} document
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.create = function (document) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, eventResult, res, newDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, this.invokeEvents(types_1.PRE_KEY, ['save', 'create'], document)];
                    case 2:
                        eventResult = _a.sent();
                        delete eventResult['id'];
                        delete eventResult['_id'];
                        return [4 /*yield*/, collection.insertOne(eventResult)];
                    case 3:
                        res = _a.sent();
                        newDocument = res.ops[0];
                        newDocument = this.toggleId(newDocument, false);
                        return [4 /*yield*/, this.invokeEvents(types_1.POST_KEY, ['save', 'create'], newDocument)];
                    case 4:
                        newDocument = _a.sent();
                        return [2 /*return*/, newDocument];
                }
            });
        });
    };
    /**
     * Save any changes to your document
     *
     * @param {Document} document
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.save = function (document) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, id, updates, res, newDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        id = new mongodb_1.ObjectID(document.id);
                        return [4 /*yield*/, this.invokeEvents(types_1.PRE_KEY, ['save'], document)];
                    case 2:
                        updates = _a.sent();
                        delete updates['id'];
                        delete updates['_id'];
                        return [4 /*yield*/, collection.updateOne({ _id: id }, { $set: updates }, { upsert: true })];
                    case 3:
                        res = _a.sent();
                        return [4 /*yield*/, collection.findOne({ _id: id })];
                    case 4:
                        newDocument = _a.sent();
                        if (newDocument) {
                            // project new items
                            Object.assign(document, newDocument);
                            newDocument['id'] = id.toString();
                            delete newDocument['_id'];
                        }
                        return [4 /*yield*/, this.invokeEvents(types_1.POST_KEY, ['save'], newDocument)];
                    case 5:
                        newDocument = _a.sent();
                        return [2 /*return*/, newDocument];
                }
            });
        });
    };
    /**
     * Find a record by ID and update with new values
     *
     * @param {string} id
     * @param {UpdateByIdRequest} req
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.findOneByIdAndUpdate = function (id, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.findOneAndUpdate({
                        conditions: { _id: new mongodb_1.ObjectID(id) },
                        updates: req.updates,
                        upsert: req.upsert
                    })];
            });
        });
    };
    /**
     * Find a record and update with new values
     *
     * @param {UpdateRequest} req
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.findOneAndUpdate = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, updates, res, document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, this.invokeEvents(types_1.PRE_KEY, ['update', 'updateOne'], req.updates)];
                    case 2:
                        updates = _a.sent();
                        return [4 /*yield*/, collection.findOneAndUpdate(req.conditions, updates, {
                                upsert: req.upsert,
                                returnOriginal: false
                            })];
                    case 3:
                        res = _a.sent();
                        document = res.value;
                        document = this.toggleId(document, false);
                        return [4 /*yield*/, this.invokeEvents(types_1.POST_KEY, ['update', 'updateOne'], document)];
                    case 4:
                        document = _a.sent();
                        return [2 /*return*/, document];
                }
            });
        });
    };
    /**
     * Delete a record by ID
     *
     * @param {string} id
     * @returns {Promise<DeleteWriteOpResultObject>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.deleteOneById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.deleteOne({ _id: new mongodb_1.ObjectID(id) })];
            });
        });
    };
    /**
     * Delete a record
     *
     * @param {*} conditions
     * @returns {Promise<DeleteWriteOpResultObject>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.deleteOne = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, this.invokeEvents(types_1.PRE_KEY, ['delete', 'deleteOne'], conditions)];
                    case 2:
                        _a.sent();
                        deleteResult = collection.deleteOne(conditions);
                        return [4 /*yield*/, this.invokeEvents(types_1.POST_KEY, ['delete', 'deleteOne'], deleteResult)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, deleteResult];
                }
            });
        });
    };
    /**
     * Delete multiple records
     *
     * @param {*} conditions
     * @returns {Promise<any>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.deleteMany = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, this.invokeEvents(types_1.PRE_KEY, ['delete', 'deleteMany'], conditions)];
                    case 2:
                        _a.sent();
                        deleteResult = collection.deleteMany(conditions);
                        return [4 /*yield*/, this.invokeEvents(types_1.POST_KEY, ['delete', 'deleteMany'], deleteResult)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, deleteResult];
                }
            });
        });
    };
    /**
     * Strip off Mongo's ObjectID and replace with string representation or in reverese
     *
     * @private
     * @param {*} document
     * @param {boolean} replace
     * @returns {T}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.toggleId = function (document, replace) {
        if (document && (document.id || document._id)) {
            if (replace) {
                document._id = new mongodb_1.ObjectID(document.id);
                delete document.id;
            }
            else {
                document.id = document._id.toString();
                delete document._id;
            }
        }
        return document;
    };
    /**
     * Return a collection
     * If the collection doesn't exist, it will create it with the given options
     *
     * @private
     * @returns {Promise<Collection<DOC>>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.getCollection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var db;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoHelper_1.MongoHelper.getDb()];
                    case 1:
                        db = _a.sent();
                        db.collection(this.options.name, { strict: true }, function (err, collection) { return __awaiter(_this, void 0, void 0, function () {
                            var ourCollection, createErr_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ourCollection = collection;
                                        if (!err) return [3 /*break*/, 4];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, db.createCollection(this.options.name, {
                                                size: this.options.size,
                                                capped: this.options.capped,
                                                max: this.options.max
                                            })];
                                    case 2:
                                        ourCollection = _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        createErr_1 = _a.sent();
                                        reject(createErr_1);
                                        return [3 /*break*/, 4];
                                    case 4:
                                        // // assert indexes
                                        // if (this.options.indexes) {
                                        //   for (const indexDefinition of this.options.indexes) {
                                        //     try {
                                        //       await ourCollection.createIndex(indexDefinition.fields, indexDefinition.options);
                                        //     } catch (indexErr) {
                                        //       if (
                                        //         indexDefinition.overwrite &&
                                        //         indexDefinition.options.name &&
                                        //         indexErr.name === 'MongoError' &&
                                        //         (indexErr.codeName === 'IndexKeySpecsConflict' || indexErr.codeName === 'IndexOptionsConflict')
                                        //       ) {
                                        //         // drop index and recreate
                                        //         try {
                                        //           await ourCollection.dropIndex(indexDefinition.options.name);
                                        //           await ourCollection.createIndex(indexDefinition.fields, indexDefinition.options);
                                        //         } catch (recreateErr) {
                                        //           reject(recreateErr);
                                        //         }
                                        //       } else {
                                        //         reject(indexErr);
                                        //       }
                                        //     }
                                        //   }
                                        // }
                                        resolve(ourCollection);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Apply functions to a record based on the type of event
     *
     * @private
     * @param {string} type any of the valid types, PRE_KEY POST_KEY
     * @param {string[]} fns any of the valid functions: update, updateOne, save, create, find, findOne, findMany
     * @param {*} document The document to apply functions to
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    MongoRepository.prototype.invokeEvents = function (type, fns, document) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, fns_1, fn, events, _a, events_1, event_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, fns_1 = fns;
                        _b.label = 1;
                    case 1:
                        if (!(_i < fns_1.length)) return [3 /*break*/, 6];
                        fn = fns_1[_i];
                        events = Reflect.getMetadata(type + "_" + fn, this) || [];
                        _a = 0, events_1 = events;
                        _b.label = 2;
                    case 2:
                        if (!(_a < events_1.length)) return [3 /*break*/, 5];
                        event_1 = events_1[_a];
                        document = event_1.bind(this)(document);
                        if (!(typeof document.then === 'function')) return [3 /*break*/, 4];
                        return [4 /*yield*/, document];
                    case 3:
                        document = _b.sent();
                        _b.label = 4;
                    case 4:
                        _a++;
                        return [3 /*break*/, 2];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, document];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
//# sourceMappingURL=baseRepository.js.map