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

// disable-async-lock
async function test() {} // async-lock-disable


const test1 = _lock$(async () => {});