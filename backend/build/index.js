// @bun
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/adb-ts/lib/util/errors.js
var require_errors = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AdbExecError = exports.AdbError = exports.NotConnectedError = exports.PrematureEOFError = exports.UnexpectedDataError = undefined;

  class UnexpectedDataError extends Error {
    constructor(unexpected, expected) {
      super();
      this.name = "UnexpectedDataError";
      this.message = `Unexpected '${unexpected}', was expecting ${expected}`;
      this.unexpected = unexpected;
      this.expected = expected;
    }
  }
  exports.UnexpectedDataError = UnexpectedDataError;

  class PrematureEOFError extends Error {
    constructor(howManyMissing) {
      super();
      this.name = "PrematureEOFError";
      this.message = "Premature end of stream, needed " + howManyMissing + " more bytes";
      this.missingBytes = howManyMissing;
    }
  }
  exports.PrematureEOFError = PrematureEOFError;

  class NotConnectedError extends Error {
    constructor() {
      super(...arguments);
      this.name = "NotConnectedError";
      this.message = "Client not connected. `connect` function must be called before use.";
    }
  }
  exports.NotConnectedError = NotConnectedError;

  class AdbError extends Error {
    constructor(message, errno, code, path) {
      super();
      this.name = "AdbError";
      this.message = message;
      this.errno = errno;
      this.code = code;
      this.path = path;
    }
  }
  exports.AdbError = AdbError;

  class AdbExecError extends Error {
    constructor(message, cmd) {
      super();
      this.name = "AdbExecError";
      this.message = message;
      this.command = cmd;
    }
  }
  exports.AdbExecError = AdbExecError;
});

