export type InviteStatus = 'active' | 'used' | 'expired';

export type InviteStatusFilter = 'all' | 'active' | 'used' | 'expired';

export interface Invite {
  id: string;
  email: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
  status: InviteStatus;
  inviteUrl?: string | null;
}

export interface Invite {
  id: string;
  email: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
  status: InviteStatus;
}

export interface CreateInviteRequestBody {
  email: string;
  expiresInDays: number;
}

export interface CreateInviteResponseBody {
  id: string;
  email: string;
  inviteUrl: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
  status: InviteStatus;
}
