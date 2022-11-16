import Web3 from 'web3';
import Wallet from '../contracts/Wallet.json';

const TRUFFLE_NETWORK_HOST = 'http://localhost:9545';

const getWeb3 = () => {
  return new Web3(TRUFFLE_NETWORK_HOST);
};

const getWallet = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const contractDeployment = Wallet.networks[networkId];

  return new web3.eth.Contract(Wallet.abi, contractDeployment?.address);
};

export { getWeb3, getWallet };
