import React, { useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  Divider,
  CardContent,
  makeStyles,
  Theme,
  createStyles,
  Avatar,
  CircularProgress, 
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getUserInfo } from '../actions/Auth';
import NewTransaction from './NewTransaction';
import { useAuth } from '../hooks/useAuth';
import TransactionsList from './TransactionsList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    divider: {
      marginTop: '15px',
      marginBottom: '15px',
    },
    sticky: {
      position: 'sticky',
      top: '75px',
      zIndex: 10000,
    }
  }),
);

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.auth.currentUser, shallowEqual);
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserInfo());
    }
  }, [isAuth, dispatch]); 

  return (
    <Grid container justify="center" spacing={2} item>
      <Grid item xs={12} sm={4} className={classes.sticky}>
        <Card className={classes.sticky} raised>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5">
              DASHBOARD
            </Typography>
            <Divider className={classes.divider}/>
            {Object.keys(userInfo).length === 0 && 
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            }
            {Object.keys(userInfo).length !== 0 && 
              <Grid container>
                <Grid container alignItems="center" justify="space-between" style={{marginBottom: '15px'}}>
                  <Typography variant="overline">
                    {userInfo.name}
                  </Typography>
                  <Avatar style={{marginRight: '10px'}}></Avatar>
                </Grid>
                <Typography variant="overline">
                  Balance:&nbsp;
                  <Typography variant="button">
                    {userInfo.balance}
                  </Typography>
                </Typography>
              </Grid>
            }
          </CardContent>
        </Card>
      </Grid>
      <Grid container xs={12} sm={8} spacing={2} item>
        <NewTransaction />
        <TransactionsList />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
