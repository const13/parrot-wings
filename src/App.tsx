import React from 'react';
import { makeStyles, createStyles, Grid, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ParrotBg from './img/parrot-wall.jpg';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Provider } from 'react-redux';
import store from './store/store';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './components/Dashboard';
import customTheme from './components/styled/CustomTheme';

const useStyles = makeStyles((theme) => 
  createStyles({
    app: {
      flexFlow: 'column',
      justifyContent: 'space-between',
      flex: '1',
      height: '100vh',
      backgroundImage: 'url('+ParrotBg+')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'auto',
    },
}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <Grid container className={classes.app} alignItems="center">
          <Router>
            <Header />
              <Switch>
                <React.Fragment>
                  <Grid container justify="center" alignItems="center" style={{padding: '30px'}}>
                    <Route path="/" exact>
                      <Welcome />
                    </Route>
                    <Route path="/signin">
                      <SignIn />
                    </Route>
                    <Route path="/signup">
                      <SignUp />
                    </Route>
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                  </Grid>
                </React.Fragment>
              </Switch>
            <Footer />
          </Router>
        </Grid>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
