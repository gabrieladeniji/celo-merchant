import { newKit } from '@celo/contractkit';

const celoService = {

   init(url) {
      window.kit = newKit(url);
   },

   async getcUsdTokenBalance(address) {
      const stableToken = await window.kit.contracts.getStableToken();
      const bal = await stableToken.balanceOf(address);
      return window.kit.web3.utils.fromWei(bal.toString(), 'ether');
   },

};

export default celoService;