// node_modules/adb-ts/lib/util/functions.js
var require_functions = __commonJS((exports) => {
  var findMatches = function(value, regExp, parseTo) {
    const exec = (mapper) => {
      const execInternal = (acc) => {
        const match = regExp.exec(value);
        return match ? execInternal(mapper(match.slice(1), acc)) : acc;
      };
      return execInternal;
    };
    switch (parseTo) {
      case "list":
        return exec(([match], acc) => acc.concat(match))([]);
      case "map":
        return exec(([k, v], acc) => acc.set(k, (0, exports.stringToType)(v)))(new Map);
      default:
        return exec((match, acc) => [...acc, match])([]);
    }
  };
  var escape = function(arg) {
    switch (typeof arg) {
      case "undefined":
        return "''";
      case "string":
        return "'" + arg.replace(/'/g, "'\"'\"'") + "'";
      default:
        return `${arg}`;
    }
  };
  var escapeCompat = function(arg) {
    switch (typeof arg) {
      case "string":
        return '"' + arg.replace(/([$`\\!"])/g, "\\$1") + '"';
      default:
        return escape(arg);
    }
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.escapeCompat = exports.escape = exports.findMatches = exports.parsePrimitiveParam = exports.stringToType = exports.encodeData = exports.encodeLength = exports.decodeLength = undefined;
  var decodeLength = (length) => {
    return parseInt(length, 16);
  };
  exports.decodeLength = decodeLength;
  var encodeLength = (length) => {
    return ("0000" + length.toString(16)).slice(-4).toUpperCase();
  };
  exports.encodeLength = encodeLength;
  var encodeData = (data) => {
    return Buffer.concat([
      Buffer.from((0, exports.encodeLength)(data.length)),
      Buffer.from(data)
    ]);
  };
  exports.encodeData = encodeData;
  var stringToType = (value) => {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === "string" || typeof parsed === "object" && parsed !== null) {
        return value;
      }
      return parsed;
    } catch {
      const date = new Date(value);
      if (!isNaN(date.getMilliseconds())) {
        return date;
      }
      return value || undefined;
    }
  };
  exports.stringToType = stringToType;
  var parsePrimitiveParam = (def, param) => {
    if (typeof param === "undefined") {
      return def;
    }
    return param;
  };
  exports.parsePrimitiveParam = parsePrimitiveParam;
  exports.findMatches = findMatches;
  exports.escape = escape;
  exports.escapeCompat = escapeCompat;
});

// node_modules/adb-ts/lib/util/types.js
var require_types = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Reply = undefined;
  var Reply;
  (function(Reply2) {
    Reply2["OKAY"] = "OKAY";
    Reply2["FAIL"] = "FAIL";
    Reply2["STAT"] = "STAT";
    Reply2["LIST"] = "LIST";
    Reply2["DENT"] = "DENT";
    Reply2["RECV"] = "RECV";
    Reply2["DATA"] = "DATA";
    Reply2["DONE"] = "DONE";
    Reply2["SEND"] = "SEND";
    Reply2["QUIT"] = "QUIT";
  })(Reply || (exports.Reply = Reply = {}));
});

// node_modules/adb-ts/lib/util/keycode.js
var require_keycode = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.KeyCode = undefined;
  var KeyCode;
  (function(KeyCode2) {
    KeyCode2[KeyCode2["KEYCODE_UNKNOWN"] = 0] = "KEYCODE_UNKNOWN";
    KeyCode2[KeyCode2["KEYCODE_SOFT_LEFT"] = 1] = "KEYCODE_SOFT_LEFT";
    KeyCode2[KeyCode2["KEYCODE_SOFT_RIGHT"] = 2] = "KEYCODE_SOFT_RIGHT";
    KeyCode2[KeyCode2["KEYCODE_HOME"] = 3] = "KEYCODE_HOME";
    KeyCode2[KeyCode2["KEYCODE_BACK"] = 4] = "KEYCODE_BACK";
    KeyCode2[KeyCode2["KEYCODE_CALL"] = 5] = "KEYCODE_CALL";
    KeyCode2[KeyCode2["KEYCODE_ENDCALL"] = 6] = "KEYCODE_ENDCALL";
    KeyCode2[KeyCode2["KEYCODE_0"] = 7] = "KEYCODE_0";
    KeyCode2[KeyCode2["KEYCODE_1"] = 8] = "KEYCODE_1";
    KeyCode2[KeyCode2["KEYCODE_2"] = 9] = "KEYCODE_2";
    KeyCode2[KeyCode2["KEYCODE_3"] = 10] = "KEYCODE_3";
    KeyCode2[KeyCode2["KEYCODE_4"] = 11] = "KEYCODE_4";
    KeyCode2[KeyCode2["KEYCODE_5"] = 12] = "KEYCODE_5";
    KeyCode2[KeyCode2["KEYCODE_6"] = 13] = "KEYCODE_6";
    KeyCode2[KeyCode2["KEYCODE_7"] = 14] = "KEYCODE_7";
    KeyCode2[KeyCode2["KEYCODE_8"] = 15] = "KEYCODE_8";
    KeyCode2[KeyCode2["KEYCODE_9"] = 16] = "KEYCODE_9";
    KeyCode2[KeyCode2["KEYCODE_STAR"] = 17] = "KEYCODE_STAR";
    KeyCode2[KeyCode2["KEYCODE_POUND"] = 18] = "KEYCODE_POUND";
    KeyCode2[KeyCode2["KEYCODE_DPAD_UP"] = 19] = "KEYCODE_DPAD_UP";
    KeyCode2[KeyCode2["KEYCODE_DPAD_DOWN"] = 20] = "KEYCODE_DPAD_DOWN";
    KeyCode2[KeyCode2["KEYCODE_DPAD_LEFT"] = 21] = "KEYCODE_DPAD_LEFT";
    KeyCode2[KeyCode2["KEYCODE_DPAD_RIGHT"] = 22] = "KEYCODE_DPAD_RIGHT";
    KeyCode2[KeyCode2["KEYCODE_DPAD_CENTER"] = 23] = "KEYCODE_DPAD_CENTER";
    KeyCode2[KeyCode2["KEYCODE_VOLUME_UP"] = 24] = "KEYCODE_VOLUME_UP";
    KeyCode2[KeyCode2["KEYCODE_VOLUME_DOWN"] = 25] = "KEYCODE_VOLUME_DOWN";
    KeyCode2[KeyCode2["KEYCODE_POWER"] = 26] = "KEYCODE_POWER";
    KeyCode2[KeyCode2["KEYCODE_CAMERA"] = 27] = "KEYCODE_CAMERA";
    KeyCode2[KeyCode2["KEYCODE_CLEAR"] = 28] = "KEYCODE_CLEAR";
    KeyCode2[KeyCode2["KEYCODE_A"] = 29] = "KEYCODE_A";
    KeyCode2[KeyCode2["KEYCODE_B"] = 30] = "KEYCODE_B";
    KeyCode2[KeyCode2["KEYCODE_C"] = 31] = "KEYCODE_C";
    KeyCode2[KeyCode2["KEYCODE_D"] = 32] = "KEYCODE_D";
    KeyCode2[KeyCode2["KEYCODE_E"] = 33] = "KEYCODE_E";
    KeyCode2[KeyCode2["KEYCODE_F"] = 34] = "KEYCODE_F";
    KeyCode2[KeyCode2["KEYCODE_G"] = 35] = "KEYCODE_G";
    KeyCode2[KeyCode2["KEYCODE_H"] = 36] = "KEYCODE_H";
    KeyCode2[KeyCode2["KEYCODE_I"] = 37] = "KEYCODE_I";
    KeyCode2[KeyCode2["KEYCODE_J"] = 38] = "KEYCODE_J";
    KeyCode2[KeyCode2["KEYCODE_K"] = 39] = "KEYCODE_K";
    KeyCode2[KeyCode2["KEYCODE_L"] = 40] = "KEYCODE_L";
    KeyCode2[KeyCode2["KEYCODE_M"] = 41] = "KEYCODE_M";
    KeyCode2[KeyCode2["KEYCODE_N"] = 42] = "KEYCODE_N";
    KeyCode2[KeyCode2["KEYCODE_O"] = 43] = "KEYCODE_O";
    KeyCode2[KeyCode2["KEYCODE_P"] = 44] = "KEYCODE_P";
    KeyCode2[KeyCode2["KEYCODE_Q"] = 45] = "KEYCODE_Q";
    KeyCode2[KeyCode2["KEYCODE_R"] = 46] = "KEYCODE_R";
    KeyCode2[KeyCode2["KEYCODE_S"] = 47] = "KEYCODE_S";
    KeyCode2[KeyCode2["KEYCODE_T"] = 48] = "KEYCODE_T";
    KeyCode2[KeyCode2["KEYCODE_U"] = 49] = "KEYCODE_U";
    KeyCode2[KeyCode2["KEYCODE_V"] = 50] = "KEYCODE_V";
    KeyCode2[KeyCode2["KEYCODE_W"] = 51] = "KEYCODE_W";
    KeyCode2[KeyCode2["KEYCODE_X"] = 52] = "KEYCODE_X";
    KeyCode2[KeyCode2["KEYCODE_Y"] = 53] = "KEYCODE_Y";
    KeyCode2[KeyCode2["KEYCODE_Z"] = 54] = "KEYCODE_Z";
    KeyCode2[KeyCode2["KEYCODE_COMMA"] = 55] = "KEYCODE_COMMA";
    KeyCode2[KeyCode2["KEYCODE_PERIOD"] = 56] = "KEYCODE_PERIOD";
    KeyCode2[KeyCode2["KEYCODE_ALT_LEFT"] = 57] = "KEYCODE_ALT_LEFT";
    KeyCode2[KeyCode2["KEYCODE_ALT_RIGHT"] = 58] = "KEYCODE_ALT_RIGHT";
    KeyCode2[KeyCode2["KEYCODE_SHIFT_LEFT"] = 59] = "KEYCODE_SHIFT_LEFT";
    KeyCode2[KeyCode2["KEYCODE_SHIFT_RIGHT"] = 60] = "KEYCODE_SHIFT_RIGHT";
    KeyCode2[KeyCode2["KEYCODE_TAB"] = 61] = "KEYCODE_TAB";
    KeyCode2[KeyCode2["KEYCODE_SPACE"] = 62] = "KEYCODE_SPACE";
    KeyCode2[KeyCode2["KEYCODE_SYM"] = 63] = "KEYCODE_SYM";
    KeyCode2[KeyCode2["KEYCODE_EXPLORER"] = 64] = "KEYCODE_EXPLORER";
    KeyCode2[KeyCode2["KEYCODE_ENVELOPE"] = 65] = "KEYCODE_ENVELOPE";
    KeyCode2[KeyCode2["KEYCODE_ENTER"] = 66] = "KEYCODE_ENTER";
    KeyCode2[KeyCode2["KEYCODE_DEL"] = 67] = "KEYCODE_DEL";
    KeyCode2[KeyCode2["KEYCODE_GRAVE"] = 68] = "KEYCODE_GRAVE";
    KeyCode2[KeyCode2["KEYCODE_MINUS"] = 69] = "KEYCODE_MINUS";
    KeyCode2[KeyCode2["KEYCODE_EQUALS"] = 70] = "KEYCODE_EQUALS";
    KeyCode2[KeyCode2["KEYCODE_LEFT_BRACKET"] = 71] = "KEYCODE_LEFT_BRACKET";
    KeyCode2[KeyCode2["KEYCODE_RIGHT_BRACKET"] = 72] = "KEYCODE_RIGHT_BRACKET";
    KeyCode2[KeyCode2["KEYCODE_BACKSLASH"] = 73] = "KEYCODE_BACKSLASH";
    KeyCode2[KeyCode2["KEYCODE_SEMICOLON"] = 74] = "KEYCODE_SEMICOLON";
    KeyCode2[KeyCode2["KEYCODE_APOSTROPHE"] = 75] = "KEYCODE_APOSTROPHE";
    KeyCode2[KeyCode2["KEYCODE_SLASH"] = 76] = "KEYCODE_SLASH";
    KeyCode2[KeyCode2["KEYCODE_AT"] = 77] = "KEYCODE_AT";
    KeyCode2[KeyCode2["KEYCODE_NUM"] = 78] = "KEYCODE_NUM";
    KeyCode2[KeyCode2["KEYCODE_HEADSETHOOK"] = 79] = "KEYCODE_HEADSETHOOK";
    KeyCode2[KeyCode2["KEYCODE_FOCUS"] = 80] = "KEYCODE_FOCUS";
    KeyCode2[KeyCode2["KEYCODE_PLUS"] = 81] = "KEYCODE_PLUS";
    KeyCode2[KeyCode2["KEYCODE_MENU"] = 82] = "KEYCODE_MENU";
    KeyCode2[KeyCode2["KEYCODE_NOTIFICATION"] = 83] = "KEYCODE_NOTIFICATION";
    KeyCode2[KeyCode2["KEYCODE_SEARCH"] = 84] = "KEYCODE_SEARCH";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_PLAY_PAUSE"] = 85] = "KEYCODE_MEDIA_PLAY_PAUSE";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_STOP"] = 86] = "KEYCODE_MEDIA_STOP";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_NEXT"] = 87] = "KEYCODE_MEDIA_NEXT";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_PREVIOUS"] = 88] = "KEYCODE_MEDIA_PREVIOUS";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_REWIND"] = 89] = "KEYCODE_MEDIA_REWIND";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_FAST_FORWARD"] = 90] = "KEYCODE_MEDIA_FAST_FORWARD";
    KeyCode2[KeyCode2["KEYCODE_MUTE"] = 91] = "KEYCODE_MUTE";
    KeyCode2[KeyCode2["KEYCODE_PAGE_UP"] = 92] = "KEYCODE_PAGE_UP";
    KeyCode2[KeyCode2["KEYCODE_PAGE_DOWN"] = 93] = "KEYCODE_PAGE_DOWN";
    KeyCode2[KeyCode2["KEYCODE_PICTSYMBOLS"] = 94] = "KEYCODE_PICTSYMBOLS";
    KeyCode2[KeyCode2["KEYCODE_SWITCH_CHARSET"] = 95] = "KEYCODE_SWITCH_CHARSET";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_A"] = 96] = "KEYCODE_BUTTON_A";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_B"] = 97] = "KEYCODE_BUTTON_B";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_C"] = 98] = "KEYCODE_BUTTON_C";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_X"] = 99] = "KEYCODE_BUTTON_X";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_Y"] = 100] = "KEYCODE_BUTTON_Y";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_Z"] = 101] = "KEYCODE_BUTTON_Z";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_L1"] = 102] = "KEYCODE_BUTTON_L1";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_R1"] = 103] = "KEYCODE_BUTTON_R1";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_L2"] = 104] = "KEYCODE_BUTTON_L2";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_R2"] = 105] = "KEYCODE_BUTTON_R2";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_THUMBL"] = 106] = "KEYCODE_BUTTON_THUMBL";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_THUMBR"] = 107] = "KEYCODE_BUTTON_THUMBR";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_START"] = 108] = "KEYCODE_BUTTON_START";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_SELECT"] = 109] = "KEYCODE_BUTTON_SELECT";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_MODE"] = 110] = "KEYCODE_BUTTON_MODE";
    KeyCode2[KeyCode2["KEYCODE_ESCAPE"] = 111] = "KEYCODE_ESCAPE";
    KeyCode2[KeyCode2["KEYCODE_FORWARD_DEL"] = 112] = "KEYCODE_FORWARD_DEL";
    KeyCode2[KeyCode2["KEYCODE_CTRL_LEFT"] = 113] = "KEYCODE_CTRL_LEFT";
    KeyCode2[KeyCode2["KEYCODE_CTRL_RIGHT"] = 114] = "KEYCODE_CTRL_RIGHT";
    KeyCode2[KeyCode2["KEYCODE_CAPS_LOCK"] = 115] = "KEYCODE_CAPS_LOCK";
    KeyCode2[KeyCode2["KEYCODE_SCROLL_LOCK"] = 116] = "KEYCODE_SCROLL_LOCK";
    KeyCode2[KeyCode2["KEYCODE_META_LEFT"] = 117] = "KEYCODE_META_LEFT";
    KeyCode2[KeyCode2["KEYCODE_META_RIGHT"] = 118] = "KEYCODE_META_RIGHT";
    KeyCode2[KeyCode2["KEYCODE_FUNCTION"] = 119] = "KEYCODE_FUNCTION";
    KeyCode2[KeyCode2["KEYCODE_SYSRQ"] = 120] = "KEYCODE_SYSRQ";
    KeyCode2[KeyCode2["KEYCODE_BREAK"] = 121] = "KEYCODE_BREAK";
    KeyCode2[KeyCode2["KEYCODE_MOVE_HOME"] = 122] = "KEYCODE_MOVE_HOME";
    KeyCode2[KeyCode2["KEYCODE_MOVE_END"] = 123] = "KEYCODE_MOVE_END";
    KeyCode2[KeyCode2["KEYCODE_INSERT"] = 124] = "KEYCODE_INSERT";
    KeyCode2[KeyCode2["KEYCODE_FORWARD"] = 125] = "KEYCODE_FORWARD";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_PLAY"] = 126] = "KEYCODE_MEDIA_PLAY";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_PAUSE"] = 127] = "KEYCODE_MEDIA_PAUSE";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_CLOSE"] = 128] = "KEYCODE_MEDIA_CLOSE";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_EJECT"] = 129] = "KEYCODE_MEDIA_EJECT";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_RECORD"] = 130] = "KEYCODE_MEDIA_RECORD";
    KeyCode2[KeyCode2["KEYCODE_F1"] = 131] = "KEYCODE_F1";
    KeyCode2[KeyCode2["KEYCODE_F2"] = 132] = "KEYCODE_F2";
    KeyCode2[KeyCode2["KEYCODE_F3"] = 133] = "KEYCODE_F3";
    KeyCode2[KeyCode2["KEYCODE_F4"] = 134] = "KEYCODE_F4";
    KeyCode2[KeyCode2["KEYCODE_F5"] = 135] = "KEYCODE_F5";
    KeyCode2[KeyCode2["KEYCODE_F6"] = 136] = "KEYCODE_F6";
    KeyCode2[KeyCode2["KEYCODE_F7"] = 137] = "KEYCODE_F7";
    KeyCode2[KeyCode2["KEYCODE_F8"] = 138] = "KEYCODE_F8";
    KeyCode2[KeyCode2["KEYCODE_F9"] = 139] = "KEYCODE_F9";
    KeyCode2[KeyCode2["KEYCODE_F10"] = 140] = "KEYCODE_F10";
    KeyCode2[KeyCode2["KEYCODE_F11"] = 141] = "KEYCODE_F11";
    KeyCode2[KeyCode2["KEYCODE_F12"] = 142] = "KEYCODE_F12";
    KeyCode2[KeyCode2["KEYCODE_NUM_LOCK"] = 143] = "KEYCODE_NUM_LOCK";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_0"] = 144] = "KEYCODE_NUMPAD_0";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_1"] = 145] = "KEYCODE_NUMPAD_1";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_2"] = 146] = "KEYCODE_NUMPAD_2";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_3"] = 147] = "KEYCODE_NUMPAD_3";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_4"] = 148] = "KEYCODE_NUMPAD_4";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_5"] = 149] = "KEYCODE_NUMPAD_5";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_6"] = 150] = "KEYCODE_NUMPAD_6";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_7"] = 151] = "KEYCODE_NUMPAD_7";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_8"] = 152] = "KEYCODE_NUMPAD_8";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_9"] = 153] = "KEYCODE_NUMPAD_9";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_DIVIDE"] = 154] = "KEYCODE_NUMPAD_DIVIDE";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_MULTIPLY"] = 155] = "KEYCODE_NUMPAD_MULTIPLY";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_SUBTRACT"] = 156] = "KEYCODE_NUMPAD_SUBTRACT";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_ADD"] = 157] = "KEYCODE_NUMPAD_ADD";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_DOT"] = 158] = "KEYCODE_NUMPAD_DOT";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_COMMA"] = 159] = "KEYCODE_NUMPAD_COMMA";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_ENTER"] = 160] = "KEYCODE_NUMPAD_ENTER";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_EQUALS"] = 161] = "KEYCODE_NUMPAD_EQUALS";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_LEFT_PAREN"] = 162] = "KEYCODE_NUMPAD_LEFT_PAREN";
    KeyCode2[KeyCode2["KEYCODE_NUMPAD_RIGHT_PAREN"] = 163] = "KEYCODE_NUMPAD_RIGHT_PAREN";
    KeyCode2[KeyCode2["KEYCODE_VOLUME_MUTE"] = 164] = "KEYCODE_VOLUME_MUTE";
    KeyCode2[KeyCode2["KEYCODE_INFO"] = 165] = "KEYCODE_INFO";
    KeyCode2[KeyCode2["KEYCODE_CHANNEL_UP"] = 166] = "KEYCODE_CHANNEL_UP";
    KeyCode2[KeyCode2["KEYCODE_CHANNEL_DOWN"] = 167] = "KEYCODE_CHANNEL_DOWN";
    KeyCode2[KeyCode2["KEYCODE_ZOOM_IN"] = 168] = "KEYCODE_ZOOM_IN";
    KeyCode2[KeyCode2["KEYCODE_ZOOM_OUT"] = 169] = "KEYCODE_ZOOM_OUT";
    KeyCode2[KeyCode2["KEYCODE_TV"] = 170] = "KEYCODE_TV";
    KeyCode2[KeyCode2["KEYCODE_WINDOW"] = 171] = "KEYCODE_WINDOW";
    KeyCode2[KeyCode2["KEYCODE_GUIDE"] = 172] = "KEYCODE_GUIDE";
    KeyCode2[KeyCode2["KEYCODE_DVR"] = 173] = "KEYCODE_DVR";
    KeyCode2[KeyCode2["KEYCODE_BOOKMARK"] = 174] = "KEYCODE_BOOKMARK";
    KeyCode2[KeyCode2["KEYCODE_CAPTIONS"] = 175] = "KEYCODE_CAPTIONS";
    KeyCode2[KeyCode2["KEYCODE_SETTINGS"] = 176] = "KEYCODE_SETTINGS";
    KeyCode2[KeyCode2["KEYCODE_TV_POWER"] = 177] = "KEYCODE_TV_POWER";
    KeyCode2[KeyCode2["KEYCODE_TV_INPUT"] = 178] = "KEYCODE_TV_INPUT";
    KeyCode2[KeyCode2["KEYCODE_STB_POWER"] = 179] = "KEYCODE_STB_POWER";
    KeyCode2[KeyCode2["KEYCODE_STB_INPUT"] = 180] = "KEYCODE_STB_INPUT";
    KeyCode2[KeyCode2["KEYCODE_AVR_POWER"] = 181] = "KEYCODE_AVR_POWER";
    KeyCode2[KeyCode2["KEYCODE_AVR_INPUT"] = 182] = "KEYCODE_AVR_INPUT";
    KeyCode2[KeyCode2["KEYCODE_PROG_RED"] = 183] = "KEYCODE_PROG_RED";
    KeyCode2[KeyCode2["KEYCODE_PROG_GREEN"] = 184] = "KEYCODE_PROG_GREEN";
    KeyCode2[KeyCode2["KEYCODE_PROG_YELLOW"] = 185] = "KEYCODE_PROG_YELLOW";
    KeyCode2[KeyCode2["KEYCODE_PROG_BLUE"] = 186] = "KEYCODE_PROG_BLUE";
    KeyCode2[KeyCode2["KEYCODE_APP_SWITCH"] = 187] = "KEYCODE_APP_SWITCH";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_1"] = 188] = "KEYCODE_BUTTON_1";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_2"] = 189] = "KEYCODE_BUTTON_2";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_3"] = 190] = "KEYCODE_BUTTON_3";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_4"] = 191] = "KEYCODE_BUTTON_4";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_5"] = 192] = "KEYCODE_BUTTON_5";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_6"] = 193] = "KEYCODE_BUTTON_6";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_7"] = 194] = "KEYCODE_BUTTON_7";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_8"] = 195] = "KEYCODE_BUTTON_8";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_9"] = 196] = "KEYCODE_BUTTON_9";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_10"] = 197] = "KEYCODE_BUTTON_10";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_11"] = 198] = "KEYCODE_BUTTON_11";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_12"] = 199] = "KEYCODE_BUTTON_12";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_13"] = 200] = "KEYCODE_BUTTON_13";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_14"] = 201] = "KEYCODE_BUTTON_14";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_15"] = 202] = "KEYCODE_BUTTON_15";
    KeyCode2[KeyCode2["KEYCODE_BUTTON_16"] = 203] = "KEYCODE_BUTTON_16";
    KeyCode2[KeyCode2["KEYCODE_LANGUAGE_SWITCH"] = 204] = "KEYCODE_LANGUAGE_SWITCH";
    KeyCode2[KeyCode2["KEYCODE_MANNER_MODE"] = 205] = "KEYCODE_MANNER_MODE";
    KeyCode2[KeyCode2["KEYCODE_3D_MODE"] = 206] = "KEYCODE_3D_MODE";
    KeyCode2[KeyCode2["KEYCODE_CONTACTS"] = 207] = "KEYCODE_CONTACTS";
    KeyCode2[KeyCode2["KEYCODE_CALENDAR"] = 208] = "KEYCODE_CALENDAR";
    KeyCode2[KeyCode2["KEYCODE_MUSIC"] = 209] = "KEYCODE_MUSIC";
    KeyCode2[KeyCode2["KEYCODE_CALCULATOR"] = 210] = "KEYCODE_CALCULATOR";
    KeyCode2[KeyCode2["KEYCODE_ZENKAKU_HANKAKU"] = 211] = "KEYCODE_ZENKAKU_HANKAKU";
    KeyCode2[KeyCode2["KEYCODE_EISU"] = 212] = "KEYCODE_EISU";
    KeyCode2[KeyCode2["KEYCODE_MUHENKAN"] = 213] = "KEYCODE_MUHENKAN";
    KeyCode2[KeyCode2["KEYCODE_HENKAN"] = 214] = "KEYCODE_HENKAN";
    KeyCode2[KeyCode2["KEYCODE_KATAKANA_HIRAGANA"] = 215] = "KEYCODE_KATAKANA_HIRAGANA";
    KeyCode2[KeyCode2["KEYCODE_YEN"] = 216] = "KEYCODE_YEN";
    KeyCode2[KeyCode2["KEYCODE_RO"] = 217] = "KEYCODE_RO";
    KeyCode2[KeyCode2["KEYCODE_KANA"] = 218] = "KEYCODE_KANA";
    KeyCode2[KeyCode2["KEYCODE_ASSIST"] = 219] = "KEYCODE_ASSIST";
    KeyCode2[KeyCode2["KEYCODE_BRIGHTNESS_DOWN"] = 220] = "KEYCODE_BRIGHTNESS_DOWN";
    KeyCode2[KeyCode2["KEYCODE_BRIGHTNESS_UP"] = 221] = "KEYCODE_BRIGHTNESS_UP";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_AUDIO_TRACK"] = 222] = "KEYCODE_MEDIA_AUDIO_TRACK";
    KeyCode2[KeyCode2["KEYCODE_SLEEP"] = 223] = "KEYCODE_SLEEP";
    KeyCode2[KeyCode2["KEYCODE_WAKEUP"] = 224] = "KEYCODE_WAKEUP";
    KeyCode2[KeyCode2["KEYCODE_PAIRING"] = 225] = "KEYCODE_PAIRING";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_TOP_MENU"] = 226] = "KEYCODE_MEDIA_TOP_MENU";
    KeyCode2[KeyCode2["KEYCODE_11"] = 227] = "KEYCODE_11";
    KeyCode2[KeyCode2["KEYCODE_12"] = 228] = "KEYCODE_12";
    KeyCode2[KeyCode2["KEYCODE_LAST_CHANNEL"] = 229] = "KEYCODE_LAST_CHANNEL";
    KeyCode2[KeyCode2["KEYCODE_TV_DATA_SERVICE"] = 230] = "KEYCODE_TV_DATA_SERVICE";
    KeyCode2[KeyCode2["KEYCODE_VOICE_ASSIST"] = 231] = "KEYCODE_VOICE_ASSIST";
    KeyCode2[KeyCode2["KEYCODE_TV_RADIO_SERVICE"] = 232] = "KEYCODE_TV_RADIO_SERVICE";
    KeyCode2[KeyCode2["KEYCODE_TV_TELETEXT"] = 233] = "KEYCODE_TV_TELETEXT";
    KeyCode2[KeyCode2["KEYCODE_TV_NUMBER_ENTRY"] = 234] = "KEYCODE_TV_NUMBER_ENTRY";
    KeyCode2[KeyCode2["KEYCODE_TV_TERRESTRIAL_ANALOG"] = 235] = "KEYCODE_TV_TERRESTRIAL_ANALOG";
    KeyCode2[KeyCode2["KEYCODE_TV_TERRESTRIAL_DIGITAL"] = 236] = "KEYCODE_TV_TERRESTRIAL_DIGITAL";
    KeyCode2[KeyCode2["KEYCODE_TV_SATELLITE"] = 237] = "KEYCODE_TV_SATELLITE";
    KeyCode2[KeyCode2["KEYCODE_TV_SATELLITE_BS"] = 238] = "KEYCODE_TV_SATELLITE_BS";
    KeyCode2[KeyCode2["KEYCODE_TV_SATELLITE_CS"] = 239] = "KEYCODE_TV_SATELLITE_CS";
    KeyCode2[KeyCode2["KEYCODE_TV_SATELLITE_SERVICE"] = 240] = "KEYCODE_TV_SATELLITE_SERVICE";
    KeyCode2[KeyCode2["KEYCODE_TV_NETWORK"] = 241] = "KEYCODE_TV_NETWORK";
    KeyCode2[KeyCode2["KEYCODE_TV_ANTENNA_CABLE"] = 242] = "KEYCODE_TV_ANTENNA_CABLE";
    KeyCode2[KeyCode2["KEYCODE_TV_INPUT_HDMI_1"] = 243] = "KEYCODE_TV_INPUT_HDMI_1";
    KeyCode2[KeyCode2["KEYCODE_TV_INPUT_HDMI_2"] = 244] = "KEYCODE_TV_INPUT_HDMI_2";
    KeyCode2[KeyCode2["KEYCODE_TV_INPUT_HDMI_3"] = 245] = "KEYCODE_TV_INPUT_HDMI_3";
    KeyCode2[KeyCode2["KEYCODE_TV_INPUT_HDMI_4"] = 246] = "KEYCODE_TV_INPUT_HDMI_4";
    KeyCode2[KeyCode2["KEYCODE_TV_INPUT_COMPOSITE_1"] = 247] = "KEYCODE_TV_INPUT_COMPOSITE_1";
    KeyCode2[KeyCode2["KEYCODE_TV_INPUT_COMPOSITE_2"] = 248] = "KEYCODE_TV_INPUT_COMPOSITE_2";
    KeyCode2[KeyCode2["KEYCODE_TV_INPUT_COMPONENT_1"] = 249] = "KEYCODE_TV_INPUT_COMPONENT_1";
    KeyCode2[KeyCode2["KEYCODE_TV_INPUT_COMPONENT_2"] = 250] = "KEYCODE_TV_INPUT_COMPONENT_2";
    KeyCode2[KeyCode2["KEYCODE_TV_INPUT_VGA_1"] = 251] = "KEYCODE_TV_INPUT_VGA_1";
    KeyCode2[KeyCode2["KEYCODE_TV_AUDIO_DESCRIPTION"] = 252] = "KEYCODE_TV_AUDIO_DESCRIPTION";
    KeyCode2[KeyCode2["KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP"] = 253] = "KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP";
    KeyCode2[KeyCode2["KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN"] = 254] = "KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN";
    KeyCode2[KeyCode2["KEYCODE_TV_ZOOM_MODE"] = 255] = "KEYCODE_TV_ZOOM_MODE";
    KeyCode2[KeyCode2["KEYCODE_TV_CONTENTS_MENU"] = 256] = "KEYCODE_TV_CONTENTS_MENU";
    KeyCode2[KeyCode2["KEYCODE_TV_MEDIA_CONTEXT_MENU"] = 257] = "KEYCODE_TV_MEDIA_CONTEXT_MENU";
    KeyCode2[KeyCode2["KEYCODE_TV_TIMER_PROGRAMMING"] = 258] = "KEYCODE_TV_TIMER_PROGRAMMING";
    KeyCode2[KeyCode2["KEYCODE_HELP"] = 259] = "KEYCODE_HELP";
    KeyCode2[KeyCode2["KEYCODE_NAVIGATE_PREVIOUS"] = 260] = "KEYCODE_NAVIGATE_PREVIOUS";
    KeyCode2[KeyCode2["KEYCODE_NAVIGATE_NEXT"] = 261] = "KEYCODE_NAVIGATE_NEXT";
    KeyCode2[KeyCode2["KEYCODE_NAVIGATE_IN"] = 262] = "KEYCODE_NAVIGATE_IN";
    KeyCode2[KeyCode2["KEYCODE_NAVIGATE_OUT"] = 263] = "KEYCODE_NAVIGATE_OUT";
    KeyCode2[KeyCode2["KEYCODE_STEM_PRIMARY"] = 264] = "KEYCODE_STEM_PRIMARY";
    KeyCode2[KeyCode2["KEYCODE_STEM_1"] = 265] = "KEYCODE_STEM_1";
    KeyCode2[KeyCode2["KEYCODE_STEM_2"] = 266] = "KEYCODE_STEM_2";
    KeyCode2[KeyCode2["KEYCODE_STEM_3"] = 267] = "KEYCODE_STEM_3";
    KeyCode2[KeyCode2["KEYCODE_DPAD_UP_LEFT"] = 268] = "KEYCODE_DPAD_UP_LEFT";
    KeyCode2[KeyCode2["KEYCODE_DPAD_DOWN_LEFT"] = 269] = "KEYCODE_DPAD_DOWN_LEFT";
    KeyCode2[KeyCode2["KEYCODE_DPAD_UP_RIGHT"] = 270] = "KEYCODE_DPAD_UP_RIGHT";
    KeyCode2[KeyCode2["KEYCODE_DPAD_DOWN_RIGHT"] = 271] = "KEYCODE_DPAD_DOWN_RIGHT";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_SKIP_FORWARD"] = 272] = "KEYCODE_MEDIA_SKIP_FORWARD";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_SKIP_BACKWARD"] = 273] = "KEYCODE_MEDIA_SKIP_BACKWARD";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_STEP_FORWARD"] = 274] = "KEYCODE_MEDIA_STEP_FORWARD";
    KeyCode2[KeyCode2["KEYCODE_MEDIA_STEP_BACKWARD"] = 275] = "KEYCODE_MEDIA_STEP_BACKWARD";
    KeyCode2[KeyCode2["KEYCODE_SOFT_SLEEP"] = 276] = "KEYCODE_SOFT_SLEEP";
    KeyCode2[KeyCode2["KEYCODE_CUT"] = 277] = "KEYCODE_CUT";
    KeyCode2[KeyCode2["KEYCODE_COPY"] = 278] = "KEYCODE_COPY";
    KeyCode2[KeyCode2["KEYCODE_PASTE"] = 279] = "KEYCODE_PASTE";
    KeyCode2[KeyCode2["KEYCODE_SYSTEM_NAVIGATION_UP"] = 280] = "KEYCODE_SYSTEM_NAVIGATION_UP";
    KeyCode2[KeyCode2["KEYCODE_SYSTEM_NAVIGATION_DOWN"] = 281] = "KEYCODE_SYSTEM_NAVIGATION_DOWN";
    KeyCode2[KeyCode2["KEYCODE_SYSTEM_NAVIGATION_LEFT"] = 282] = "KEYCODE_SYSTEM_NAVIGATION_LEFT";
    KeyCode2[KeyCode2["KEYCODE_SYSTEM_NAVIGATION_RIGHT"] = 283] = "KEYCODE_SYSTEM_NAVIGATION_RIGHT";
    KeyCode2[KeyCode2["KEYCODE_ALL_APPS"] = 284] = "KEYCODE_ALL_APPS";
  })(KeyCode || (exports.KeyCode = KeyCode = {}));
});

// node_modules/adb-ts/lib/util/autoEventUnregister.js
var require_autoEventUnregister = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var autoUnregister = async (emitter, action) => {
    const emitter_ = await emitter;
    const getListeners = () => {
      return emitter_.eventNames().reduce((map, event) => map.set(event, emitter_.listeners(event)), new Map);
    };
    const prevListeners = getListeners();
    const promise = action instanceof Promise ? action : action(emitter_);
    const offListeners = [...getListeners()].map(([event, listeners]) => [
      event,
      listeners.filter((listener) => !prevListeners.get(event)?.includes(listener))
    ]);
    try {
      return await promise;
    } finally {
      offListeners.forEach(([event, listeners]) => {
        listeners.forEach((listener) => {
          emitter_.off(event, listener);
        });
      });
    }
  };
  exports.default = autoUnregister;
});

// node_modules/adb-ts/lib/util/index.js
var require_util = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.autoUnregister = undefined;
  __exportStar(require_errors(), exports);
  __exportStar(require_functions(), exports);
  __exportStar(require_types(), exports);
  __exportStar(require_keycode(), exports);
  var autoEventUnregister_1 = __importDefault(require_autoEventUnregister());
  exports.autoUnregister = autoEventUnregister_1.default;
});

// node_modules/adb-ts/lib/parser.js
var require_parser = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Parser = undefined;
  var functions_1 = require_functions();
  var util_1 = require_util();
  var promises_1 = __importDefault(import.meta.require("timers/promises"));

  class Parser {
    constructor(socket) {
      this.ended = false;
      this.socket = socket;
    }
    readBytes(howMany) {
      return (0, util_1.autoUnregister)(this.socket, (socket) => new Promise((resolve, reject) => {
        const tryRead = () => {
          if (!howMany) {
            return resolve(Buffer.alloc(0));
          }
          const chunk = this.socket.read(howMany);
          if (chunk) {
            howMany -= chunk.length;
            if (howMany === 0) {
              return resolve(chunk);
            }
          }
          if (this.ended) {
            return reject(new util_1.PrematureEOFError(howMany));
          }
        };
        socket.on("readable", tryRead).on("error", reject).on("end", () => {
          this.ended = true;
          reject(new util_1.PrematureEOFError(howMany));
        });
        tryRead();
      }));
    }
    end() {
      return (0, util_1.autoUnregister)(this.socket, (socket) => new Promise((resolve, reject) => {
        socket.on("readable", () => {
          while (this.socket.read()) {
            continue;
          }
        }).on("error", reject).on("end", () => {
          this.ended = true;
          resolve();
        });
        if (this.ended) {
          return resolve();
        }
        this.socket.read(0);
        this.socket.end();
      }));
    }
    async readAscii(howMany) {
      return (await this.readBytes(howMany)).toString("ascii");
    }
    async readValue() {
      const value = await this.readAscii(4);
      const length = (0, functions_1.decodeLength)(value);
      return this.readBytes(length);
    }
    readError() {
      return Promise.race([
        promises_1.default.setTimeout(1000, new Error("Could not read error"), {
          ref: false
        }),
        this.readValue().then(String).then(Error)
      ]);
    }
    unexpected(data, expected) {
      return new util_1.UnexpectedDataError(data, expected);
    }
    readByteFlow(howMany, targetStream) {
      return (0, util_1.autoUnregister)(this.socket, (socket) => new Promise((resolve, reject) => {
        const tryRead = () => {
          if (!howMany) {
            return resolve();
          }
          const readAll = (chunk = this.socket.read(howMany) || this.socket.read()) => {
            if (!chunk) {
              return false;
            }
            howMany -= chunk.length;
            targetStream.write(chunk);
            return howMany === 0 || readAll();
          };
          if (readAll()) {
            return resolve();
          }
          if (this.ended) {
            return reject(new util_1.PrematureEOFError(howMany));
          }
        };
        socket.on("readable", tryRead).on("error", reject).on("end", () => {
          this.ended = true;
          reject(new util_1.PrematureEOFError(howMany));
        });
        tryRead();
      }));
    }
    readUntil(code) {
      const read = async (skipped = Buffer.alloc(0)) => {
        const chunk = await this.readBytes(1);
        if (chunk[0] === code) {
          return skipped;
        }
        return read(Buffer.concat([skipped, chunk]));
      };
      return read();
    }
    async readline() {
      const line = await this.readUntil(10);
      if (line[line.length - 1] === 13) {
        return line.subarray(0, -1);
      }
      return line;
    }
    async searchLine(regExp, retry = true) {
      const line = (await this.readline()).toString();
      const match = regExp.exec(line);
      if (match) {
        return match;
      }
      if (retry) {
        return this.searchLine(regExp);
      }
      throw new util_1.UnexpectedDataError(line, regExp.toString());
    }
    readAll() {
      return (0, util_1.autoUnregister)(this.socket, (socket) => new Promise((resolve, reject) => {
        const chunks = [];
        const tryRead = () => {
          while (this.socket.readableLength) {
            chunks.push(this.socket.read());
          }
          if (this.ended) {
            return resolve(Buffer.concat(chunks));
          }
        };
        socket.on("readable", tryRead).on("error", reject).on("end", () => {
          this.ended = true;
          return resolve(Buffer.concat(chunks));
        });
      }));
    }
  }
  exports.Parser = Parser;
});

// node_modules/adb-ts/lib/commands/command.js
var require_command = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var parser_1 = require_parser();
  var util_2 = require_util();

  class Command {
    constructor(connection) {
      this.connection = connection;
      this.parser = new parser_1.Parser(this.connection);
    }
    async validateReply(reply) {
      const replyStr = reply.toString();
      switch (replyStr) {
        case util_1.Reply.OKAY:
          return;
        case util_1.Reply.FAIL:
          throw await this.parser.readError();
        default:
          throw this.parser.unexpected(replyStr, [util_1.Reply.OKAY, util_1.Reply.FAIL].join(" or "));
      }
    }
    async readAndValidateReply() {
      return this.validateReply(await this.parser.readAscii(4));
    }
    endConnection() {
      this.connection.end();
    }
    async initAndValidateReply(args) {
      this.connection.write((0, util_2.encodeData)(args));
      try {
        return await this.readAndValidateReply();
      } finally {
        this.autoEnd && this.endConnection();
      }
    }
    async initExecute(args) {
      this.connection.write((0, util_2.encodeData)(args));
      try {
        return await this.parser.readAscii(4);
      } finally {
        this.autoEnd && this.endConnection();
      }
    }
  }
  exports.default = Command;
});

// node_modules/adb-ts/lib/commands/abstract/cmd.js
var require_cmd = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var command_1 = __importDefault(require_command());

  class Cmd extends command_1.default {
  }
  exports.default = Cmd;
});

// node_modules/adb-ts/lib/commands/abstract/transport.js
var require_transport = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var cmd_1 = __importDefault(require_cmd());

  class TransportCommand extends cmd_1.default {
    constructor(connection, serial) {
      super(connection);
      this.autoEnd = false;
      this.serial = serial;
    }
    async execute() {
      try {
        await this.initAndValidateReply("host:transport:".concat(this.serial));
        await this.initAndValidateReply(this.Cmd);
        return await this.postExecute();
      } catch (err) {
        this.endConnection();
        throw err;
      } finally {
        !this.keepAlive && this.endConnection();
      }
    }
  }
  exports.default = TransportCommand;
});

// node_modules/adb-ts/lib/commands/indexDocs.js
var require_indexDocs = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TransportCommand = exports.Command = undefined;
  var command_1 = __importDefault(require_command());
  exports.Command = command_1.default;
  var transport_1 = __importDefault(require_transport());
  exports.TransportCommand = transport_1.default;
});

// node_modules/adb-ts/lib/sync/stats.js
var require_stats = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var fs_1 = __importDefault(import.meta.require("fs"));

  class Stats extends fs_1.default.Stats {
    constructor(mode, size, mtime) {
      super();
      this.mode = mode;
      this.size = size;
      this.mtime = new Date(mtime * 1000);
    }
  }
  Stats.S_IFMT = 61440;
  Stats.S_IFSOCK = 49152;
  Stats.S_IFLNK = 40960;
  Stats.S_IFREG = 32768;
  Stats.S_IFBLK = 24576;
  Stats.S_IFDIR = 16384;
  Stats.S_IFCHR = 8192;
  Stats.S_IFIFO = 4096;
  Stats.S_ISUID = 2048;
  Stats.S_ISGID = 1024;
  Stats.S_ISVTX = 512;
  Stats.S_IRWXU = 448;
  Stats.S_IRUSR = 256;
  Stats.S_IWUSR = 128;
  Stats.S_IXUSR = 64;
  Stats.S_IRWXG = 56;
  Stats.S_IRGRP = 32;
  exports.default = Stats;
});

// node_modules/adb-ts/lib/sync/entry.js
var require_entry = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var stats_1 = __importDefault(require_stats());

  class SyncEntry extends stats_1.default {
    constructor(name, mode, size, mtime) {
      super(mode, size, mtime);
      this.name = name;
    }
  }
  exports.default = SyncEntry;
});

// node_modules/adb-ts/lib/sync/pulltransfer.js
var require_pulltransfer = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PullTransfer = undefined;
  var stream_1 = import.meta.require("stream");

  class PullTransfer extends stream_1.PassThrough {
    constructor() {
      super(...arguments);
      this.stats = {
        bytesTransferred: 0
      };
    }
    cancel() {
      return this.emit("cancel");
    }
    write(chunk, encoding, cb) {
      this.stats.bytesTransferred += chunk.length;
      this.emit("progress", this.stats);
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = undefined;
      }
      return super.write(chunk, encoding, cb);
    }
    on(event, listener) {
      return super.on(event, listener);
    }
  }
  exports.PullTransfer = PullTransfer;
});

// node_modules/adb-ts/lib/streamHandler.js
var require_streamHandler = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var events_1 = import.meta.require("events");

  class StreamHandler extends events_1.EventEmitter {
  }
  exports.default = StreamHandler;
});

// node_modules/adb-ts/lib/sync/pushtransfer.js
var require_pushtransfer = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PushTransfer = undefined;
  var streamHandler_1 = __importDefault(require_streamHandler());

  class PushTransfer extends streamHandler_1.default {
    constructor() {
      super(...arguments);
      this.stack = [];
      this.stats = {
        bytesTransferred: 0
      };
    }
    cancel() {
      return this.emit("cancel");
    }
    push(byteCount) {
      this.stack.push(byteCount);
    }
    pop() {
      const byteCount = this.stack.pop();
      this.stats.bytesTransferred += byteCount || 0;
      this.emit("progress", this.stats);
    }
    end() {
      this.emit("end");
    }
    on(event, listener) {
      return super.on(event, listener);
    }
  }
  exports.PushTransfer = PushTransfer;
});

// node_modules/adb-ts/lib/sync/sync.js
var require_sync = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Sync = exports.SyncMode = undefined;
  var util_1 = require_util();
  var events_1 = import.meta.require("events");
  var path_1 = __importDefault(import.meta.require("path"));
  var pulltransfer_1 = require_pulltransfer();
  var pushtransfer_1 = require_pushtransfer();
  var stats_1 = __importDefault(require_stats());
  var entry_1 = __importDefault(require_entry());
  var fs_1 = __importDefault(import.meta.require("fs"));
  var util_2 = import.meta.require("util");
  var SyncMode;
  (function(SyncMode2) {
    SyncMode2[SyncMode2["DEFAULT_CHMOD"] = 420] = "DEFAULT_CHMOD";
    SyncMode2[SyncMode2["DATA_MAX_LENGTH"] = 65536] = "DATA_MAX_LENGTH";
  })(SyncMode || (exports.SyncMode = SyncMode = {}));

  class Sync extends events_1.EventEmitter {
    constructor(connection) {
      super();
      this.connection = connection;
      this.parser = connection.parser;
    }
    static temp(path) {
      return `/data/local/tmp/${path_1.default.basename(path)}`;
    }
    async error() {
      const length = await this.parser.readBytes(4);
      const buff = await this.parser.readBytes(length.readUInt32LE(0));
      throw new Error(buff.toString());
    }
    sendCommandWithLength(cmd, length) {
      const payload = Buffer.alloc(cmd.length + 4);
      payload.write(cmd, 0, cmd.length);
      payload.writeUInt32LE(length, cmd.length);
      return this.connection.write(payload);
    }
    getDrainAwaiter() {
      let cb_ = null;
      const listener_ = () => {
        cb_?.(null);
        cb_ = null;
      };
      this.connection.on("drain", listener_);
      const waitForDrain = (cb) => {
        cb_ = cb;
      };
      const unregisterDrainListener = () => {
        this.connection.off("drain", listener_);
      };
      return { waitForDrain, unregisterDrainListener };
    }
    writeData(stream, timestamp) {
      const transfer = new pushtransfer_1.PushTransfer;
      const didWrite = (chunk) => (0, util_2.promisify)((cb) => {
        const result = this.connection.write(chunk, (err) => {
          if (err) {
            return cb(err, false);
          }
          transfer.pop();
          cb(null, result);
        });
      })();
      let canceled = false;
      const writeData = async () => {
        const { waitForDrain, unregisterDrainListener } = this.getDrainAwaiter();
        const promise = new Promise((resolve, reject) => {
          const writeNext = async () => {
            const chunk = stream.read(SyncMode.DATA_MAX_LENGTH) || stream.read();
            if (Buffer.isBuffer(chunk)) {
              this.sendCommandWithLength(util_1.Reply.DATA, chunk.length);
              transfer.push(chunk.length);
              if (await didWrite(chunk)) {
                return writeNext();
              }
              await (0, util_2.promisify)(waitForDrain)();
              return writeNext();
            }
          };
          stream.on("end", () => {
            this.sendCommandWithLength(util_1.Reply.DONE, timestamp);
            resolve();
          }).on("readable", writeNext).on("error", reject);
          this.connection.on("error", (err) => {
            stream.destroy();
            this.connection.end();
            reject(err);
          });
        });
        await Promise.all([
          (0, util_1.autoUnregister)(stream, promise),
          (0, util_1.autoUnregister)(this.connection, promise)
        ]);
        unregisterDrainListener();
      };
      const readReply = async () => {
        const reply = await this.parser.readAscii(4);
        switch (reply) {
          case util_1.Reply.OKAY:
            await this.parser.readBytes(4);
            return;
          case util_1.Reply.FAIL:
            throw await this.error();
          default:
            throw this.parser.unexpected(reply, "OKAY or FAIL");
        }
      };
      (async () => {
        try {
          await writeData();
          await readReply();
        } catch (err) {
          if (canceled) {
            this.connection.end();
            return;
          }
          transfer.emit("error", err);
        } finally {
          transfer.end();
        }
      })();
      transfer.once("cancel", () => canceled = true);
      return transfer;
    }
    pushStream(stream, path, mode) {
      if (mode == null) {
        mode = SyncMode.DEFAULT_CHMOD;
      }
      mode |= stats_1.default.S_IFREG;
      this.sendCommandWithArg(util_1.Reply.SEND, `${path},${mode}`);
      return this.writeData(stream, Math.floor(Date.now() / 1000));
    }
    pushFile(file, path, mode) {
      if (mode === null) {
        mode = SyncMode.DEFAULT_CHMOD;
      }
      mode = mode || SyncMode.DEFAULT_CHMOD;
      return this.pushStream(fs_1.default.createReadStream(file), path, mode);
    }
    push(contents, path, mode) {
      if (typeof contents === "string") {
        return this.pushFile(contents, path, mode);
      }
      return this.pushStream(contents, path, mode);
    }
    readData() {
      let canceled = false;
      const transfer = new pulltransfer_1.PullTransfer;
      const readNext = async () => {
        const reply = await this.parser.readAscii(4);
        switch (reply) {
          case util_1.Reply.DATA: {
            const length = (await this.parser.readBytes(4)).readUInt32LE(0);
            await this.parser.readByteFlow(length, transfer);
            return readNext();
          }
          case util_1.Reply.DONE:
            await this.parser.readBytes(4);
            return;
          case util_1.Reply.FAIL:
            return this.error();
          default:
            throw this.parser.unexpected(reply, "DATA, DONE or FAIL");
        }
      };
      (async () => {
        try {
          await readNext();
        } catch (err) {
          if (canceled) {
            this.connection.end();
            return;
          }
          transfer.emit("error", err);
        } finally {
          transfer.end();
        }
      })();
      transfer.once("cancel", () => canceled = true);
      return transfer;
    }
    pull(path) {
      this.sendCommandWithArg(util_1.Reply.RECV, path);
      return this.readData();
    }
    async readDir(path) {
      const files = [];
      const readNext = async () => {
        const reply = await this.parser.readAscii(4);
        switch (reply) {
          case util_1.Reply.DENT: {
            const stat = await this.parser.readBytes(16);
            const [mode, size, mtime, nameLen] = [
              stat.readUInt32LE(0),
              stat.readUInt32LE(4),
              stat.readUInt32LE(8),
              stat.readUInt32LE(12)
            ];
            const name = (await this.parser.readBytes(nameLen)).toString();
            if (!(name === "." || name === "..")) {
              files.push(new entry_1.default(name, mode, size, mtime));
            }
            return readNext();
          }
          case util_1.Reply.DONE:
            await this.parser.readBytes(16);
            return files;
          case util_1.Reply.FAIL:
            throw await this.parser.readError();
          default:
            throw this.parser.unexpected(reply, "DENT, DONE or FAIL");
        }
      };
      this.sendCommandWithArg(util_1.Reply.LIST, path);
      return readNext();
    }
    end() {
      this.connection.end();
    }
    sendCommandWithArg(cmd, arg) {
      const arglen = Buffer.byteLength(arg, "utf-8");
      const payload = Buffer.alloc(cmd.length + 4 + arglen);
      let pos = 0;
      payload.write(cmd, pos, cmd.length);
      pos += cmd.length;
      payload.writeUInt32LE(arglen, pos);
      pos += 4;
      payload.write(arg, pos);
      return this.connection.write(payload);
    }
  }
  exports.Sync = Sync;
});

// node_modules/adb-ts/lib/sync/index.js
var require_sync2 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Stats = exports.SyncEntry = undefined;
  var entry_1 = __importDefault(require_entry());
  exports.SyncEntry = entry_1.default;
  var stats_1 = __importDefault(require_stats());
  exports.Stats = stats_1.default;
  __exportStar(require_pulltransfer(), exports);
  __exportStar(require_pushtransfer(), exports);
  __exportStar(require_sync(), exports);
});

// node_modules/adb-ts/lib/device.js
var require_device = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Device = undefined;

  class Device {
    constructor(client, props) {
      this.client = client;
      this.id = props.id;
      this.state = props.state;
      this.path = props.path;
      this.device = props.device;
      this.model = props.model;
      this.product = props.product;
      this.transportId = props.transportId;
      this.transport = props.transport;
    }
    getSerialNo() {
      return this.client.getSerialNo(this.id);
    }
    getDevicePath() {
      return this.client.getDevicePath(this.id);
    }
    listProperties() {
      return this.client.listProperties(this.id);
    }
    listFeatures() {
      return this.client.listFeatures(this.id);
    }
    listPackages() {
      return this.client.listPackages(this.id);
    }
    getIpAddress() {
      return this.client.getIpAddress(this.id);
    }
    forward(local, remote) {
      return this.client.forward(this.id, local, remote);
    }
    listForwards() {
      return this.client.listForwards(this.id);
    }
    reverse(local, remote) {
      return this.client.reverse(this.id, local, remote);
    }
    listReverses() {
      return this.client.listReverses(this.id);
    }
    shell(command) {
      return this.client.shell(this.id, command);
    }
    reboot() {
      return this.client.reboot(this.id);
    }
    shutdown() {
      return this.client.shutdown(this.id);
    }
    remount() {
      return this.client.remount(this.id);
    }
    root() {
      return this.client.root(this.id);
    }
    screenshot() {
      return this.client.screenshot(this.id);
    }
    openTcp(port, host) {
      return this.client.openTcp(this.id, port, host);
    }
    openLogcat(options) {
      return this.client.openLogcat(this.id, options);
    }
    clear(pkg) {
      return this.client.clear(this.id, pkg);
    }
    install(apk, options, args) {
      return this.client.install(this.id, apk, options, args);
    }
    uninstall(pkg, options) {
      return this.client.uninstall(this.id, pkg, options);
    }
    isInstalled(pkg) {
      return this.client.isInstalled(this.id, pkg);
    }
    startActivity(pkg, activity, options) {
      return this.client.startActivity(this.id, pkg, activity, options);
    }
    startService(pkg, service, options) {
      return this.client.startService(this.id, pkg, service, options);
    }
    readDir(path) {
      return this.client.readDir(this.id, path);
    }
    pushDataToFile(data, destPath) {
      return this.client.pushDataToFile(this.id, data, destPath);
    }
    pushFile(srcPath, destPath) {
      return this.client.pushFile(this.id, srcPath, destPath);
    }
    pullDataFromFile(srcPath) {
      return this.client.pullDataFromFile(this.id, srcPath);
    }
    pullFile(srcPath, destPath) {
      return this.client.pullFile(this.id, srcPath, destPath);
    }
    pull(path) {
      return this.client.pull(this.id, path);
    }
    push(srcPath, destPath, mode) {
      return this.client.push(this.id, srcPath, destPath, mode);
    }
    tcpip(port = 5555) {
      return this.client.tcpip(this.id, port);
    }
    usb() {
      return this.client.usb(this.id);
    }
    waitBootComplete() {
      return this.client.waitBootComplete(this.id);
    }
    listSettings(mode) {
      return this.client.listSettings(this.id, mode);
    }
    getProp(prop) {
      return this.client.getProp(this.id, prop);
    }
    setProp(prop, value) {
      return this.client.setProp(this.id, prop, value);
    }
    getSetting(mode, name) {
      return this.client.getSetting(this.id, mode, name);
    }
    putSetting(mode, name, value) {
      return this.client.putSetting(this.id, mode, name, value);
    }
    tap(x, y, source) {
      return this.client.tap(this.id, x, y, source);
    }
    text(text, source) {
      return this.client.text(this.id, text, source);
    }
    keyEvent(code, options) {
      return this.client.keyEvent(this.id, code, options);
    }
    swipe(x1, y1, x2, y2, options) {
      return this.client.swipe(this.id, x1, y1, x2, y2, options);
    }
    dragAndDrop(x1, y1, x2, y2, options) {
      return this.client.dragAndDrop(this.id, x1, y1, x2, y2, options);
    }
    press(source) {
      return this.client.press(this.id, source);
    }
    roll(x, y, source) {
      return this.client.roll(this.id, x, y, source);
    }
    custom(CustomCommand, ...args) {
      return this.client.customTransport(CustomCommand, this.id, ...args);
    }
    openMonkey() {
      return this.client.openMonkey(this.id);
    }
    killApp(pkg) {
      return this.client.killApp(this.id, pkg);
    }
    exec(cmd) {
      return this.client.execDevice(this.id, cmd);
    }
    execShell(cmd) {
      return this.client.execDeviceShell(this.id, cmd);
    }
    batteryStatus() {
      return this.client.batteryStatus(this.id);
    }
    rm(path, options) {
      return this.client.rm(this.id, path, options);
    }
    mkdir(path, options) {
      return this.client.mkdir(this.id, path, options);
    }
    touch(path, options) {
      return this.client.touch(this.id, path, options);
    }
    mv(srcPath, destPath, options) {
      return this.client.mv(this.id, srcPath, destPath, options);
    }
    cp(srcPath, destPath, options) {
      return this.client.cp(this.id, srcPath, destPath, options);
    }
    fileStat(path) {
      return this.client.fileStat(this.id, path);
    }
  }
  exports.Device = Device;
});

// node_modules/adb-ts/lib/commands/abstract/transportParseAll.js
var require_transportParseAll = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class TransportParseAllCommand extends transport_1.default {
    constructor() {
      super(...arguments);
      this.keepAlive = false;
    }
    async postExecute() {
      const value = (await this.parser.readAll()).toString().trim();
      return this.parse(value);
    }
  }
  exports.default = TransportParseAllCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/batteryStatus.js
var require_batteryStatus = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transportParseAll_1 = __importDefault(require_transportParseAll());
  var util_1 = require_util();

  class BatteryStatusCommand extends transportParseAll_1.default {
    constructor() {
      super(...arguments);
      this.Cmd = "shell:dumpsys battery";
    }
    parse(value) {
      return (0, util_1.findMatches)(value, /^\s+([\s\S]*?): ([\s\S]*?)$/gm, "map");
    }
  }
  exports.default = BatteryStatusCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/clear.js
var require_clear = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class ClearCommand extends transport_1.default {
    constructor(connection, serial, pkg) {
      super(connection, serial);
      this.keepAlive = false;
      this.pkg = pkg;
      this.Cmd = `shell:pm clear ${pkg}`;
    }
    async postExecute() {
      const [result] = await this.parser.searchLine(/^(Success|Failed)$/, false);
      if (result !== "Success") {
        throw new Error(`Package '${this.pkg}' could not be cleared`);
      }
    }
  }
  exports.default = ClearCommand;
});

// node_modules/adb-ts/lib/commands/abstract/ipConnect.js
var require_ipConnect = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var command_1 = __importDefault(require_command());

  class IpConnect extends command_1.default {
    constructor(connection, command, host, port) {
      super(connection);
      this.autoEnd = false;
      this.command = command;
      this.host = host;
      this.port = port;
    }
    async execute() {
      try {
        await this.initAndValidateReply(`${this.command}:${this.host}:${this.port}`);
        const value = (await this.parser.readValue()).toString().trim();
        if (this.Validator.test(value)) {
          return `${this.host}:${this.port}`;
        }
        throw new Error(value);
      } finally {
        this.endConnection();
      }
    }
  }
  exports.default = IpConnect;
});

// node_modules/adb-ts/lib/commands/host/connect.js
var require_connect = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var ipConnect_1 = __importDefault(require_ipConnect());

  class Connect extends ipConnect_1.default {
    constructor(connection, host, port) {
      super(connection, "host:connect", host, port);
      this.Validator = /connected to|already connected/;
    }
  }
  exports.default = Connect;
});

// node_modules/adb-ts/lib/connection.js
var require_connection = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Connection = undefined;
  var net_1 = import.meta.require("net");
  var parser_1 = require_parser();

  class Connection extends net_1.Socket {
    constructor(options) {
      super(options);
      this.setKeepAlive(true);
      this.setNoDelay(true);
      this.parser = new parser_1.Parser(this);
    }
  }
  exports.Connection = Connection;
});

// node_modules/adb-ts/lib/commands/abstract/exec.js
var require_exec = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var crypto_1 = __importDefault(import.meta.require("crypto"));
  var util_1 = require_util();
  var transport_1 = __importDefault(require_transport());

  class ExecCommand extends transport_1.default {
    constructor() {
      super(...arguments);
      this.uuid = crypto_1.default.randomUUID();
      this.keepAlive = false;
    }
    get Cmd() {
      return [`shell:(${this.rawCmd})`, "||", "echo", (0, util_1.escape)(this.uuid)].join(" ");
    }
    async postExecute() {
      const value = (await this.parser.readAll()).toString();
      if (value.includes(this.uuid)) {
        throw new util_1.AdbExecError(value.replace(this.uuid, "").trim(), this.rawCmd);
      }
      return this.cast(value);
    }
  }
  exports.default = ExecCommand;
});

// node_modules/adb-ts/lib/commands/abstract/fileSystem.js
var require_fileSystem = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var exec_1 = __importDefault(require_exec());

  class FileSystemCommand extends exec_1.default {
    constructor(connection, serial, path, options = {}) {
      super(connection, serial);
      this.path = path;
      this.options = options;
    }
    get rawCmd() {
      const args = Object.entries(this.options).reduce((acc, [key, val]) => {
        if (typeof val === "undefined") {
          return acc;
        }
        const mapper = this.argsMapper[key];
        if (typeof mapper === "function") {
          return acc.concat([
            [mapper(val, this.options)].flat().filter(Boolean)
          ]);
        }
        if (val !== false) {
          return acc.concat(mapper);
        }
        return acc;
      }, []);
      return [
        this.rootCmd,
        ...args.filter(Boolean).sort().flat(),
        ...[this.path].flat()
      ].join(" ");
    }
    cast() {
      return;
    }
  }
  exports.default = FileSystemCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/fileSystem/cp.js
var require_cp = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var fileSystem_1 = __importDefault(require_fileSystem());

  class CpCommand extends fileSystem_1.default {
    constructor() {
      super(...arguments);
      this.rootCmd = "cp";
      this.argsMapper = {
        noClobber: "-n",
        symlink: "-s",
        hardLink: "-l",
        noFollowSymlinks: "-P",
        followAllSymlinks: "-L",
        followListedSymlinks: "-H",
        archive: "-a",
        recursive: (_value, options) => options.archive ? "" : "-r",
        noDereference: (_value, options) => options.archive ? "" : "-d",
        preserveTimestamps: (_value, options) => options.archive ? "" : "-p",
        preserve(value) {
          const params = value.all ? ["a"] : Object.entries(value).filter(([key, value2]) => key !== "all" && value2).map(([[char]]) => char);
          return `--preserve=${params.join("")}`;
        },
        delFirst: "-F",
        delDest: "-f",
        update: "-u",
        copyToTarget: "-t"
      };
    }
  }
  exports.default = CpCommand;
});

// node_modules/adb-ts/lib/commands/host/disconnect.js
var require_disconnect = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var ipConnect_1 = __importDefault(require_ipConnect());

  class Disconnect extends ipConnect_1.default {
    constructor(connection, host, port) {
      super(connection, "host:disconnect", host, port);
      this.Validator = /disconnected/;
    }
  }
  exports.default = Disconnect;
});

// node_modules/adb-ts/lib/filestats.js
var require_filestats = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FileStat = undefined;
  var fs_1 = import.meta.require("fs");

  class FileStat extends fs_1.Stats {
    constructor(props) {
      super();
      this.abits = props.abits;
      this.aflags = props.aflags;
      this.atime = props.atime;
      this.atimeMs = props.atimeMs;
      this.blksize = props.blksize;
      this.blocks = props.blocks;
      this.bytes = props.bytes;
      this.ctime = props.ctime;
      this.ctimeMs = props.ctimeMs;
      this.dev = props.dev;
      this.dTypeMajor = props.dTypeMajor;
      this.dTypeMinor = props.dTypeMinor;
      this.ino = props.ino;
      this.gid = props.gid;
      this.gname = props.gname;
      this.mode = props.mode;
      this.moutpoint = props.moutpoint;
      this.mtime = props.mtime;
      this.mtimeMs = props.mtimeMs;
      this.name = props.name;
      this.nlink = props.nlink;
      this.lname = props.lname;
      this.seccon = props.seccon;
      this.size = props.size;
      this.type = props.type;
      this.uid = props.uid;
      this.uname = props.uname;
    }
    isSocket() {
      return /socket/.test(this.type);
    }
    isFIFO() {
      return /fifo/.test(this.type);
    }
    isSymbolicLink() {
      return /link/.test(this.type);
    }
    isCharacterDevice() {
      return /character/.test(this.type);
    }
    isBlockDevice() {
      return /block/.test(this.type);
    }
    isDirectory() {
      return /directory/.test(this.type);
    }
    isFile() {
      return /file/.test(this.type);
    }
  }
  exports.FileStat = FileStat;
});

// node_modules/adb-ts/lib/commands/host-transport/fileStat.js
var require_fileStat = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var filestats_1 = require_filestats();
  var exec_1 = __importDefault(require_exec());
  var flags = [
    "a",
    "A",
    "b",
    "B",
    "C",
    "d",
    "D",
    "f",
    "F",
    "g",
    "G",
    "h",
    "i",
    "m",
    "n",
    "N",
    "o",
    "s",
    "t",
    "T",
    "u",
    "U",
    "x",
    "X",
    "y",
    "Y",
    "z",
    "Z"
  ];

  class FileStatCommand extends exec_1.default {
    constructor(connection, serial, path) {
      super(connection, serial);
      this.rawCmd = `stat -c "%${flags.join("\\_%")}" ${path}`;
    }
    cast(value) {
      const props = value.split("\\_");
      const parsed = {
        abits: parseInt(props[0], 8),
        aflags: props[1],
        blocks: Number(props[2]),
        bytes: Number(props[3]),
        seccon: props[4],
        dev: Number(props[5]),
        mode: parseInt(props[7], 16),
        type: props[8],
        gid: Number(props[9]),
        gname: props[10],
        nlink: Number(props[11]),
        ino: Number(props[12]),
        moutpoint: props[13],
        name: props[14],
        lname: props[15],
        blksize: Number(props[16]),
        size: Number(props[17]),
        dTypeMajor: parseInt(props[18], 16),
        dTypeMinor: parseInt(props[19], 16),
        uid: Number(props[20]),
        uname: props[21],
        atime: new Date(props[22]),
        atimeMs: Number(props[23]),
        mtime: new Date(props[24]),
        mtimeMs: Number(props[25]),
        ctime: new Date(props[26]),
        ctimeMs: Number(props[27])
      };
      return new filestats_1.FileStat(parsed);
    }
  }
  exports.default = FileStatCommand;
});

// node_modules/adb-ts/lib/commands/host-serial/forward.js
var require_forward = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var command_1 = __importDefault(require_command());

  class ForwardCommand extends command_1.default {
    constructor(connection, serial, local, remote) {
      super(connection);
      this.autoEnd = true;
      this.command = `host-serial:${serial}:forward:${local};${remote}`;
    }
    async execute() {
      await this.initAndValidateReply(this.command);
      await this.readAndValidateReply();
    }
  }
  exports.default = ForwardCommand;
});

// node_modules/adb-ts/lib/commands/abstract/value.js
var require_value = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var cmd_1 = __importDefault(require_cmd());

  class ValueCommand extends cmd_1.default {
    async execute() {
      await this.initAndValidateReply(this.Cmd);
      const value = (await this.parser.readValue()).toString().trim();
      return this.parse(value);
    }
  }
  exports.default = ValueCommand;
});

// node_modules/adb-ts/lib/commands/host-serial/getdevicepath.js
var require_getdevicepath = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var value_1 = __importDefault(require_value());

  class GetDevicePathCommand extends value_1.default {
    constructor(connection, serial) {
      super(connection);
      this.autoEnd = true;
      this.Cmd = `host-serial:${serial}:get-devpath`;
    }
    parse(value) {
      return value;
    }
  }
  exports.default = GetDevicePathCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/ipaddress.js
var require_ipaddress = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var net_1 = __importDefault(import.meta.require("net"));
  var transport_1 = __importDefault(require_transport());

  class GetIpAddressCommand extends transport_1.default {
    constructor() {
      super(...arguments);
      this.keepAlive = false;
      this.Cmd = "shell:ip route | awk '{ print $9 }'";
    }
    async postExecute() {
      return (await this.parser.readAll()).toString().split("\n").map((v) => v.trim()).filter(net_1.default.isIP);
    }
  }
  exports.default = GetIpAddressCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/getproperty.js
var require_getproperty = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var transportParseAll_1 = __importDefault(require_transportParseAll());

  class GetPropertyCommand extends transportParseAll_1.default {
    constructor(connection, serial, property) {
      super(connection, serial);
      this.Cmd = `shell:getprop ${property}`;
    }
    parse(value) {
      return (0, util_1.stringToType)(value);
    }
  }
  exports.default = GetPropertyCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/getsetting.js
var require_getsetting = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var transportParseAll_1 = __importDefault(require_transportParseAll());

  class GetSetting extends transportParseAll_1.default {
    constructor(connection, serial, mode, name) {
      super(connection, serial);
      this.Cmd = ["shell:settings get", mode, (0, util_1.escape)(name)].join(" ");
    }
    parse(value) {
      return (0, util_1.stringToType)(value);
    }
  }
  exports.default = GetSetting;
});

// node_modules/adb-ts/lib/commands/host/transport.js
var require_transport2 = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var command_1 = __importDefault(require_command());

  class HostTransportCommand extends command_1.default {
    constructor(connection, serial) {
      super(connection);
      this.autoEnd = false;
      this.serial = serial;
    }
    async execute() {
      try {
        await this.initAndValidateReply(`host:transport:${this.serial}`);
      } catch (err) {
        this.endConnection();
        throw err;
      }
    }
  }
  exports.default = HostTransportCommand;
});

// node_modules/adb-ts/lib/commands/abstract/package.js
var require_package = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class PackageCommand extends transport_1.default {
    constructor(connection, serial, packageOrPath) {
      super(connection, serial);
      this.keepAlive = false;
      this.packageOrPath = packageOrPath;
    }
    async postExecute() {
      try {
        const [, result, code] = await this.parser.searchLine(/^(Success|Failure \[(.*?)\])$/, false);
        if (result !== "Success") {
          this.throwError(code);
        }
      } finally {
        await this.parser.readAll();
      }
    }
  }
  exports.default = PackageCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/install.js
var require_install = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var package_1 = __importDefault(require_package());

  class InstallCommand extends package_1.default {
    constructor(connection, serial, apk, options, args) {
      super(connection, serial, apk);
      this.Cmd = [
        "shell:pm install",
        ...this.intentArgs(options),
        (0, util_1.escapeCompat)(apk),
        args
      ].filter(Boolean).join(" ");
    }
    throwError(code) {
      throw new Error(`${this.packageOrPath} could not be installed [${code}]`);
    }
    intentArgs(options) {
      const args = [];
      if (!options) {
        return args;
      }
      if (options.reinstall) {
        args.push("-r");
      }
      if (options.test) {
        args.push("-t");
      }
      if (options.internal) {
        args.push("-f");
      }
      if (options.allowDowngrade) {
        args.push("-d");
      }
      if (options.grandPermissions) {
        args.push("-g");
      }
      return args;
    }
  }
  exports.default = InstallCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/isinstalled.js
var require_isinstalled = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class IsInstalledCommand extends transport_1.default {
    constructor(connection, serial, pkg) {
      super(connection, serial);
      this.keepAlive = false;
      this.Cmd = `shell:pm path ${pkg} 2>/dev/null`;
    }
    postExecute() {
      return this.parser.readAscii(8).then((reply) => {
        if (reply === "package:") {
          return true;
        }
        throw this.parser.unexpected(reply, "package:");
      }, () => false);
    }
  }
  exports.default = IsInstalledCommand;
});

// node_modules/adb-ts/lib/commands/host/kill.js
var require_kill = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var command_1 = __importDefault(require_command());

  class KillCommand extends command_1.default {
    constructor() {
      super(...arguments);
      this.autoEnd = true;
    }
    endConnection() {
      this.connection.once("error", () => {
      });
      return super.endConnection();
    }
    async execute() {
      await this.initAndValidateReply("host:kill");
    }
  }
  exports.default = KillCommand;
});

// node_modules/adb-ts/lib/commands/abstract/devices.js
var require_devices = __commonJS((exports) => {
  var constructDevice = function(line) {
    const values = line.split(/\s+/);
    const [id, state] = values;
    if (!id || !state) {
      return throwUnexpected(line);
    }
    const { usb, product, model, device, transport_id } = parseProps(values.slice(2));
    if (typeof transport_id === "undefined")
      return throwUnexpected(line);
    return {
      id,
      state: /emulator/.test(id) && state === "device" ? "emulator" : state,
      path: usb,
      product,
      model,
      device,
      transportId: transport_id,
      transport: net_1.default.isIPv4(/^(.*?):([0-9]+)$/.exec(id)?.[1] || "") ? "local" : "usb"
    };
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.constructDevice = undefined;
  var net_1 = __importDefault(import.meta.require("net"));
  var util_1 = require_util();
  var command_1 = __importDefault(require_command());
  var expectedKeys = [
    "usb",
    "product",
    "model",
    "device",
    "transport_id"
  ];
  var throwUnexpected = (received) => {
    throw new util_1.UnexpectedDataError(received, `<id> <state> <${expectedKeys.join("|")}>:<value>`);
  };
  var parseProps = (values) => {
    return values.reduce((acc, curr) => {
      const match = curr.match(new RegExp(`(${expectedKeys.join("|")}):(\\S+)(?=\\s|\$)`));
      if (!match) {
        return acc;
      }
      const [key, value] = match.slice(1);
      acc[key] = value;
      return acc;
    }, {});
  };
  exports.constructDevice = constructDevice;

  class DevicesCommand extends command_1.default {
    constructor(connection, command) {
      super(connection);
      this.command = command;
    }
    parse(value) {
      return value.split("\n").filter(Boolean).map(constructDevice);
    }
    async readDevices() {
      const value = (await this.parser.readValue()).toString().trim();
      return this.parse(value);
    }
    async execute() {
      try {
        await this.initAndValidateReply(this.command);
        return this.readOnExecute ? await this.readDevices() : [];
      } catch (err) {
        this.endConnection();
        throw err;
      }
    }
  }
  exports.default = DevicesCommand;
});

// node_modules/adb-ts/lib/commands/host/listdevices.js
var require_listdevices = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var devices_1 = __importDefault(require_devices());

  class ListDevicesCommand extends devices_1.default {
    constructor(connection) {
      super(connection, "host:devices-l");
      this.autoEnd = true;
      this.readOnExecute = true;
    }
  }
  exports.default = ListDevicesCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/listfeatures.js
var require_listfeatures = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transportParseAll_1 = __importDefault(require_transportParseAll());
  var util_1 = require_util();

  class ListFeaturesCommand extends transportParseAll_1.default {
    constructor() {
      super(...arguments);
      this.Cmd = "shell:pm list features 2>/dev/null";
    }
    parse(value) {
      return (0, util_1.findMatches)(value, /^feature:(.*?)(?:=(.*?))?\r?$/gm, "map");
    }
  }
  exports.default = ListFeaturesCommand;
});

// node_modules/adb-ts/lib/commands/host-serial/listforwards.js
var require_listforwards = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var value_1 = __importDefault(require_value());

  class ListForwardsCommand extends value_1.default {
    constructor(connection, serial) {
      super(connection);
      this.autoEnd = true;
      this.Cmd = `host-serial:${serial}:list-forward`;
    }
    parse(value) {
      return (0, util_1.findMatches)(value, /([^\s]+)\s([^\s]+)\s([^\s]+)/gm).map(([serial, local, remote]) => ({
        serial,
        local,
        remote
      }));
    }
  }
  exports.default = ListForwardsCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/listpackages.js
var require_listpackages = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var transportParseAll_1 = __importDefault(require_transportParseAll());

  class ListPackagesCommand extends transportParseAll_1.default {
    constructor() {
      super(...arguments);
      this.Cmd = "shell:pm list packages 2>/dev/null";
    }
    parse(value) {
      return (0, util_1.findMatches)(value, /^package:(.*?)\r?$/gm, "list");
    }
  }
  exports.default = ListPackagesCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/listproperties.js
var require_listproperties = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var transportParseAll_1 = __importDefault(require_transportParseAll());

  class ListPropertiesCommand extends transportParseAll_1.default {
    constructor() {
      super(...arguments);
      this.Cmd = "shell:getprop";
    }
    parse(value) {
      return (0, util_1.findMatches)(value, /^\[([\s\S]*?)\]: \[([\s\S]*?)\]?$/gm, "map");
    }
  }
  exports.default = ListPropertiesCommand;
});

// node_modules/adb-ts/lib/commands/abstract/transportParseValue.js
var require_transportParseValue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class TransportParseValueCommand extends transport_1.default {
    constructor() {
      super(...arguments);
      this.keepAlive = false;
    }
    async postExecute() {
      const value = (await this.parser.readValue()).toString().trim();
      return this.parse(value);
    }
  }
  exports.default = TransportParseValueCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/listreverses.js
var require_listreverses = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var transportParseValue_1 = __importDefault(require_transportParseValue());

  class ListReversesCommand extends transportParseValue_1.default {
    constructor() {
      super(...arguments);
      this.Cmd = "reverse:list-forward";
    }
    parse(value) {
      return (0, util_1.findMatches)(value, /([^\s]+)\s([^\s]+)\s([^\s]+)/gm).map(([host, remote, local]) => ({ host, remote, local }));
    }
  }
  exports.default = ListReversesCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/listSettings.js
var require_listSettings = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var transportParseAll_1 = __importDefault(require_transportParseAll());

  class ListSettingsCommand extends transportParseAll_1.default {
    constructor(connection, serial, mode) {
      super(connection, serial);
      this.Cmd = `shell:settings list ${mode}`;
    }
    parse(value) {
      return (0, util_1.findMatches)(value, /^([\s\S]*?)=([\s\S]*?)$/gm, "map");
    }
  }
  exports.default = ListSettingsCommand;
});

// node_modules/adb-ts/lib/linetransform.js
var require_linetransform = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var stream_1 = import.meta.require("stream");

  class LineTransform extends stream_1.Transform {
    constructor(options) {
      super(options);
      this.savedR = null;
      this.transformNeeded = true;
      this.skipBytes = 0;
      this.autoDetect = options?.autoDetect || false;
    }
    nullTransform(chunk, _encoding, cb) {
      this.push(chunk);
      cb();
    }
    _transform(chunk, encoding, cb) {
      if (this.autoDetect) {
        if (chunk[0] === 10) {
          this.transformNeeded = false;
          this.skipBytes = 1;
        } else {
          this.skipBytes = 2;
        }
        this.autoDetect = false;
      }
      if (this.skipBytes) {
        const skip = Math.min(chunk.length, this.skipBytes);
        chunk = chunk.subarray(skip);
        this.skipBytes -= skip;
      }
      if (!chunk.length) {
        return cb();
      }
      if (!this.transformNeeded) {
        return this.nullTransform(chunk, encoding, cb);
      }
      let lo = 0;
      let hi = 0;
      if (this.savedR) {
        if (chunk[0] !== 10) {
          this.push(this.savedR);
        }
        this.savedR = null;
      }
      const last = chunk.length - 1;
      while (hi <= last) {
        if (chunk[hi] === 13) {
          if (hi === last) {
            this.savedR = chunk.subarray(last);
            break;
          } else if (chunk[hi + 1] === 10) {
            this.push(chunk.subarray(lo, hi));
            lo = hi + 1;
          }
        }
        hi += 1;
      }
      if (hi !== lo) {
        this.push(chunk.subarray(lo, hi));
      }
      cb();
    }
    _flush(cb) {
      if (this.savedR) {
        this.push(this.savedR);
      }
      return cb();
    }
  }
  exports.default = LineTransform;
});

// node_modules/adb-ts/lib/logcat/priority.js
var require_priority = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Priority = undefined;
  var Priority;
  (function(Priority2) {
    Priority2[Priority2["DEFAULT"] = 1] = "DEFAULT";
    Priority2[Priority2["VERBOSE"] = 2] = "VERBOSE";
    Priority2[Priority2["DEBUG"] = 3] = "DEBUG";
    Priority2[Priority2["INFO"] = 4] = "INFO";
    Priority2[Priority2["WARN"] = 5] = "WARN";
    Priority2[Priority2["ERROR"] = 6] = "ERROR";
    Priority2[Priority2["FATAL"] = 7] = "FATAL";
    Priority2[Priority2["SILENT"] = 8] = "SILENT";
  })(Priority || (exports.Priority = Priority = {}));
});

// node_modules/adb-ts/lib/logcat/entry.js
var require_entry2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LogcatEntry = undefined;
  var priority_1 = require_priority();

  class LogcatEntry {
    constructor() {
      this.date = new Date;
      this.pid = -1;
      this.tid = -1;
      this.priority = priority_1.Priority.SILENT;
      this.tag = "";
      this.message = "";
    }
    toBinary() {
      let length = 20;
      length += 1;
      length += this.tag.length;
      length += 1;
      length += this.message.length;
      length += 1;
      const buffer = Buffer.alloc(length);
      let cursor = 0;
      buffer.writeUInt16LE(length - 20, cursor);
      cursor += 4;
      buffer.writeInt32LE(this.pid, cursor);
      cursor += 4;
      buffer.writeInt32LE(this.tid, cursor);
      cursor += 4;
      buffer.writeInt32LE(Math.floor(this.date.getTime() / 1000), cursor);
      cursor += 4;
      buffer.writeInt32LE(this.date.getTime() % 1000 * 1e6, cursor);
      cursor += 4;
      buffer[cursor] = this.priority;
      cursor += 1;
      buffer.write(this.tag, cursor, this.tag.length);
      cursor += this.tag.length;
      buffer[cursor] = 0;
      cursor += 1;
      buffer.write(this.message, cursor, this.message.length);
      cursor += this.message.length;
      buffer[cursor] = 0;
      return buffer;
    }
  }
  exports.LogcatEntry = LogcatEntry;
});

// node_modules/adb-ts/lib/logcat/parser.js
var require_parser2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Parser = undefined;
  var events_1 = import.meta.require("events");

  class Parser extends events_1.EventEmitter {
  }
  exports.Parser = Parser;
});

// node_modules/adb-ts/lib/logcat/parser/binary.js
var require_binary = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Binary = undefined;
  var entry_1 = require_entry2();
  var parser_1 = require_parser2();

  class Binary extends parser_1.Parser {
    constructor() {
      super(...arguments);
      this.buffer = Buffer.alloc(0);
      this.HEADER_SIZE_V1 = 20;
      this.HEADER_SIZE_MAX = 100;
    }
    parse(chunk) {
      this.buffer = Buffer.concat([this.buffer, chunk]);
      while (this.buffer.length > 4) {
        let cursor = 0;
        const length = this.buffer.readUInt16LE(cursor);
        cursor += 2;
        let headerSize = this.buffer.readUInt16LE(cursor);
        if (headerSize < this.HEADER_SIZE_V1 || headerSize > this.HEADER_SIZE_MAX) {
          headerSize = this.HEADER_SIZE_V1;
        }
        cursor += 2;
        if (this.buffer.length < headerSize + length) {
          break;
        }
        const entry = new entry_1.LogcatEntry;
        entry.pid = this.buffer.readInt32LE(cursor);
        cursor += 4;
        entry.tid = this.buffer.readInt32LE(cursor);
        cursor += 4;
        const sec = this.buffer.readInt32LE(cursor);
        cursor += 4;
        const nsec = this.buffer.readInt32LE(cursor);
        entry.date = new Date(sec * 1000 + nsec / 1e6);
        cursor += 4;
        cursor = headerSize;
        const data = this.buffer.subarray(cursor, cursor + length);
        cursor += length;
        this.buffer = this.buffer.subarray(cursor);
        this.processEntry(entry, data);
      }
      if (this.buffer.length) {
        this.emit("wait");
      } else {
        this.emit("drain");
      }
    }
    processEntry(entry, data) {
      entry.priority = data[0];
      let cursor = 1;
      const length = data.length;
      while (cursor < length) {
        if (data[cursor] === 0) {
          entry.tag = data.subarray(1, cursor).toString();
          entry.message = data.subarray(cursor + 1, length - 1).toString();
          this.emit("entry", entry);
          return;
        }
        cursor += 1;
      }
      this.emit("error", new Error("Unprocessable entry data '" + data + "'"));
    }
    on(event, listener) {
      return super.on(event, listener);
    }
  }
  exports.Binary = Binary;
});

// node_modules/adb-ts/lib/logcat/reader.js
var require_reader = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LogcatReader = undefined;
  var util_1 = require_util();
  var streamHandler_1 = __importDefault(require_streamHandler());
  var binary_1 = require_binary();

  class LogcatReader extends streamHandler_1.default {
    constructor(options) {
      super();
      this.parser = new binary_1.Binary;
      this.stream_ = null;
      this.filter = options?.filter;
    }
    get stream() {
      if (!this.stream_) {
        throw new util_1.NotConnectedError;
      }
      return this.stream_;
    }
    hook() {
      this.stream.on("data", (data) => {
        if (Buffer.isBuffer(data)) {
          return this.parser.parse(data);
        }
        this.emit("error", new Error("Invalid data"));
      });
      this.stream.on("error", (err) => {
        this.emit("error", err);
      });
      this.stream.on("end", () => {
        this.emit("end");
      });
      this.stream.on("finish", () => {
        this.emit("finish");
      });
      this.parser.on("entry", (entry) => {
        if (!this.filter || this.filter(entry)) {
          this.emit("entry", entry);
        }
      });
      this.parser.on("error", (err) => {
        this.emit("error", err);
      });
    }
    on(event, listener) {
      return super.on(event, listener);
    }
    connect(stream) {
      this.stream_ = stream;
      this.hook();
      return this;
    }
    end() {
      this.stream.end();
    }
  }
  exports.LogcatReader = LogcatReader;
});

// node_modules/adb-ts/lib/logcat/index.js
var require_logcat = __commonJS((exports) => {
  var readStream = function(stream, options) {
    return new reader_1.LogcatReader(options).connect(stream);
  };
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.readStream = undefined;
  var reader_1 = require_reader();
  __exportStar(require_reader(), exports);
  __exportStar(require_binary(), exports);
  __exportStar(require_parser2(), exports);
  __exportStar(require_priority(), exports);
  __exportStar(require_entry2(), exports);
  exports.readStream = readStream;
});

// node_modules/adb-ts/lib/commands/host-transport/logcat.js
var require_logcat2 = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = import.meta.require("util");
  var linetransform_1 = __importDefault(require_linetransform());
  var logcat_1 = require_logcat();
  var transport_1 = __importDefault(require_transport());

  class LogcatCommand extends transport_1.default {
    constructor(connection, serial, options) {
      super(connection, serial);
      this.Cmd = "shell:echo && ";
      this.keepAlive = false;
      this.options = options;
      let cmd = "logcat -B *:I 2>/dev/null";
      if (options?.clear) {
        cmd = "logcat -c 2>/dev/null && " + cmd;
      }
      this.Cmd = `shell:echo && ${cmd}`;
    }
    async postExecute() {
      const stream = new linetransform_1.default({ autoDetect: true });
      this.connection.pipe(stream);
      await (0, util_1.promisify)((cb) => stream.once("readable", cb))();
      const logCat = (0, logcat_1.readStream)(stream, {
        filter: this.options?.filter
      });
      this.connection.on("error", (err) => logCat.emit("error", err));
      logCat.on("end", () => this.endConnection());
      return logCat;
    }
  }
  exports.default = LogcatCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/fileSystem/mkdir.js
var require_mkdir = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var fileSystem_1 = __importDefault(require_fileSystem());

  class MkDirCommand extends fileSystem_1.default {
    constructor() {
      super(...arguments);
      this.rootCmd = "mkdir";
      this.argsMapper = {
        mode: (mode) => ["-m", (0, util_1.escape)(mode)],
        parent: "-p"
      };
    }
  }
  exports.default = MkDirCommand;
});

// node_modules/adb-ts/lib/monkey/reply.js
var require_reply = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ErrReply = exports.OkReply = exports.Reply = undefined;

  class Reply {
  }
  exports.Reply = Reply;

  class OkReply extends Reply {
    constructor(value) {
      super();
      this.value = value;
    }
    isError() {
      return false;
    }
  }
  exports.OkReply = OkReply;

  class ErrReply extends Reply {
    constructor(value) {
      super();
      this.value = value;
    }
    isError() {
      return true;
    }
    toError() {
      return new Error(this.value || "Unknown error");
    }
  }
  exports.ErrReply = ErrReply;
});

// node_modules/adb-ts/lib/monkey/api.js
var require_api = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var events_1 = import.meta.require("events");

  class Api extends events_1.EventEmitter {
    getAndParse(command, parser, cb) {
      return this.sendAndParse("getvar " + command, cb, (data) => {
        if (!data) {
          return null;
        }
        if (parser.type === "number") {
          return parseFloat(data);
        }
        return data.split(parser.splitter);
      });
    }
    keyDown(keyCode, cb) {
      return this.send("key down " + keyCode, cb);
    }
    keyUp(keyCode, cb) {
      return this.send("key up " + keyCode, cb);
    }
    touchDown(x, y, cb) {
      return this.send("touch down " + x + " " + y, cb);
    }
    touchUp(x, y, cb) {
      return this.send("touch up " + x + " " + y, cb);
    }
    touchMove(x, y, cb) {
      return this.send("touch move " + x + " " + y, cb);
    }
    trackball(dx, dy, cb) {
      return this.send("trackball " + dx + " " + dy, cb);
    }
    flipOpen(cb) {
      return this.send("flip open", cb);
    }
    flipClose(cb) {
      return this.send("flip close", cb);
    }
    wake(cb) {
      return this.send("wake", cb);
    }
    tap(x, y, cb) {
      return this.send("tap " + x + " " + y, cb);
    }
    press(keyCode, cb) {
      return this.send("press " + keyCode, cb);
    }
    type(str, cb) {
      str = str.replace(/"/g, '\\"');
      if (str.indexOf(" ") === -1) {
        return this.send("type " + str, cb);
      } else {
        return this.send('type "' + str + '"', cb);
      }
    }
    list(cb) {
      return this.sendAndParse("listvar", cb, (vars) => {
        return vars?.trim().split(/\s+/g) || null;
      });
    }
    get(name, cb) {
      return this.send("getvar " + name, cb);
    }
    sleep(ms, cb) {
      return this.send("sleep " + ms, cb);
    }
    quit(cb) {
      return this.send("quit", cb);
    }
    done(cb) {
      return this.send("done", cb);
    }
    getAmCurrentAction(cb) {
      return this.get("am.current.action", cb);
    }
    getAmCurrentCategories(cb) {
      return this.getAndParse("am.current.categories", { type: "stringArray", splitter: /\s+/g }, cb);
    }
    getAmCurrentCompClass(cb) {
      return this.get("am.current.comp.class", cb);
    }
    getAmCurrentCompPackage(cb) {
      return this.get("am.current.comp.package", cb);
    }
    getAmCurrentData(cb) {
      return this.get("am.current.data", cb);
    }
    getAmCurrentPackage(cb) {
      return this.get("am.current.package", cb);
    }
    getBuildBoard(cb) {
      return this.get("build.board", cb);
    }
    getBuildBrand(cb) {
      return this.get("build.brand", cb);
    }
    getBuildCpuAbi(cb) {
      return this.get("build.cpu_abi", cb);
    }
    getBuildDevice(cb) {
      return this.get("build.device", cb);
    }
    getBuildDisplay(cb) {
      return this.get("build.display", cb);
    }
    getBuildFingerprint(cb) {
      return this.get("build.fingerprint", cb);
    }
    getBuildHost(cb) {
      return this.get("build.host", cb);
    }
    getBuildId(cb) {
      return this.get("build.id", cb);
    }
    getBuildManufacturer(cb) {
      return this.get("build.manufacturer", cb);
    }
    getBuildModel(cb) {
      return this.get("build.model", cb);
    }
    getBuildProduct(cb) {
      return this.get("build.product", cb);
    }
    getBuildTags(cb) {
      return this.getAndParse("build.tags", { type: "stringArray", splitter: "," }, cb);
    }
    getBuildType(cb) {
      return this.get("build.type", cb);
    }
    getBuildUser(cb) {
      return this.get("build.user", cb);
    }
    getBuildVersionCodename(cb) {
      return this.get("build.version.codename", cb);
    }
    getBuildVersionIncremental(cb) {
      return this.get("build.version.incremental", cb);
    }
    getBuildVersionRelease(cb) {
      return this.get("build.version.release", cb);
    }
    getBuildVersionSdk(cb) {
      return this.getAndParse("build.version.sdk", { type: "number" }, cb);
    }
    getClockMillis(cb) {
      return this.getAndParse("clock.millis", { type: "number" }, cb);
    }
    getClockRealtime(cb) {
      return this.getAndParse("clock.realtime", { type: "number" }, cb);
    }
    getClockUptime(cb) {
      return this.getAndParse("clock.uptime", { type: "number" }, cb);
    }
    getDisplayDensity(cb) {
      return this.getAndParse("display.density", { type: "number" }, cb);
    }
    getDisplayHeight(cb) {
      return this.getAndParse("display.height", { type: "number" }, cb);
    }
    getDisplayWidth(cb) {
      return this.getAndParse("display.width", { type: "number" }, cb);
    }
  }
  exports.default = Api;
});

// node_modules/adb-ts/lib/monkey/command.js
var require_command2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ParsableCommand = exports.Command = exports.BaseCommand = undefined;

  class BaseCommand {
    constructor(command, callback) {
      this.command = command;
      this.callback = callback;
    }
  }
  exports.BaseCommand = BaseCommand;

  class Command extends BaseCommand {
    isParsable() {
      return false;
    }
  }
  exports.Command = Command;

  class ParsableCommand extends BaseCommand {
    isParsable() {
      return true;
    }
    constructor(command, callback, parser) {
      super(command, callback);
      this.parser = parser;
    }
  }
  exports.ParsableCommand = ParsableCommand;
});

// node_modules/adb-ts/lib/monkey/commandqueue.js
var require_commandqueue = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CommandQueue = undefined;
  var api_1 = __importDefault(require_api());
  var command_1 = require_command2();

  class CommandQueue extends api_1.default {
    constructor(client) {
      super();
      this.commands = [];
      this.replies = [];
      this.errors = [];
      this.sent = false;
      this.client = client;
    }
    get queue() {
      return this.client.queue;
    }
    set queue(queue) {
      this.client.queue = queue;
    }
    collector(err, value, command) {
      if (err) {
        this.errors.push(`${command}: ${err.message}`);
      }
      this.replies.push(value || null);
      return this.maybeFinish();
    }
    maybeFinish() {
      if (this.client.queue.length === 0) {
        if (this.errors.length) {
          setImmediate(() => {
            this.callback?.(new Error(this.errors.join(", ")), []);
          });
        } else {
          setImmediate(() => {
            this.callback?.(null, this.replies);
          });
        }
      }
    }
    forbidReuse() {
      if (this.sent) {
        throw new Error("Reuse not supported");
      }
    }
    sendInternal(cmdConstruct) {
      this.forbidReuse();
      this.commands.push(cmdConstruct);
      return this;
    }
    sendAndParse(command, _cb, parser) {
      return this.sendInternal(new command_1.ParsableCommand(command, this.collector.bind(this), parser));
    }
    send(command) {
      return this.sendInternal(new command_1.Command(command, this.collector.bind(this)));
    }
    getCommands() {
      return this.commands.map((cmd) => cmd.command).join("\n").concat("\n");
    }
    pushCommands() {
      this.queue = [...this.queue, ...this.commands];
    }
    execute(cb) {
      this.forbidReuse();
      this.sent = true;
      this.callback = cb;
      if (this.commands.length === 0) {
        throw new Error("No commands to execute");
      }
      const commands = this.getCommands();
      this.pushCommands();
      this.commands = [];
      this.client.stream.write(commands);
    }
  }
  exports.CommandQueue = CommandQueue;
});

// node_modules/adb-ts/lib/monkey/parser.js
var require_parser3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Parser = undefined;
  var reply_1 = require_reply();
  var events_1 = import.meta.require("events");

  class Parser extends events_1.EventEmitter {
    constructor() {
      super(...arguments);
      this.column = 0;
      this.buffer = Buffer.alloc(0);
    }
    parse(chunk) {
      this.buffer = Buffer.concat([chunk]);
      while (this.column < this.buffer.length) {
        if (this.buffer[this.column] === 10) {
          this.parseLine(this.buffer.subarray(0, this.column));
          this.buffer = this.buffer.subarray(this.column + 1);
          this.column = 0;
        }
        this.column += 1;
      }
    }
    parseLine(line) {
      switch (line[0]) {
        case 79:
          if (line.length === 2) {
            this.emit("reply", new reply_1.OkReply(null));
            return;
          }
          this.emit("reply", new reply_1.OkReply(line.toString("ascii", 3)));
          return;
        case 69:
          if (line.length === 5) {
            this.emit("reply", new reply_1.ErrReply(null));
            return;
          }
          this.emit("reply", new reply_1.ErrReply(line.toString("ascii", 6)));
          return;
        default:
          this.emit("error", new SyntaxError("Unparsable line '" + line + "'"));
      }
    }
    on(event, listener) {
      return super.on(event, listener);
    }
  }
  exports.Parser = Parser;
});

// node_modules/adb-ts/lib/monkey/client.js
var require_client = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Monkey = undefined;
  var util_1 = require_util();
  var reply_1 = require_reply();
  var api_1 = __importDefault(require_api());
  var command_1 = require_command2();
  var commandqueue_1 = require_commandqueue();
  var parser_1 = require_parser3();

  class Monkey extends api_1.default {
    constructor() {
      super(...arguments);
      this.queue = [];
      this.parser = new parser_1.Parser;
      this.stream_ = null;
      this.timeout = undefined;
    }
    get stream() {
      if (!this.stream_) {
        throw new util_1.NotConnectedError;
      }
      return this.stream_;
    }
    sendInternal(commands, cmdConstruct) {
      [commands].flat().forEach((command) => {
        this.queue.push(cmdConstruct(command));
        this.stream.write(command + "\n");
      });
      this.timeout = setTimeout(() => {
        this.consume(new reply_1.ErrReply("Command failed"));
      }, 500);
      return this;
    }
    sendAndParse(commands, cb, parser) {
      return this.sendInternal(commands, (cmd) => new command_1.ParsableCommand(cmd, cb, parser));
    }
    send(commands, cb) {
      return this.sendInternal(commands, (cmd) => new command_1.Command(cmd, cb));
    }
    hook() {
      this.stream.on("data", (data) => {
        clearTimeout(this.timeout);
        return this.parser.parse(data);
      });
      this.stream.on("error", (err) => {
        clearTimeout(this.timeout);
        return this.emit("error", err);
      });
      this.stream.on("end", () => {
        clearTimeout(this.timeout);
        return this.emit("end");
      });
      this.stream.on("finish", () => {
        clearTimeout(this.timeout);
        return this.emit("finish");
      });
      this.parser.on("reply", (reply) => {
        return this.consume(reply);
      });
      this.parser.on("error", (err) => {
        return this.emit("error", err);
      });
    }
    on(event, listener) {
      return super.on(event, listener);
    }
    consume(reply) {
      const command = this.queue.shift();
      if (!command) {
        this.emit("error", new Error("Command queue depleted, but replies still coming in"));
        return;
      }
      if (reply.isError()) {
        return command.callback?.(reply.toError(), null, command.command);
      }
      if (command.isParsable()) {
        return command.callback?.(null, command.parser(reply.value), command.command);
      }
      command.callback?.(null, reply.value, command.command);
    }
    connect(param) {
      this.stream_ = param;
      this.hook();
      return this;
    }
    end(cb) {
      clearTimeout(this.timeout);
      this.stream.end(cb);
      return this;
    }
    commandQueue() {
      return new commandqueue_1.CommandQueue(this);
    }
  }
  exports.Monkey = Monkey;
});

// node_modules/adb-ts/lib/commands/host-transport/monkey.js
var require_monkey = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class MonkeyCommand extends transport_1.default {
    constructor(connection, serial, port) {
      super(connection, serial);
      this.keepAlive = true;
      this.Cmd = [
        "shell:EXTERNAL_STORAGE=/data/local/tmp monkey --port",
        port,
        "-v"
      ].join(" ");
    }
    async postExecute() {
      await this.parser.searchLine(/^:Monkey:/);
      return this.connection;
    }
  }
  exports.default = MonkeyCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/fileSystem/mv.js
var require_mv = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var fileSystem_1 = __importDefault(require_fileSystem());

  class MvCommand extends fileSystem_1.default {
    constructor() {
      super(...arguments);
      this.rootCmd = "mv";
      this.argsMapper = {
        force: "-f",
        noClobber: "-n"
      };
    }
  }
  exports.default = MvCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/putSetting.js
var require_putSetting = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var transportParseAll_1 = __importDefault(require_transportParseAll());

  class PutSetting extends transportParseAll_1.default {
    constructor(connection, serial, mode, name, value) {
      super(connection, serial);
      this.Cmd = [
        "shell:settings put",
        mode,
        (0, util_1.escape)(name),
        (0, util_1.escape)(value)
      ].join(" ");
    }
    parse(value) {
      if (!/^\s*$/.test(value)) {
        throw new Error(value);
      }
    }
  }
  exports.default = PutSetting;
});

// node_modules/adb-ts/lib/commands/host-transport/reboot.js
var require_reboot = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class RebootCommand extends transport_1.default {
    constructor() {
      super(...arguments);
      this.keepAlive = false;
      this.Cmd = "reboot:";
    }
    postExecute() {
      return;
    }
  }
  exports.default = RebootCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/remount.js
var require_remount = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transportParseAll_1 = __importDefault(require_transportParseAll());

  class RemountCommand extends transportParseAll_1.default {
    constructor() {
      super(...arguments);
      this.Cmd = "remount:";
    }
    parse(value) {
      if (/Not running as root|inaccessible|not found/.test(value)) {
        throw new Error(value);
      }
    }
  }
  exports.default = RemountCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/reverse.js
var require_reverse = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transportParseAll_1 = __importDefault(require_transportParseAll());

  class ReverseCommand extends transportParseAll_1.default {
    constructor(connection, serial, remote, local) {
      super(connection, serial);
      this.Cmd = `reverse:forward:${remote};${local}`;
    }
    parse(value) {
      return this.validateReply(value);
    }
  }
  exports.default = ReverseCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/fileSystem/rm.js
var require_rm = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var fileSystem_1 = __importDefault(require_fileSystem());

  class RmCommand extends fileSystem_1.default {
    constructor() {
      super(...arguments);
      this.rootCmd = "rm";
      this.argsMapper = {
        force: "-f",
        recursive: "-rR"
      };
    }
  }
  exports.default = RmCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/root.js
var require_root = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transportParseAll_1 = __importDefault(require_transportParseAll());

  class RootCommand extends transportParseAll_1.default {
    constructor() {
      super(...arguments);
      this.Cmd = "root:";
    }
    parse(value) {
      if (!/restarting adbd as root/.test(value)) {
        throw new Error(value);
      }
    }
  }
  exports.default = RootCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/screencap.js
var require_screencap = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var linetransform_1 = __importDefault(require_linetransform());
  var transport_1 = __importDefault(require_transport());

  class ScreencapCommand extends transport_1.default {
    constructor() {
      super(...arguments);
      this.keepAlive = false;
      this.Cmd = "shell:echo && screencap -p 2>/dev/null";
    }
    async postExecute() {
      const buffer = await this.parser.readBytes(1);
      const transform = new linetransform_1.default({
        autoDetect: true
      });
      transform.write(buffer);
      this.connection.pipe(transform);
      return new Promise((resolve, reject) => {
        const acc = [];
        transform.on("data", (data) => {
          acc.push(Buffer.from(data));
        });
        transform.once("end", () => {
          resolve(Buffer.concat(acc));
        });
        transform.once("error", reject);
      });
    }
    async execute() {
      try {
        return await super.execute();
      } catch (err) {
        if (err instanceof util_1.PrematureEOFError) {
          throw new Error("No support for the screencap command");
        }
        throw err;
      } finally {
        this.endConnection();
      }
    }
  }
  exports.default = ScreencapCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/setProperty.js
var require_setProperty = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transportParseAll_1 = __importDefault(require_transportParseAll());
  var util_1 = require_util();

  class SetProp extends transportParseAll_1.default {
    constructor(connection, serial, prop, value) {
      super(connection, serial);
      this.Cmd = ["shell:setprop"].concat([prop, value].map(util_1.escape)).join(" ");
    }
    parse(value) {
      if (!/^\s*$/.test(value)) {
        throw new Error(value);
      }
    }
  }
  exports.default = SetProp;
});

// node_modules/adb-ts/lib/commands/host-transport/shell.js
var require_shell = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var exec_1 = __importDefault(require_exec());

  class ShellCommand extends exec_1.default {
    constructor(connection, serial, command) {
      super(connection, serial);
      this.rawCmd = command;
    }
    cast(value) {
      return value;
    }
  }
  exports.default = ShellCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/deleteApk.js
var require_deleteApk = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var transport_1 = __importDefault(require_transport());

  class DeleteApk extends transport_1.default {
    constructor(connection, serial, apk) {
      super(connection, serial);
      this.keepAlive = false;
      this.Cmd = "shell:rm -f ".concat((0, util_1.escape)(apk));
    }
    async postExecute() {
      await this.parser.readAll();
    }
  }
  exports.default = DeleteApk;
});

// node_modules/adb-ts/lib/commands/host-transport/shutdown.js
var require_shutdown = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class ShutdownCommand extends transport_1.default {
    constructor() {
      super(...arguments);
      this.keepAlive = false;
      this.Cmd = "shell:reboot -p";
    }
    postExecute() {
      return;
    }
  }
  exports.default = ShutdownCommand;
});

// node_modules/adb-ts/lib/commands/abstract/startProcess.js
var require_startProcess = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var transport_1 = __importDefault(require_transport());

  class StartProcess extends transport_1.default {
    constructor(connection, serial, command, pkg, process2, options = {}) {
      super(connection, serial);
      this.keepAlive = false;
      this.Cmd = [
        command,
        ...this.intentArgs(options),
        "-n",
        (0, util_1.escape)(`${pkg}/.${process2}`),
        "--user",
        (0, util_1.escape)(options.user || 0)
      ].join(" ");
    }
    async postExecute() {
      try {
        const [, errMsg] = await this.parser.searchLine(/^Error: (.*)$/);
        throw new Error(errMsg);
      } catch (err) {
        if (!(err instanceof util_1.PrematureEOFError)) {
          throw err;
        }
      } finally {
        await this.parser.end();
      }
    }
    formatExtraType(type) {
      switch (type) {
        case "string":
          return "s";
        case "null":
          return "sn";
        case "bool":
          return "z";
        case "int":
          return "i";
        case "long":
          return "l";
        case "float":
          return "f";
        case "uri":
          return "u";
        case "component":
          return "cn";
        default:
          throw new util_1.UnexpectedDataError(type, "AdbExtraType");
      }
    }
    formatExtraObject(extra) {
      const type = this.formatExtraType(extra.type);
      if (extra.type === "null") {
        return ["--e" + type, (0, util_1.escape)(extra.key)];
      }
      if (Array.isArray(extra.value)) {
        return [
          "--e" + type + "a",
          (0, util_1.escape)(extra.key),
          extra.value.map(util_1.escape).join(",")
        ];
      }
      return ["--e" + type, (0, util_1.escape)(extra.key), (0, util_1.escape)(extra.value)];
    }
    formatExtras(extras = []) {
      return [extras].flat().map((ext) => this.formatExtraObject(ext)).flat();
    }
    keyToFlag(k) {
      switch (k) {
        case "action":
          return "-a";
        case "data":
          return "-d";
        case "mimeType":
          return "-t";
        case "category":
          return "-c";
        case "flags":
          return "-f";
        default:
          throw new util_1.UnexpectedDataError(String(k), "keyof Options");
      }
    }
    intentArgs(options) {
      return Object.entries(options).reduce((args, [k, v]) => {
        if (typeof v === "undefined") {
          return [...args];
        }
        switch (k) {
          case "extras":
            return [...args, ...this.formatExtras(options.extras)];
          case "action":
          case "data":
          case "mimeType":
          case "flags":
            return [...args, this.keyToFlag(k), (0, util_1.escape)(options[k])];
          case "category":
            return [
              ...args,
              ...[options.category].flat().map((cat) => [this.keyToFlag(k), (0, util_1.escape)(cat)].join(" "))
            ];
          default:
            return [...args];
        }
      }, []);
    }
  }
  exports.default = StartProcess;
});

// node_modules/adb-ts/lib/commands/host-transport/startActivity.js
var require_startActivity = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var startProcess_1 = __importDefault(require_startProcess());

  class StartActivityCommand extends startProcess_1.default {
    constructor(connection, serial, pkg, activity, options = {}) {
      super(connection, serial, "shell:am start", pkg, activity, options);
    }
    intentArgs(options) {
      return [...super.intentArgs(options)].concat(options.debug ? "-D" : [], options.wait ? "-W" : []);
    }
  }
  exports.default = StartActivityCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/startservice.js
var require_startservice = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var startProcess_1 = __importDefault(require_startProcess());

  class StartServiceCommand extends startProcess_1.default {
    constructor(connection, serial, pkg, service, options = {}) {
      super(connection, serial, "shell:am startservice", pkg, service, options);
      this.keepAlive = false;
      this.internalCmd = "shell:am startservice";
    }
  }
  exports.default = StartServiceCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/sync.js
var require_sync3 = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var sync_1 = require_sync2();
  var transport_1 = __importDefault(require_transport());

  class SyncCommand extends transport_1.default {
    constructor() {
      super(...arguments);
      this.Cmd = "sync:";
      this.keepAlive = true;
    }
    postExecute() {
      return new sync_1.Sync(this.connection);
    }
  }
  exports.default = SyncCommand;
});

// node_modules/adb-ts/lib/commands/abstract/raw.js
var require_raw = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class RawCommand extends transport_1.default {
    constructor() {
      super(...arguments);
      this.keepAlive = true;
    }
    postExecute() {
      return this.connection;
    }
  }
  exports.default = RawCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/tcp.js
var require_tcp = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var raw_1 = __importDefault(require_raw());

  class TcpCommand extends raw_1.default {
    constructor(connection, serial, port, host) {
      super(connection, serial);
      this.Cmd = "tcp:".concat(host ? host.concat(":", String(port)) : String(port));
    }
  }
  exports.default = TcpCommand;
});

// node_modules/adb-ts/lib/commands/abstract/restartConnection.js
var require_restartConnection = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class RestartConnection extends transport_1.default {
    constructor(connection, serial, awaiter) {
      super(connection, serial);
      this.awaiter = awaiter;
    }
    async postExecute() {
      await Promise.all([this.awaiter, this.parser.readAll()]);
    }
  }
  exports.default = RestartConnection;
});

// node_modules/adb-ts/lib/commands/host-transport/tcpip.js
var require_tcpip = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var restartConnection_1 = __importDefault(require_restartConnection());

  class TcpIpCommand extends restartConnection_1.default {
    constructor(connection, serial, awaiter, port) {
      super(connection, serial, awaiter);
      this.keepAlive = true;
      this.Cmd = `tcpip:${port}`;
    }
  }
  exports.default = TcpIpCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/fileSystem/touch.js
var require_touch = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var fileSystem_1 = __importDefault(require_fileSystem());
  var formatToTimeFlag = (value) => {
    const date = new Date(value);
    const year = date.getUTCFullYear().toString();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
    return `${year}${month}${day}${hours}${minutes}.${seconds}${milliseconds}`;
  };

  class TouchCommand extends fileSystem_1.default {
    constructor() {
      super(...arguments);
      this.rootCmd = "touch";
      this.argsMapper = {
        aTime: "-a",
        mTime: "-m",
        noCreate: "-c",
        symlink: "-h",
        date: (value) => [
          "-d",
          (0, util_1.escape)(new Date(value).toISOString())
        ],
        time: (value) => [
          "-t",
          (0, util_1.escape)(formatToTimeFlag(value))
        ],
        reference: (value) => ["-r", (0, util_1.escape)(value)]
      };
    }
  }
  exports.default = TouchCommand;
});

// node_modules/adb-ts/lib/commands/host/trackdevices.js
var require_trackdevices = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var devices_1 = __importDefault(require_devices());

  class TrackCommand extends devices_1.default {
    constructor(connection) {
      super(connection, "host:track-devices-l");
      this.autoEnd = false;
      this.readOnExecute = false;
    }
  }
  exports.default = TrackCommand;
});

// node_modules/adb-ts/lib/tracker.js
var require_tracker = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Tracker = undefined;
  var events_1 = import.meta.require("events");
  var util_1 = require_util();
  var device_1 = require_device();

  class Tracker extends events_1.EventEmitter {
    constructor(command, client) {
      super();
      this.ended = false;
      this.deviceMap = null;
      this.command = command;
      this.client = client;
      this.hook();
    }
    get Devices() {
      return Array.from(this.deviceMap?.values() || []);
    }
    async hook() {
      this.command.connection.once("end", () => this.emit("end"));
      const endConnection = async () => {
        try {
          await this.command.parser.end();
          this.command.endConnection();
        } catch (err) {
          this.emit("error", err);
        }
      };
      try {
        await this.read();
      } catch (err) {
        if (!this.ended) {
          this.emit("error", err instanceof util_1.PrematureEOFError ? new Error("Connection closed") : err);
        }
      } finally {
        endConnection();
      }
    }
    async read() {
      const list = await this.command.readDevices();
      this.update(list);
      return this.read();
    }
    update(list) {
      const newMap = list.reduce((map, d) => {
        const currentDevice = this.deviceMap?.get(d.id) || new device_1.Device(this.client, d);
        map.set(d.id, currentDevice);
        if (d.state !== currentDevice.state) {
          currentDevice.state = d.state;
          this.emit("change", currentDevice);
          return map;
        }
        if (this.deviceMap && !this.deviceMap.has(d.id)) {
          this.emit("add", currentDevice);
          return map;
        }
        return map;
      }, new Map);
      this.deviceMap?.forEach((d) => {
        if (!newMap.has(d.id)) {
          const deviceObject = { ...d };
          delete deviceObject.client;
          this.emit("remove", deviceObject);
        }
      });
      this.deviceMap = newMap;
    }
    end() {
      this.ended = true;
      this.command.endConnection();
    }
    on(event, listener) {
      return super.on(event, listener);
    }
  }
  exports.Tracker = Tracker;
});

// node_modules/adb-ts/lib/commands/host-transport/uninstall.js
var require_uninstall = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var package_1 = __importDefault(require_package());

  class UninstallCommand extends package_1.default {
    constructor(connection, serial, pkg, options) {
      super(connection, serial, pkg);
      this.Cmd = ["shell:pm uninstall"].concat(options?.keepCache ? "-k" : []).concat(pkg).join(" ");
    }
    throwError(code) {
      throw new Error(`${this.packageOrPath} could not be uninstalled [${code}]`);
    }
  }
  exports.default = UninstallCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/usb.js
var require_usb = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var restartConnection_1 = __importDefault(require_restartConnection());

  class UsbCommand extends restartConnection_1.default {
    constructor() {
      super(...arguments);
      this.keepAlive = false;
      this.Cmd = "usb:";
    }
  }
  exports.default = UsbCommand;
});

// node_modules/adb-ts/lib/commands/host/version.js
var require_version = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var command_1 = __importDefault(require_command());
  var util_1 = require_util();

  class VersionCommand extends command_1.default {
    constructor() {
      super(...arguments);
      this.autoEnd = true;
    }
    async execute() {
      const reply = await this.initExecute("host:version");
      switch (reply) {
        case util_1.Reply.OKAY: {
          const value = (await this.parser.readValue()).toString();
          return parseInt(value, 10);
        }
        case util_1.Reply.FAIL:
          throw await this.parser.readError();
        default:
          return parseInt(reply, 10);
      }
    }
  }
  exports.default = VersionCommand;
});

// node_modules/adb-ts/lib/commands/host-transport/waitBootComplete.js
var require_waitBootComplete = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var transport_1 = __importDefault(require_transport());

  class WaitBootCompleteCommand extends transport_1.default {
    constructor() {
      super(...arguments);
      this.keepAlive = false;
      this.Cmd = "shell:while getprop sys.boot_completed 2>/dev/null; do sleep 1; done";
    }
    async postExecute() {
      await this.parser.searchLine(/^1$/);
    }
  }
  exports.default = WaitBootCompleteCommand;
});

// node_modules/adb-ts/lib/commands/host/waitFor.js
var require_waitFor = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var command_1 = __importDefault(require_command());

  class WaitFor extends command_1.default {
    constructor(connection, transport, state) {
      super(connection);
      this.autoEnd = false;
      this.transport = transport;
      this.state = state;
    }
    async execute() {
      try {
        await this.initAndValidateReply(`host:wait-for-${this.transport}-${this.state}`);
        await this.readAndValidateReply();
      } finally {
        this.endConnection();
      }
    }
  }
  exports.default = WaitFor;
});

// node_modules/adb-ts/lib/commands/abstract/input.js
var require_input = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = require_util();
  var transport_1 = __importDefault(require_transport());

  class Input extends transport_1.default {
    constructor(connection, serial, source, command, args, withEscape = false) {
      super(connection, serial);
      this.keepAlive = false;
      this.Cmd = ["shell:input", source].concat(command, [args].flat().filter((a) => typeof a !== "undefined" && a !== "").map((a) => withEscape ? (0, util_1.escape)(a) : String(a))).join(" ");
    }
    postExecute() {
      return;
    }
  }
  exports.default = Input;
});

// node_modules/adb-ts/lib/commands/host-transport/input/text.js
var require_text = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var input_1 = __importDefault(require_input());

  class Text extends input_1.default {
    constructor(connection, serial, { text, source = "touchscreen" }) {
      super(connection, serial, source, "text", text, true);
    }
  }
  exports.default = Text;
});

// node_modules/adb-ts/lib/commands/host-transport/input/roll.js
var require_roll = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var input_1 = __importDefault(require_input());

  class Roll extends input_1.default {
    constructor(connection, serial, { source = "trackball", x, y }) {
      super(connection, serial, source, "roll", [x, y]);
    }
  }
  exports.default = Roll;
});

// node_modules/adb-ts/lib/commands/host-transport/input/dragAndDrop.js
var require_dragAndDrop = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var input_1 = __importDefault(require_input());

  class DragAndDrop extends input_1.default {
    constructor(connection, serial, { x1, x2, y1, y2, options: { source = "touchscreen", duration } = {} }) {
      super(connection, serial, source, "draganddrop", [
        x1,
        y1,
        x2,
        y2,
        typeof duration === "number" ? duration : ""
      ]);
    }
  }
  exports.default = DragAndDrop;
});

// node_modules/adb-ts/lib/commands/host-transport/input/swipe.js
var require_swipe = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var input_1 = __importDefault(require_input());

  class Swipe extends input_1.default {
    constructor(connection, serial, { x1, x2, y1, y2, options: { source = "touchscreen", duration } = {} }) {
      super(connection, serial, source, "swipe", [
        x1,
        y1,
        x2,
        y2,
        typeof duration === "number" ? duration : ""
      ]);
    }
  }
  exports.default = Swipe;
});

// node_modules/adb-ts/lib/commands/host-transport/input/press.js
var require_press = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var input_1 = __importDefault(require_input());

  class Press extends input_1.default {
    constructor(connection, serial, source = "trackball") {
      super(connection, serial, source, "press");
    }
  }
  exports.default = Press;
});

// node_modules/adb-ts/lib/commands/host-transport/input/keyEvent.js
var require_keyEvent = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var input_1 = __importDefault(require_input());

  class KeyEvent extends input_1.default {
    constructor(connection, serial, { options: { source = "keyboard", variant } = {}, code }) {
      super(connection, serial, source, "keyevent", [
        variant === "longpress" ? "--longpress" : variant === "doubletap" ? "--doubletap" : "",
        ...[code].flat()
      ]);
    }
  }
  exports.default = KeyEvent;
});

// node_modules/adb-ts/lib/commands/host-transport/input/tap.js
var require_tap = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var input_1 = __importDefault(require_input());

  class Tap extends input_1.default {
    constructor(connection, serial, { source = "touchscreen", x, y }) {
      super(connection, serial, source, "tap", [x, y]);
    }
  }
  exports.default = Tap;
});

// node_modules/adb-ts/lib/client.js
var require_client2 = __commonJS((exports) => {
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Client = undefined;
  var util_1 = require_util();
  var sync_1 = require_sync2();
  var child_process_1 = import.meta.require("child_process");
  var fs_1 = __importDefault(import.meta.require("fs"));
  var device_1 = require_device();
  var batteryStatus_1 = __importDefault(require_batteryStatus());
  var clear_1 = __importDefault(require_clear());
  var connect_1 = __importDefault(require_connect());
  var connection_1 = require_connection();
  var cp_1 = __importDefault(require_cp());
  var disconnect_1 = __importDefault(require_disconnect());
  var fileStat_1 = __importDefault(require_fileStat());
  var forward_1 = __importDefault(require_forward());
  var getdevicepath_1 = __importDefault(require_getdevicepath());
  var ipaddress_1 = __importDefault(require_ipaddress());
  var getproperty_1 = __importDefault(require_getproperty());
  var getsetting_1 = __importDefault(require_getsetting());
  var transport_1 = __importDefault(require_transport2());
  var install_1 = __importDefault(require_install());
  var isinstalled_1 = __importDefault(require_isinstalled());
  var kill_1 = __importDefault(require_kill());
  var listdevices_1 = __importDefault(require_listdevices());
  var listfeatures_1 = __importDefault(require_listfeatures());
  var listforwards_1 = __importDefault(require_listforwards());
  var listpackages_1 = __importDefault(require_listpackages());
  var listproperties_1 = __importDefault(require_listproperties());
  var listreverses_1 = __importDefault(require_listreverses());
  var listSettings_1 = __importDefault(require_listSettings());
  var logcat_1 = __importDefault(require_logcat2());
  var mkdir_1 = __importDefault(require_mkdir());
  var client_1 = require_client();
  var monkey_2 = __importDefault(require_monkey());
  var mv_1 = __importDefault(require_mv());
  var putSetting_1 = __importDefault(require_putSetting());
  var stream_1 = import.meta.require("stream");
  var reboot_1 = __importDefault(require_reboot());
  var remount_1 = __importDefault(require_remount());
  var reverse_1 = __importDefault(require_reverse());
  var rm_1 = __importDefault(require_rm());
  var root_1 = __importDefault(require_root());
  var screencap_1 = __importDefault(require_screencap());
  var setProperty_1 = __importDefault(require_setProperty());
  var shell_1 = __importDefault(require_shell());
  var deleteApk_1 = __importDefault(require_deleteApk());
  var shutdown_1 = __importDefault(require_shutdown());
  var startActivity_1 = __importDefault(require_startActivity());
  var startservice_1 = __importDefault(require_startservice());
  var sync_2 = __importDefault(require_sync3());
  var tcp_1 = __importDefault(require_tcp());
  var tcpip_1 = __importDefault(require_tcpip());
  var touch_1 = __importDefault(require_touch());
  var trackdevices_1 = __importDefault(require_trackdevices());
  var tracker_1 = require_tracker();
  var uninstall_1 = __importDefault(require_uninstall());
  var usb_1 = __importDefault(require_usb());
  var version_1 = __importDefault(require_version());
  var waitBootComplete_1 = __importDefault(require_waitBootComplete());
  var waitFor_1 = __importDefault(require_waitFor());
  var util_2 = import.meta.require("util");
  var promises_1 = __importDefault(import.meta.require("timers/promises"));
  var text_1 = __importDefault(require_text());
  var roll_1 = __importDefault(require_roll());
  var dragAndDrop_1 = __importDefault(require_dragAndDrop());
  var swipe_1 = __importDefault(require_swipe());
  var press_1 = __importDefault(require_press());
  var keyEvent_1 = __importDefault(require_keyEvent());
  var tap_1 = __importDefault(require_tap());
  var ADB_DEFAULT_PORT = 5555;
  var DEFAULT_OPTIONS = {
    port: 5037,
    host: "127.0.0.1",
    bin: "adb",
    noAutoStart: false
  };

  class Client {
    constructor(options) {
      this.options = Object.entries(options || {}).filter(([, value]) => typeof value !== "undefined").reduce((def, [key, value]) => ({ ...def, [key]: value }), DEFAULT_OPTIONS);
    }
    startServer() {
      const port = this.options.port;
      const args = ["-P", port.toString(), "start-server"];
      return (0, util_2.promisify)((cb_) => (0, child_process_1.execFile)(this.options.bin, args, (err) => cb_(err)))();
    }
    connection() {
      return new Promise((resolve, reject) => {
        let triedStarting = false;
        const connection = new connection_1.Connection;
        const errorListener = async (err) => {
          if (err.code === "ECONNREFUSED" && !triedStarting && !this.options.noAutoStart) {
            triedStarting = true;
            await this.startServer();
            connection.connect(this.options);
            return;
          }
          connection.destroy();
          return reject(err);
        };
        connection.on("error", errorListener);
        connection.once("connect", () => {
          connection.off("error", errorListener);
          return resolve(connection);
        });
        connection.connect(this.options);
      });
    }
    async transport(serial) {
      const conn = await this.connection();
      await new transport_1.default(conn, serial).execute();
      return conn;
    }
    async version() {
      return new version_1.default(await this.connection()).execute();
    }
    async ipConnect(Construct, host, port) {
      if (host.indexOf(":") !== -1) {
        const [h, p] = host.split(":", 2);
        host = h;
        port = parseInt(p);
      }
      const conn = await this.connection();
      return new Construct(conn, host, (0, util_1.parsePrimitiveParam)(ADB_DEFAULT_PORT, port)).execute();
    }
    connect(host, port) {
      return this.ipConnect(connect_1.default, host, port);
    }
    disconnect(host, port) {
      return this.ipConnect(disconnect_1.default, host, port);
    }
    async listDevices() {
      return new listdevices_1.default(await this.connection()).execute();
    }
    async trackDevices() {
      const conn = await this.connection();
      const command = new trackdevices_1.default(conn);
      await command.execute();
      return new tracker_1.Tracker(command, this);
    }
    async kill() {
      let connection;
      try {
        connection = await this.connection();
      } catch (error) {
        if (error?.code === "ECONNREFUSED") {
          return;
        }
        throw error;
      }
      return new kill_1.default(connection).execute();
    }
    async getSerialNo(serial) {
      const serialNo = await this.getProp(serial, "ro.serialno");
      return String(serialNo);
    }
    async getDevicePath(serial) {
      return new getdevicepath_1.default(await this.connection(), serial).execute();
    }
    async listProperties(serial) {
      return new listproperties_1.default(await this.connection(), serial).execute();
    }
    async listFeatures(serial) {
      return new listfeatures_1.default(await this.connection(), serial).execute();
    }
    async listPackages(serial) {
      return new listpackages_1.default(await this.connection(), serial).execute();
    }
    async getIpAddress(serial) {
      return new ipaddress_1.default(await this.connection(), serial).execute();
    }
    async forward(serial, local, remote) {
      return new forward_1.default(await this.connection(), serial, local, remote).execute();
    }
    async listForwards(serial) {
      return new listforwards_1.default(await this.connection(), serial).execute();
    }
    async reverse(serial, local, remote) {
      return new reverse_1.default(await this.connection(), serial, local, remote).execute();
    }
    async listReverses(serial) {
      return new listreverses_1.default(await this.connection(), serial).execute();
    }
    async deleteApk(serial, pathToApk) {
      return new deleteApk_1.default(await this.connection(), serial, pathToApk).execute();
    }
    async reboot(serial) {
      return new reboot_1.default(await this.connection(), serial).execute();
    }
    async shutdown(serial) {
      return new shutdown_1.default(await this.connection(), serial).execute();
    }
    async remount(serial) {
      return new remount_1.default(await this.connection(), serial).execute();
    }
    async root(serial) {
      return new root_1.default(await this.connection(), serial).execute();
    }
    async screenshot(serial) {
      return new screencap_1.default(await this.connection(), serial).execute();
    }
    async openTcp(serial, port, host) {
      return new tcp_1.default(await this.connection(), serial, port, host).execute();
    }
    async roll(serial, x, y, source) {
      return new roll_1.default(await this.connection(), serial, {
        source,
        x,
        y
      }).execute();
    }
    async press(serial, source) {
      return new press_1.default(await this.connection(), serial, source).execute();
    }
    async dragAndDrop(serial, x1, y1, x2, y2, options) {
      return new dragAndDrop_1.default(await this.connection(), serial, {
        x1,
        y1,
        x2,
        y2,
        options
      }).execute();
    }
    async swipe(serial, x1, y1, x2, y2, options) {
      return new swipe_1.default(await this.connection(), serial, {
        x1,
        y1,
        x2,
        y2,
        options
      }).execute();
    }
    async keyEvent(serial, code, options) {
      return new keyEvent_1.default(await this.connection(), serial, {
        options,
        code
      }).execute();
    }
    async tap(serial, x, y, source) {
      return new tap_1.default(await this.connection(), serial, {
        source,
        x,
        y
      }).execute();
    }
    async text(serial, text, source) {
      return new text_1.default(await this.connection(), serial, {
        source,
        text
      }).execute();
    }
    async openLogcat(serial, options) {
      return new logcat_1.default(await this.connection(), serial, options).execute();
    }
    syncService(serial) {
      return this.connection().then((conn) => {
        return new sync_2.default(conn, serial).execute();
      });
    }
    async clear(serial, pkg) {
      return new clear_1.default(await this.connection(), serial, pkg).execute();
    }
    async installRemote(serial, apk, options, args) {
      await new install_1.default(await this.connection(), serial, apk, options, args).execute();
      return this.deleteApk(serial, apk);
    }
    async install(serial, apk, options, args) {
      const temp = sync_1.Sync.temp(typeof apk === "string" ? apk : "_stream.apk");
      return (0, util_1.autoUnregister)(await this.push(serial, apk, temp), (transfer) => new Promise((resolve, reject) => {
        transfer.on("error", reject).on("end", () => {
          this.installRemote(serial, temp, options, args).then(resolve).catch(reject);
        });
      }));
    }
    async uninstall(serial, pkg, options) {
      return new uninstall_1.default(await this.connection(), serial, pkg, options).execute();
    }
    async isInstalled(serial, pkg) {
      return new isinstalled_1.default(await this.connection(), serial, pkg).execute();
    }
    async startActivity(serial, pkg, activity, options) {
      return new startActivity_1.default(await this.connection(), serial, pkg, activity, options).execute();
    }
    async startService(serial, pkg, service, options) {
      return new startservice_1.default(await this.connection(), serial, pkg, service, options).execute();
    }
    async readDir(serial, path) {
      const sync = await this.syncService(serial);
      try {
        return await sync.readDir(path);
      } finally {
        sync.end();
      }
    }
    async pull(serial, path) {
      const sync = await this.syncService(serial);
      return sync.pull(path).on("end", () => sync.end());
    }
    async push(serial, srcPath, destPath, mode) {
      const sync = await this.syncService(serial);
      return sync.push(srcPath, destPath, mode).on("end", () => sync.end());
    }
    async awaitActiveDevice(serial) {
      const track = (tracker2) => {
        return new Promise((resolve, reject) => {
          const activeDeviceListener = (device) => {
            if (device.id === serial && (device.state === "device" || device.state === "emulator")) {
              resolve();
            }
          };
          tracker2.once("error", reject);
          tracker2.once("remove", (device) => {
            if (device.id === serial) {
              tracker2.once("add", activeDeviceListener);
              tracker2.once("change", activeDeviceListener);
            }
          });
        });
      };
      const tracker = await this.trackDevices();
      try {
        return await Promise.race([
          promises_1.default.setTimeout(5000, undefined, { ref: false }),
          track(tracker)
        ]);
      } finally {
        tracker.end();
      }
    }
    async tcpip(serial, port) {
      return new tcpip_1.default(await this.connection(), serial, this.awaitActiveDevice(serial), (0, util_1.parsePrimitiveParam)(ADB_DEFAULT_PORT, port)).execute();
    }
    async usb(serial) {
      return new usb_1.default(await this.connection(), serial, this.awaitActiveDevice(serial)).execute();
    }
    async waitBootComplete(serial) {
      return new waitBootComplete_1.default(await this.connection(), serial).execute();
    }
    async waitFor(transport, state) {
      return new waitFor_1.default(await this.connection(), transport, state).execute();
    }
    async map(mapper) {
      const devices = await this.listDevices();
      return Promise.all(devices.map((device) => mapper(new device_1.Device(this, device))));
    }
    async pushInternal(serial, data, dest) {
      const transfer = await this.push(serial, data, dest);
      return new Promise((resolve, reject) => {
        transfer.once("end", resolve);
        transfer.once("error", reject);
      });
    }
    pushDataToFile(serial, data, destPath) {
      return this.pushInternal(serial, stream_1.Readable.from(typeof data === "string" ? Buffer.from(data, "utf-8") : data), destPath);
    }
    pushFile(serial, srcPath, destPath) {
      return this.pushInternal(serial, srcPath, destPath);
    }
    async pullDataFromFile(serial, srcPath) {
      const transfer = await this.pull(serial, srcPath);
      return new Promise((resolve, reject) => {
        const chunks = [];
        transfer.on("data", (chunk) => {
          Buffer.isBuffer(chunk) && chunks.push(chunk);
        });
        transfer.on("end", () => resolve(Buffer.concat(chunks)));
        transfer.on("error", reject);
      });
    }
    async pullFile(serial, srcPath, destPath) {
      return (0, util_1.autoUnregister)(this.pull(serial, srcPath), (transfer) => new Promise((resolve, reject) => {
        transfer.once("readable", () => transfer.pipe(fs_1.default.createWriteStream(destPath))).once("end", resolve).once("error", reject);
      }));
    }
    async setProp(serial, prop, value) {
      return new setProperty_1.default(await this.connection(), serial, prop, value).execute();
    }
    async getProp(serial, prop) {
      return new getproperty_1.default(await this.connection(), serial, prop).execute();
    }
    async putSetting(serial, mode, name, value) {
      return new putSetting_1.default(await this.connection(), serial, mode, name, value).execute();
    }
    async listSettings(serial, mode) {
      return new listSettings_1.default(await this.connection(), serial, mode).execute();
    }
    async getSetting(serial, mode, name) {
      return new getsetting_1.default(await this.connection(), serial, mode, name).execute();
    }
    async shell(serial, command) {
      return new shell_1.default(await this.connection(), serial, command).execute();
    }
    async custom(CustomCommand, ...args) {
      const conn = await this.connection();
      return new CustomCommand(conn, ...args).execute();
    }
    async customTransport(CustomCommand, serial, ...args) {
      const conn = await this.connection();
      return new CustomCommand(conn, serial, ...args).execute();
    }
    openMonkey(serial) {
      const tryConnect = async (times) => {
        try {
          const stream = await this.openTcp(serial, 1080);
          return new client_1.Monkey().connect(stream);
        } catch (err) {
          if (times -= 1) {
            await promises_1.default.setTimeout(100);
            return tryConnect(times);
          }
          throw err;
        }
      };
      const establishConnection = async (attempts) => {
        const tryConnectHandler = async (conn, monkey) => {
          await promises_1.default.setTimeout(100);
          const hookMonkey = async () => {
            return monkey.once("end", () => conn.end());
          };
          if (monkey.stream.readyState !== "closed") {
            return hookMonkey();
          }
          conn.end();
          return attempts === 0 ? hookMonkey() : establishConnection(attempts - 1);
        };
        const transport = await this.transport(serial);
        const conn_2 = await new monkey_2.default(transport, serial, 1080).execute();
        return tryConnect(20).then((monkey_1) => tryConnectHandler(conn_2, monkey_1), (err) => {
          conn_2.end();
          throw err;
        });
      };
      return establishConnection(3);
    }
    async killApp(serial, pkg) {
      await this.shell(serial, `am force-stop ${pkg}`);
    }
    execInternal(...args) {
      return new Promise((resolve, reject) => {
        (0, child_process_1.execFile)(this.options.bin, args, (err, stdout, stderr) => {
          if (err) {
            return reject(err);
          }
          if (stderr && !stdout) {
            return reject(new util_1.AdbExecError(stderr.trim(), args.join(" ")));
          }
          if (/Error/.test(stdout)) {
            return reject(new util_1.AdbExecError(stdout.trim(), args.join(" ")));
          }
          return resolve(stdout);
        });
      });
    }
    exec(cmd) {
      return this.execInternal(cmd);
    }
    execDevice(serial, cmd) {
      return this.execInternal(...["-s", serial, cmd]);
    }
    execDeviceShell(serial, cmd) {
      return this.execInternal(...["-s", serial, "shell", cmd]);
    }
    async batteryStatus(serial) {
      return new batteryStatus_1.default(await this.connection(), serial).execute();
    }
    async rm(serial, path, options) {
      return new rm_1.default(await this.connection(), serial, path, options).execute();
    }
    async mkdir(serial, path, options) {
      return new mkdir_1.default(await this.connection(), serial, path, options).execute();
    }
    async touch(serial, path, options) {
      return new touch_1.default(await this.connection(), serial, path, options).execute();
    }
    async mv(serial, srcPath, destPath, options) {
      return new mv_1.default(await this.connection(), serial, [srcPath, destPath], options).execute();
    }
    async cp(serial, srcPath, destPath, options) {
      return new cp_1.default(await this.connection(), serial, [srcPath, destPath], options).execute();
    }
    async fileStat(serial, path) {
      return new fileStat_1.default(await this.connection(), serial, path).execute();
    }
  }
  exports.Client = Client;
});

// node_modules/adb-ts/lib/index.js
var require_lib = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Connection = exports.Priority = exports.Tracker = exports.Device = exports.Client = exports.Commands = exports.Util = undefined;
  exports.Util = __importStar(require_util());
  exports.Commands = __importStar(require_indexDocs());
  var client_1 = require_client2();
  Object.defineProperty(exports, "Client", { enumerable: true, get: function() {
    return client_1.Client;
  } });
  var device_1 = require_device();
  Object.defineProperty(exports, "Device", { enumerable: true, get: function() {
    return device_1.Device;
  } });
  var tracker_1 = require_tracker();
  Object.defineProperty(exports, "Tracker", { enumerable: true, get: function() {
    return tracker_1.Tracker;
  } });
  var logcat_1 = require_logcat();
  Object.defineProperty(exports, "Priority", { enumerable: true, get: function() {
    return logcat_1.Priority;
  } });
  var connection_1 = require_connection();
  Object.defineProperty(exports, "Connection", { enumerable: true, get: function() {
    return connection_1.Connection;
  } });
});

// node_modules/isexe/windows.js
var require_windows = __commonJS((exports, module) => {
  var checkPathExt = function(path, options) {
    var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;
    if (!pathext) {
      return true;
    }
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) {
      return true;
    }
    for (var i = 0;i < pathext.length; i++) {
      var p = pathext[i].toLowerCase();
      if (p && path.substr(-p.length).toLowerCase() === p) {
        return true;
      }
    }
    return false;
  };
  var checkStat = function(stat, path, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false;
    }
    return checkPathExt(path, options);
  };
  var isexe = function(path, options, cb) {
    fs.stat(path, function(er, stat) {
      cb(er, er ? false : checkStat(stat, path, options));
    });
  };
  var sync = function(path, options) {
    return checkStat(fs.statSync(path), path, options);
  };
  module.exports = isexe;
  isexe.sync = sync;
  var fs = import.meta.require("fs");
});

// node_modules/isexe/mode.js
var require_mode = __commonJS((exports, module) => {
  var isexe = function(path, options, cb) {
    fs.stat(path, function(er, stat) {
      cb(er, er ? false : checkStat(stat, options));
    });
  };
  var sync = function(path, options) {
    return checkStat(fs.statSync(path), options);
  };
  var checkStat = function(stat, options) {
    return stat.isFile() && checkMode(stat, options);
  };
  var checkMode = function(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== undefined ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== undefined ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g = parseInt("010", 8);
    var o = parseInt("001", 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
  };
  module.exports = isexe;
  isexe.sync = sync;
  var fs = import.meta.require("fs");
});

// node_modules/isexe/index.js
var require_isexe = __commonJS((exports, module) => {
  var isexe = function(path, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    if (!cb) {
      if (typeof Promise !== "function") {
        throw new TypeError("callback not provided");
      }
      return new Promise(function(resolve, reject) {
        isexe(path, options || {}, function(er, is) {
          if (er) {
            reject(er);
          } else {
            resolve(is);
          }
        });
      });
    }
    core(path, options || {}, function(er, is) {
      if (er) {
        if (er.code === "EACCES" || options && options.ignoreErrors) {
          er = null;
          is = false;
        }
      }
      cb(er, is);
    });
  };
  var sync = function(path, options) {
    try {
      return core.sync(path, options || {});
    } catch (er) {
      if (options && options.ignoreErrors || er.code === "EACCES") {
        return false;
      } else {
        throw er;
      }
    }
  };
  var fs = import.meta.require("fs");
  var core;
  if (process.platform === "win32" || global.TESTING_WINDOWS) {
    core = require_windows();
  } else {
    core = require_mode();
  }
  module.exports = isexe;
  isexe.sync = sync;
});

// node_modules/which/which.js
var require_which = __commonJS((exports, module) => {
  var getNotFoundError = function(cmd) {
    var er = new Error("not found: " + cmd);
    er.code = "ENOENT";
    return er;
  };
  var getPathInfo = function(cmd, opt) {
    var colon = opt.colon || COLON;
    var pathEnv = opt.path || "/home/wolf/Documents/projects/Browser-Phone/backend/node_modules/.bin:/home/wolf/Documents/projects/Browser-Phone/backend/node_modules/.bin:/home/wolf/Documents/projects/Browser-Phone/node_modules/.bin:/home/wolf/Documents/projects/node_modules/.bin:/home/wolf/Documents/node_modules/.bin:/home/wolf/node_modules/.bin:/home/node_modules/.bin:/node_modules/.bin:/nix/store/688b52ijixzb0jwlxz93cyiyxibp7qlh-bun-1.1.20/bin:/nix/store/zi8gf3cg2791z7hygzy2xdxgn31xab08-vlc-3.0.21/bin:/nix/store/z41pwr5s44hwggzmpgwyk8k4ls5r5p0n-tcpdump-4.99.4/bin:/nix/store/260zkk392hf4m3jx9dl5bjgm1rgjbbha-scrcpy-2.5/bin:/nix/store/46c284cqdgia0dxzmi8rs5vzwszxalwg-janus-gateway-1.2.3/bin:/nix/store/x7bvgmgzvgazg6w0dkna8kzfnh7bnl3x-ffmpeg-full-7.0.1-bin/bin:/nix/store/k4y302qqj084y2rcwg61fgdp5nifasxq-android-tools-35.0.1/bin:/nix/store/l3j80jx204h286iikc363i07dpsfzspm-python3-3.12.4-env/bin:/nix/store/bl73aw7b0vw3x2d6b46i3k0j3kxg9469-android-studio-stable-2024.1.1.12/bin:/nix/store/dv5vgsw8naxnkcc88x78vprbnn1pp44y-patchelf-0.15.0/bin:/nix/store/62zpnw69ylcfhcpy1di8152zlzmbls91-gcc-wrapper-13.3.0/bin:/nix/store/zw4dkm2hl72kfz7j2ci4qbc0avgxzz75-gcc-13.3.0/bin:/nix/store/xfk033jdxdc5758wrpb0h2w462zlsb73-glibc-2.39-52-bin/bin:/nix/store/cnknp3yxfibxjhila0sjd1v3yglqssng-coreutils-9.5/bin:/nix/store/pg90p34kys2famxnq7925sbgj4jrnsi8-binutils-wrapper-2.42/bin:/nix/store/qsx2xqqm0lp6d8hi86r4y0rz5v9m62wn-binutils-2.42/bin:/nix/store/5my5b6mw7h9hxqknvggjla1ci165ly21-findutils-4.10.0/bin:/nix/store/fy6s9lk05yjl1cz2dl8gs0sjrd6h9w5f-diffutils-3.10/bin:/nix/store/9zsm74npdqq2lgjzavlzaqrz8x44mq9d-gnused-4.9/bin:/nix/store/k8zpadqbwqwalggnhqi74gdgrlf3if9l-gnugrep-3.11/bin:/nix/store/2ywpssz17pj0vr4vj7by6aqx2gk01593-gawk-5.2.2/bin:/nix/store/nzzl7dnay9jzgfv9fbwg1zza6ji7bjvr-gnutar-1.35/bin:/nix/store/7m0l19yg0cb1c29wl54y24bbxsd85f4s-gzip-1.13/bin:/nix/store/cx1220ll0pgq6svfq7bmhpdzp0avs09w-bzip2-1.0.8-bin/bin:/nix/store/70anjdzz5rj9lcamll62lvp5ib3yqzzr-gnumake-4.4.1/bin:/nix/store/i1x9sidnvhhbbha2zhgpxkhpysw6ajmr-bash-5.2p26/bin:/nix/store/6rv8ckk0hg6s6q2zay2aaxgirrdy4l6v-patch-2.7.6/bin:/nix/store/xzdawyw3njki7gx2yx4bkmhdzymgjawm-xz-5.6.2-bin/bin:/nix/store/rnndls2fiid1sic81i06dkqjhh24lpvr-file-5.45/bin:/home/wolf/Documents/projects/Browser-Phone/.direnv/bin:/nix/store/qvcadl44m5ilxz7vxcc05zlhnybrqqpf-kitty-0.35.2/bin:/nix/store/71cnyj0ri2khpaxh7n6yz3d8zjak6xzm-imagemagick-7.1.1-34/bin:/nix/store/wdpbay39lcqhc7yp1472f33lgjiai7x0-ncurses-6.4.20221231-dev/bin:/run/wrappers/bin:/home/wolf/.nix-profile/bin:/nix/profile/bin:/home/wolf/.local/state/nix/profile/bin:/etc/profiles/per-user/wolf/bin:/nix/var/nix/profiles/default/bin:/run/current-system/sw/bin:/home/wolf/.zsh/plugins/zsh-nix-shell:/nix/store/l46fjkzva0bhvy9p2r7p4vi68kr7a1db-binutils-wrapper-2.41/bin:/nix/store/waw7qn0gfhk1d71xcbmmcvmlg0q7gxgy-pciutils-3.12.0/bin:/nix/store/x2g0b5qsk2yfz74dnlm068rfar0fihxs-pkgconf-wrapper-2.2.0/bin:/nix/store/1np758khqvk2fzgcskgj1rh2czvmzpcp-python3.11-powerline-2.8.3/bin";
    var pathExt = [""];
    pathEnv = pathEnv.split(colon);
    var pathExtExe = "";
    if (isWindows) {
      pathEnv.unshift(process.cwd());
      pathExtExe = opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM";
      pathExt = pathExtExe.split(colon);
      if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
        pathExt.unshift("");
    }
    if (cmd.match(/\//) || isWindows && cmd.match(/\\/))
      pathEnv = [""];
    return {
      env: pathEnv,
      ext: pathExt,
      extExe: pathExtExe
    };
  };
  var which = function(cmd, opt, cb) {
    if (typeof opt === "function") {
      cb = opt;
      opt = {};
    }
    var info = getPathInfo(cmd, opt);
    var pathEnv = info.env;
    var pathExt = info.ext;
    var pathExtExe = info.extExe;
    var found = [];
    (function F(i, l) {
      if (i === l) {
        if (opt.all && found.length)
          return cb(null, found);
        else
          return cb(getNotFoundError(cmd));
      }
      var pathPart = pathEnv[i];
      if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
        pathPart = pathPart.slice(1, -1);
      var p = path.join(pathPart, cmd);
      if (!pathPart && /^\.[\\\/]/.test(cmd)) {
        p = cmd.slice(0, 2) + p;
      }
      (function E(ii, ll) {
        if (ii === ll)
          return F(i + 1, l);
        var ext = pathExt[ii];
        isexe(p + ext, { pathExt: pathExtExe }, function(er, is) {
          if (!er && is) {
            if (opt.all)
              found.push(p + ext);
            else
              return cb(null, p + ext);
          }
          return E(ii + 1, ll);
        });
      })(0, pathExt.length);
    })(0, pathEnv.length);
  };
  var whichSync = function(cmd, opt) {
    opt = opt || {};
    var info = getPathInfo(cmd, opt);
    var pathEnv = info.env;
    var pathExt = info.ext;
    var pathExtExe = info.extExe;
    var found = [];
    for (var i = 0, l = pathEnv.length;i < l; i++) {
      var pathPart = pathEnv[i];
      if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
        pathPart = pathPart.slice(1, -1);
      var p = path.join(pathPart, cmd);
      if (!pathPart && /^\.[\\\/]/.test(cmd)) {
        p = cmd.slice(0, 2) + p;
      }
      for (var j = 0, ll = pathExt.length;j < ll; j++) {
        var cur = p + pathExt[j];
        var is;
        try {
          is = isexe.sync(cur, { pathExt: pathExtExe });
          if (is) {
            if (opt.all)
              found.push(cur);
            else
              return cur;
          }
        } catch (ex) {
        }
      }
    }
    if (opt.all && found.length)
      return found;
    if (opt.nothrow)
      return null;
    throw getNotFoundError(cmd);
  };
  module.exports = which;
  which.sync = whichSync;
  var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
  var path = import.meta.require("path");
  var COLON = isWindows ? ";" : ":";
  var isexe = require_isexe();
});

// node_modules/fluent-ffmpeg/lib/utils.js
var require_utils = __commonJS((exports, module) => {
  var parseProgressLine = function(line) {
    var progress = {};
    line = line.replace(/=\s+/g, "=").trim();
    var progressParts = line.split(" ");
    for (var i = 0;i < progressParts.length; i++) {
      var progressSplit = progressParts[i].split("=", 2);
      var key = progressSplit[0];
      var value = progressSplit[1];
      if (typeof value === "undefined")
        return null;
      progress[key] = value;
    }
    return progress;
  };
  var exec = import.meta.require("child_process").exec;
  var isWindows = import.meta.require("os").platform().match(/win(32|64)/);
  var which = require_which();
  var nlRegexp = /\r\n|\r|\n/g;
  var streamRegexp = /^\[?(.*?)\]?$/;
  var filterEscapeRegexp = /[,]/;
  var whichCache = {};
  var utils = module.exports = {
    isWindows,
    streamRegexp,
    copy: function(source, dest) {
      Object.keys(source).forEach(function(key) {
        dest[key] = source[key];
      });
    },
    args: function() {
      var list = [];
      var argfunc = function() {
        if (arguments.length === 1 && Array.isArray(arguments[0])) {
          list = list.concat(arguments[0]);
        } else {
          list = list.concat([].slice.call(arguments));
        }
      };
      argfunc.clear = function() {
        list = [];
      };
      argfunc.get = function() {
        return list;
      };
      argfunc.find = function(arg, count) {
        var index = list.indexOf(arg);
        if (index !== -1) {
          return list.slice(index + 1, index + 1 + (count || 0));
        }
      };
      argfunc.remove = function(arg, count) {
        var index = list.indexOf(arg);
        if (index !== -1) {
          list.splice(index, (count || 0) + 1);
        }
      };
      argfunc.clone = function() {
        var cloned = utils.args();
        cloned(list);
        return cloned;
      };
      return argfunc;
    },
    makeFilterStrings: function(filters) {
      return filters.map(function(filterSpec) {
        if (typeof filterSpec === "string") {
          return filterSpec;
        }
        var filterString = "";
        if (Array.isArray(filterSpec.inputs)) {
          filterString += filterSpec.inputs.map(function(streamSpec) {
            return streamSpec.replace(streamRegexp, "[$1]");
          }).join("");
        } else if (typeof filterSpec.inputs === "string") {
          filterString += filterSpec.inputs.replace(streamRegexp, "[$1]");
        }
        filterString += filterSpec.filter;
        if (filterSpec.options) {
          if (typeof filterSpec.options === "string" || typeof filterSpec.options === "number") {
            filterString += "=" + filterSpec.options;
          } else if (Array.isArray(filterSpec.options)) {
            filterString += "=" + filterSpec.options.map(function(option) {
              if (typeof option === "string" && option.match(filterEscapeRegexp)) {
                return "\'" + option + "\'";
              } else {
                return option;
              }
            }).join(":");
          } else if (Object.keys(filterSpec.options).length) {
            filterString += "=" + Object.keys(filterSpec.options).map(function(option) {
              var value = filterSpec.options[option];
              if (typeof value === "string" && value.match(filterEscapeRegexp)) {
                value = "\'" + value + "\'";
              }
              return option + "=" + value;
            }).join(":");
          }
        }
        if (Array.isArray(filterSpec.outputs)) {
          filterString += filterSpec.outputs.map(function(streamSpec) {
            return streamSpec.replace(streamRegexp, "[$1]");
          }).join("");
        } else if (typeof filterSpec.outputs === "string") {
          filterString += filterSpec.outputs.replace(streamRegexp, "[$1]");
        }
        return filterString;
      });
    },
    which: function(name, callback) {
      if (name in whichCache) {
        return callback(null, whichCache[name]);
      }
      which(name, function(err, result) {
        if (err) {
          return callback(null, whichCache[name] = "");
        }
        callback(null, whichCache[name] = result);
      });
    },
    timemarkToSeconds: function(timemark) {
      if (typeof timemark === "number") {
        return timemark;
      }
      if (timemark.indexOf(":") === -1 && timemark.indexOf(".") >= 0) {
        return Number(timemark);
      }
      var parts = timemark.split(":");
      var secs = Number(parts.pop());
      if (parts.length) {
        secs += Number(parts.pop()) * 60;
      }
      if (parts.length) {
        secs += Number(parts.pop()) * 3600;
      }
      return secs;
    },
    extractCodecData: function(command, stderrLine, codecsObject) {
      var inputPattern = /Input #[0-9]+, ([^ ]+),/;
      var durPattern = /Duration\: ([^,]+)/;
      var audioPattern = /Audio\: (.*)/;
      var videoPattern = /Video\: (.*)/;
      if (!("inputStack" in codecsObject)) {
        codecsObject.inputStack = [];
        codecsObject.inputIndex = -1;
        codecsObject.inInput = false;
      }
      var inputStack = codecsObject.inputStack;
      var inputIndex = codecsObject.inputIndex;
      var inInput = codecsObject.inInput;
      var format, dur, audio, video;
      if (format = stderrLine.match(inputPattern)) {
        inInput = codecsObject.inInput = true;
        inputIndex = codecsObject.inputIndex = codecsObject.inputIndex + 1;
        inputStack[inputIndex] = { format: format[1], audio: "", video: "", duration: "" };
      } else if (inInput && (dur = stderrLine.match(durPattern))) {
        inputStack[inputIndex].duration = dur[1];
      } else if (inInput && (audio = stderrLine.match(audioPattern))) {
        audio = audio[1].split(", ");
        inputStack[inputIndex].audio = audio[0];
        inputStack[inputIndex].audio_details = audio;
      } else if (inInput && (video = stderrLine.match(videoPattern))) {
        video = video[1].split(", ");
        inputStack[inputIndex].video = video[0];
        inputStack[inputIndex].video_details = video;
      } else if (/Output #\d+/.test(stderrLine)) {
        inInput = codecsObject.inInput = false;
      } else if (/Stream mapping:|Press (\[q\]|ctrl-c) to stop/.test(stderrLine)) {
        command.emit.apply(command, ["codecData"].concat(inputStack));
        return true;
      }
      return false;
    },
    extractProgress: function(command, stderrLine) {
      var progress = parseProgressLine(stderrLine);
      if (progress) {
        var ret = {
          frames: parseInt(progress.frame, 10),
          currentFps: parseInt(progress.fps, 10),
          currentKbps: progress.bitrate ? parseFloat(progress.bitrate.replace("kbits/s", "")) : 0,
          targetSize: parseInt(progress.size || progress.Lsize, 10),
          timemark: progress.time
        };
        if (command._ffprobeData && command._ffprobeData.format && command._ffprobeData.format.duration) {
          var duration = Number(command._ffprobeData.format.duration);
          if (!isNaN(duration))
            ret.percent = utils.timemarkToSeconds(ret.timemark) / duration * 100;
        }
        command.emit("progress", ret);
      }
    },
    extractError: function(stderr) {
      return stderr.split(nlRegexp).reduce(function(messages, message) {
        if (message.charAt(0) === " " || message.charAt(0) === "[") {
          return [];
        } else {
          messages.push(message);
          return messages;
        }
      }, []).join("\n");
    },
    linesRing: function(maxLines) {
      var cbs = [];
      var lines = [];
      var current = null;
      var closed = false;
      var max = maxLines - 1;
      function emit(line) {
        cbs.forEach(function(cb) {
          cb(line);
        });
      }
      return {
        callback: function(cb) {
          lines.forEach(function(l) {
            cb(l);
          });
          cbs.push(cb);
        },
        append: function(str) {
          if (closed)
            return;
          if (str instanceof Buffer)
            str = "" + str;
          if (!str || str.length === 0)
            return;
          var newLines = str.split(nlRegexp);
          if (newLines.length === 1) {
            if (current !== null) {
              current = current + newLines.shift();
            } else {
              current = newLines.shift();
            }
          } else {
            if (current !== null) {
              current = current + newLines.shift();
              emit(current);
              lines.push(current);
            }
            current = newLines.pop();
            newLines.forEach(function(l) {
              emit(l);
              lines.push(l);
            });
            if (max > -1 && lines.length > max) {
              lines.splice(0, lines.length - max);
            }
          }
        },
        get: function() {
          if (current !== null) {
            return lines.concat([current]).join("\n");
          } else {
            return lines.join("\n");
          }
        },
        close: function() {
          if (closed)
            return;
          if (current !== null) {
            emit(current);
            lines.push(current);
            if (max > -1 && lines.length > max) {
              lines.shift();
            }
            current = null;
          }
          closed = true;
        }
      };
    }
  };
});

// node_modules/fluent-ffmpeg/lib/options/inputs.js
var require_inputs = __commonJS((exports, module) => {
  var utils = require_utils();
  module.exports = function(proto) {
    proto.mergeAdd = proto.addInput = proto.input = function(source) {
      var isFile = false;
      var isStream = false;
      if (typeof source !== "string") {
        if (!("readable" in source) || !source.readable) {
          throw new Error("Invalid input");
        }
        var hasInputStream = this._inputs.some(function(input) {
          return input.isStream;
        });
        if (hasInputStream) {
          throw new Error("Only one input stream is supported");
        }
        isStream = true;
        source.pause();
      } else {
        var protocol = source.match(/^([a-z]{2,}):/i);
        isFile = !protocol || protocol[0] === "file";
      }
      this._inputs.push(this._currentInput = {
        source,
        isFile,
        isStream,
        options: utils.args()
      });
      return this;
    };
    proto.withInputFormat = proto.inputFormat = proto.fromFormat = function(format) {
      if (!this._currentInput) {
        throw new Error("No input specified");
      }
      this._currentInput.options("-f", format);
      return this;
    };
    proto.withInputFps = proto.withInputFPS = proto.withFpsInput = proto.withFPSInput = proto.inputFPS = proto.inputFps = proto.fpsInput = proto.FPSInput = function(fps) {
      if (!this._currentInput) {
        throw new Error("No input specified");
      }
      this._currentInput.options("-r", fps);
      return this;
    };
    proto.nativeFramerate = proto.withNativeFramerate = proto.native = function() {
      if (!this._currentInput) {
        throw new Error("No input specified");
      }
      this._currentInput.options("-re");
      return this;
    };
    proto.setStartTime = proto.seekInput = function(seek) {
      if (!this._currentInput) {
        throw new Error("No input specified");
      }
      this._currentInput.options("-ss", seek);
      return this;
    };
    proto.loop = function(duration) {
      if (!this._currentInput) {
        throw new Error("No input specified");
      }
      this._currentInput.options("-loop", "1");
      if (typeof duration !== "undefined") {
        this.duration(duration);
      }
      return this;
    };
  };
});

// node_modules/fluent-ffmpeg/lib/options/audio.js
var require_audio = __commonJS((exports, module) => {
  var utils = require_utils();
  module.exports = function(proto) {
    proto.withNoAudio = proto.noAudio = function() {
      this._currentOutput.audio.clear();
      this._currentOutput.audioFilters.clear();
      this._currentOutput.audio("-an");
      return this;
    };
    proto.withAudioCodec = proto.audioCodec = function(codec) {
      this._currentOutput.audio("-acodec", codec);
      return this;
    };
    proto.withAudioBitrate = proto.audioBitrate = function(bitrate) {
      this._currentOutput.audio("-b:a", ("" + bitrate).replace(/k?$/, "k"));
      return this;
    };
    proto.withAudioChannels = proto.audioChannels = function(channels) {
      this._currentOutput.audio("-ac", channels);
      return this;
    };
    proto.withAudioFrequency = proto.audioFrequency = function(freq) {
      this._currentOutput.audio("-ar", freq);
      return this;
    };
    proto.withAudioQuality = proto.audioQuality = function(quality) {
      this._currentOutput.audio("-aq", quality);
      return this;
    };
    proto.withAudioFilter = proto.withAudioFilters = proto.audioFilter = proto.audioFilters = function(filters) {
      if (arguments.length > 1) {
        filters = [].slice.call(arguments);
      }
      if (!Array.isArray(filters)) {
        filters = [filters];
      }
      this._currentOutput.audioFilters(utils.makeFilterStrings(filters));
      return this;
    };
  };
});

// node_modules/fluent-ffmpeg/lib/options/video.js
var require_video = __commonJS((exports, module) => {
  var utils = require_utils();
  module.exports = function(proto) {
    proto.withNoVideo = proto.noVideo = function() {
      this._currentOutput.video.clear();
      this._currentOutput.videoFilters.clear();
      this._currentOutput.video("-vn");
      return this;
    };
    proto.withVideoCodec = proto.videoCodec = function(codec) {
      this._currentOutput.video("-vcodec", codec);
      return this;
    };
    proto.withVideoBitrate = proto.videoBitrate = function(bitrate, constant) {
      bitrate = ("" + bitrate).replace(/k?$/, "k");
      this._currentOutput.video("-b:v", bitrate);
      if (constant) {
        this._currentOutput.video("-maxrate", bitrate, "-minrate", bitrate, "-bufsize", "3M");
      }
      return this;
    };
    proto.withVideoFilter = proto.withVideoFilters = proto.videoFilter = proto.videoFilters = function(filters) {
      if (arguments.length > 1) {
        filters = [].slice.call(arguments);
      }
      if (!Array.isArray(filters)) {
        filters = [filters];
      }
      this._currentOutput.videoFilters(utils.makeFilterStrings(filters));
      return this;
    };
    proto.withOutputFps = proto.withOutputFPS = proto.withFpsOutput = proto.withFPSOutput = proto.withFps = proto.withFPS = proto.outputFPS = proto.outputFps = proto.fpsOutput = proto.FPSOutput = proto.fps = proto.FPS = function(fps) {
      this._currentOutput.video("-r", fps);
      return this;
    };
    proto.takeFrames = proto.withFrames = proto.frames = function(frames) {
      this._currentOutput.video("-vframes", frames);
      return this;
    };
  };
});

// node_modules/fluent-ffmpeg/lib/options/videosize.js
var require_videosize = __commonJS((exports, module) => {
  var getScalePadFilters = function(width, height, aspect, color) {
    return [
      {
        filter: "scale",
        options: {
          w: "if(gt(a," + aspect + ")," + width + ",trunc(" + height + "*a/2)*2)",
          h: "if(lt(a," + aspect + ")," + height + ",trunc(" + width + "/a/2)*2)"
        }
      },
      {
        filter: "pad",
        options: {
          w: width,
          h: height,
          x: "if(gt(a," + aspect + "),0,(" + width + "-iw)/2)",
          y: "if(lt(a," + aspect + "),0,(" + height + "-ih)/2)",
          color
        }
      }
    ];
  };
  var createSizeFilters = function(output, key, value) {
    var data = output.sizeData = output.sizeData || {};
    data[key] = value;
    if (!("size" in data)) {
      return [];
    }
    var fixedSize = data.size.match(/([0-9]+)x([0-9]+)/);
    var fixedWidth = data.size.match(/([0-9]+)x\?/);
    var fixedHeight = data.size.match(/\?x([0-9]+)/);
    var percentRatio = data.size.match(/\b([0-9]{1,3})%/);
    var width, height, aspect;
    if (percentRatio) {
      var ratio = Number(percentRatio[1]) / 100;
      return [{
        filter: "scale",
        options: {
          w: "trunc(iw*" + ratio + "/2)*2",
          h: "trunc(ih*" + ratio + "/2)*2"
        }
      }];
    } else if (fixedSize) {
      width = Math.round(Number(fixedSize[1]) / 2) * 2;
      height = Math.round(Number(fixedSize[2]) / 2) * 2;
      aspect = width / height;
      if (data.pad) {
        return getScalePadFilters(width, height, aspect, data.pad);
      } else {
        return [{ filter: "scale", options: { w: width, h: height } }];
      }
    } else if (fixedWidth || fixedHeight) {
      if ("aspect" in data) {
        width = fixedWidth ? fixedWidth[1] : Math.round(Number(fixedHeight[1]) * data.aspect);
        height = fixedHeight ? fixedHeight[1] : Math.round(Number(fixedWidth[1]) / data.aspect);
        width = Math.round(width / 2) * 2;
        height = Math.round(height / 2) * 2;
        if (data.pad) {
          return getScalePadFilters(width, height, data.aspect, data.pad);
        } else {
          return [{ filter: "scale", options: { w: width, h: height } }];
        }
      } else {
        if (fixedWidth) {
          return [{
            filter: "scale",
            options: {
              w: Math.round(Number(fixedWidth[1]) / 2) * 2,
              h: "trunc(ow/a/2)*2"
            }
          }];
        } else {
          return [{
            filter: "scale",
            options: {
              w: "trunc(oh*a/2)*2",
              h: Math.round(Number(fixedHeight[1]) / 2) * 2
            }
          }];
        }
      }
    } else {
      throw new Error("Invalid size specified: " + data.size);
    }
  };
  module.exports = function(proto) {
    proto.keepPixelAspect = proto.keepDisplayAspect = proto.keepDisplayAspectRatio = proto.keepDAR = function() {
      return this.videoFilters([
        {
          filter: "scale",
          options: {
            w: "if(gt(sar,1),iw*sar,iw)",
            h: "if(lt(sar,1),ih/sar,ih)"
          }
        },
        {
          filter: "setsar",
          options: "1"
        }
      ]);
    };
    proto.withSize = proto.setSize = proto.size = function(size) {
      var filters = createSizeFilters(this._currentOutput, "size", size);
      this._currentOutput.sizeFilters.clear();
      this._currentOutput.sizeFilters(filters);
      return this;
    };
    proto.withAspect = proto.withAspectRatio = proto.setAspect = proto.setAspectRatio = proto.aspect = proto.aspectRatio = function(aspect) {
      var a = Number(aspect);
      if (isNaN(a)) {
        var match = aspect.match(/^(\d+):(\d+)$/);
        if (match) {
          a = Number(match[1]) / Number(match[2]);
        } else {
          throw new Error("Invalid aspect ratio: " + aspect);
        }
      }
      var filters = createSizeFilters(this._currentOutput, "aspect", a);
      this._currentOutput.sizeFilters.clear();
      this._currentOutput.sizeFilters(filters);
      return this;
    };
    proto.applyAutopadding = proto.applyAutoPadding = proto.applyAutopad = proto.applyAutoPad = proto.withAutopadding = proto.withAutoPadding = proto.withAutopad = proto.withAutoPad = proto.autoPad = proto.autopad = function(pad, color) {
      if (typeof pad === "string") {
        color = pad;
        pad = true;
      }
      if (typeof pad === "undefined") {
        pad = true;
      }
      var filters = createSizeFilters(this._currentOutput, "pad", pad ? color || "black" : false);
      this._currentOutput.sizeFilters.clear();
      this._currentOutput.sizeFilters(filters);
      return this;
    };
  };
});

// node_modules/fluent-ffmpeg/lib/options/output.js
var require_output = __commonJS((exports, module) => {
  var utils = require_utils();
  module.exports = function(proto) {
    proto.addOutput = proto.output = function(target, pipeopts) {
      var isFile = false;
      if (!target && this._currentOutput) {
        throw new Error("Invalid output");
      }
      if (target && typeof target !== "string") {
        if (!("writable" in target) || !target.writable) {
          throw new Error("Invalid output");
        }
      } else if (typeof target === "string") {
        var protocol = target.match(/^([a-z]{2,}):/i);
        isFile = !protocol || protocol[0] === "file";
      }
      if (target && !("target" in this._currentOutput)) {
        this._currentOutput.target = target;
        this._currentOutput.isFile = isFile;
        this._currentOutput.pipeopts = pipeopts || {};
      } else {
        if (target && typeof target !== "string") {
          var hasOutputStream = this._outputs.some(function(output) {
            return typeof output.target !== "string";
          });
          if (hasOutputStream) {
            throw new Error("Only one output stream is supported");
          }
        }
        this._outputs.push(this._currentOutput = {
          target,
          isFile,
          flags: {},
          pipeopts: pipeopts || {}
        });
        var self = this;
        ["audio", "audioFilters", "video", "videoFilters", "sizeFilters", "options"].forEach(function(key) {
          self._currentOutput[key] = utils.args();
        });
        if (!target) {
          delete this._currentOutput.target;
        }
      }
      return this;
    };
    proto.seekOutput = proto.seek = function(seek) {
      this._currentOutput.options("-ss", seek);
      return this;
    };
    proto.withDuration = proto.setDuration = proto.duration = function(duration) {
      this._currentOutput.options("-t", duration);
      return this;
    };
    proto.toFormat = proto.withOutputFormat = proto.outputFormat = proto.format = function(format) {
      this._currentOutput.options("-f", format);
      return this;
    };
    proto.map = function(spec) {
      this._currentOutput.options("-map", spec.replace(utils.streamRegexp, "[$1]"));
      return this;
    };
    proto.updateFlvMetadata = proto.flvmeta = function() {
      this._currentOutput.flags.flvmeta = true;
      return this;
    };
  };
});

// node_modules/fluent-ffmpeg/lib/options/custom.js
var require_custom = __commonJS((exports, module) => {
  var utils = require_utils();
  module.exports = function(proto) {
    proto.addInputOption = proto.addInputOptions = proto.withInputOption = proto.withInputOptions = proto.inputOption = proto.inputOptions = function(options) {
      if (!this._currentInput) {
        throw new Error("No input specified");
      }
      var doSplit = true;
      if (arguments.length > 1) {
        options = [].slice.call(arguments);
        doSplit = false;
      }
      if (!Array.isArray(options)) {
        options = [options];
      }
      this._currentInput.options(options.reduce(function(options2, option) {
        var split = String(option).split(" ");
        if (doSplit && split.length === 2) {
          options2.push(split[0], split[1]);
        } else {
          options2.push(option);
        }
        return options2;
      }, []));
      return this;
    };
    proto.addOutputOption = proto.addOutputOptions = proto.addOption = proto.addOptions = proto.withOutputOption = proto.withOutputOptions = proto.withOption = proto.withOptions = proto.outputOption = proto.outputOptions = function(options) {
      var doSplit = true;
      if (arguments.length > 1) {
        options = [].slice.call(arguments);
        doSplit = false;
      }
      if (!Array.isArray(options)) {
        options = [options];
      }
      this._currentOutput.options(options.reduce(function(options2, option) {
        var split = String(option).split(" ");
        if (doSplit && split.length === 2) {
          options2.push(split[0], split[1]);
        } else {
          options2.push(option);
        }
        return options2;
      }, []));
      return this;
    };
    proto.filterGraph = proto.complexFilter = function(spec, map) {
      this._complexFilters.clear();
      if (!Array.isArray(spec)) {
        spec = [spec];
      }
      this._complexFilters("-filter_complex", utils.makeFilterStrings(spec).join(";"));
      if (Array.isArray(map)) {
        var self = this;
        map.forEach(function(streamSpec) {
          self._complexFilters("-map", streamSpec.replace(utils.streamRegexp, "[$1]"));
        });
      } else if (typeof map === "string") {
        this._complexFilters("-map", map.replace(utils.streamRegexp, "[$1]"));
      }
      return this;
    };
  };
});

// node_modules/fluent-ffmpeg/lib/options/misc.js
var require_misc = __commonJS((exports, module) => {
  var path = import.meta.require("path");
  module.exports = function(proto) {
    proto.usingPreset = proto.preset = function(preset) {
      if (typeof preset === "function") {
        preset(this);
      } else {
        try {
          var modulePath = path.join(this.options.presets, preset);
          var module2 = import.meta.require(modulePath);
          if (typeof module2.load === "function") {
            module2.load(this);
          } else {
            throw new Error("preset " + modulePath + " has no load() function");
          }
        } catch (err) {
          throw new Error("preset " + modulePath + " could not be loaded: " + err.message);
        }
      }
      return this;
    };
  };
});

// node_modules/async/lib/async.js
var require_async = __commonJS((exports, module) => {
  (function() {
    var async = {};
    var root, previous_async;
    root = this;
    if (root != null) {
      previous_async = root.async;
    }
    async.noConflict = function() {
      root.async = previous_async;
      return async;
    };
    function only_once(fn) {
      var called = false;
      return function() {
        if (called)
          throw new Error("Callback was already called.");
        called = true;
        fn.apply(root, arguments);
      };
    }
    var _each = function(arr, iterator) {
      if (arr.forEach) {
        return arr.forEach(iterator);
      }
      for (var i = 0;i < arr.length; i += 1) {
        iterator(arr[i], i, arr);
      }
    };
    var _map = function(arr, iterator) {
      if (arr.map) {
        return arr.map(iterator);
      }
      var results = [];
      _each(arr, function(x, i, a) {
        results.push(iterator(x, i, a));
      });
      return results;
    };
    var _reduce = function(arr, iterator, memo) {
      if (arr.reduce) {
        return arr.reduce(iterator, memo);
      }
      _each(arr, function(x, i, a) {
        memo = iterator(memo, x, i, a);
      });
      return memo;
    };
    var _keys = function(obj) {
      if (Object.keys) {
        return Object.keys(obj);
      }
      var keys = [];
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          keys.push(k);
        }
      }
      return keys;
    };
    if (typeof process === "undefined" || !process.nextTick) {
      if (typeof setImmediate === "function") {
        async.nextTick = function(fn) {
          setImmediate(fn);
        };
        async.setImmediate = async.nextTick;
      } else {
        async.nextTick = function(fn) {
          setTimeout(fn, 0);
        };
        async.setImmediate = async.nextTick;
      }
    } else {
      async.nextTick = process.nextTick;
      if (typeof setImmediate !== "undefined") {
        async.setImmediate = function(fn) {
          setImmediate(fn);
        };
      } else {
        async.setImmediate = async.nextTick;
      }
    }
    async.each = function(arr, iterator, callback) {
      callback = callback || function() {
      };
      if (!arr.length) {
        return callback();
      }
      var completed = 0;
      _each(arr, function(x) {
        iterator(x, only_once(function(err) {
          if (err) {
            callback(err);
            callback = function() {
            };
          } else {
            completed += 1;
            if (completed >= arr.length) {
              callback(null);
            }
          }
        }));
      });
    };
    async.forEach = async.each;
    async.eachSeries = function(arr, iterator, callback) {
      callback = callback || function() {
      };
      if (!arr.length) {
        return callback();
      }
      var completed = 0;
      var iterate = function() {
        iterator(arr[completed], function(err) {
          if (err) {
            callback(err);
            callback = function() {
            };
          } else {
            completed += 1;
            if (completed >= arr.length) {
              callback(null);
            } else {
              iterate();
            }
          }
        });
      };
      iterate();
    };
    async.forEachSeries = async.eachSeries;
    async.eachLimit = function(arr, limit, iterator, callback) {
      var fn = _eachLimit(limit);
      fn.apply(null, [arr, iterator, callback]);
    };
    async.forEachLimit = async.eachLimit;
    var _eachLimit = function(limit) {
      return function(arr, iterator, callback) {
        callback = callback || function() {
        };
        if (!arr.length || limit <= 0) {
          return callback();
        }
        var completed = 0;
        var started = 0;
        var running = 0;
        (function replenish() {
          if (completed >= arr.length) {
            return callback();
          }
          while (running < limit && started < arr.length) {
            started += 1;
            running += 1;
            iterator(arr[started - 1], function(err) {
              if (err) {
                callback(err);
                callback = function() {
                };
              } else {
                completed += 1;
                running -= 1;
                if (completed >= arr.length) {
                  callback();
                } else {
                  replenish();
                }
              }
            });
          }
        })();
      };
    };
    var doParallel = function(fn) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        return fn.apply(null, [async.each].concat(args));
      };
    };
    var doParallelLimit = function(limit, fn) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        return fn.apply(null, [_eachLimit(limit)].concat(args));
      };
    };
    var doSeries = function(fn) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        return fn.apply(null, [async.eachSeries].concat(args));
      };
    };
    var _asyncMap = function(eachfn, arr, iterator, callback) {
      var results = [];
      arr = _map(arr, function(x, i) {
        return { index: i, value: x };
      });
      eachfn(arr, function(x, callback2) {
        iterator(x.value, function(err, v) {
          results[x.index] = v;
          callback2(err);
        });
      }, function(err) {
        callback(err, results);
      });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function(arr, limit, iterator, callback) {
      return _mapLimit(limit)(arr, iterator, callback);
    };
    var _mapLimit = function(limit) {
      return doParallelLimit(limit, _asyncMap);
    };
    async.reduce = function(arr, memo, iterator, callback) {
      async.eachSeries(arr, function(x, callback2) {
        iterator(memo, x, function(err, v) {
          memo = v;
          callback2(err);
        });
      }, function(err) {
        callback(err, memo);
      });
    };
    async.inject = async.reduce;
    async.foldl = async.reduce;
    async.reduceRight = function(arr, memo, iterator, callback) {
      var reversed = _map(arr, function(x) {
        return x;
      }).reverse();
      async.reduce(reversed, memo, iterator, callback);
    };
    async.foldr = async.reduceRight;
    var _filter = function(eachfn, arr, iterator, callback) {
      var results = [];
      arr = _map(arr, function(x, i) {
        return { index: i, value: x };
      });
      eachfn(arr, function(x, callback2) {
        iterator(x.value, function(v) {
          if (v) {
            results.push(x);
          }
          callback2();
        });
      }, function(err) {
        callback(_map(results.sort(function(a, b) {
          return a.index - b.index;
        }), function(x) {
          return x.value;
        }));
      });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    async.select = async.filter;
    async.selectSeries = async.filterSeries;
    var _reject = function(eachfn, arr, iterator, callback) {
      var results = [];
      arr = _map(arr, function(x, i) {
        return { index: i, value: x };
      });
      eachfn(arr, function(x, callback2) {
        iterator(x.value, function(v) {
          if (!v) {
            results.push(x);
          }
          callback2();
        });
      }, function(err) {
        callback(_map(results.sort(function(a, b) {
          return a.index - b.index;
        }), function(x) {
          return x.value;
        }));
      });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);
    var _detect = function(eachfn, arr, iterator, main_callback) {
      eachfn(arr, function(x, callback) {
        iterator(x, function(result) {
          if (result) {
            main_callback(x);
            main_callback = function() {
            };
          } else {
            callback();
          }
        });
      }, function(err) {
        main_callback();
      });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);
    async.some = function(arr, iterator, main_callback) {
      async.each(arr, function(x, callback) {
        iterator(x, function(v) {
          if (v) {
            main_callback(true);
            main_callback = function() {
            };
          }
          callback();
        });
      }, function(err) {
        main_callback(false);
      });
    };
    async.any = async.some;
    async.every = function(arr, iterator, main_callback) {
      async.each(arr, function(x, callback) {
        iterator(x, function(v) {
          if (!v) {
            main_callback(false);
            main_callback = function() {
            };
          }
          callback();
        });
      }, function(err) {
        main_callback(true);
      });
    };
    async.all = async.every;
    async.sortBy = function(arr, iterator, callback) {
      async.map(arr, function(x, callback2) {
        iterator(x, function(err, criteria) {
          if (err) {
            callback2(err);
          } else {
            callback2(null, { value: x, criteria });
          }
        });
      }, function(err, results) {
        if (err) {
          return callback(err);
        } else {
          var fn = function(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
          };
          callback(null, _map(results.sort(fn), function(x) {
            return x.value;
          }));
        }
      });
    };
    async.auto = function(tasks, callback) {
      callback = callback || function() {
      };
      var keys = _keys(tasks);
      if (!keys.length) {
        return callback(null);
      }
      var results = {};
      var listeners = [];
      var addListener = function(fn) {
        listeners.unshift(fn);
      };
      var removeListener = function(fn) {
        for (var i = 0;i < listeners.length; i += 1) {
          if (listeners[i] === fn) {
            listeners.splice(i, 1);
            return;
          }
        }
      };
      var taskComplete = function() {
        _each(listeners.slice(0), function(fn) {
          fn();
        });
      };
      addListener(function() {
        if (_keys(results).length === keys.length) {
          callback(null, results);
          callback = function() {
          };
        }
      });
      _each(keys, function(k) {
        var task = tasks[k] instanceof Function ? [tasks[k]] : tasks[k];
        var taskCallback = function(err) {
          var args = Array.prototype.slice.call(arguments, 1);
          if (args.length <= 1) {
            args = args[0];
          }
          if (err) {
            var safeResults = {};
            _each(_keys(results), function(rkey) {
              safeResults[rkey] = results[rkey];
            });
            safeResults[k] = args;
            callback(err, safeResults);
            callback = function() {
            };
          } else {
            results[k] = args;
            async.setImmediate(taskComplete);
          }
        };
        var requires = task.slice(0, Math.abs(task.length - 1)) || [];
        var ready = function() {
          return _reduce(requires, function(a, x) {
            return a && results.hasOwnProperty(x);
          }, true) && !results.hasOwnProperty(k);
        };
        if (ready()) {
          task[task.length - 1](taskCallback, results);
        } else {
          var listener = function() {
            if (ready()) {
              removeListener(listener);
              task[task.length - 1](taskCallback, results);
            }
          };
          addListener(listener);
        }
      });
    };
    async.waterfall = function(tasks, callback) {
      callback = callback || function() {
      };
      if (tasks.constructor !== Array) {
        var err = new Error("First argument to waterfall must be an array of functions");
        return callback(err);
      }
      if (!tasks.length) {
        return callback();
      }
      var wrapIterator = function(iterator) {
        return function(err2) {
          if (err2) {
            callback.apply(null, arguments);
            callback = function() {
            };
          } else {
            var args = Array.prototype.slice.call(arguments, 1);
            var next = iterator.next();
            if (next) {
              args.push(wrapIterator(next));
            } else {
              args.push(callback);
            }
            async.setImmediate(function() {
              iterator.apply(null, args);
            });
          }
        };
      };
      wrapIterator(async.iterator(tasks))();
    };
    var _parallel = function(eachfn, tasks, callback) {
      callback = callback || function() {
      };
      if (tasks.constructor === Array) {
        eachfn.map(tasks, function(fn, callback2) {
          if (fn) {
            fn(function(err) {
              var args = Array.prototype.slice.call(arguments, 1);
              if (args.length <= 1) {
                args = args[0];
              }
              callback2.call(null, err, args);
            });
          }
        }, callback);
      } else {
        var results = {};
        eachfn.each(_keys(tasks), function(k, callback2) {
          tasks[k](function(err) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (args.length <= 1) {
              args = args[0];
            }
            results[k] = args;
            callback2(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
    };
    async.parallel = function(tasks, callback) {
      _parallel({ map: async.map, each: async.each }, tasks, callback);
    };
    async.parallelLimit = function(tasks, limit, callback) {
      _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
    };
    async.series = function(tasks, callback) {
      callback = callback || function() {
      };
      if (tasks.constructor === Array) {
        async.mapSeries(tasks, function(fn, callback2) {
          if (fn) {
            fn(function(err) {
              var args = Array.prototype.slice.call(arguments, 1);
              if (args.length <= 1) {
                args = args[0];
              }
              callback2.call(null, err, args);
            });
          }
        }, callback);
      } else {
        var results = {};
        async.eachSeries(_keys(tasks), function(k, callback2) {
          tasks[k](function(err) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (args.length <= 1) {
              args = args[0];
            }
            results[k] = args;
            callback2(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
    };
    async.iterator = function(tasks) {
      var makeCallback = function(index) {
        var fn = function() {
          if (tasks.length) {
            tasks[index].apply(null, arguments);
          }
          return fn.next();
        };
        fn.next = function() {
          return index < tasks.length - 1 ? makeCallback(index + 1) : null;
        };
        return fn;
      };
      return makeCallback(0);
    };
    async.apply = function(fn) {
      var args = Array.prototype.slice.call(arguments, 1);
      return function() {
        return fn.apply(null, args.concat(Array.prototype.slice.call(arguments)));
      };
    };
    var _concat = function(eachfn, arr, fn, callback) {
      var r = [];
      eachfn(arr, function(x, cb) {
        fn(x, function(err, y) {
          r = r.concat(y || []);
          cb(err);
        });
      }, function(err) {
        callback(err, r);
      });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);
    async.whilst = function(test, iterator, callback) {
      if (test()) {
        iterator(function(err) {
          if (err) {
            return callback(err);
          }
          async.whilst(test, iterator, callback);
        });
      } else {
        callback();
      }
    };
    async.doWhilst = function(iterator, test, callback) {
      iterator(function(err) {
        if (err) {
          return callback(err);
        }
        if (test()) {
          async.doWhilst(iterator, test, callback);
        } else {
          callback();
        }
      });
    };
    async.until = function(test, iterator, callback) {
      if (!test()) {
        iterator(function(err) {
          if (err) {
            return callback(err);
          }
          async.until(test, iterator, callback);
        });
      } else {
        callback();
      }
    };
    async.doUntil = function(iterator, test, callback) {
      iterator(function(err) {
        if (err) {
          return callback(err);
        }
        if (!test()) {
          async.doUntil(iterator, test, callback);
        } else {
          callback();
        }
      });
    };
    async.queue = function(worker, concurrency) {
      if (concurrency === undefined) {
        concurrency = 1;
      }
      function _insert(q2, data, pos, callback) {
        if (data.constructor !== Array) {
          data = [data];
        }
        _each(data, function(task) {
          var item = {
            data: task,
            callback: typeof callback === "function" ? callback : null
          };
          if (pos) {
            q2.tasks.unshift(item);
          } else {
            q2.tasks.push(item);
          }
          if (q2.saturated && q2.tasks.length === concurrency) {
            q2.saturated();
          }
          async.setImmediate(q2.process);
        });
      }
      var workers = 0;
      var q = {
        tasks: [],
        concurrency,
        saturated: null,
        empty: null,
        drain: null,
        push: function(data, callback) {
          _insert(q, data, false, callback);
        },
        unshift: function(data, callback) {
          _insert(q, data, true, callback);
        },
        process: function() {
          if (workers < q.concurrency && q.tasks.length) {
            var task = q.tasks.shift();
            if (q.empty && q.tasks.length === 0) {
              q.empty();
            }
            workers += 1;
            var next = function() {
              workers -= 1;
              if (task.callback) {
                task.callback.apply(task, arguments);
              }
              if (q.drain && q.tasks.length + workers === 0) {
                q.drain();
              }
              q.process();
            };
            var cb = only_once(next);
            worker(task.data, cb);
          }
        },
        length: function() {
          return q.tasks.length;
        },
        running: function() {
          return workers;
        }
      };
      return q;
    };
    async.cargo = function(worker, payload) {
      var working = false, tasks = [];
      var cargo = {
        tasks,
        payload,
        saturated: null,
        empty: null,
        drain: null,
        push: function(data, callback) {
          if (data.constructor !== Array) {
            data = [data];
          }
          _each(data, function(task) {
            tasks.push({
              data: task,
              callback: typeof callback === "function" ? callback : null
            });
            if (cargo.saturated && tasks.length === payload) {
              cargo.saturated();
            }
          });
          async.setImmediate(cargo.process);
        },
        process: function process() {
          if (working)
            return;
          if (tasks.length === 0) {
            if (cargo.drain)
              cargo.drain();
            return;
          }
          var ts = typeof payload === "number" ? tasks.splice(0, payload) : tasks.splice(0);
          var ds = _map(ts, function(task) {
            return task.data;
          });
          if (cargo.empty)
            cargo.empty();
          working = true;
          worker(ds, function() {
            working = false;
            var args = arguments;
            _each(ts, function(data) {
              if (data.callback) {
                data.callback.apply(null, args);
              }
            });
            process();
          });
        },
        length: function() {
          return tasks.length;
        },
        running: function() {
          return working;
        }
      };
      return cargo;
    };
    var _console_fn = function(name) {
      return function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        fn.apply(null, args.concat([function(err) {
          var args2 = Array.prototype.slice.call(arguments, 1);
          if (typeof console !== "undefined") {
            if (err) {
              if (console.error) {
                console.error(err);
              }
            } else if (console[name]) {
              _each(args2, function(x) {
                console[name](x);
              });
            }
          }
        }]));
      };
    };
    async.log = _console_fn("log");
    async.dir = _console_fn("dir");
    async.memoize = function(fn, hasher) {
      var memo = {};
      var queues = {};
      hasher = hasher || function(x) {
        return x;
      };
      var memoized = function() {
        var args = Array.prototype.slice.call(arguments);
        var callback = args.pop();
        var key = hasher.apply(null, args);
        if (key in memo) {
          callback.apply(null, memo[key]);
        } else if (key in queues) {
          queues[key].push(callback);
        } else {
          queues[key] = [callback];
          fn.apply(null, args.concat([function() {
            memo[key] = arguments;
            var q = queues[key];
            delete queues[key];
            for (var i = 0, l = q.length;i < l; i++) {
              q[i].apply(null, arguments);
            }
          }]));
        }
      };
      memoized.memo = memo;
      memoized.unmemoized = fn;
      return memoized;
    };
    async.unmemoize = function(fn) {
      return function() {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };
    async.times = function(count, iterator, callback) {
      var counter = [];
      for (var i = 0;i < count; i++) {
        counter.push(i);
      }
      return async.map(counter, iterator, callback);
    };
    async.timesSeries = function(count, iterator, callback) {
      var counter = [];
      for (var i = 0;i < count; i++) {
        counter.push(i);
      }
      return async.mapSeries(counter, iterator, callback);
    };
    async.compose = function() {
      var fns = Array.prototype.reverse.call(arguments);
      return function() {
        var that = this;
        var args = Array.prototype.slice.call(arguments);
        var callback = args.pop();
        async.reduce(fns, args, function(newargs, fn, cb) {
          fn.apply(that, newargs.concat([function() {
            var err = arguments[0];
            var nextargs = Array.prototype.slice.call(arguments, 1);
            cb(err, nextargs);
          }]));
        }, function(err, results) {
          callback.apply(that, [err].concat(results));
        });
      };
    };
    var _applyEach = function(eachfn, fns) {
      var go = function() {
        var that = this;
        var args2 = Array.prototype.slice.call(arguments);
        var callback = args2.pop();
        return eachfn(fns, function(fn, cb) {
          fn.apply(that, args2.concat([cb]));
        }, callback);
      };
      if (arguments.length > 2) {
        var args = Array.prototype.slice.call(arguments, 2);
        return go.apply(this, args);
      } else {
        return go;
      }
    };
    async.applyEach = doParallel(_applyEach);
    async.applyEachSeries = doSeries(_applyEach);
    async.forever = function(fn, callback) {
      function next(err) {
        if (err) {
          if (callback) {
            return callback(err);
          }
          throw err;
        }
        fn(next);
      }
      next();
    };
    if (typeof define !== "undefined" && define.amd) {
      define([], function() {
        return async;
      });
    } else if (typeof module !== "undefined" && exports) {
      module.exports = async;
    } else {
      root.async = async;
    }
  })();
});

// node_modules/fluent-ffmpeg/lib/processor.js
var require_processor = __commonJS((exports, module) => {
  var runFfprobe = function(command) {
    const inputProbeIndex = 0;
    if (command._inputs[inputProbeIndex].isStream) {
      return;
    }
    command.ffprobe(inputProbeIndex, function(err, data) {
      command._ffprobeData = data;
    });
  };
  var spawn = import.meta.require("child_process").spawn;
  var path = import.meta.require("path");
  var fs = import.meta.require("fs");
  var async = require_async();
  var utils = require_utils();
  module.exports = function(proto) {
    proto._spawnFfmpeg = function(args, options, processCB, endCB) {
      if (typeof options === "function") {
        endCB = processCB;
        processCB = options;
        options = {};
      }
      if (typeof endCB === "undefined") {
        endCB = processCB;
        processCB = function() {
        };
      }
      var maxLines = "stdoutLines" in options ? options.stdoutLines : this.options.stdoutLines;
      this._getFfmpegPath(function(err, command) {
        if (err) {
          return endCB(err);
        } else if (!command || command.length === 0) {
          return endCB(new Error("Cannot find ffmpeg"));
        }
        if (options.niceness && options.niceness !== 0 && !utils.isWindows) {
          args.unshift("-n", options.niceness, command);
          command = "nice";
        }
        var stdoutRing = utils.linesRing(maxLines);
        var stdoutClosed = false;
        var stderrRing = utils.linesRing(maxLines);
        var stderrClosed = false;
        var ffmpegProc = spawn(command, args, options);
        if (ffmpegProc.stderr) {
          ffmpegProc.stderr.setEncoding("utf8");
        }
        ffmpegProc.on("error", function(err2) {
          endCB(err2);
        });
        var exitError = null;
        function handleExit(err2) {
          if (err2) {
            exitError = err2;
          }
          if (processExited && (stdoutClosed || !options.captureStdout) && stderrClosed) {
            endCB(exitError, stdoutRing, stderrRing);
          }
        }
        var processExited = false;
        ffmpegProc.on("exit", function(code, signal) {
          processExited = true;
          if (signal) {
            handleExit(new Error("ffmpeg was killed with signal " + signal));
          } else if (code) {
            handleExit(new Error("ffmpeg exited with code " + code));
          } else {
            handleExit();
          }
        });
        if (options.captureStdout) {
          ffmpegProc.stdout.on("data", function(data) {
            stdoutRing.append(data);
          });
          ffmpegProc.stdout.on("close", function() {
            stdoutRing.close();
            stdoutClosed = true;
            handleExit();
          });
        }
        ffmpegProc.stderr.on("data", function(data) {
          stderrRing.append(data);
        });
        ffmpegProc.stderr.on("close", function() {
          stderrRing.close();
          stderrClosed = true;
          handleExit();
        });
        processCB(ffmpegProc, stdoutRing, stderrRing);
      });
    };
    proto._getArguments = function() {
      var complexFilters = this._complexFilters.get();
      var fileOutput = this._outputs.some(function(output) {
        return output.isFile;
      });
      return [].concat(this._inputs.reduce(function(args, input) {
        var source = typeof input.source === "string" ? input.source : "pipe:0";
        return args.concat(input.options.get(), ["-i", source]);
      }, []), this._global.get(), fileOutput ? ["-y"] : [], complexFilters, this._outputs.reduce(function(args, output) {
        var sizeFilters = utils.makeFilterStrings(output.sizeFilters.get());
        var audioFilters = output.audioFilters.get();
        var videoFilters = output.videoFilters.get().concat(sizeFilters);
        var outputArg;
        if (!output.target) {
          outputArg = [];
        } else if (typeof output.target === "string") {
          outputArg = [output.target];
        } else {
          outputArg = ["pipe:1"];
        }
        return args.concat(output.audio.get(), audioFilters.length ? ["-filter:a", audioFilters.join(",")] : [], output.video.get(), videoFilters.length ? ["-filter:v", videoFilters.join(",")] : [], output.options.get(), outputArg);
      }, []));
    };
    proto._prepare = function(callback, readMetadata) {
      var self = this;
      async.waterfall([
        function(cb) {
          self._checkCapabilities(cb);
        },
        function(cb) {
          if (!readMetadata) {
            return cb();
          }
          self.ffprobe(0, function(err, data) {
            if (!err) {
              self._ffprobeData = data;
            }
            cb();
          });
        },
        function(cb) {
          var flvmeta = self._outputs.some(function(output) {
            if (output.flags.flvmeta && !output.isFile) {
              self.logger.warn("Updating flv metadata is only supported for files");
              output.flags.flvmeta = false;
            }
            return output.flags.flvmeta;
          });
          if (flvmeta) {
            self._getFlvtoolPath(function(err) {
              cb(err);
            });
          } else {
            cb();
          }
        },
        function(cb) {
          var args;
          try {
            args = self._getArguments();
          } catch (e) {
            return cb(e);
          }
          cb(null, args);
        },
        function(args, cb) {
          self.availableEncoders(function(err, encoders) {
            for (var i = 0;i < args.length; i++) {
              if (args[i] === "-acodec" || args[i] === "-vcodec") {
                i++;
                if (args[i] in encoders && encoders[args[i]].experimental) {
                  args.splice(i + 1, 0, "-strict", "experimental");
                  i += 2;
                }
              }
            }
            cb(null, args);
          });
        }
      ], callback);
      if (!readMetadata) {
        if (this.listeners("progress").length > 0) {
          runFfprobe(this);
        } else {
          this.once("newListener", function(event) {
            if (event === "progress") {
              runFfprobe(this);
            }
          });
        }
      }
    };
    proto.exec = proto.execute = proto.run = function() {
      var self = this;
      var outputPresent = this._outputs.some(function(output) {
        return "target" in output;
      });
      if (!outputPresent) {
        throw new Error("No output specified");
      }
      var outputStream = this._outputs.filter(function(output) {
        return typeof output.target !== "string";
      })[0];
      var inputStream = this._inputs.filter(function(input) {
        return typeof input.source !== "string";
      })[0];
      var ended = false;
      function emitEnd(err, stdout, stderr) {
        if (!ended) {
          ended = true;
          if (err) {
            self.emit("error", err, stdout, stderr);
          } else {
            self.emit("end", stdout, stderr);
          }
        }
      }
      self._prepare(function(err, args) {
        if (err) {
          return emitEnd(err);
        }
        self._spawnFfmpeg(args, {
          captureStdout: !outputStream,
          niceness: self.options.niceness,
          cwd: self.options.cwd,
          windowsHide: true
        }, function processCB(ffmpegProc, stdoutRing, stderrRing) {
          self.ffmpegProc = ffmpegProc;
          self.emit("start", "ffmpeg " + args.join(" "));
          if (inputStream) {
            inputStream.source.on("error", function(err2) {
              var reportingErr = new Error("Input stream error: " + err2.message);
              reportingErr.inputStreamError = err2;
              emitEnd(reportingErr);
              ffmpegProc.kill();
            });
            inputStream.source.resume();
            inputStream.source.pipe(ffmpegProc.stdin);
            ffmpegProc.stdin.on("error", function() {
            });
          }
          if (self.options.timeout) {
            self.processTimer = setTimeout(function() {
              var msg = "process ran into a timeout (" + self.options.timeout + "s)";
              emitEnd(new Error(msg), stdoutRing.get(), stderrRing.get());
              ffmpegProc.kill();
            }, self.options.timeout * 1000);
          }
          if (outputStream) {
            ffmpegProc.stdout.pipe(outputStream.target, outputStream.pipeopts);
            outputStream.target.on("close", function() {
              self.logger.debug("Output stream closed, scheduling kill for ffmpeg process");
              setTimeout(function() {
                emitEnd(new Error("Output stream closed"));
                ffmpegProc.kill();
              }, 20);
            });
            outputStream.target.on("error", function(err2) {
              self.logger.debug("Output stream error, killing ffmpeg process");
              var reportingErr = new Error("Output stream error: " + err2.message);
              reportingErr.outputStreamError = err2;
              emitEnd(reportingErr, stdoutRing.get(), stderrRing.get());
              ffmpegProc.kill("SIGKILL");
            });
          }
          if (stderrRing) {
            if (self.listeners("stderr").length) {
              stderrRing.callback(function(line) {
                self.emit("stderr", line);
              });
            }
            if (self.listeners("codecData").length) {
              var codecDataSent = false;
              var codecObject = {};
              stderrRing.callback(function(line) {
                if (!codecDataSent)
                  codecDataSent = utils.extractCodecData(self, line, codecObject);
              });
            }
            if (self.listeners("progress").length) {
              stderrRing.callback(function(line) {
                utils.extractProgress(self, line);
              });
            }
          }
        }, function endCB(err2, stdoutRing, stderrRing) {
          clearTimeout(self.processTimer);
          delete self.ffmpegProc;
          if (err2) {
            if (err2.message.match(/ffmpeg exited with code/)) {
              err2.message += ": " + utils.extractError(stderrRing.get());
            }
            emitEnd(err2, stdoutRing.get(), stderrRing.get());
          } else {
            var flvmeta = self._outputs.filter(function(output) {
              return output.flags.flvmeta;
            });
            if (flvmeta.length) {
              self._getFlvtoolPath(function(err3, flvtool) {
                if (err3) {
                  return emitEnd(err3);
                }
                async.each(flvmeta, function(output, cb) {
                  spawn(flvtool, ["-U", output.target], { windowsHide: true }).on("error", function(err4) {
                    cb(new Error("Error running " + flvtool + " on " + output.target + ": " + err4.message));
                  }).on("exit", function(code, signal) {
                    if (code !== 0 || signal) {
                      cb(new Error(flvtool + " " + (signal ? "received signal " + signal : "exited with code " + code)) + " when running on " + output.target);
                    } else {
                      cb();
                    }
                  });
                }, function(err4) {
                  if (err4) {
                    emitEnd(err4);
                  } else {
                    emitEnd(null, stdoutRing.get(), stderrRing.get());
                  }
                });
              });
            } else {
              emitEnd(null, stdoutRing.get(), stderrRing.get());
            }
          }
        });
      });
      return this;
    };
    proto.renice = function(niceness) {
      if (!utils.isWindows) {
        niceness = niceness || 0;
        if (niceness < -20 || niceness > 20) {
          this.logger.warn("Invalid niceness value: " + niceness + ", must be between -20 and 20");
        }
        niceness = Math.min(20, Math.max(-20, niceness));
        this.options.niceness = niceness;
        if (this.ffmpegProc) {
          var logger = this.logger;
          var pid = this.ffmpegProc.pid;
          var renice = spawn("renice", [niceness, "-p", pid], { windowsHide: true });
          renice.on("error", function(err) {
            logger.warn("could not renice process " + pid + ": " + err.message);
          });
          renice.on("exit", function(code, signal) {
            if (signal) {
              logger.warn("could not renice process " + pid + ": renice was killed by signal " + signal);
            } else if (code) {
              logger.warn("could not renice process " + pid + ": renice exited with " + code);
            } else {
              logger.info("successfully reniced process " + pid + " to " + niceness + " niceness");
            }
          });
        }
      }
      return this;
    };
    proto.kill = function(signal) {
      if (!this.ffmpegProc) {
        this.logger.warn("No running ffmpeg process, cannot send signal");
      } else {
        this.ffmpegProc.kill(signal || "SIGKILL");
      }
      return this;
    };
  };
});

// node_modules/fluent-ffmpeg/lib/capabilities.js
var require_capabilities = __commonJS((exports, module) => {
  var fs = import.meta.require("fs");
  var path = import.meta.require("path");
  var async = require_async();
  var utils = require_utils();
  var avCodecRegexp = /^\s*([D ])([E ])([VAS])([S ])([D ])([T ]) ([^ ]+) +(.*)$/;
  var ffCodecRegexp = /^\s*([D\.])([E\.])([VAS])([I\.])([L\.])([S\.]) ([^ ]+) +(.*)$/;
  var ffEncodersRegexp = /\(encoders:([^\)]+)\)/;
  var ffDecodersRegexp = /\(decoders:([^\)]+)\)/;
  var encodersRegexp = /^\s*([VAS\.])([F\.])([S\.])([X\.])([B\.])([D\.]) ([^ ]+) +(.*)$/;
  var formatRegexp = /^\s*([D ])([E ])\s+([^ ]+)\s+(.*)$/;
  var lineBreakRegexp = /\r\n|\r|\n/;
  var filterRegexp = /^(?: [T\.][S\.][C\.] )?([^ ]+) +(AA?|VV?|\|)->(AA?|VV?|\|) +(.*)$/;
  var cache = {};
  module.exports = function(proto) {
    proto.setFfmpegPath = function(ffmpegPath) {
      cache.ffmpegPath = ffmpegPath;
      return this;
    };
    proto.setFfprobePath = function(ffprobePath) {
      cache.ffprobePath = ffprobePath;
      return this;
    };
    proto.setFlvtoolPath = function(flvtool) {
      cache.flvtoolPath = flvtool;
      return this;
    };
    proto._forgetPaths = function() {
      delete cache.ffmpegPath;
      delete cache.ffprobePath;
      delete cache.flvtoolPath;
    };
    proto._getFfmpegPath = function(callback) {
      if ("ffmpegPath" in cache) {
        return callback(null, cache.ffmpegPath);
      }
      async.waterfall([
        function(cb) {
          if (process.env.FFMPEG_PATH) {
            fs.exists(process.env.FFMPEG_PATH, function(exists) {
              if (exists) {
                cb(null, process.env.FFMPEG_PATH);
              } else {
                cb(null, "");
              }
            });
          } else {
            cb(null, "");
          }
        },
        function(ffmpeg, cb) {
          if (ffmpeg.length) {
            return cb(null, ffmpeg);
          }
          utils.which("ffmpeg", function(err, ffmpeg2) {
            cb(err, ffmpeg2);
          });
        }
      ], function(err, ffmpeg) {
        if (err) {
          callback(err);
        } else {
          callback(null, cache.ffmpegPath = ffmpeg || "");
        }
      });
    };
    proto._getFfprobePath = function(callback) {
      var self = this;
      if ("ffprobePath" in cache) {
        return callback(null, cache.ffprobePath);
      }
      async.waterfall([
        function(cb) {
          if (process.env.FFPROBE_PATH) {
            fs.exists(process.env.FFPROBE_PATH, function(exists) {
              cb(null, exists ? process.env.FFPROBE_PATH : "");
            });
          } else {
            cb(null, "");
          }
        },
        function(ffprobe, cb) {
          if (ffprobe.length) {
            return cb(null, ffprobe);
          }
          utils.which("ffprobe", function(err, ffprobe2) {
            cb(err, ffprobe2);
          });
        },
        function(ffprobe, cb) {
          if (ffprobe.length) {
            return cb(null, ffprobe);
          }
          self._getFfmpegPath(function(err, ffmpeg) {
            if (err) {
              cb(err);
            } else if (ffmpeg.length) {
              var name = utils.isWindows ? "ffprobe.exe" : "ffprobe";
              var ffprobe2 = path.join(path.dirname(ffmpeg), name);
              fs.exists(ffprobe2, function(exists) {
                cb(null, exists ? ffprobe2 : "");
              });
            } else {
              cb(null, "");
            }
          });
        }
      ], function(err, ffprobe) {
        if (err) {
          callback(err);
        } else {
          callback(null, cache.ffprobePath = ffprobe || "");
        }
      });
    };
    proto._getFlvtoolPath = function(callback) {
      if ("flvtoolPath" in cache) {
        return callback(null, cache.flvtoolPath);
      }
      async.waterfall([
        function(cb) {
          if (process.env.FLVMETA_PATH) {
            fs.exists(process.env.FLVMETA_PATH, function(exists) {
              cb(null, exists ? process.env.FLVMETA_PATH : "");
            });
          } else {
            cb(null, "");
          }
        },
        function(flvtool, cb) {
          if (flvtool.length) {
            return cb(null, flvtool);
          }
          if (process.env.FLVTOOL2_PATH) {
            fs.exists(process.env.FLVTOOL2_PATH, function(exists) {
              cb(null, exists ? process.env.FLVTOOL2_PATH : "");
            });
          } else {
            cb(null, "");
          }
        },
        function(flvtool, cb) {
          if (flvtool.length) {
            return cb(null, flvtool);
          }
          utils.which("flvmeta", function(err, flvmeta) {
            cb(err, flvmeta);
          });
        },
        function(flvtool, cb) {
          if (flvtool.length) {
            return cb(null, flvtool);
          }
          utils.which("flvtool2", function(err, flvtool2) {
            cb(err, flvtool2);
          });
        }
      ], function(err, flvtool) {
        if (err) {
          callback(err);
        } else {
          callback(null, cache.flvtoolPath = flvtool || "");
        }
      });
    };
    proto.availableFilters = proto.getAvailableFilters = function(callback) {
      if ("filters" in cache) {
        return callback(null, cache.filters);
      }
      this._spawnFfmpeg(["-filters"], { captureStdout: true, stdoutLines: 0 }, function(err, stdoutRing) {
        if (err) {
          return callback(err);
        }
        var stdout = stdoutRing.get();
        var lines = stdout.split("\n");
        var data = {};
        var types = { A: "audio", V: "video", "|": "none" };
        lines.forEach(function(line) {
          var match = line.match(filterRegexp);
          if (match) {
            data[match[1]] = {
              description: match[4],
              input: types[match[2].charAt(0)],
              multipleInputs: match[2].length > 1,
              output: types[match[3].charAt(0)],
              multipleOutputs: match[3].length > 1
            };
          }
        });
        callback(null, cache.filters = data);
      });
    };
    proto.availableCodecs = proto.getAvailableCodecs = function(callback) {
      if ("codecs" in cache) {
        return callback(null, cache.codecs);
      }
      this._spawnFfmpeg(["-codecs"], { captureStdout: true, stdoutLines: 0 }, function(err, stdoutRing) {
        if (err) {
          return callback(err);
        }
        var stdout = stdoutRing.get();
        var lines = stdout.split(lineBreakRegexp);
        var data = {};
        lines.forEach(function(line) {
          var match = line.match(avCodecRegexp);
          if (match && match[7] !== "=") {
            data[match[7]] = {
              type: { V: "video", A: "audio", S: "subtitle" }[match[3]],
              description: match[8],
              canDecode: match[1] === "D",
              canEncode: match[2] === "E",
              drawHorizBand: match[4] === "S",
              directRendering: match[5] === "D",
              weirdFrameTruncation: match[6] === "T"
            };
          }
          match = line.match(ffCodecRegexp);
          if (match && match[7] !== "=") {
            var codecData = data[match[7]] = {
              type: { V: "video", A: "audio", S: "subtitle" }[match[3]],
              description: match[8],
              canDecode: match[1] === "D",
              canEncode: match[2] === "E",
              intraFrameOnly: match[4] === "I",
              isLossy: match[5] === "L",
              isLossless: match[6] === "S"
            };
            var encoders = codecData.description.match(ffEncodersRegexp);
            encoders = encoders ? encoders[1].trim().split(" ") : [];
            var decoders = codecData.description.match(ffDecodersRegexp);
            decoders = decoders ? decoders[1].trim().split(" ") : [];
            if (encoders.length || decoders.length) {
              var coderData = {};
              utils.copy(codecData, coderData);
              delete coderData.canEncode;
              delete coderData.canDecode;
              encoders.forEach(function(name) {
                data[name] = {};
                utils.copy(coderData, data[name]);
                data[name].canEncode = true;
              });
              decoders.forEach(function(name) {
                if (name in data) {
                  data[name].canDecode = true;
                } else {
                  data[name] = {};
                  utils.copy(coderData, data[name]);
                  data[name].canDecode = true;
                }
              });
            }
          }
        });
        callback(null, cache.codecs = data);
      });
    };
    proto.availableEncoders = proto.getAvailableEncoders = function(callback) {
      if ("encoders" in cache) {
        return callback(null, cache.encoders);
      }
      this._spawnFfmpeg(["-encoders"], { captureStdout: true, stdoutLines: 0 }, function(err, stdoutRing) {
        if (err) {
          return callback(err);
        }
        var stdout = stdoutRing.get();
        var lines = stdout.split(lineBreakRegexp);
        var data = {};
        lines.forEach(function(line) {
          var match = line.match(encodersRegexp);
          if (match && match[7] !== "=") {
            data[match[7]] = {
              type: { V: "video", A: "audio", S: "subtitle" }[match[1]],
              description: match[8],
              frameMT: match[2] === "F",
              sliceMT: match[3] === "S",
              experimental: match[4] === "X",
              drawHorizBand: match[5] === "B",
              directRendering: match[6] === "D"
            };
          }
        });
        callback(null, cache.encoders = data);
      });
    };
    proto.availableFormats = proto.getAvailableFormats = function(callback) {
      if ("formats" in cache) {
        return callback(null, cache.formats);
      }
      this._spawnFfmpeg(["-formats"], { captureStdout: true, stdoutLines: 0 }, function(err, stdoutRing) {
        if (err) {
          return callback(err);
        }
        var stdout = stdoutRing.get();
        var lines = stdout.split(lineBreakRegexp);
        var data = {};
        lines.forEach(function(line) {
          var match = line.match(formatRegexp);
          if (match) {
            match[3].split(",").forEach(function(format) {
              if (!(format in data)) {
                data[format] = {
                  description: match[4],
                  canDemux: false,
                  canMux: false
                };
              }
              if (match[1] === "D") {
                data[format].canDemux = true;
              }
              if (match[2] === "E") {
                data[format].canMux = true;
              }
            });
          }
        });
        callback(null, cache.formats = data);
      });
    };
    proto._checkCapabilities = function(callback) {
      var self = this;
      async.waterfall([
        function(cb) {
          self.availableFormats(cb);
        },
        function(formats, cb) {
          var unavailable;
          unavailable = self._outputs.reduce(function(fmts, output) {
            var format = output.options.find("-f", 1);
            if (format) {
              if (!(format[0] in formats) || !formats[format[0]].canMux) {
                fmts.push(format);
              }
            }
            return fmts;
          }, []);
          if (unavailable.length === 1) {
            return cb(new Error("Output format " + unavailable[0] + " is not available"));
          } else if (unavailable.length > 1) {
            return cb(new Error("Output formats " + unavailable.join(", ") + " are not available"));
          }
          unavailable = self._inputs.reduce(function(fmts, input) {
            var format = input.options.find("-f", 1);
            if (format) {
              if (!(format[0] in formats) || !formats[format[0]].canDemux) {
                fmts.push(format[0]);
              }
            }
            return fmts;
          }, []);
          if (unavailable.length === 1) {
            return cb(new Error("Input format " + unavailable[0] + " is not available"));
          } else if (unavailable.length > 1) {
            return cb(new Error("Input formats " + unavailable.join(", ") + " are not available"));
          }
          cb();
        },
        function(cb) {
          self.availableEncoders(cb);
        },
        function(encoders, cb) {
          var unavailable;
          unavailable = self._outputs.reduce(function(cdcs, output) {
            var acodec = output.audio.find("-acodec", 1);
            if (acodec && acodec[0] !== "copy") {
              if (!(acodec[0] in encoders) || encoders[acodec[0]].type !== "audio") {
                cdcs.push(acodec[0]);
              }
            }
            return cdcs;
          }, []);
          if (unavailable.length === 1) {
            return cb(new Error("Audio codec " + unavailable[0] + " is not available"));
          } else if (unavailable.length > 1) {
            return cb(new Error("Audio codecs " + unavailable.join(", ") + " are not available"));
          }
          unavailable = self._outputs.reduce(function(cdcs, output) {
            var vcodec = output.video.find("-vcodec", 1);
            if (vcodec && vcodec[0] !== "copy") {
              if (!(vcodec[0] in encoders) || encoders[vcodec[0]].type !== "video") {
                cdcs.push(vcodec[0]);
              }
            }
            return cdcs;
          }, []);
          if (unavailable.length === 1) {
            return cb(new Error("Video codec " + unavailable[0] + " is not available"));
          } else if (unavailable.length > 1) {
            return cb(new Error("Video codecs " + unavailable.join(", ") + " are not available"));
          }
          cb();
        }
      ], callback);
    };
  };
});

// node_modules/fluent-ffmpeg/lib/ffprobe.js
var require_ffprobe = __commonJS((exports, module) => {
  var legacyTag = function(key) {
    return key.match(/^TAG:/);
  };
  var legacyDisposition = function(key) {
    return key.match(/^DISPOSITION:/);
  };
  var parseFfprobeOutput = function(out) {
    var lines = out.split(/\r\n|\r|\n/);
    lines = lines.filter(function(line2) {
      return line2.length > 0;
    });
    var data = {
      streams: [],
      format: {},
      chapters: []
    };
    function parseBlock(name) {
      var data2 = {};
      var line2 = lines.shift();
      while (typeof line2 !== "undefined") {
        if (line2.toLowerCase() == "[/" + name + "]") {
          return data2;
        } else if (line2.match(/^\[/)) {
          line2 = lines.shift();
          continue;
        }
        var kv = line2.match(/^([^=]+)=(.*)$/);
        if (kv) {
          if (!kv[1].match(/^TAG:/) && kv[2].match(/^[0-9]+(\.[0-9]+)?$/)) {
            data2[kv[1]] = Number(kv[2]);
          } else {
            data2[kv[1]] = kv[2];
          }
        }
        line2 = lines.shift();
      }
      return data2;
    }
    var line = lines.shift();
    while (typeof line !== "undefined") {
      if (line.match(/^\[stream/i)) {
        var stream = parseBlock("stream");
        data.streams.push(stream);
      } else if (line.match(/^\[chapter/i)) {
        var chapter = parseBlock("chapter");
        data.chapters.push(chapter);
      } else if (line.toLowerCase() === "[format]") {
        data.format = parseBlock("format");
      }
      line = lines.shift();
    }
    return data;
  };
  var spawn = import.meta.require("child_process").spawn;
  module.exports = function(proto) {
    proto.ffprobe = function() {
      var input, index = null, options = [], callback;
      var callback = arguments[arguments.length - 1];
      var ended = false;
      function handleCallback(err, data) {
        if (!ended) {
          ended = true;
          callback(err, data);
        }
      }
      switch (arguments.length) {
        case 3:
          index = arguments[0];
          options = arguments[1];
          break;
        case 2:
          if (typeof arguments[0] === "number") {
            index = arguments[0];
          } else if (Array.isArray(arguments[0])) {
            options = arguments[0];
          }
          break;
      }
      if (index === null) {
        if (!this._currentInput) {
          return handleCallback(new Error("No input specified"));
        }
        input = this._currentInput;
      } else {
        input = this._inputs[index];
        if (!input) {
          return handleCallback(new Error("Invalid input index"));
        }
      }
      this._getFfprobePath(function(err, path) {
        if (err) {
          return handleCallback(err);
        } else if (!path) {
          return handleCallback(new Error("Cannot find ffprobe"));
        }
        var stdout = "";
        var stdoutClosed = false;
        var stderr = "";
        var stderrClosed = false;
        var src = input.isStream ? "pipe:0" : input.source;
        var ffprobe = spawn(path, ["-show_streams", "-show_format"].concat(options, src), { windowsHide: true });
        if (input.isStream) {
          ffprobe.stdin.on("error", function(err2) {
            if (["ECONNRESET", "EPIPE", "EOF"].indexOf(err2.code) >= 0) {
              return;
            }
            handleCallback(err2);
          });
          ffprobe.stdin.on("close", function() {
            input.source.pause();
            input.source.unpipe(ffprobe.stdin);
          });
          input.source.pipe(ffprobe.stdin);
        }
        ffprobe.on("error", callback);
        var exitError = null;
        function handleExit(err2) {
          if (err2) {
            exitError = err2;
          }
          if (processExited && stdoutClosed && stderrClosed) {
            if (exitError) {
              if (stderr) {
                exitError.message += "\n" + stderr;
              }
              return handleCallback(exitError);
            }
            var data = parseFfprobeOutput(stdout);
            [data.format].concat(data.streams).forEach(function(target) {
              if (target) {
                var legacyTagKeys = Object.keys(target).filter(legacyTag);
                if (legacyTagKeys.length) {
                  target.tags = target.tags || {};
                  legacyTagKeys.forEach(function(tagKey) {
                    target.tags[tagKey.substr(4)] = target[tagKey];
                    delete target[tagKey];
                  });
                }
                var legacyDispositionKeys = Object.keys(target).filter(legacyDisposition);
                if (legacyDispositionKeys.length) {
                  target.disposition = target.disposition || {};
                  legacyDispositionKeys.forEach(function(dispositionKey) {
                    target.disposition[dispositionKey.substr(12)] = target[dispositionKey];
                    delete target[dispositionKey];
                  });
                }
              }
            });
            handleCallback(null, data);
          }
        }
        var processExited = false;
        ffprobe.on("exit", function(code, signal) {
          processExited = true;
          if (code) {
            handleExit(new Error("ffprobe exited with code " + code));
          } else if (signal) {
            handleExit(new Error("ffprobe was killed with signal " + signal));
          } else {
            handleExit();
          }
        });
        ffprobe.stdout.on("data", function(data) {
          stdout += data;
        });
        ffprobe.stdout.on("close", function() {
          stdoutClosed = true;
          handleExit();
        });
        ffprobe.stderr.on("data", function(data) {
          stderr += data;
        });
        ffprobe.stderr.on("close", function() {
          stderrClosed = true;
          handleExit();
        });
      });
    };
  };
});

// node_modules/fluent-ffmpeg/lib/recipes.js
var require_recipes = __commonJS((exports, module) => {
  var fs = import.meta.require("fs");
  var path = import.meta.require("path");
  var PassThrough = import.meta.require("stream").PassThrough;
  var async = require_async();
  var utils = require_utils();
  module.exports = function recipes(proto) {
    proto.saveToFile = proto.save = function(output) {
      this.output(output).run();
      return this;
    };
    proto.writeToStream = proto.pipe = proto.stream = function(stream, options) {
      if (stream && !("writable" in stream)) {
        options = stream;
        stream = undefined;
      }
      if (!stream) {
        if (process.version.match(/v0\.8\./)) {
          throw new Error("PassThrough stream is not supported on node v0.8");
        }
        stream = new PassThrough;
      }
      this.output(stream, options).run();
      return stream;
    };
    proto.takeScreenshots = proto.thumbnail = proto.thumbnails = proto.screenshot = proto.screenshots = function(config, folder) {
      var self = this;
      var source = this._currentInput.source;
      config = config || { count: 1 };
      if (typeof config === "number") {
        config = {
          count: config
        };
      }
      if (!("folder" in config)) {
        config.folder = folder || ".";
      }
      if ("timestamps" in config) {
        config.timemarks = config.timestamps;
      }
      if (!("timemarks" in config)) {
        if (!config.count) {
          throw new Error("Cannot take screenshots: neither a count nor a timemark list are specified");
        }
        var interval = 100 / (1 + config.count);
        config.timemarks = [];
        for (var i = 0;i < config.count; i++) {
          config.timemarks.push(interval * (i + 1) + "%");
        }
      }
      if ("size" in config) {
        var fixedSize = config.size.match(/^(\d+)x(\d+)$/);
        var fixedWidth = config.size.match(/^(\d+)x\?$/);
        var fixedHeight = config.size.match(/^\?x(\d+)$/);
        var percentSize = config.size.match(/^(\d+)%$/);
        if (!fixedSize && !fixedWidth && !fixedHeight && !percentSize) {
          throw new Error("Invalid size parameter: " + config.size);
        }
      }
      var metadata;
      function getMetadata(cb) {
        if (metadata) {
          cb(null, metadata);
        } else {
          self.ffprobe(function(err, meta) {
            metadata = meta;
            cb(err, meta);
          });
        }
      }
      async.waterfall([
        function computeTimemarks(next) {
          if (config.timemarks.some(function(t) {
            return ("" + t).match(/^[\d.]+%$/);
          })) {
            if (typeof source !== "string") {
              return next(new Error("Cannot compute screenshot timemarks with an input stream, please specify fixed timemarks"));
            }
            getMetadata(function(err, meta) {
              if (err) {
                next(err);
              } else {
                var vstream = meta.streams.reduce(function(biggest, stream) {
                  if (stream.codec_type === "video" && stream.width * stream.height > biggest.width * biggest.height) {
                    return stream;
                  } else {
                    return biggest;
                  }
                }, { width: 0, height: 0 });
                if (vstream.width === 0) {
                  return next(new Error("No video stream in input, cannot take screenshots"));
                }
                var duration = Number(vstream.duration);
                if (isNaN(duration)) {
                  duration = Number(meta.format.duration);
                }
                if (isNaN(duration)) {
                  return next(new Error("Could not get input duration, please specify fixed timemarks"));
                }
                config.timemarks = config.timemarks.map(function(mark) {
                  if (("" + mark).match(/^([\d.]+)%$/)) {
                    return duration * parseFloat(mark) / 100;
                  } else {
                    return mark;
                  }
                });
                next();
              }
            });
          } else {
            next();
          }
        },
        function normalizeTimemarks(next) {
          config.timemarks = config.timemarks.map(function(mark) {
            return utils.timemarkToSeconds(mark);
          }).sort(function(a, b) {
            return a - b;
          });
          next();
        },
        function fixPattern(next) {
          var pattern = config.filename || "tn.png";
          if (pattern.indexOf(".") === -1) {
            pattern += ".png";
          }
          if (config.timemarks.length > 1 && !pattern.match(/%(s|0*i)/)) {
            var ext = path.extname(pattern);
            pattern = path.join(path.dirname(pattern), path.basename(pattern, ext) + "_%i" + ext);
          }
          next(null, pattern);
        },
        function replaceFilenameTokens(pattern, next) {
          if (pattern.match(/%[bf]/)) {
            if (typeof source !== "string") {
              return next(new Error("Cannot replace %f or %b when using an input stream"));
            }
            pattern = pattern.replace(/%f/g, path.basename(source)).replace(/%b/g, path.basename(source, path.extname(source)));
          }
          next(null, pattern);
        },
        function getSize(pattern, next) {
          if (pattern.match(/%[whr]/)) {
            if (fixedSize) {
              return next(null, pattern, fixedSize[1], fixedSize[2]);
            }
            getMetadata(function(err, meta) {
              if (err) {
                return next(new Error("Could not determine video resolution to replace %w, %h or %r"));
              }
              var vstream = meta.streams.reduce(function(biggest, stream) {
                if (stream.codec_type === "video" && stream.width * stream.height > biggest.width * biggest.height) {
                  return stream;
                } else {
                  return biggest;
                }
              }, { width: 0, height: 0 });
              if (vstream.width === 0) {
                return next(new Error("No video stream in input, cannot replace %w, %h or %r"));
              }
              var width = vstream.width;
              var height = vstream.height;
              if (fixedWidth) {
                height = height * Number(fixedWidth[1]) / width;
                width = Number(fixedWidth[1]);
              } else if (fixedHeight) {
                width = width * Number(fixedHeight[1]) / height;
                height = Number(fixedHeight[1]);
              } else if (percentSize) {
                width = width * Number(percentSize[1]) / 100;
                height = height * Number(percentSize[1]) / 100;
              }
              next(null, pattern, Math.round(width / 2) * 2, Math.round(height / 2) * 2);
            });
          } else {
            next(null, pattern, -1, -1);
          }
        },
        function replaceSizeTokens(pattern, width, height, next) {
          pattern = pattern.replace(/%r/g, "%wx%h").replace(/%w/g, width).replace(/%h/g, height);
          next(null, pattern);
        },
        function replaceVariableTokens(pattern, next) {
          var filenames = config.timemarks.map(function(t, i2) {
            return pattern.replace(/%s/g, utils.timemarkToSeconds(t)).replace(/%(0*)i/g, function(match, padding) {
              var idx = "" + (i2 + 1);
              return padding.substr(0, Math.max(0, padding.length + 1 - idx.length)) + idx;
            });
          });
          self.emit("filenames", filenames);
          next(null, filenames);
        },
        function createDirectory(filenames, next) {
          fs.exists(config.folder, function(exists) {
            if (!exists) {
              fs.mkdir(config.folder, function(err) {
                if (err) {
                  next(err);
                } else {
                  next(null, filenames);
                }
              });
            } else {
              next(null, filenames);
            }
          });
        }
      ], function runCommand(err, filenames) {
        if (err) {
          return self.emit("error", err);
        }
        var count = config.timemarks.length;
        var split;
        var filters = [split = {
          filter: "split",
          options: count,
          outputs: []
        }];
        if ("size" in config) {
          self.size(config.size);
          var sizeFilters = self._currentOutput.sizeFilters.get().map(function(f, i3) {
            if (i3 > 0) {
              f.inputs = "size" + (i3 - 1);
            }
            f.outputs = "size" + i3;
            return f;
          });
          split.inputs = "size" + (sizeFilters.length - 1);
          filters = sizeFilters.concat(filters);
          self._currentOutput.sizeFilters.clear();
        }
        var first = 0;
        for (var i2 = 0;i2 < count; i2++) {
          var stream = "screen" + i2;
          split.outputs.push(stream);
          if (i2 === 0) {
            first = config.timemarks[i2];
            self.seekInput(first);
          }
          self.output(path.join(config.folder, filenames[i2])).frames(1).map(stream);
          if (i2 > 0) {
            self.seek(config.timemarks[i2] - first);
          }
        }
        self.complexFilter(filters);
        self.run();
      });
      return this;
    };
    proto.mergeToFile = proto.concatenate = proto.concat = function(target, options) {
      var fileInput = this._inputs.filter(function(input) {
        return !input.isStream;
      })[0];
      var self = this;
      this.ffprobe(this._inputs.indexOf(fileInput), function(err, data) {
        if (err) {
          return self.emit("error", err);
        }
        var hasAudioStreams = data.streams.some(function(stream) {
          return stream.codec_type === "audio";
        });
        var hasVideoStreams = data.streams.some(function(stream) {
          return stream.codec_type === "video";
        });
        self.output(target, options).complexFilter({
          filter: "concat",
          options: {
            n: self._inputs.length,
            v: hasVideoStreams ? 1 : 0,
            a: hasAudioStreams ? 1 : 0
          }
        }).run();
      });
      return this;
    };
  };
});

// node_modules/fluent-ffmpeg/lib/fluent-ffmpeg.js
var require_fluent_ffmpeg = __commonJS((exports, module) => {
  var FfmpegCommand = function(input, options) {
    if (!(this instanceof FfmpegCommand)) {
      return new FfmpegCommand(input, options);
    }
    EventEmitter.call(this);
    if (typeof input === "object" && !("readable" in input)) {
      options = input;
    } else {
      options = options || {};
      options.source = input;
    }
    this._inputs = [];
    if (options.source) {
      this.input(options.source);
    }
    this._outputs = [];
    this.output();
    var self = this;
    ["_global", "_complexFilters"].forEach(function(prop) {
      self[prop] = utils.args();
    });
    options.stdoutLines = "stdoutLines" in options ? options.stdoutLines : 100;
    options.presets = options.presets || options.preset || path.join(__dirname, "presets");
    options.niceness = options.niceness || options.priority || 0;
    this.options = options;
    this.logger = options.logger || {
      debug: function() {
      },
      info: function() {
      },
      warn: function() {
      },
      error: function() {
      }
    };
  };
  var __dirname = "/home/wolf/Documents/projects/Browser-Phone/backend/node_modules/fluent-ffmpeg/lib";
  var path = import.meta.require("path");
  var util = import.meta.require("util");
  var EventEmitter = import.meta.require("events").EventEmitter;
  var utils = require_utils();
  util.inherits(FfmpegCommand, EventEmitter);
  module.exports = FfmpegCommand;
  FfmpegCommand.prototype.clone = function() {
    var clone = new FfmpegCommand;
    var self = this;
    clone.options = this.options;
    clone.logger = this.logger;
    clone._inputs = this._inputs.map(function(input) {
      return {
        source: input.source,
        options: input.options.clone()
      };
    });
    if ("target" in this._outputs[0]) {
      clone._outputs = [];
      clone.output();
    } else {
      clone._outputs = [
        clone._currentOutput = {
          flags: {}
        }
      ];
      ["audio", "audioFilters", "video", "videoFilters", "sizeFilters", "options"].forEach(function(key) {
        clone._currentOutput[key] = self._currentOutput[key].clone();
      });
      if (this._currentOutput.sizeData) {
        clone._currentOutput.sizeData = {};
        utils.copy(this._currentOutput.sizeData, clone._currentOutput.sizeData);
      }
      utils.copy(this._currentOutput.flags, clone._currentOutput.flags);
    }
    ["_global", "_complexFilters"].forEach(function(prop) {
      clone[prop] = self[prop].clone();
    });
    return clone;
  };
  require_inputs()(FfmpegCommand.prototype);
  require_audio()(FfmpegCommand.prototype);
  require_video()(FfmpegCommand.prototype);
  require_videosize()(FfmpegCommand.prototype);
  require_output()(FfmpegCommand.prototype);
  require_custom()(FfmpegCommand.prototype);
  require_misc()(FfmpegCommand.prototype);
  require_processor()(FfmpegCommand.prototype);
  require_capabilities()(FfmpegCommand.prototype);
  FfmpegCommand.setFfmpegPath = function(path2) {
    new FfmpegCommand().setFfmpegPath(path2);
  };
  FfmpegCommand.setFfprobePath = function(path2) {
    new FfmpegCommand().setFfprobePath(path2);
  };
  FfmpegCommand.setFlvtoolPath = function(path2) {
    new FfmpegCommand().setFlvtoolPath(path2);
  };
  FfmpegCommand.availableFilters = FfmpegCommand.getAvailableFilters = function(callback) {
    new FfmpegCommand().availableFilters(callback);
  };
  FfmpegCommand.availableCodecs = FfmpegCommand.getAvailableCodecs = function(callback) {
    new FfmpegCommand().availableCodecs(callback);
  };
  FfmpegCommand.availableFormats = FfmpegCommand.getAvailableFormats = function(callback) {
    new FfmpegCommand().availableFormats(callback);
  };
  FfmpegCommand.availableEncoders = FfmpegCommand.getAvailableEncoders = function(callback) {
    new FfmpegCommand().availableEncoders(callback);
  };
  require_ffprobe()(FfmpegCommand.prototype);
  FfmpegCommand.ffprobe = function(file) {
    var instance = new FfmpegCommand(file);
    instance.ffprobe.apply(instance, Array.prototype.slice.call(arguments, 1));
  };
  require_recipes()(FfmpegCommand.prototype);
});

// src/android/scrcpy.ts
var {$ } = globalThis.Bun;
async function startScrcpy(deviceId, scrcpyServerPath) {
  await $`adb push ${scrcpyServerPath} /data/local/tmp/scrcpy-server.jar`;
  console.log("Pushed scrcpy server to device");
  await $`adb forward tcp:1234 localabstract:scrcpy`;
  console.log("Forwarded port");
  await $`adb shell CLASSPATH=/data/local/tmp/scrcpy-server.jar \
    app_process / com.genymobile.scrcpy.Server 2.5 \
    tunnel_forward=true \
    audio=false \
    control=false \
    cleanup=false \
    raw_stream=true \
    max_size=1920 \
    video_bit_rate=35000000 \
    video_codec_options=bitrate-mode=4,latency=0 \
    max_fps=30`;
  console.log("Started running scrcpy");
}

// src/android/index.ts
var import_adb_ts = __toESM(require_lib(), 1);
async function startAndroid(device, scrcpyServerPath) {
  const client = new import_adb_ts.Client({});
  const devices = await client.listDevices();
  if (devices.length === 0)
    throw new Error("No devices found");
  const deviceId = devices[0].id;
  client.waitBootComplete(deviceId);
  return startScrcpy(device, scrcpyServerPath);
}

// src/ffmpeg/index.ts
var import_fluent_ffmpeg = __toESM(require_fluent_ffmpeg(), 1);
async function startFfmpeg(inputTcpIp, outputRtpIp) {
  import_fluent_ffmpeg.default().input(`tcp://${inputTcpIp}`).noAudio().inputFormat("h264").inputOptions("-re").videoCodec("copy").outputOptions("-fflags", "nobuffer").output(`rtp://${outputRtpIp}`).format("rtp").outputOptions("-sdp_file", "video.sdp").on("end", () => {
    console.log("Processing finished!");
  }).on("error", (err) => {
    console.error(`Error: ${err.message}`);
  }).run();
}

// src/janus/index.ts
var {$: $2 } = globalThis.Bun;
async function startJanus(configDirPath, baseConfigPath) {
  const janusRoot = (await $2`which janus`.text()).replace("/bin/janus", "");
  return Bun.spawn([
    "janus",
    "-P",
    `${janusRoot}/lib/janus/plugins`,
    "-F",
    configDirPath,
    "-C",
    baseConfigPath
  ], {
    cwd: "src/janus",
    stdout: "inherit"
  });
}

// src/index.ts
startJanus("configs", "janus.jcfg");
startAndroid("R58T33601SF", "./src/android/scrcpy-server-v2.5.jar");
await Bun.sleep(4000);
startFfmpeg("127.0.0.1:1234", "127.0.0.1:5004");
