import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { getCookie } from '../../utils/cookie.mjs';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    background: '#FFDD00',
    color: '#FA275A',
  },
  toolbar: {
    // minHeight: 128,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(2)
  },
  navTitle: {
    fontSize: '1.1rem',
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.toolbar}>

          <Typography color="textSecondary" className={classes.navTitle} variant="overline" noWrap>
            {`🍵 Order Tracking System: ${getCookie('storeName')}`}
          </Typography>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    </div>
  );
}
