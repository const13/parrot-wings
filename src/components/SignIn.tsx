import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import {
  createStyles, 
  makeStyles, 
  Typography,
  Grid,
  Avatar,
  Theme,
  Box,
  Paper,
  Button,
  Link as MaterialLink,
  InputAdornment,
  FormControl,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import LockIcon from '@material-ui/icons/Lock';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import StyledTextField from './styled/StyledTextField';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../hooks/useInput';
import { signInUser } from '../actions/Auth';
import User from '../types/User';
import { useAuth } from '../hooks/useAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    green: {
      color: '#fff',
      backgroundColor: green[500],
    },
    form: {
      width: '100%'
    },
    
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuth = useAuth();
  const [busy, setBusy] = useState(false);
  const pending: boolean = useSelector((state: any) => state.auth.pending);
  const error = useSelector((state: any) => state.auth.error);
  
  const { value: email, bind: bindEmail } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let user: User = {email: email, password: password};
    dispatch(signInUser(user));
  }

  const callRedirect = useCallback(() => {
    if (isAuth && !pending) {
      history.push('/dashboard')
    }
  }, [isAuth, pending, history]);
  
  useEffect(() => {
    callRedirect();
  }, [callRedirect]);
  
  useEffect(() => {
    setBusy(pending)
  }, [pending, setBusy]);
  
  return (
    <Grid container xs={12} sm={5} md={4} justify="center" alignItems="center" item={true} component={Paper}>
      <Box m={4} >
        <Grid container justify="center" direction="column" alignItems="center">
          <Avatar className={`${classes.green}`}>
            <LockIcon />
          </Avatar>
          <Typography variant="h3">
            Sign in
          </Typography>
        </Grid>
        <form 
          className={classes.form}
          onSubmit={handleSubmit}
          >
            <FormControl fullWidth={true}>
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={error && error.length ? true : false}
                helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                {...bindEmail}
              />
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={error && error.length ? true : false}
                helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                }}
                {...bindPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={busy}
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <MaterialLink
                    component={RouterLink}
                    to={'/signup'}
                  >
                    Don't have an account yet?
                  </MaterialLink>
                </Grid>
              </Grid>
            </FormControl>
        </form>
      </Box>
    </Grid>
  );
}

export default SignIn;
