"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoder = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var undici_1 = require("undici");
exports.decoder = new TextDecoder();
// setup polyfills
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
globalThis.crypto = require('crypto').webcrypto;
var setGlobalVars = require('indexeddbshim');
require('localstorage-polyfill');
globalThis.window = globalThis; // We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global
setGlobalVars();
globalThis.fetch = undici_1.fetch;
globalThis.Headers = undici_1.Headers;
globalThis.Request = undici_1.Request;
globalThis.Response = undici_1.Response;
require('../assets/wasm_exec');
var go = new globalThis.Go();
var ndf_1 = require("./ndf");
var constants_1 = require("./constants");
var events_1 = require("./events");
var wasmBytes = fs_1.default.readFileSync(path_1.default.join(__dirname, '../assets/xxdk.wasm'));
// Instantiate the module using the WebAssembly API
WebAssembly.instantiate(wasmBytes, __assign({}, go.importObject)).then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Base64ToUint8Array, ConstructIdentity, DecodePrivateURL, DecodePublicURL, GenerateChannelIdentity, GetChannelInfo, GetChannelJSON, GetClientVersion, GetDefaultCMixParams, GetOrInitPassword, GetPublicChannelIdentityFromPrivate, GetShareUrlType, GetVersion, GetWasmSemanticVersion, ImportPrivateIdentity, IsNicknameValid, LoadChannelsManagerWithIndexedDb, LoadCmix, LogLevel, NewChannelsDatabaseCipher, NewChannelsManagerWithIndexedDb, NewCmix, NewDMClientWithIndexedDb, NewDMsDatabaseCipher, NewDummyTrafficManager, Purge, ValidForever, statePassEncoded, cmix, cmixId, dummyTraffic, createdPrivateIdentity, channelManager;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                go === null || go === void 0 ? void 0 : go.run(result === null || result === void 0 ? void 0 : result.instance);
                _a = globalThis.window || {}, Base64ToUint8Array = _a.Base64ToUint8Array, ConstructIdentity = _a.ConstructIdentity, DecodePrivateURL = _a.DecodePrivateURL, DecodePublicURL = _a.DecodePublicURL, GenerateChannelIdentity = _a.GenerateChannelIdentity, GetChannelInfo = _a.GetChannelInfo, GetChannelJSON = _a.GetChannelJSON, GetClientVersion = _a.GetClientVersion, GetDefaultCMixParams = _a.GetDefaultCMixParams, GetOrInitPassword = _a.GetOrInitPassword, GetPublicChannelIdentityFromPrivate = _a.GetPublicChannelIdentityFromPrivate, GetShareUrlType = _a.GetShareUrlType, GetVersion = _a.GetVersion, GetWasmSemanticVersion = _a.GetWasmSemanticVersion, ImportPrivateIdentity = _a.ImportPrivateIdentity, IsNicknameValid = _a.IsNicknameValid, LoadChannelsManagerWithIndexedDb = _a.LoadChannelsManagerWithIndexedDb, LoadCmix = _a.LoadCmix, LogLevel = _a.LogLevel, NewChannelsDatabaseCipher = _a.NewChannelsDatabaseCipher, NewChannelsManagerWithIndexedDb = _a.NewChannelsManagerWithIndexedDb, NewCmix = _a.NewCmix, NewDMClientWithIndexedDb = _a.NewDMClientWithIndexedDb, NewDMsDatabaseCipher = _a.NewDMsDatabaseCipher, NewDummyTrafficManager = _a.NewDummyTrafficManager, Purge = _a.Purge, ValidForever = _a.ValidForever;
                statePassEncoded = GetOrInitPassword('test');
                return [4 /*yield*/, NewCmix(ndf_1.ndf, constants_1.STATE_PATH, statePassEncoded, '')];
            case 1:
                _b.sent();
                return [4 /*yield*/, LoadCmix(constants_1.STATE_PATH, statePassEncoded, GetDefaultCMixParams())];
            case 2:
                cmix = _b.sent();
                cmixId = cmix.GetID();
                cmix.StartNetworkFollower(50000);
                dummyTraffic = NewDummyTrafficManager.apply(void 0, __spreadArray([cmixId], constants_1.DUMMY_TRAFFIC_ARGS, false));
                dummyTraffic.Start();
                console.log('DUMMY TRAFFIC STARTED');
                // wait for cmix to be ready for registration
                return [4 /*yield*/, new Promise(function (resolve) {
                        var intervalId = setInterval(function () {
                            var isReadyInfo = JSON.parse(exports.decoder.decode(cmix === null || cmix === void 0 ? void 0 : cmix.IsReady(0.7)));
                            console.log('IS_READY_INFO', JSON.stringify(isReadyInfo));
                            if (isReadyInfo.IsReady) {
                                clearInterval(intervalId);
                                setTimeout(function () {
                                    resolve();
                                }, 3000);
                            }
                        }, 1000);
                    })];
            case 3:
                // wait for cmix to be ready for registration
                _b.sent();
                createdPrivateIdentity = GenerateChannelIdentity(cmix === null || cmix === void 0 ? void 0 : cmix.GetID());
                return [4 /*yield*/, NewChannelsManagerWithIndexedDb(cmixId, path_1.default.join(__dirname, '../assets/channelsIndexedDbWorker.js'), createdPrivateIdentity, events_1.onMessageReceived, events_1.onMessageDelete, events_1.onMutedUser)];
            case 4:
                channelManager = _b.sent();
                return [4 /*yield*/, new Promise(function (resolve) {
                        cmix.AddHealthCallback({
                            Callback: function (isHealthy) {
                                console.log('ISHEALTHY', isHealthy);
                                if (isHealthy) {
                                    resolve();
                                }
                            }
                        });
                    })];
            case 5:
                _b.sent();
                console.log('MANAGER', channelManager);
                return [2 /*return*/];
        }
    });
}); }).catch(function (error) {
    console.error(error);
});
