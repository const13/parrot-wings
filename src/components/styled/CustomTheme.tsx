import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        //color: 'white'
      },
    },
    MuiFormControl: {
      root: {
      }
    },
  },
});


export default customTheme;