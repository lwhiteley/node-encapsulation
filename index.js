var _ = require('lodash');
var self = {};
self._config = {
  env: 'test'
};

self.configure = function(config){
  if( _.isPlainObject(config) ){
    self._config = _.merge(self._config, config);
  }
};

self.build = function(value){
  var result = {}
  if(_.isPlainObject(value) && _.isPlainObject(value.public) ){
    result = value.public;
    if(process.env.NODE_ENV && (process.env.NODE_ENV === self._config.env) &&
        _.isPlainObject(value.private) ){

      result = _.merge(value.private, result);

    }
  }
  return result;
};

module.exports = self;
