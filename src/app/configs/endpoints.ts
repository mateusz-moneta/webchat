import { environment } from '../../environments/environment';

export const endpoints = {
  authLogin: () => '/auth/login',
  authRegister: () => '/auth/register',
  loadLastMessages: () => '/conversation/last_messages',
  loadListOfConversations: () => '/conversations/list',
  message: () => '/conversation/message',
  rechargeMessages: () => '/conversation/recharge_messages'
};
