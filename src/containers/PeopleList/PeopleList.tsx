import React, { FC, useContext, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

import appContext from '../../hooks/app-context';

const PeopleList : FC = () => {
  const { tab, setTab } = useContext(appContext);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState(false);

  const updateName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const exists = tab.find(item => item.teamMember.toLowerCase() === ev.target.value.toLowerCase());
    setError(exists);

    setNewName(ev.target.value);
  };

  const deletePerson = (name: string) => {
    const updatedTab = tab.filter(item => item.teamMember !== name);

    setTab(updatedTab);
  };

  const addPerson = (ev: React.MouseEvent) => {
    const updatedTab = [...tab];
    updatedTab.push({
      teamMember: newName,
      items: []
    });

    setTab(updatedTab);
    setNewName('');
    ev.preventDefault();
  };

  return (
    <Box>
      <Paper style={{ margin: '16px', padding: '8px' }}>
        <Typography variant="h6">Add new member</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <TextField
            value={newName}
            onChange={updateName}
            variant="filled"
            label="Enter name"
            fullWidth
            style={{ marginBottom: '8px' }}
            helperText={error ? 'This name is already in the list' : ''}
            error={error}
          />
          <Button
            onClick={addPerson}
            type="submit"
            variant="contained"
            disabled={error}
          >
            <Add /> Add
          </Button>
        </form>
      </Paper>
      <List>
        {tab.sort((itemA, itemB) => itemA.teamMember > itemB.teamMember ? 1 : -1).map(item => (
          <ListItem
            key={item.teamMember}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deletePerson(item.teamMember)}
              >
                <Delete />
              </IconButton>
            }
          >
            <ListItemText primary={item.teamMember} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PeopleList;
