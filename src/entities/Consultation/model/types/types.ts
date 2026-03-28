export interface ConsultationListItem {
  id: number;
  subject: string;
  startsAt: string;
  endsAt: string;
  teacherName: string;
  isOnline: boolean;
  audienceNumber: string | null;
  withoutIntervals: boolean;
  slotsTotal: number | null;
  slotsBooked: number;
  slotsAvailable: number | null;
}

export interface ConsultationDetails {
  id: number;
  subject: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  teacherName: string;
  isOnline: boolean;
  audienceNumber: string | null;
  withoutIntervals: boolean;
  slotsTotal: number | null;
  slotsBooked: number;
  slotsAvailable: number | null;
}

export interface ConsultationSlot {
  id: number;
  startsAt: string;
  endsAt: string;
  isBooked: boolean;
}

export interface BookSlotPayload {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  group: string;
}

export interface BookSlotRequest {
  slotId: number;
  body: BookSlotPayload;
}

export interface BookConsultationWithoutIntervalsRequest {
  consultationId: number;
  body: BookSlotPayload;
}

export interface BookSlotResponse {
  ok: boolean;
  bookingId: number;
  slotId: number | null;
  consultationId: number;
  subject: string;
  startsAt: string;
  endsAt: string;
  isOnline: boolean;
  audienceNumber: string | null;
}

export interface CreateConsultationPayload {
  subject: string;
  startsAt: string;
  endsAt: string;
  isOnline: boolean;
  withoutIntervals?: boolean;
  slotDurationMinutes?: number;
  meetingLink?: string;
  audienceNumber?: string;
  description?: string;
}

export interface CreateConsultationResponse {
  id: number;
  slotsCreated: number;
}

export interface MyConsultationItem {
  id: number;
  subject: string;
  description: string | null;
  meetingLink: string | null;
  audienceNumber: string | null;
  isOnline: boolean;
  withoutIntervals: boolean;
  slotDurationMinutes: number | null;
  startsAt: string;
  endsAt: string;
  slotsTotal: number | null;
  slotsBooked: number;
  slotsAvailable: number | null;
}

export interface UpdateConsultationRequest {
  id: number;
  body: CreateConsultationPayload;
}

export interface DeleteConsultationResponse {
  ok: boolean;
  id: number;
}
