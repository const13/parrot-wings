import React, { useCallback, useEffect } from 'react';
import {
  createStyles, 
  makeStyles, 
  Typography,
  Grid,
} from '@material-ui/core';
import Image from 'material-ui-image';
import ParrotLogo from '../img/parrot-logo.png';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => 
  createStyles({
    welcome: {
      textAlign: 'center',
      color: "white",
      padding: theme.spacing(1),
    },
    title: {
      fontWeight: 600,
      [theme.breakpoints.down('xs')]: {
        fontSize: '20vw',
      },
    },
    subtitle: {
      fontSize: '2rem',
    }
}));

function Welcome() {
  const classes = useStyles();
  const isAuth = useAuth();
  const history = useHistory();

  const pending: boolean = useSelector((state: any) => state.auth.pending);


  const callRedirect = useCallback(() => {
    if (isAuth && !pending) {
      history.push('/dashboard')
    }
  }, [isAuth, pending, history]);
  
  useEffect(() => {
    callRedirect();
  }, [callRedirect]);
  return (
    <Grid container className={classes.welcome} justify="center" alignItems="center">
      <Grid item xs={3} md={3} xl={1} component={Link} to='/dashboard'>
        <Image src={ParrotLogo} color={'transparent'} animationDuration={1500} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h1" className={classes.title} align="center">
          PARROT WINGS
        </Typography>
        <Typography variant={"body1"} className={classes.subtitle} align="center">
          The best money transfer system in the world!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Welcome;
