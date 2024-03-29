// import React from 'react';
// import ReactDOM from "react-dom";
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import store from './redux/stores';
// import { Provider } from 'react-redux';


// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/stores';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { ContextProvider, socket, SocketContext } from './core/config/socket.config';



ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
          <ToastContainer />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();