import React, { useCallback } from 'react'

import { useChangeNotifierProvider, ChangeNotifierProvider, ChangeNotifierConsumer, ChangeNotifier } from 'react-provider'

const sleep = time => new Promise((res) => setTimeout(res, time, true));
class CounterModel extends ChangeNotifier {
  constructor() {
    super();
    this.count = 0;
    this.loading = false;
  }

  increment() {
    this.loading = true;
    this.notifyListeners();
    sleep(500).then(() => {
      this.count++;
      this.loading = false;
      this.notifyListeners();

    });
  }

  decrement() {
    this.count--;
    this.notifyListeners();
  }
}

function Increment() {
  const notifier = useChangeNotifierProvider('Test', true);
  const onClick = useCallback(() => notifier.increment(), [ notifier ]);
  return (
    <button type="button" onClick={onClick} disabled={notifier.loading}>
      { notifier.loading ? 'Loading' : 'Increment!'}
    </button>
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