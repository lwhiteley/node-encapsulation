var _ = require('lodash');
var self = {};
self._config = {
  env: 'test'
};

self.configure = function(config){
  if( _.isObject(config) ){
    self._config = _.merge(self._config, config);
  }
};

self.build = function(value){
  var result = {}
  if(_.isObject(value) && _.isObject(value.public) && !_.isArray(value.public) ){
    result = value.public;
    if(process.env.NODE_ENV && (process.env.NODE_ENV === self._config.env) &&
        _.isObject(value.private) && !_.isArray(value.private) ){

      result = _.merge(value.private, result);

    }
  }
  return result;
};

module.exports = self;
