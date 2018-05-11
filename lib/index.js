"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "rrInit", {
  enumerable: true,
  get: function get() {
    return _rrInit.default;
  }
});
Object.defineProperty(exports, "RrAction", {
  enumerable: true,
  get: function get() {
    return _RrAction.default;
  }
});
Object.defineProperty(exports, "RrRoute", {
  enumerable: true,
  get: function get() {
    return _RrRoute.default;
  }
});
Object.defineProperty(exports, "RrSetMomentLocale", {
  enumerable: true,
  get: function get() {
    return _RrSetMomentLocale.default;
  }
});
exports.apiDeclare = exports.reducers = void 0;

var _rrInit = _interopRequireDefault(require("./rrInit"));

var apiDeclare = _interopRequireWildcard(require("./actions/apiDeclare"));

exports.apiDeclare = apiDeclare;

var _auth = _interopRequireDefault(require("./reducers/auth"));

var _lists = _interopRequireDefault(require("./reducers/lists"));

var _props = _interopRequireDefault(require("./reducers/props"));

var _router = _interopRequireDefault(require("./reducers/router"));

var _track = _interopRequireDefault(require("./reducers/track"));

var _RrAction = _interopRequireDefault(require("./components/RrAction"));

var _RrRoute = _interopRequireDefault(require("./components/RrRoute"));

var _RrSetMomentLocale = _interopRequireDefault(require("./components/RrSetMomentLocale"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = {
  auth: _auth.default,
  lists: _lists.default,
  props: _props.default,
  router: _router.default,
  track: _track.default
};
exports.reducers = reducers;