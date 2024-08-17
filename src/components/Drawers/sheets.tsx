import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import AddBalanceDrawer from './WalletDrawers/AddBalanceDrawer';
import BalanceSuccessDrawer from './WalletDrawers/BalanceSuccessDrawer';
 
registerSheet('add-balance-drawer', AddBalanceDrawer);
registerSheet('balance-success-drawer', BalanceSuccessDrawer);
 
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'add-balance-drawer': SheetDefinition;
    'balance-success-drawer': SheetDefinition;
  }
}
 
export {};