import React from 'react'

import { Provider, Consumer } from 'react-provider'

export default function App() {
  return (
    <Provider of="A" value="Hello World">
      <Consumer of="A" builder={x => <h1>{x}</h1>} />
    </Provider>
  )
}