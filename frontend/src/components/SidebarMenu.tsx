'use client';

import Link from 'next/link';
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
    Assignment,
    Person,
    Storefront,
    Inventory,
    AddBox,
    FileDownload,
    People,
    ImportExport
} from '@mui/icons-material';

const menuItems = [
    { href: '/invoices', icon: <Assignment />, label: 'Facturas' },
    { href: '/invoices/new', icon: <Assignment />, label: 'Crear Factura' },
    { href: '/clients', icon: <Person />, label: 'Clientes' },
    { href: '/stores', icon: <Storefront />, label: 'Tiendas' },
    { href: '/products', icon: <Inventory />, label: 'Productos' },
    { href: '/products/new', icon: <AddBox />, label: 'Crear Producto' },
    { href: '/files', icon: <FileDownload />, label: 'Archivos' },
    { href: '/distributors', icon: <People />, label: 'Distribuidores' },
    { href: '/importations', icon: <ImportExport />, label: 'Importaciones' },
];

const SidebarMenu = () => {
    return (
        <Box
            sx={{
                width: '230px',
                height: '100vh',
                bgcolor: '#1e1e2f',
                position: 'fixed',
                left: 0,
                top: 0,
                p: '20px',
                boxShadow: '4px 0px 15px rgba(0, 0, 0, 0.2)',
                borderRight: '2px solid #444',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    mb: '30px',
                    fontSize: '1.4rem',
                    letterSpacing: '0.5px',
                }}
            >
                🚀 Menú
            </Typography>
            <List sx={{ flex: 1, p: 0 }}>
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.href} passHref legacyBehavior>
                        <ListItemButton
                            component="a"
                            sx={{
                                borderRadius: 1,
                                mb: 1,
                                '&:hover': {
                                    backgroundColor: '#2b2b3d',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: '#fff', minWidth: '40px' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    sx: { color: '#fff', fontWeight: '500' },
                                }}
                            />
                        </ListItemButton>
                    </Link>
                ))}
            </List>
        </Box>
    );
};

export default SidebarMenu;
