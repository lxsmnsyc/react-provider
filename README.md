# react-provider

> Flutter&#x27;s Depedency Injection pattern for React

[![NPM](https://img.shields.io/npm/v/react-provider.svg)](https://www.npmjs.com/package/@lxsmnsyc/react-provider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @lxsmnsyc/react-provider
```

## Examples

### Basic

```tsx
import React from 'react'

import { Provider, Consumer } from 'react-provider'

export default function App() {
  return (
    <Provider of="A" value="Hello World">
      <Consumer of="A" builder={x => <h1>{x}</h1>} />
    </Provider>
  )
}
```

### Nested using filters

```tsx
import React from 'react'

import { Provider, Consumer } from 'react-provider'

export default function App() {
  return (
    <Provider value="Hello World">
      <Provider value="Hello Alexis">
        <Consumer
          of={x => typeof x === 'string'}
          builder={x => <h1>{x}</h1>}
        />
      </Provider>
      <Consumer
        of={x => typeof x === 'string'}
        builder={x => <h1>{x}</h1>}
      />
    </Provider>
  )
}
```

### Promise

```tsx
import React from 'react'

import { PromiseProvider, PromiseConsumer } from 'react-provider';

export default function App() {
  return (
    <PromiseProvider of="Test" value={Promise.resolve('Hello World')}>
      <PromiseConsumer
        of="Test"
        onDefault={() => <h1>Default</h1>}
        onSuccess={x => <h1>{x}</h1>}
        onFailure={x => <h1>{x.message}</h1>}
        onLoading={() => <h1>Loading...</h1>}
      />
    </PromiseProvider>
  )
}
```

### ChangeNotifier

```tsx
import React, { useCallback } from 'react'

import { useChangeNotifierProvider, ChangeNotifierProvider, ChangeNotifierConsumer, ChangeNotifier } from 'react-provider'

class CounterModel extends ChangeNotifier {
  constructor() {
    super();
    this.count = 0;
  }

  increment() {
    this.count++;
    this.notifyListeners();
  }

  decrement() {
    this.count--;
    this.notifyListeners();
  }
}

function Increment() {
  const notifier = useChangeNotifierProvider('Test', false);
  const onClick = useCallback(() => notifier.increment(), [ notifier ]);
  return (
    <button type="button" onClick={onClick}>Increment!</button>
  )
}

function Decrement() {
  const notifier = useChangeNotifierProvider('Test', false);
  const onClick = useCallback(() => notifier.decrement(), [ notifier ]);
  return (
    <button type="button" onClick={onClick}>Decrement!</button>
  )
}

export default function App() {
  return (
    <ChangeNotifierProvider of="Test" value={new CounterModel()}>
      <ChangeNotifierConsumer
        of="Test"
        builder={model => <h1>{model.count}</h1>}
      />
      <Increment />
      <Decrement />
    </ChangeNotifierProvider>
  )
}
```

### Composing multiple Providers

```tsx
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
```

## License

MIT © [LXSMNSYC](https://github.com/LXSMNSYC)
