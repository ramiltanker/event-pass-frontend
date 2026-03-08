export interface ConsultationListItem {
  id: number;
  subject: string;
  startsAt: string;
  endsAt: string;
  teacherName: string;
  teacherAvatarUrl: string | null;
  slotsTotal: number;
  slotsBooked: number;
  slotsAvailable: number;
}