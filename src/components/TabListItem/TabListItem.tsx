import React, { FC, useState, useCallback } from 'react';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { CheckCircleOutline, ExpandLess, ExpandMore, WarningAmber } from '@mui/icons-material';
import SubMenuMenuListItem from './SubMenuListItem';

interface Props {
  teamMember: string;
  updateItems: (items: {
    price: number;
    name: string;
    paid: boolean;
  }[]) => void;
  items: {
    price: number;
    name: string;
    paid: boolean;
  }[];
}

const TabListItem : FC<Props> = ({ teamMember, items, updateItems }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const deleteItem = (item: any) => {
    const updated = items.filter(it => it !== item);

    updateItems(updated);
  };

  const updateItem = (item: any, newData: any) => {
    item.paid = newData.paid;

    updateItems(items);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}
        key={teamMember}
      >
        <Box display="flex" width="100%">
          <Box>
            <ListItemIcon>
              {items.every(item => item.paid) ?
                <CheckCircleOutline style={{ color: '#00AA00' }} /> :
                <WarningAmber style={{ color: 'rgb(255 182 24)' }} />
              }
            </ListItemIcon>
          </Box>
          <Box flex={1}>
            <ListItemText primary={teamMember} />
          </Box>
          <Box>
            <ListItemText
              primary={`£${items.filter(item => !item.paid).reduce((total: number, item: { price: number }) =>
                total + item.price, 0
              ).toFixed(2)}`}
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            marginLeft="8px"
          >
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </Box>
        </Box>
      </ListItemButton>
      {isOpen && !items.length && (
        <Box textAlign="center">
          <Typography variant="caption">There are no items to show</Typography>
        </Box>
      )}
      {isOpen && Boolean(items.length) && (
        <Collapse in={isOpen} timeout="auto">
          <List component="div" disablePadding>
            {items.map((item) => (
              <SubMenuMenuListItem
                key={item.name}
                name={item.name}
                price={item.price}
                paid={item.paid}
                onChange={(updatedItem) => updateItem(item, updatedItem)}
                onDelete={() => deleteItem(item)}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default TabListItem;
