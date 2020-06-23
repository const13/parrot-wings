import React, { useEffect, useState, ChangeEvent, useCallback } from 'react';
import {
  makeStyles, 
  createStyles, 
  Theme, 
  Typography, 
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardContent,
  Card,
  Button,
  TablePagination,
  CircularProgress, 
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getTransactionsList, copyTransaction } from '../actions/Transations';
import Transaction from '../types/Transaction';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formLabel: {
      marginBottom: '15px',
    },
    tableContainer: {
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
    },
    empty: {
      color: grey[400]
    }
  }),
);

function TransactionsList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const transactionsList: Transaction[] = useSelector((state: any) => state.transactions.transactionsList, shallowEqual);
  const pending = useSelector((state: any) => state.transactions.pending);
  const [fetched, setFetched] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchTransactions = useCallback(() => {
    if (transactionsList && !transactionsList.length && !fetched) {
      dispatch(getTransactionsList());
      setFetched(true);
    };
  }, [transactionsList, fetched, dispatch]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const copyTransactionHandler = (transaction: Transaction) => {
    dispatch(copyTransaction(transaction))
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const reversedTransactions = transactionsList.slice().reverse();

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent >
          <Typography variant="h5" className={classes.formLabel}>
            Last your's transactions
          </Typography>
          <TableContainer className={classes.tableContainer}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>To:</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reversedTransactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.username}</TableCell>
                      <TableCell align="right">{Math.abs(transaction.amount)}</TableCell>
                      <TableCell align="right">{transaction.balance}</TableCell>
                      <TableCell align="center" style={{cursor: 'pointer'}}>
                        <Button onClick={() => copyTransactionHandler(transaction)}>
                          <FileCopyIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
            {reversedTransactions.length === 0 && !pending && 
              <Typography variant="h4" className={classes.empty}>Empty</Typography>
            }
            {reversedTransactions.length === 0 && pending && 
              <CircularProgress />
            }
          </TableContainer>
          {reversedTransactions.length > 0 && 
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={reversedTransactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          }
        </CardContent>
      </Card>
    </Grid>
  );
}

export default TransactionsList;
