import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <IntlProvider locale="en">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
