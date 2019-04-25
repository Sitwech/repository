"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
require('reflect-metadata');
/**
 * Indicate the class represents a collection
 *
 * @export
 * @param {CollectionProps} props
 * @returns
 */
function Collection(props) {
    return function (target) {
        Reflect.defineMetadata(types_1.COLLECTION_KEY, props, target.prototype);
    };
}
exports.Collection = Collection;
/**
 * Run this function before an event occurs
 * - create
 * - delete
 * - deleteMany
 * - deleteOne
 * - find
 * - findMany
 * - findOne
 * - save
 * - update
 * - updateOne
 *
 * @export
 * @param {...string[]} events a list of events
 * @returns
 */
function Before() {
    var events = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        events[_i] = arguments[_i];
    }
    return function (target, name, descriptor) {
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_1 = events_1[_i];
            var fns = Reflect.getMetadata(types_1.PRE_KEY + "_" + event_1, target) || [];
            // you must create new array so you don't push fn into siblings
            // see https://github.com/rbuckton/reflect-metadata/issues/53#issuecomment-274906502
            var result = fns ? fns.concat([target[name]]) : [target[name]];
            Reflect.defineMetadata(types_1.PRE_KEY + "_" + event_1, result, target);
        }
    };
}
exports.Before = Before;
/**
 * Run this function after an event occurs
 * - create
 * - delete
 * - deleteMany
 * - deleteOne
 * - find
 * - findMany
 * - findOne
 * - save
 * - update
 * - updateOne
 *
 * @export
 * @param {...string[]} events a list of events
 * @returns
 */
function After() {
    var events = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        events[_i] = arguments[_i];
    }
    return function (target, name, descriptor) {
        for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
            var event_2 = events_2[_i];
            var fns = Reflect.getMetadata(types_1.POST_KEY + "_" + event_2, target) || [];
            // you must create new array so you don't push fn into siblings
            // see https://github.com/rbuckton/reflect-metadata/issues/53#issuecomment-274906502
            var result = fns ? fns.concat([target[name]]) : [target[name]];
            Reflect.defineMetadata(types_1.POST_KEY + "_" + event_2, result, target);
        }
    };
}
exports.After = After;
//# sourceMappingURL=Decorators.js.map