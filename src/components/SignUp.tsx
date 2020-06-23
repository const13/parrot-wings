import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStyles, 
  makeStyles, 
  Typography,
  Grid,
  Avatar,
  Theme,
  Paper,
  Box,
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
import { signUpUser } from '../actions/Auth';
import User from '../types/User';
import { useInput } from '../hooks/useInput';
import { useAuth } from '../hooks/useAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    green: {
      color: '#fff',
      backgroundColor: green[500],
    },
    white: {
      color: '#fff',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const isAuth = useAuth();
  const [busy, setBusy] = useState(false);
  const pending = useSelector((state: any) => state.auth.pending);
  const error = useSelector((state: any) => state.auth.error);
  const [errorRepeat, setErrorRepeat] = useState('');

  const { value: name, bind: bindName } = useInput('');
  const { value: email, bind: bindEmail } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: repeatPassword, bind: bindRepeatPassword } = useInput('');


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrorRepeat('Password mismatch');
      return;
    }
    let user: User = {email: email, password: password, username: name};
    dispatch(signUpUser(user));
  }

  const callRedirect = useCallback(() => {
    if (isAuth && !pending) history.push('/dashboard')
  }, [isAuth, pending, history]);

  useEffect(() => {
    callRedirect();
  }, [callRedirect]);

  useEffect(() => {
    setBusy(pending)
  }, [pending, setBusy]);

  return (
    <Grid container xs={12} sm={5} md={4} justify="center" alignItems="center" item={true} component={Paper}>
      <Box m={4}>
        <Grid container justify="center" direction="column" alignItems="center">
          <Avatar className={`${classes.green}`}>
            <LockIcon />
          </Avatar>
          <Typography variant="h3">
            Sign in
          </Typography>
        </Grid>
        <form 
          noValidate
          onSubmit={handleSubmit}
          >
          <FormControl fullWidth>
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
              {...bindName}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
              {...bindPassword}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password-repeat"
              label="Password Repeat"
              type="password"
              id="password-repeat"
              error={errorRepeat !== '' ? true : false}
              helperText={errorRepeat}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
              {...bindRepeatPassword}
            />
            {/* валидация ошибок по полям должна происходить на сервере, 
            поэтому здесь общая ошибка на форму */}
            {error && 
              <Typography color="secondary">{error}</Typography>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={busy}
              className={classes.submit}
            >
              Sign Up
            </Button>
          </FormControl>
        </form>
        <Grid container justify="flex-start">
          <Grid item>
            <MaterialLink
              component={RouterLink}
              to={'/signin'}
            >
              Already have an account?
            </MaterialLink>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default SignUp;
