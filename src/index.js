import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Create from './pages/createBlog';
import Edit from './pages/editBlog';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/create' element={<Create/>} />
          <Route exact path='/edit' element={<Edit/>} />
          <Route exact path='/about' element={<About/>} />

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

