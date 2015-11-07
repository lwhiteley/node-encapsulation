var service = require('../')
var _ = require('lodash');

var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;

describe('node-encapsulation suite: ', function () {

    after(function(){
      process.env.NODE_ENV = null;
      service._config = {env:'test'};
    });

    describe('build() suite: this creates your module ', function () {

        it('should return empty module if incorrect object is passed', function(){
            assert.isTrue(_.isEmpty(service.build(null)));
            assert.isTrue(_.isEmpty(service.build(true)));
            assert.isTrue(_.isEmpty(service.build({pub: {}})));
        });

        it('should return module with only public properties when proper config is passed', function(){

            var public = {publicFunc: function(){}};
            var private = {privateFunc: function(){}};
            var result = service.build({public: public, private: private});
            assert.equal(result, public);
            expect(_.keys(result)).to.have.length(1);
        });

        it('should return empty module when only private properties passed and not in "test" env', function(){
            var private = {privateFunc: function(){}};
            var result = service.build({private: private});
            assert.isTrue(_.isEmpty(result));
            expect(_.keys(result)).to.have.length(0);
        });

        it('should return public and private properties when both properties types passed and app is in "test" env', function(){
          var public = {publicFunc: function(){}};
          var private = {privateFunc: function(){}};
          var expected = {
            privateFunc: function(){},
            publicFunc: function(){}
          };
          process.env.NODE_ENV = 'test';
          var result = service.build({public: public, private: private})

          expect(result).to.have.all.keys(['privateFunc', 'publicFunc']);
          expect(_.keys(result)).to.have.length(2);

        });

        it('should return public and private properties when both properties types passed and app is in "testing" env', function(){
          var public = {publicFunc: function(){}};
          var private = {privateFunc: function(){}};
          var expected = {
            privateFunc: function(){},
            publicFunc: function(){}
          };
          process.env.NODE_ENV = 'testing';
          service.configure({env:'testing'})

          var result = service.build({public: public, private: private})

          expect(result).to.have.all.keys(['privateFunc', 'publicFunc']);
          expect(_.keys(result)).to.have.length(2);

        });

    });

});
