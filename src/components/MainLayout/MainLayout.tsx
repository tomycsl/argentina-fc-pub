import React, { FC, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  AppBar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  Typography
} from '@mui/material';
import { Fastfood, Home, Person } from '@mui/icons-material';

interface Props {
  children: React.ReactNode;
}

const getValueByUrl = (location: string) => {
  switch (location) {
    case '/':
      return 0
    
    case '/food':
      return 1;

    case '/team':
      return 2;
  
    default:
      return 0;
  }
};

const MainLayout : FC<Props> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(getValueByUrl(location.pathname));

  useEffect(() => {
    setValue(getValueByUrl(location.pathname));
  }, [location.pathname]);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Argentina FC
          </Typography>
        </Toolbar>
      </AppBar>
      <Box flex={1} overflow="auto">
        {children}
      </Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction onClick={() => navigate('/')} label="Tab" icon={<Home />} />
        <BottomNavigationAction onClick={() => navigate('/food')} label="Food & Drinks" icon={<Fastfood />} />
        <BottomNavigationAction onClick={() => navigate('/team')} label="People" icon={<Person />} />
      </BottomNavigation>
    </Box>
  );
};

export default MainLayout;
