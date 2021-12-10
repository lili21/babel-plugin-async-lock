import React from 'react';
import ReactDom from 'react-dom';

const sleep = (t = 1) => {
  return new Promise(resolve => {
    setTimeout(resolve, t * 1000)
  })
}

function App() {
  const [count, setCount] = React.useState(0)
  const onClick = async () => {
    console.log('hehhehe')
    await sleep(1);
    console.log('sleeee')
    await sleep(2)
    console.log('hhh')
    setCount(c => c +1)
    return '123';
  }

  async function onClick2() {
    console.log('hehhehe')
    await sleep(1);
    setCount(c => c +1)
  }
  return (
    <div>
      <h1>Hello, React World</h1>
      <p>{count}</p>
      <button onClick={onClick}>arrow async fn test</button>
      <button onClick={onClick2}>fn declare test</button>
    </div>
  )
}


ReactDom.render(<App />, document.getElementById('root'))
