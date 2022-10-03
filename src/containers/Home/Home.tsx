import React, { useContext } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router';
import {
  Box,
  List,
  SpeedDial,
  SpeedDialAction,
  Typography
} from '@mui/material';

import appContext from '../../hooks/app-context';
import TabListItem from '../../components/TabListItem';
import { Add, Fastfood, Person } from '@mui/icons-material';

const Home = () => {
  const { tab, setTab } = useContext(appContext);
  const navigate = useNavigate();

  const updatePersonalTab = (teamMember: string, items: any[]) => {
    const updatedTab = [...tab];
    updatedTab.find(updTab => updTab.teamMember === teamMember).items = items;

    setTab(updatedTab);
  };

  return (
    <Box>
      <Box textAlign="right" paddingX="8px">
        <Typography variant="caption">{`Date: ${moment().format('dddd Do MMM')}`}</Typography>
      </Box>
      <List>
        {tab.map(({ teamMember, items }) => (
          <TabListItem
            key={teamMember}
            teamMember={teamMember}
            items={items}
            updateItems={(newItems: any[]) => updatePersonalTab(teamMember, newItems)}
          />
        ))}
      </List>

      <SpeedDial
        ariaLabel="Add action button"
        sx={{ position: 'absolute', bottom: 66, right: 16 }}
        icon={<Add />}
      >
        <SpeedDialAction
          icon={<Person />}
          tooltipTitle="Team member"
          onClick={() => navigate('/team')}
        />
        <SpeedDialAction
          icon={<Fastfood />}
          tooltipTitle="Food & Drink"
          onClick={() => navigate('/food')}
        />
      </SpeedDial>
    </Box>
  );
};

export default Home;
