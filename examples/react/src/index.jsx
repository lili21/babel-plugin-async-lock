import React from 'react';
import ReactDom from 'react-dom';

const sleep = (t = 1) => {
  return new Promise(resolve => {
    setTimeout(resolve, t * 1000)
  })
}

class Button extends React.Component {
  async onClick() {
    console.log('async class method')
    await sleep(1);
    this.props.onClick();
  }

  render() {
    return <button onClick={() => this.onClick()}>class method support</button>
  }
}

function App() {
  const [count, setCount] = React.useState(0)
  const onClick = async () => {
    console.log('async function')
    await sleep(2)
    setCount(c => c +1)
  }

  return (
    <div>
      <h1>Hello, React World</h1>
      <p>{count}</p>
      <button onClick={onClick}>function support</button>
      <Button onClick={() => setCount(c => c + 1)} />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
