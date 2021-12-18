function _lock$(fn) {
  let locking = false;

  const _lockedFn$ = async function (...args) {
    if (locking) {
      return;
    }

    try {
      locking = true;
      const r = await fn.apply(this, args);
      return r;
    } catch (e) {
      throw e;
    } finally {
      locking = false;
    }
  };

  return _lockedFn$;
}

import React from 'react';
import ReactDom from 'react-dom';
import { test } from './service.js';

const sleep = (t = 1) => {
  return new Promise(resolve => {
    setTimeout(resolve, t * 1000);
  });
};

class Button extends React.Component {
  async onClick() {
    console.log('async class method');
    await sleep(1);
    this.props.onClick();
  }

  render() {
    return /*#__PURE__*/React.createElement("button", {
      onClick: () => this.onClick()
    }, "class method support");
  }

}

function App() {
  const [count, setCount] = React.useState(0);

  const onClick = _lock$(async () => {
    console.log('async function');
    await sleep(2);
    setCount(c => c + 1);
  });

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Hello, React World"), /*#__PURE__*/React.createElement("p", null, count), /*#__PURE__*/React.createElement("button", {
    onClick: onClick
  }, "function support"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => setCount(c => c + 1)
  }));
}

ReactDom.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));