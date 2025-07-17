import React from 'react'
import { Provider } from 'react-redux';
import Approutes from './routes/Approutes'
import { AuthInitializer } from './utils/AuthInitializer'
import { store } from './redux/Store';

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
      <AuthInitializer />
      <Approutes/>
      </Provider>
    </React.Fragment>
  )
}

export default App
