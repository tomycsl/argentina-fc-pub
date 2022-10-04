import React, { useState } from 'react';
import {
  BrowserRouter as Router,
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
  const [tab, setTab] = useState<any[]>([{
    teamMember: 'Contra',
    items: [{
      name: 'IPA',
      price: 6.4,
      paid: false
    }, {
      name: 'IPA',
      price: 6.4,
      paid: false
    }, {
      name: 'IPA',
      price: 6.4,
      paid: false
    }, {
      name: 'Burger',
      price: 13.5,
      paid: false
    }]
  }, {
    teamMember: 'Faca',
    items: [{
      name: 'IPA',
      price: 6.4,
      paid: false
    }, {
      name: 'IPA',
      price: 6.4,
      paid: false
    }, {
      name: 'IPA',
      price: 6.4,
      paid: false
    }, {
      name: 'IPA',
      price: 6.4,
      paid: false
    }, {
      name: 'Margarita',
      price: 9.5,
      paid: true
    }]
  }, {
    teamMember: 'Facu',
    items: [{
      name: 'IPA',
      price: 6.4,
      paid: false
    }, {
      name: 'IPA',
      price: 6.4,
      paid: false
    }, {
      name: 'IPA',
      price: 6.4,
      paid: false
    }]
  }, {
    teamMember: 'Peru',
    items: [{
      name: 'Lager',
      price: 5.4,
      paid: true
    }, {
      name: 'Lager',
      price: 5.4,
      paid: true
    }, {
      name: 'Lager',
      price: 5.4,
      paid: true
    }, {
      name: 'Burger',
      price: 13.5,
      quantity: 1,
      paid: true
    }]
  }]);
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
