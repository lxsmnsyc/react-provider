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