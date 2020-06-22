import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  Icon,
  IconButton,
  Layout,
  List,
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemMeta,
  ListDivider,
  ListGroup,
  Typography,
} from 'mdc-react';

export default function AppDrawer({ lists }) {
  return (
    <Drawer id="app-drawer">
      <DrawerHeader title="React Todo"></DrawerHeader>
      <DrawerContent>
        <ListGroup>
          <List>
            {[
              {
                title: 'Задачи',
                icon: 'home',
                to: '/',
                exact: true,
              },
              { title: 'Важно', icon: 'star', to: '/important' },
              {
                title: 'Запланированные',
                icon: 'event',
                to: '/planned',
              },
            ].map((item) => (
              <ListItem
                key={item.icon}
                component={NavLink}
                to={item.to}
                exact={item.exact}
                activeClassName="mdc-list-item--activated"
              >
                <ListItemGraphic>
                  <Icon>{item.icon}</Icon>
                </ListItemGraphic>

                <ListItemText>{item.title}</ListItemText>
              </ListItem>
            ))}
          </List>

          <ListDivider element="hr" />

          <List>
            {lists.map((item) => (
              <ListItem
                key={item.id}
                component={NavLink}
                to={item.id}
                activeClassName="mdc-list-item--activated"
              >
                <ListItemGraphic>
                  <Icon>list</Icon>
                </ListItemGraphic>

                <ListItemText>{item.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </ListGroup>
      </DrawerContent>
    </Drawer>
  );
}
