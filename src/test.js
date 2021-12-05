const babel = require('@babel/core');
const myPlugin = require('./index');

const code = `
function Test() {
  const onClick = async () => {

  }

  async function onClick2() {

  }
  
  // return <button onClick={onClick}>submit</button>
  return React.createElement('button', {
      onClick
  }, 'submit')
}
`;
const output = babel.transformSync(code, {
  plugins: [myPlugin]
})

console.log(output.code);