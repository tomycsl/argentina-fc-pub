import { createContext } from 'react';

const AppContext = createContext<{
  tab: any[];
  setTab: (tab: any[]) => void;
  prices: {
    item: string;
    price: number;
  }[];
}>({
  tab: [],
  setTab: () => {},
  prices: []
});

export default AppContext;
