export interface ConsultationListItem {
  id: number;
  subject: string;
  startsAt: string;
  endsAt: string;
  teacherName: string;
  slotsTotal: number;
  slotsBooked: number;
  slotsAvailable: number;
}

export interface ConsultationDetails {
  id: number;
  subject: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  teacherName: string;
  slotsTotal: number;
  slotsBooked: number;
  slotsAvailable: number;
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

export interface BookSlotResponse {
  ok: boolean;
  bookingId: number;
  slotId: number;
  consultationId: number;
  subject: string;
  startsAt: string;
  endsAt: string;
}

export interface CreateConsultationPayload {
  subject: string;
  startsAt: string;
  endsAt: string;
  slotDurationMinutes: number;
  meetingLink: string;
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
  meetingLink: string;
  slotDurationMinutes: number;
  startsAt: string;
  endsAt: string;
  slotsTotal: number;
  slotsBooked: number;
  slotsAvailable: number;
}

export interface UpdateConsultationRequest {
  id: number;
  body: CreateConsultationPayload;
}

export interface DeleteConsultationResponse {
  ok: boolean;
  id: number;
}