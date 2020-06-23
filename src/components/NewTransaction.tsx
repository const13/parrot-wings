import React, { FormEvent, useCallback, useEffect } from 'react';
import {
  makeStyles, 
  createStyles, 
  Theme, 
  Typography, 
  Grid,
  Button,
  Card,
  FormControl,
  CardContent,
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StyledTextField from './styled/StyledTextField';
import { useInput } from '../hooks/useInput';
import { createTransaction } from '../actions/Transations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formLabel: {
      marginBottom: '15px',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

function NewTransaction() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const balance = useSelector((state: any) => state.auth.currentUser.balance);
  const copiedTransaction = useSelector((state: any) => state.transactions.copiedTransaction, shallowEqual);
  const error = useSelector((state: any) => state.transactions.error, shallowEqual);
  const pending = useSelector((state: any) => state.transactions.pending);
  
  const { value: amount, bind: bindAmount, setValue: setAmount } = useInput('');
  const { value: user, bind: bindUser, setValue: setUser } = useInput('');

  useEffect(() => {
    if (Object.keys(copiedTransaction).length !== 0 && !pending) {
      setAmount(Math.abs(copiedTransaction.amount).toString());
      setUser(copiedTransaction.username);
    }
  }, [copiedTransaction, setAmount, setUser, pending]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const transaction = {name: user, amount: +amount};
    dispatch(createTransaction(transaction));
  }, [user, amount, dispatch])

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" className={classes.formLabel}>
            Here you can create a new transaction
          </Typography>
          <form 
            onSubmit={handleSubmit}
            >
            <FormControl fullWidth>
              <Autocomplete
                id="userlist"
                freeSolo={true}
                value={user}
                /*Захардкоженый список, т.к эндпоинт на получение
                списка юзеров недоступен*/
                options={['mr. Test', 'Konstantin Osetrov']}
                getOptionLabel={(option: any) => option}
                onInputChange={(e, value) => {setUser(value)}}
                renderInput={(params: any) => 
                  <StyledTextField 
                    label="Users list" 
                    variant="outlined"
                    {...params} 
                    {...bindUser}
                  />
                }
              />
              <StyledTextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={+amount}
                name="amount"
                label="Amout PW"
                type="number"
                id="amount"
                InputProps={{
                  inputProps: { 
                    max: balance, min: 1 
                  }
                }}
                {...bindAmount}
              />
              {error && 
                <Typography color="secondary">{error}</Typography>
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={pending}
                className={classes.submit}
              >
                SEND MONEY
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default NewTransaction;
