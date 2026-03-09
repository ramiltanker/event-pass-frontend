export type InviteStatus = 'active' | 'used' | 'expired';

export type InviteStatusFilter = 'all' | 'active' | 'used' | 'expired';

export interface Invite {
  id: string;
  email: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
  status: InviteStatus;
}
