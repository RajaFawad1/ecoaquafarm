'use client';

import { useAuth } from '../context/authContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Button, Card, CardContent, CardActions, useTheme, useMediaQuery } from "@mui/material";

export default function HomePage() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "90vw",
        height: "90vh",
        mx: "auto",
        my: "auto",
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with user info */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ddd'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Panel Principal
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Bienvenido, {user?.email}
        </Typography>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Card sx={{ 
          width: "100%", 
          maxWidth: "800px", 
          borderRadius: 2, 
          boxShadow: 2,
          background: theme.palette.background.paper
        }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              🌊 Panel de Ventas de Bombas de Agua 🚀
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Image
                src="/pump-illustration.png"
                alt="Bomba de agua"
                width={200}
                height={150}
                priority
                style={{ borderRadius: '8px' }}
              />
            </Box>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Gestiona tus productos de forma sencilla, controla tu inventario y mejora la experiencia de venta.
            </Typography>
          </CardContent>
          <CardActions sx={{ 
            justifyContent: "center", 
            pb: 2,
            gap: 2,
            flexWrap: fullScreen ? 'wrap' : 'nowrap'
          }}>
            <Link href="/products" passHref legacyBehavior>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ 
                  borderRadius: 2,
                  minWidth: fullScreen ? '100%' : '200px'
                }}
              >
                🛍️ Ver Productos
              </Button>
            </Link>
            <Link href="/orders" passHref legacyBehavior>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ 
                  borderRadius: 2,
                  minWidth: fullScreen ? '100%' : '200px'
                }}
              >
                📦 Gestionar Pedidos
              </Button>
            </Link>
            <Link href="/amazon" passHref legacyBehavior>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                sx={{ 
                  borderRadius: 2,
                  minWidth: fullScreen ? '100%' : '200px'
                }}
              >
                🛒 Ver en Amazon
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        p: 2, 
        textAlign: "center", 
        borderTop: "1px solid #ddd",
        backgroundColor: theme.palette.grey[100]
      }}>
        <Typography variant="body2" color="text.secondary">
          Powered by <strong>EAF Store</strong> 🌍 | Agua en movimiento 💧
        </Typography>
      </Box>
    </Box>
  );
}