import celoService from '../../service/celo.service';
import walletService from '../../service/wallet.service';


// actions
export const GET_CELO_BALANCE = 'getCeloBalance';
export const CREATE_ESCROW_WALLET = 'createEscrowWallet';

// mutations
const MUTATE_SET_WALLET = 'setWallet';


const state = {
   wallet: {
      address: null
   },
};

const getters = {
   wallet: (state) => {
      return state.wallet;
   }
};

const mutations = {
   [MUTATE_SET_WALLET]: (state, address) => {
      state.wallet.address = address;
   }
};

const actions = {
   [CREATE_ESCROW_WALLET]: (context) => {
      return new Promise((resolve, reject) => {
         walletService.createWallet().then((res) => {
            context.commit(MUTATE_SET_WALLET, res.address);
            resolve(true);
         }).catch(() => {
            reject();
         })
      })
   },
   [GET_CELO_BALANCE]: (context, address) => {
      return new Promise((resolve) => {
         celoService.getcUsdTokenBalance(address).then((bal) => {
            resolve(bal);
         });
      });
   }
};

export default {
   state,
   getters,
   mutations,
   actions
}