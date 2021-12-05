const lock = `
function _lock$(fn) {
  let locking = false;

  const _lockedFn$ = async (...args) => {
    if (locking) {
      return;
    }

    try {
      locking = true;
      await fn.apply(this, args);
    } catch (e) {
      throw e;
    } finally {
      locking = false;
    }
  };
  return _lockedFn$;
}
`

function asyncLockPlugin({ types: t, parse }) {
  return {
    visitor: {
      Program(path) {
        path.node.body.unshift(parse(lock).program.body[0]);
      },
      'ArrowFunctionExpression|FunctionExpression': (path) => {
        if (!path.node.async) return;
        if (path.parentPath.isCallExpression()) return;
        if (path.parentPath.node.id.name === '_lockedFn$') return;

        const newNode = t.callExpression(t.identifier('_lock$'), [path.node])
        path.replaceWith(newNode)
      },
      FunctionDeclaration(path) {
        if (path.node.async) {
          const newNode = t.variableDeclaration('const', [
            t.variableDeclarator(path.node.id, t.functionExpression(null, path.node.params, path.node.body, path.node.generator, path.node.async))
          ])
          path.replaceWith(newNode);
        }
      }
    }
  }
}

module.exports = asyncLockPlugin;