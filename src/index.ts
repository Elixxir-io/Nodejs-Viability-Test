import fs from 'fs';
import path from 'path';
import { fetch, Headers, Request, Response } from 'undici';

export const decoder = new TextDecoder();

// setup polyfills
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
globalThis.crypto = require('crypto').webcrypto;
const setGlobalVars = require('indexeddbshim');
require('localstorage-polyfill');
(globalThis as any).window = globalThis;
setGlobalVars();
globalThis.fetch = fetch as any;
globalThis.Headers = Headers as any;
globalThis.Request = Request as any;
globalThis.Response = Response as any;

require('../assets/wasm_exec');
const go = new (globalThis as any).Go();

import { ndf } from './ndf';
import { STATE_PATH, DUMMY_TRAFFIC_ARGS } from './constants';
import { onMessageDelete, onMessageReceived, onMutedUser } from './events';

const wasmBytes = fs.readFileSync(path.join(__dirname, '../assets/xxdk.wasm'));

// Instantiate the module using the WebAssembly API
WebAssembly.instantiate(wasmBytes, {
  ...go.importObject,
}).then(async (result) => {
  go?.run(result?.instance);
  const {
    Base64ToUint8Array,
    ConstructIdentity,
    DecodePrivateURL,
    DecodePublicURL,
    GenerateChannelIdentity,
    GetChannelInfo,
    GetChannelJSON,
    GetClientVersion,
    GetDefaultCMixParams,
    GetOrInitPassword,
    GetPublicChannelIdentityFromPrivate,
    GetShareUrlType,
    GetVersion,
    GetWasmSemanticVersion,
    ImportPrivateIdentity,
    IsNicknameValid,
    LoadChannelsManagerWithIndexedDb,
    LoadCmix,
    LogLevel,
    NewChannelsDatabaseCipher,
    NewChannelsManagerWithIndexedDb,
    NewCmix,
    NewDMClientWithIndexedDb,
    NewDMsDatabaseCipher,
    NewDummyTrafficManager,
    Purge,
    ValidForever,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = (globalThis.window as any) || {};

  const statePassEncoded = GetOrInitPassword('test');

  await NewCmix(ndf, STATE_PATH, statePassEncoded, '');
  const cmix = await LoadCmix(STATE_PATH, statePassEncoded, GetDefaultCMixParams());
  const cmixId = cmix.GetID();

  cmix.StartNetworkFollower(50000);


  const dummyTraffic = NewDummyTrafficManager(cmixId, ...DUMMY_TRAFFIC_ARGS);
  dummyTraffic.Start();

  console.log('DUMMY TRAFFIC STARTED');

  // wait for cmix to be ready for registration
  await new Promise<void>((resolve) => {
    const intervalId = setInterval(() => {
      const isReadyInfo = JSON.parse(decoder.decode(cmix?.IsReady(0.7)));
      console.log('IS_READY_INFO', JSON.stringify(isReadyInfo))
      if (isReadyInfo.IsReady) {
        clearInterval(intervalId);
        setTimeout(() => {
          resolve();
        }, 3000);
      }
    }, 1000);
  });

  const createdPrivateIdentity = GenerateChannelIdentity(cmix?.GetID());
  const channelManager = await NewChannelsManagerWithIndexedDb(
    cmixId,
    path.join(__dirname, '../assets/channelsIndexedDbWorker.js'),
    createdPrivateIdentity,
    onMessageReceived,
    onMessageDelete,
    onMutedUser,
  );

  console.log('Manager', channelManager);
  
  await new Promise<void>((resolve) => {
    cmix.AddHealthCallback({
      Callback: (isHealthy: boolean) => {
        console.log('ISHEALTHY', isHealthy);
        if (isHealthy) {
          resolve();
        }
      }
    });
  })

  console.log('MANAGER', channelManager);

}).catch((error) => {
  console.error(error);
});