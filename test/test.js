'use strict';

require('should');
const cop = require('../index');
const co = require('co');

describe('co-parallel-limit', () => {
  let tasks = [
    co.wrap(function*() {
      return 1;
    }),
    co.wrap(function*() {
      return 2;
    }),
    co.wrap(function*() {
      return 3;
    })
  ];
  it('should end after 1 batches', done => {
    co(function*() {
      const startTime = Date.now();
      let rst = yield cop(tasks, 3, 500);
      const endTime = Date.now();
      rst.should.eql([1, 2, 3]);
      let duration = endTime - startTime;
      duration.should.aboveOrEqual(0);
      duration.should.below(500);
      done();
    });
  });
  it('should end after 2 batches', done => {
    co(function*() {
      const startTime = Date.now();
      let rst = yield cop(tasks, 2, 500);
      const endTime = Date.now();
      rst.should.eql([1, 2, 3]);
      let duration = endTime - startTime;
      duration.should.aboveOrEqual(500);
      duration.should.below(1000);
      done();
    });
  });
  it('should end after 3 batches', done => {
    co(function*() {
      const startTime = Date.now();
      let rst = yield cop(tasks, 1, 500);
      const endTime = Date.now();
      rst.should.eql([1, 2, 3]);
      let duration = endTime - startTime;
      duration.should.aboveOrEqual(1000);
      duration.should.below(1500);
      done();
    });
  });
});
