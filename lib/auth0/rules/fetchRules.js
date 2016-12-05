'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STAGES = ['login_success', 'login_failure', 'pre_authorize'];

function fetchRules(context) {
  var client = context.client;


  return Promise.all(_ramda2.default.map(function (stage) {
    return client.rules.getAll({ stage: stage });
  }, STAGES)).then(_ramda2.default.flatten).then(_ramda2.default.assoc('rules', _ramda2.default.__, context));
}