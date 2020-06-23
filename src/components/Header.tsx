import React from 'react';
import {
  AppBar, 
  Toolbar, 
  makeStyles, 
  createStyles, 
  Theme, 
  Typography, 
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logoutUser } from '../actions/Auth';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    sticky: {
      position: 'sticky',
      top: 0,
      zIndex: 9999
    }
  }),
);

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useAuth();

  const logOut = () => {
    dispatch(logoutUser());
    return <Redirect to="/" />
  }

  return (
    <AppBar position="static" className={classes.sticky}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Parrot Wings
        </Typography>
        {!isAuth ? 
          <Button
            size="large"
            color="inherit"
            component={Link}
            to="/signin"
          >
            Login
          </Button>
          :
          <Button
            size="large"
            color="inherit"
            component={Link}
            to="/"
            onClick={logOut}
            >
              Logout
          </Button>}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
