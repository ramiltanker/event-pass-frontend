import type { InviteStatus } from '../../model/types';

export const invitesStatusLabelMap: Record<InviteStatus, string> = {
  active: 'Активно',
  used: 'Использовано',
  expired: 'Истекло',
};
