import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Avatar,
    Stack
} from '@mui/material';
import {
    Home as HomeIcon,
    Group as GroupIcon,
    ShoppingBag as ShoppingBagIcon,
    Receipt as ReceiptIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

function MainLayout({ children, menus }) {
    const { user, academic, schoolType, toggleSchoolType, logout } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getActiveMenu = () => {
        const path = location.pathname;
        if (path === '/' || path === '/portal/staff') return 'Dashboard';
        if (path.includes('/my-classes')) return 'My Classes';
        if (path.includes('/students')) return 'Students';
        if (path.includes('/academics')) return 'Academics';
        if (path.includes('/results')) return 'Results';
        if (path.includes('/profile')) return 'Profile';
        if (path.includes('/workload')) return 'Workload';
        if (path.startsWith('/settings')) return 'Settings';
        if (path.includes('/staff')) return 'Staff';
        return 'Dashboard';
    };

    const activeMenu = getActiveMenu();

    const defaultMenus = [
        { title: "Dashboard", icon: <HomeIcon />, path: "/" },
        { title: "Staff", icon: <GroupIcon />, path: "/staff" },
        { title: "Students", icon: <GroupIcon />, path: "/students" },
        { title: "Academics", icon: <ShoppingBagIcon />, path: "/academics" },
        { title: "Results", icon: <ReceiptIcon />, path: "/results" },
        { title: "Profile", icon: <PersonIcon />, path: "/profile" },
        { title: "Settings", icon: <SettingsIcon />, path: "/settings" },
        { title: "Log Out", icon: <LogoutIcon />, action: "logout" }
    ];

    const currentMenus = menus || defaultMenus;

    const handleNavigation = (menu) => {
        if (menu.action === 'logout') {
            logout();
            navigate('/login');
        } else {
            navigate(menu.path);
            if (isMobile) {
                setMobileOpen(false);
            }
        }
    };

    const drawerContent = (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)'
        }}>
            {/* Profile Header Section */}
            <Box sx={{
                position: 'relative',
                padding: '32px 16px 24px',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                background: 'linear-gradient(to bottom, rgba(102, 126, 234, 0.05), transparent)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                    <Avatar
                        src={`/images/profile.jpg`}
                        sx={{ width: 105, height: 105 }}
                    />

                    <Box sx={{
                        position: 'absolute',
                        bottom: 5,
                        right: 5,
                        width: 14,
                        height: 14,
                        backgroundColor: '#10b981',
                        border: '2.5px solid white',
                        borderRadius: '50%',
                        zIndex: 2
                    }} />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, color: '#2d3748', letterSpacing: '-0.5px', mb: 1 }}>
                    {user?.username || 'User'}
                </Typography>

                <Stack spacing={1} sx={{ width: '100%', alignItems: 'center' }}>
                    <Box sx={{
                        px: 1.5, py: 0.25,
                        borderRadius: '20px',
                        bgcolor: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.1)'
                    }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', fontSize: '0.65rem' }}>
                            {user?.role || 'Staff'}
                        </Typography>
                    </Box>
                    <Box sx={{
                        px: 1.5, py: 0.25,
                        borderRadius: '20px',
                        bgcolor: 'rgba(255, 117, 140, 0.1)',
                        border: '1px solid rgba(255, 117, 140, 0.1)'
                    }}>
                        <Typography variant="caption" sx={{ color: '#ff758c', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase' }}>
                            {academic.name}
                        </Typography>
                    </Box>
                </Stack>

                {/* School Type Switcher */}
                <Box sx={{ mt: 3, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{
                        display: 'inline-flex',
                        bgcolor: 'rgba(226, 232, 240, 0.5)',
                        borderRadius: '12px',
                        p: 0.5,
                        border: '1px solid #e2e8f0'
                    }}>
                        <Box
                            onClick={() => toggleSchoolType('day')}
                            sx={{
                                px: 2, py: 0.75,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                bgcolor: schoolType === 'day' ? '#fff' : 'transparent',
                                color: schoolType === 'day' ? '#6366f1' : '#64748b',
                                boxShadow: schoolType === 'day' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                '&:hover': { color: '#6366f1' }
                            }}
                        >
                            <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.7rem' }}>DAY</Typography>
                        </Box>
                        <Box
                            onClick={() => toggleSchoolType('open')}
                            sx={{
                                px: 2, py: 0.75,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                bgcolor: schoolType === 'open' ? '#fff' : 'transparent',
                                color: schoolType === 'open' ? '#6366f1' : '#64748b',
                                boxShadow: schoolType === 'open' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                '&:hover': { color: '#6366f1' }
                            }}
                        >
                            <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.7rem' }}>OPEN</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Menu Items Section */}
            <Box sx={{ flexGrow: 1, padding: '20px 12px', overflowY: 'auto' }}>
                <List disablePadding>
                    {currentMenus.map((menu, index) => {
                        const isActive = activeMenu === menu.title;
                        return (
                            <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    onClick={() => handleNavigation(menu)}
                                    sx={{
                                        borderRadius: "12px",
                                        position: 'relative',
                                        py: 1.2,
                                        background: isActive
                                            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                            : "transparent",
                                        color: isActive ? "white" : "#4a5568",
                                        boxShadow: isActive ? "0 8px 15px rgba(102, 126, 234, 0.25)" : "none",
                                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            background: isActive
                                                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                                : "rgba(102, 126, 234, 0.08)",
                                            transform: isActive ? "scale(1.02)" : "translateX(4px)"
                                        },
                                        "&::before": {
                                            content: '""',
                                            position: 'absolute',
                                            left: -12,
                                            height: isActive ? '24px' : '0px',
                                            width: '4px',
                                            borderRadius: '0 4px 4px 0',
                                            backgroundColor: '#667eea',
                                            transition: 'all 0.3s'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{
                                        color: isActive ? "white" : "#a0aec0",
                                        minWidth: "38px",
                                        transition: "transform 0.3s",
                                        "& svg": { fontSize: '1.3rem' }
                                    }}>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={menu.title}
                                        primaryTypographyProps={{
                                            fontWeight: isActive ? 600 : 500,
                                            fontSize: '0.9rem',
                                            letterSpacing: isActive ? '0.2px' : '0px'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            {/* Footer Section */}
            <Box sx={{ p: 2, textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
                <Typography
                    variant="caption"
                    sx={{ color: 'text.disabled', fontWeight: 600, letterSpacing: '1px', opacity: 0.7 }}
                >
                    v1.2.0 • nyenje-cdss
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Mobile AppBar */}
            {isMobile && (
                <AppBar
                    position="fixed"
                    sx={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: 'none',
                        borderBottom: '1px solid rgba(0,0,0,0.05)'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, color: 'primary.main' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ color: 'text.primary', fontWeight: 700 }}>
                            {activeMenu}
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}

            {/* Sidebar Drawer */}
            <Box
                component="nav"
                sx={{ width: { md: 280 }, flexShrink: { md: 0 } }}
            >
                {/* Mobile Drawer (Temporary) */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        zIndex: (theme) => theme.zIndex.drawer + 2,
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' },
                    }}
                >
                    {drawerContent}
                </Drawer>

                {/* Desktop Drawer (Permanent/Fixed) */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 280,
                            position: 'fixed',
                            top: 16,
                            left: 16,
                            height: 'calc(100vh - 32px)',
                            border: 'none',
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                        },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            {/* Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 0, md: 2 },
                    width: { md: `calc(100% - 280px)` },
                    mt: { xs: 7, md: 0 },
                    height: '100vh',
                    overflowY: 'auto'
                }}
            >
                <Box
                    className="glass-card"
                    sx={{
                        minHeight: '100%',
                        p: { xs: 1, md: 2.5 }
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default MainLayout;
