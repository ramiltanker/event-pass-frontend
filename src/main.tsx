import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/providers/store';
import { AppProvider } from 'app/providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppProvider />
  </Provider>,
);
