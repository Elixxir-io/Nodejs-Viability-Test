"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatus = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Normal"] = 1] = "Normal";
    MessageType[MessageType["Reply"] = 2] = "Reply";
    MessageType[MessageType["Reaction"] = 3] = "Reaction";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus[MessageStatus["Unsent"] = 0] = "Unsent";
    MessageStatus[MessageStatus["Sent"] = 1] = "Sent";
    MessageStatus[MessageStatus["Delivered"] = 2] = "Delivered";
    MessageStatus[MessageStatus["Failed"] = 3] = "Failed";
})(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
