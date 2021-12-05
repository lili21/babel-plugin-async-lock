# babel plugin for async lock

Prevent unnecessary click callback trigger by fast click. Especcily for async callback, like requesting backend API.
## Why

```jsx
import React from 'react'

function App() {
  const handleClick = async () => {
    const res = await fetch('/api')
  }

  return <button onClick={handleClick}>send request</button>
}
```

While we fetching `api`, User can still click the button, and trigger the new fetching, which is unneccessary and mostly unexpected


## What the plugin do

it will transform the code, automaticlly add a locker to every async function
