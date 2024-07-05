import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Blogs', link: '/blogs' },
    { text: 'Portfolio', link: '/portfolio' },
    { text: 'About me', link: '/about' },
    { text: 'Contact', link: '/contact' },
    { text: 'Add Blog', link: '/blogs/add' },
  ];

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className='toolbar'>
        <h1>Portfolio</h1>
        <div className="desktop-menu">
          <ul className="menu">
            {menuItems.map((item) => (
              <li key={item.text}>
                <a href={item.link}>{item.text}</a>
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
            {menuItems.map((item) => (
              <ListItem button key={item.text} component="a" href={item.link}>
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
