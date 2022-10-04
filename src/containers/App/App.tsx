import React, { useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import MainLayout from '../../components/MainLayout';
import AppContext from '../../hooks/app-context';
import Menu from '../../data/prices.json';

import Home from '../Home';
import PeopleList from '../PeopleList';
import AddFood from '../AddFood';

function App() {
  const [tab, setTab] = useState<any[]>([]);
  const [prices] = useState<any[]>(Menu);

  const updateTab = (newTab: any[]) => {
    setTab(newTab);
  };

  return (
    <AppContext.Provider value={{
      tab,
      setTab: updateTab,
      prices
    }}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<PeopleList />} />
            <Route path="/food" element={<AddFood />} />
          </Routes>
        </MainLayout>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
