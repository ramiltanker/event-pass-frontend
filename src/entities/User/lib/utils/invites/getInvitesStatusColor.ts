import type { InviteStatus } from '../../../model/types';

export const getInvitesStatusColor = (status: InviteStatus): 'success' | 'warning' | 'default' => {
  switch (status) {
    case 'active':
      return 'success';
    case 'expired':
      return 'warning';
    case 'used':
    default:
      return 'default';
  }
};
