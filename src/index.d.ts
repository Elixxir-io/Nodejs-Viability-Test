declare module global {
  interface Window {
    NewCmix: (ndf: string, storageDir: string, password: Uint8Array, registrationCode: string) => Promise<void>;
    LoadCmix: (storageDirectory: string, password: Uint8Array, cmixParams: Uint8Array) => Promise<CMix>;
    GetDefaultCMixParams: () => Uint8Array;GetChannelInfo: (prettyPrint: string) => Uint8Array;
    Base64ToUint8Array: (base64: string) => Uint8Array;
    GenerateChannelIdentity: (cmixId: number) => Uint8Array;
    NewChannelsManagerWithIndexedDb: (
      cmixId: number,
      wasmJsPath: string,
      privateIdentity: Uint8Array,
      onMessage: MessageReceivedCallback,
      onDelete: MessageDeletedCallback,
      onMuted: UserMutedCallback,
      channelDbCipher: number
    ) => Promise<ChannelManager>;
    NewDMClientWithIndexedDb: (
      cmixId: number,
      wasmJsPath: string,
      privateIdentity: Uint8Array,
      messageCallback: DMReceivedCallback,
      cipherId: number
    ) => Promise<DMClient>;
    NewDMsDatabaseCipher: (cmixId: number, storagePassword: Uint8Array, payloadMaximumSize: number) => Cipher
    LoadChannelsManagerWithIndexedDb: (
      cmixId: number,
      wasmJsPath: string,
      storageTag: string,
      onMessage: MessageReceivedCallback,
      onDelete: MessageDeletedCallback,
      onMuted: UserMutedCallback,
      channelDbCipher: number
    ) => Promise<ChannelManager>;
    GetPublicChannelIdentityFromPrivate: (privateKey: Uint8Array) => Uint8Array;
    IsNicknameValid: (nickname: string) => null;
    GetShareUrlType: (url: string) => PrivacyLevel;
    GetVersion: () => string;
    GetClientVersion: () => string;
    GetOrInitPassword: (password: string) => Uint8Array;
    ImportPrivateIdentity: (password: string, privateIdentity: Uint8Array) => Uint8Array;
    ConstructIdentity: (publicKey: Uint8Array, codesetVersion: number) => Uint8Array;
    DecodePrivateURL: (url: string, password: string) => string;
    DecodePublicURL: (url: string) => string;
    GetChannelJSON: (prettyPrint: string) => Uint8Array;
    NewDummyTrafficManager: (
      cmixId: number,
      maximumOfMessagesPerCycle: number,
      durationToWaitBetweenSendsMilliseconds: number,
      upperBoundIntervalBetweenCyclesMilliseconds: number
    ) => DummyTraffic;
    GetWasmSemanticVersion: () => Uint8Array;
    NewChannelsDatabaseCipher: (cmixId: number, storagePassword: Uint8Array, payloadMaximumSize: number) => Cipher;
    Purge: (storageDirectory: string, userPassword: string) => void;
    ValidForever: () => number;
  }
}