import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import AddBalanceDrawer from './WalletDrawers/AddBalanceDrawer';
import BalanceSuccessDrawer from './WalletDrawers/BalanceSuccessDrawer';
import WithdrawRequestDrawer from './WalletDrawers/WithdrawRequestDrawer';
import WithdrawRequestSuccessDrawer from './WalletDrawers/WithdrawRequestSuccessDrawer'
import WithdrawSuccessDrawer from './WalletDrawers/WithdrawSuccessDrawer';
import PaymentSuccess from './WalletDrawers/PaymentSuccess';
import PurchaseLeadDrawer from './LeadsDrawers/PurchaseLeadDrawer';
import LeadPurchaseSuccessDrawer from './LeadsDrawers/LeadPurchaseSuccessDrawer';
import IssueListDrawer from './RequestDetailDrawers/IssueListDrawer';
 
registerSheet('add-balance-drawer', AddBalanceDrawer);
registerSheet('balance-success-drawer', BalanceSuccessDrawer);
registerSheet('withdraw-request-drawer', WithdrawRequestDrawer);
registerSheet('withdraw-request-success-drawer', WithdrawRequestSuccessDrawer);
registerSheet('withdraw-success-drawer', WithdrawSuccessDrawer);
registerSheet('payment-success-drawer', PaymentSuccess);
registerSheet('purchase-lead-drawer', PurchaseLeadDrawer);
registerSheet('lead-purchase-success-drawer', LeadPurchaseSuccessDrawer);
registerSheet('issue-list-drawer', IssueListDrawer);
 
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'add-balance-drawer': SheetDefinition;
    'balance-success-drawer': SheetDefinition;
    'withdraw-request-drawer': SheetDefinition;
    'withdraw-request-success-drawer': SheetDefinition;
    'withdraw-success-drawer': SheetDefinition;
    'payment-success-drawer': SheetDefinition;
    'purchase-lead-drawer': SheetDefinition;
    'lead-purchase-success-drawer': SheetDefinition;
    'issue-list-drawer': SheetDefinition;
  }
}
 
export {};