import React from 'react';
import {
  createStyles, 
  Link,
  makeStyles, 
  Typography, 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => 
  createStyles({
    footer: {
      textAlign: 'center',
      backgroundColor: theme.palette.divider,
      color: "white",
      padding: theme.spacing(1),
      boxSizing: "border-box",
      width: '100%'
    }
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="overline" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/const13/">
          Konstantin Osetrov
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  );
}

export default Footer;
