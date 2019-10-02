import React from 'react'

import { MultiProvider, Consumer, Provider } from 'react-provider'

export default function App() {
  return (
    <MultiProvider
      providers={[
        <Provider of="A" value="Hello World" />,
        <Provider of="B" value="Hello Alexis" />,
        <Provider of="C" value="Hello Lyon" />,
      ]}
    >
      <Consumer of="A" builder={x => <h1>{x}</h1>} />
      <Consumer of="B" builder={x => <h1>{x}</h1>} />
      <Consumer of="C" builder={x => <h1>{x}</h1>} />
    </MultiProvider>
  )
}