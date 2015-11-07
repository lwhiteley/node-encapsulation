# node-encapsulation
set private and public methods/properties but expose private methods/properties to the test environment.

[![Build Status](https://travis-ci.org/lwhiteley/node-encapsulation.svg?branch=master)](https://travis-ci.org/lwhiteley/node-encapsulation)

This module is a wrapper when creating node modules. This lets you easily expose methods/properties you really want to be private but still need to run tests on.

For eg.

```js
module.exports = {
  myPublicMethod: function(){
    console.log('consumers will use me')
  },
  myPrivateMethod: function(){
    console.log('consumers dont need me but i still need to be tested')
  }
};
```

Therefore, instead of exposing methods/properties you don't really want to then you could do the following

```js
var encapsulate = require('encapsulation').build;
var private = {}, public = {};

private.myPrivateMethod = function(){
  console.log('consumers dont need me but i still need to be tested')
}

public.myPublicMethod = function(){
  private.myPrivateMethod();
}

module.exports = encapsulate({private: private, public: public});
```

In the normal execution of your app:

```js
var encapsulate = require('encapsulation').build;
var klazz = encapsulate({private: private, public: public});
/**
yeilds: {myPublicMethod: Function}
**/
```

When **process.env.NODE_ENV** is set to **'test'**:

```js
var encapsulate = require('encapsulation').build;
var klazz = encapsulate({private: private, public: public});
/**
yeilds: {myPrivateMethod: Function, myPublicMethod: Function}
**/
```

The environment to look for by default is **'test'** but can be configured:
```js
/**
This only needs to be called once at the start of your app
**/
require('encapsulation').configure({env:'testing'});

```

### Notes
- Be careful not to use the same property names for public and private properties
- Public properties take precedence over private properties
- this is an experiment
- pull requests are welcome
- report issues if you see any (fix it if possible :-) )
