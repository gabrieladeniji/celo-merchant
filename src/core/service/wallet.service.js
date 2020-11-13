const Web3 = require('web3');

const walletService = {

   init() {
      window.web3 = new Web3();
   },

   createWallet() {
      return new Promise(resolve => {
         let randomAccount = window.web3.eth.accounts.create();
         resolve(randomAccount);
      });
   }

};


export default walletService;