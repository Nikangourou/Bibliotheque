import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import RootStore from './RootStore';
import STORE from './store';

import './App.scss';
import NavBar from './components/NavBarCustom';
import { Container } from 'react-bootstrap'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SearchBook from './components/searchBook/SearchBook';
import ReturnhBook from './components/returnBook/ReturnBook';
import Members from './components/members/members';


function App() {
  return (
    <BrowserRouter>
      <RootStore.Provider value={STORE}>
        <NavBar></NavBar>
        <main>
          <Container>
            <Routes>
              <Route path="/searchBook" element={<SearchBook />} />
              <Route path="/returnBook" element={<ReturnhBook />} />
              <Route path="/members/*" element={<Members />} />
            </Routes>
          </Container>
        </main>
      </RootStore.Provider>
    </BrowserRouter>
  );
}

export default App;
