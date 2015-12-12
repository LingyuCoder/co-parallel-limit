'use strict';

const co = require('co');
const curryRight = require('lodash.curryright');
const wait = require('co-wait');

module.exports = curryRight(co.wrap(function*(tasks, num, time) {
  tasks = tasks.slice(0);
  let rst = [];
  while (tasks.length) {
    let curRst = yield tasks.splice(0, Math.min(num, tasks.length)).map(task => task());
    Array.prototype.push.apply(rst, curRst);
    if (time > 0 && tasks.length)
      yield wait(time);
  }
  return rst;
}), 3);
