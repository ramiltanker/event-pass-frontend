export {
  useGetConsultationsQuery,
  useGetConsultationByIdQuery,
  useGetConsultationSlotsQuery,
  useBookSlotMutation,
  useGetMyConsultationsQuery,
  useCreateConsultationMutation,
  useUpdateConsultationMutation,
  useDeleteConsultationMutation,
} from './lib/api';

export type {
  ConsultationListItem,
  ConsultationDetails,
  ConsultationSlot,
  BookSlotPayload,
  BookSlotRequest,
  BookSlotResponse,
  CreateConsultationPayload,
  CreateConsultationResponse,
  MyConsultationItem,
  UpdateConsultationRequest,
  DeleteConsultationResponse,
} from './model/types';