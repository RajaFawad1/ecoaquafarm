'use client';

import { useAuth } from '../context/authContext';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import {
  Home as HomeIcon,
  ShoppingCart as ProductsIcon,
  ListAlt as OrdersIcon,
  Store as AmazonIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const SidebarMenu = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        position: 'fixed',
        height: '100vh',
        borderRight: '1px solid #e0e0e0',
        backgroundColor: 'background.paper'
      }}
    >
      <List>
        <ListItem disablePadding>
          <Link href="/" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </Link>
        </ListItem>
        
        <ListItem disablePadding>
          <Link href="/products" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <ProductsIcon />
              </ListItemIcon>
              <ListItemText primary="Productos" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link href="/orders" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <OrdersIcon />
              </ListItemIcon>
              <ListItemText primary="Pedidos" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link href="/amazon" passHref legacyBehavior>
            <ListItemButton>
              <ListItemIcon>
                <AmazonIcon />
              </ListItemIcon>
              <ListItemText primary="Amazon" />
            </ListItemButton>
          </Link>
        </ListItem>

        {user?.role === 'admin' && (
          <ListItem disablePadding>
            <Link href="/settings" passHref legacyBehavior>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configuración" />
              </ListItemButton>
            </Link>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default SidebarMenu;