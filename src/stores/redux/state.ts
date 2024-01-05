import {Languages} from '../../view/screens/settings/types';

declare global {
  interface AuthState {
    user: any;
    selectedAppLanguage?: Languages;
    authenticated?: boolean;
    showWelcomeMessage?: boolean;
    loading?: boolean;
  }
}
export {AuthState};
