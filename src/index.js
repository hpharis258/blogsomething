import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Create from './pages/createBlog';
import Edit from './pages/editBlog';
import PageNotFound from './pages/PageNotFound';
import Auth from './pages/auth';
import Support from './pages/support';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import ViewBlog from './pages/viewBlog'; 
import Settings from './pages/settings';
import SearchPage from './pages/search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/create' element={<Create/>} />
          <Route exact path='/edit' element={<Edit/>} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/auth' element={<Auth/>} />
          <Route exact path='/support' element={<Support/>} />
          <Route exact path='/viewBlog' element={<ViewBlog/>} />
          <Route exact path='/settings' element={<Settings/>} />
          <Route exact path='/search' element={<SearchPage/>} />
          <Route exact path='/*' element={<PageNotFound/>} />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

