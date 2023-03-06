"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitEvent = exports.onDmReceived = exports.onMessageDelete = exports.onMutedUser = exports.onMessageReceived = exports.Event = exports.bus = void 0;
var events_1 = __importDefault(require("events"));
var delay_1 = __importDefault(require("delay"));
exports.bus = new events_1.default();
var Event;
(function (Event) {
    Event["DM_RECEIVED"] = "dm-message";
    Event["MESSAGE_RECEIVED"] = "message";
    Event["USER_MUTED"] = "muted";
    Event["MESSAGE_DELETED"] = "delete";
    Event["MESSAGE_PINNED"] = "pinned";
    Event["MESSAGE_UNPINNED"] = "unpinned";
})(Event = exports.Event || (exports.Event = {}));
var onMessageReceived = function (messageId, channelId, update) {
    var messageEvent = {
        messageId: messageId,
        channelId: channelId,
        update: update
    };
    exports.bus.emit(Event.MESSAGE_RECEIVED, messageEvent);
};
exports.onMessageReceived = onMessageReceived;
var onMutedUser = function (channelId, pubkey, unmute) {
    var event = { channelId: channelId, pubkey: pubkey, unmute: unmute };
    exports.bus.emit(Event.USER_MUTED, event);
};
exports.onMutedUser = onMutedUser;
var onMessageDelete = function (msgId) {
    var messageId = Buffer.from(msgId).toString('base64');
    var event = { messageId: messageId };
    exports.bus.emit(Event.MESSAGE_DELETED, event);
};
exports.onMessageDelete = onMessageDelete;
var onDmReceived = function (messageUuid, pubkey, update) {
    var messageEvent = {
        messageUuid: messageUuid,
        pubkey: pubkey,
        update: update
    };
    exports.bus.emit(Event.DM_RECEIVED, messageEvent);
};
exports.onDmReceived = onDmReceived;
var awaitEvent = function (evt) { return __awaiter(void 0, void 0, void 0, function () {
    var listener;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                listener = function () { };
                return [4 /*yield*/, Promise.race([
                        new Promise(function (resolve) {
                            listener = resolve;
                            exports.bus.addListener(evt, resolve);
                        }),
                        (0, delay_1.default)(10000) // 10 second timeout
                    ])];
            case 1:
                _a.sent();
                exports.bus.removeListener(evt, listener);
                return [2 /*return*/];
        }
    });
}); };
exports.awaitEvent = awaitEvent;
