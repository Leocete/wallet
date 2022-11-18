import { useEffect, useState } from 'react';
import { getWallet, getWeb3 } from '../utils/helpers';

import { CssBaseline, ThemeProvider, Grid } from '@mui/material';
import appTheme from '../styles/theme';

import Box from '@mui/material/Box';

import Approvers from './Approvers';
import CreateTransfer from './CreateTransfer';
import TransferList from './TransferList';

function App() {
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [wallet, setWallet] = useState();
  const [approvers, setApprovers] = useState();
  const [quorum, setQuorum] = useState();
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const initWallet = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);

      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();

      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
    };

    initWallet();
  }, []);

  const isLoading = !web3 || !accounts || !wallet;

  const createTransfer = ({ amount, to }) => {
    wallet.methods.createTransfer(amount, to).send({ from: accounts[0] });
  };

  const approveTransfer = (transferId) => {
    wallet.methods.approveTransfer(transferId).send({ from: accounts[0] });
  };

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      {isLoading ? (
        <Box>{'Loading...'}</Box>
      ) : (
        <Grid container sx={{ padding: 4 }} spacing={5}>
          <Grid item xs={12} md={6}>
            <Approvers approvers={approvers} quorum={quorum} />
            <CreateTransfer createTrsansfer={createTransfer} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TransferList
              approveTransfer={approveTransfer}
              transfers={transfers}
            />
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
}

export default App;
