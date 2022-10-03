import React, { FC } from 'react';
import {
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import { Check, CheckCircleOutlineRounded, Delete, MoreVert, WarningAmber } from '@mui/icons-material';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

interface Props {
  name: string;
  price: number;
  paid: boolean;
  onChange: (item : {
    name: string;
    price: number;
    paid: boolean;
  }) => void;
  onDelete: VoidFunction;
}

const SubMenuMenuListItem : FC<Props> = ({ name, price, paid, onChange, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updatePayStatus = (isPaid: boolean) => {
    onChange({
      name,
      price,
      paid: isPaid
    });
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={onDelete}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          paddingX="16px"
          style={{ backgroundColor: '#DD0000', color: '#550000' }}
        >
          <Delete />
          Delete
        </Box>
      </SwipeAction>
    </LeadingActions>
  );
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => updatePayStatus(!paid)}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          paddingX="16px"
          style={{ backgroundColor: paid ? 'rgb(255 182 24)' : '#00AA00' }}
        >
          {!paid ? <Check /> : <WarningAmber />}
          {!paid ? 'Paid' : 'Unpaid'}
        </Box>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList
      fullSwipe
    >
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <ListItem
          style={{ display: 'flex', paddingLeft: '32px' }}
          secondaryAction={
            <>
              <IconButton
                edge="end"
                aria-label="actions"
                onClick={handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => { updatePayStatus(!paid); handleClose(); }}
                >{`Mark as ${paid ? 'unpaid' : 'paid'}`}</MenuItem>
                <MenuItem
                  onClick={() => { onDelete(); handleClose(); }}
                >Remove</MenuItem>
              </Menu>
            </>
          }
        >
          <ListItemIcon>
            {paid && <CheckCircleOutlineRounded style={{ color: '#00AA00' }} />}
            {!paid && <WarningAmber style={{ color: 'rgb(255 182 24)' }} />}
          </ListItemIcon>

          <ListItemText
            style={{ flex: 1 }}
            primary={name}
          />
          <ListItemText
            style={{ maxWidth: '50px', textAlign: 'right' }}
            primary={`£${price.toFixed(2)}`}
          />
        </ListItem>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default SubMenuMenuListItem;
