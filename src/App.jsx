import React, { lazy, Suspense } from 'react';
// import classNames from 'classnames';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Welcome from './components/Welcome';
import HousesView from './components/HousesView';
import InterrogatorView from './components/InterrogatorView';
import RootStore from './RootStore';
import STORE from './store';

import './App.scss';

const HousesResume = lazy(() => import(/* webpackChunkName: "bundler-housesResume" */ './components/HousesResume'));

function App() {
  return (
    <BrowserRouter basename={APP_ENV.APP_PUBLIC_PATH}>
      <RootStore.Provider value={STORE}>
        <AppNavbar />
        <main>
          <Container fluid>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/houses/*" element={<HousesView />} />
              <Route
                path="/houses-resume"
                element={(
                  <Suspense fallback={<h4>Chargement du composant...</h4>}>
                    <HousesResume />
                  </Suspense>
                )}
              />
              <Route path="/interrogator" element={<InterrogatorView />} />
            </Routes>
          </Container>
        </main>
      </RootStore.Provider>
    </BrowserRouter>
  );
}

export default App;
