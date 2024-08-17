import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import AddBalanceDrawer from './WalletDrawers/AddBalanceDrawer';
import BalanceSuccessDrawer from './WalletDrawers/BalanceSuccessDrawer';
import WithdrawalRequestDrawer from './WalletDrawers/WithdrawalRequestDrawer';
import WithdrawalRequestSuccessDrawer from './WalletDrawers/WithdrawalRequestSuccessDrawer';
 
registerSheet('add-balance-drawer', AddBalanceDrawer);
registerSheet('balance-success-drawer', BalanceSuccessDrawer);
registerSheet('withdrawal-request-drawer', WithdrawalRequestDrawer);
registerSheet('withdrawal-request-success-drawer', WithdrawalRequestSuccessDrawer);
 
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'add-balance-drawer': SheetDefinition;
    'balance-success-drawer': SheetDefinition;
    'withdrawal-request-drawer': SheetDefinition;
    'withdrawal-request-success-drawer': SheetDefinition;
  }
}
 
export {};