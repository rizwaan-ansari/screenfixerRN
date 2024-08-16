import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import AddBalanceDrawer from './WalletDrawers/AddBalanceDrawer';
 
registerSheet('add-balance-drawer', AddBalanceDrawer);
 
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'add-balance-drawer': SheetDefinition;
  }
}
 
export {};