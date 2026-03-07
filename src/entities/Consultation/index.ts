export {
  useGetConsultationsQuery,
  useGetConsultationByIdQuery,
  useGetConsultationSlotsQuery,
  useBookSlotMutation,
} from './lib/api';

export type {
  ConsultationListItem,
  ConsultationDetails,
  ConsultationSlot,
  BookSlotPayload,
  BookSlotRequest,
  BookSlotResponse,
} from './model/types';