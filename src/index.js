const lock = `
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
`

function asyncLockPlugin({ types: t, parse }) {
  return {
    visitor: {
      Program(path) {
        path.node.body.unshift(parse(lock).program.body[0]);
      },
      'ArrowFunctionExpression|FunctionExpression': (path) => {
        // handle async function
        if (!path.node.async) return;
        if (path.parentPath.get('callee').isIdentifier({ name: '_lock$' })) return;
        if (path.findParent(p => p.get('id').isIdentifier({ name: '_lockedFn$' }))) return;

        const newNode = t.callExpression(t.identifier('_lock$'), [path.node])
        path.replaceWith(newNode)
      },
      FunctionDeclaration(path) {
        if (path.node.async && !path.parentPath.isProgram()) {
          const newNode = t.variableDeclaration('const', [
            t.variableDeclarator(path.node.id, t.functionExpression(null, path.node.params, path.node.body, path.node.generator, path.node.async))
          ])
          path.replaceWith(newNode);
        }
      },
      CallExpression(path) {
        // handle conflict with async-to-generator
        if (path.parentPath.get('callee').isIdentifier({ name: '_lock$' })) return;
        if (path.findParent(p => p.get('id').isIdentifier({ name: '_lockedFn$' }))) return;
        if (path.get('callee').isIdentifier({ name: '_asyncToGenerator'})) {
          const newNode = t.callExpression(t.identifier('_lock$'), [path.node])
          path.replaceWith(newNode)
        }
      }
    }
  }
}

module.exports = asyncLockPlugin;