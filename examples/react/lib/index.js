function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _lock$(fn) {
  var _this = this;

  let locking = false;

  const _lockedFn$ = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (...args) {
      if (locking) {
        return;
      }

      try {
        locking = true;
        yield fn.apply(_this, args);
      } catch (e) {
        throw e;
      } finally {
        locking = false;
      }
    });

    return function _lockedFn$() {
      return _ref.apply(this, arguments);
    };
  }();

  return _lockedFn$;
}

import React from 'react';
import ReactDom from 'react-dom';

const sleep = (t = 1) => {
  return new Promise(resolve => {
    setTimeout(resolve, t * 1000);
  });
};

function App() {
  const [count, setCount] = React.useState(0);

  const onClick = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* () {
      console.log('hehhehe');
      yield sleep(1);
      console.log('sleeee');
      yield sleep(2);
      console.log('hhh');
      setCount(c => c + 1);
    });

    return function onClick() {
      return _ref2.apply(this, arguments);
    };
  }();

  function onClick2() {
    return _onClick.apply(this, arguments);
  }

  function _onClick() {
    _onClick = _asyncToGenerator(function* () {
      console.log('hehhehe');
      yield sleep(1);
      setCount(c => c + 1);
    });
    return _onClick.apply(this, arguments);
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Hello, React World"), /*#__PURE__*/React.createElement("p", null, count), /*#__PURE__*/React.createElement("button", {
    onClick: onClick
  }, "arrow async fn test"), /*#__PURE__*/React.createElement("button", {
    onClick: onClick2
  }, "fn declare test"));
}

ReactDom.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));