import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  .MuiInputLabel-root {
    color: black;
    &.Mui-focused {
      color: #3f51b5;
    }
    &.Mui-error {
      color: red;
    }
  }
  .MuiOutlinedInput-root {
    color: black;
    fieldset {
      border-color: #3f51b5 !important;
    }
    &:hover {
      fieldset {
        border-color: #3f51b5 !important;
      }
    }
    .MuiInputBase-root {
      color: black;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus
    input:-webkit-autofill {
      -webkit-text-fill-color: black;
      -webkit-box-shadow: 0 0 0px 1000px transparent inset;
      transition: background-color 5000s ease-in-out 0s;
    }
  }  
  .MuiInputAdornment-root {
    color: black;
  }

` as typeof TextField;

export default StyledTextField;