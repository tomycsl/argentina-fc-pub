import React, { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  TextField,
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton
} from '@mui/material';
import appContext from '../../hooks/app-context';
import { ExpandLess, ExpandMore, Save } from '@mui/icons-material';

const AddFood: FC = () => {
  const { tab, prices, setTab } = useContext(appContext);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<{ label: string; price: number; } | null | undefined>(null);
  const [quantities, setQuantities] = useState(tab.map(item => ({
    teamMember: item.teamMember,
    quantity: 0
  })));

  const decrease = (member: string) => {
    const updatedQuantities = [...quantities];
    const exists = updatedQuantities.find(quan => quan.teamMember === member);
    
    if (exists) exists.quantity--;

    setQuantities(updatedQuantities);
  };

  const increase = (member: string) => {
    const updatedQuantities = [...quantities];
    const exists = updatedQuantities.find(quan => quan.teamMember === member);
    
    if (exists) exists.quantity++;

    setQuantities(updatedQuantities);
  };

  const saveChanges = () => {
    const updatedTab = [...tab];
    quantities.forEach(({ quantity, teamMember }) => {
      const personalTab = updatedTab.find(tab => tab.teamMember === teamMember);
      for (let index = 0; index < quantity; index++) {
        personalTab.items.push({
          name: selectedItem?.label,
          price: selectedItem?.price,
          paid: false
        });
        
      }
    });

    setTab(updatedTab);
    navigate('/');
  };

  return (
    <Box p={2} display="flex" height="100%" flexDirection="column" boxSizing="border-box">
      <Autocomplete
        disablePortal
        value={selectedItem}
        onChange={(ev, selection: any) => setSelectedItem(selection)}
        options={prices.map(price => ({
          label: price.item,
          price: price.price
        }))}
        renderInput={(params: any) => <TextField {...params} label="Food or Drink" />}
        renderOption={(props, option) => (
          <Box component="li" {...props} display={'flex'}>
            <span style={{ flex: 1 }}>{option.label}</span>
            <span>£{option.price.toFixed(2)}</span>
          </Box>
        )}
      />

      <Box overflow="auto" flex={1}>
          <List>
            {tab.sort((itemA, itemB) => itemA.teamMember > itemB.teamMember ? 1 : -1).map(item => (
              <ListItem
                key={item.teamMember}
                secondaryAction={
                  <Box>
                    <IconButton
                      onClick={() => decrease(item.teamMember)}
                      disabled={quantities.find(quant => quant.teamMember === item.teamMember)?.quantity === 0}
                    ><ExpandMore /></IconButton>
                    {quantities.find(quant => quant.teamMember === item.teamMember)?.quantity}
                    <IconButton onClick={() => increase(item.teamMember)}><ExpandLess /></IconButton>
                  </Box>
                }
              >
                <ListItemText primary={item.teamMember} />
              </ListItem>
            ))}
          </List>
      </Box>
      <Box>
        <Button
          fullWidth
          variant="contained"
          disabled={!selectedItem || !quantities.some(quant => quant.quantity > 0)}
          onClick={saveChanges}
        >
          <Save /> Save changes
        </Button>
      </Box>
    </Box>
  );
};

export default AddFood;
