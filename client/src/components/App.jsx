import { useEffect, useState } from 'react';
import { getWallet, getWeb3 } from '../utils/helpers';

import { CssBaseline, ThemeProvider } from '@mui/material';
import appTheme from '../styles/theme';

import Box from '@mui/material/Box';

import Transaction from './Transaction';
import Transfer from './Transfer';

function App() {
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [wallet, setWallet] = useState();
  const [approvers, setApprovers] = useState();
  const [quorum, setQuorum] = useState();

  useEffect(() => {
    const initWallet = async () => {
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);

      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();

      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
    };

    initWallet();
  }, []);

  const isLoading = !web3 || !accounts || !wallet;

  const createTransfer = ({ amount, to }) => {
    wallet.methods.createTransfer(amount, to).send({ from: accounts[0] });
  };

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <Box>
        {isLoading ? (
          <Box>{'Loading...'}</Box>
        ) : (
          <Box m={4}>
            <Transaction approvers={approvers} quorum={quorum} />
            <Transfer createTransfer={createTransfer} />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
