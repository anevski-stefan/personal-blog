import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setToken(JSON.parse(token));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', link: '/', showWhenLoggedOut: true },
    { text: 'Blogs', link: '/blogs' },
    { text: 'Portfolio', link: '/portfolio' },
    { text: 'About me', link: '/about', showWhenLoggedOut: true },
    { text: 'Contact', link: '/contact', showWhenLoggedOut: true },
    { text: 'Admin Login', link: '/admin', showWhenLoggedOut: true },
    { text: 'Add Blog', link: '/blogs/add', showWhenLoggedIn: true },
    { text: 'Logout', link: '/logout', showWhenLoggedIn: true, onClick: handleLogout },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (item.showWhenLoggedIn && !token) return false;
    if (item.showWhenLoggedOut && token) return false;
    return true;
  });

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className='toolbar'>
        <h1><a href="/">Portfolio</a></h1>
        <div className="desktop-menu">
          <ul className="menu">
            {filteredMenuItems.map((item) => (
              <li key={item.text}>
                {item.onClick ? (
                  <a href="#" onClick={item.onClick}>{item.text}</a>
                ) : (
                  <Link to={item.link}>{item.text}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          className="menu-button"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon className='menu-icon'/>
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {filteredMenuItems.map((item) => (
              <ListItem button key={item.text} component={item.onClick ? 'a' : Link} to={item.link} onClick={item.onClick}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
