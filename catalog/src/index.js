import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import Container from './Container';
import Example from './Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  < Example />
  {/* <Container> */}
    <FilterBar />
{/*     <SearchBar />   */}
{/*   </Container> */}
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
