export {
  useGetConsultationsQuery,
  useGetConsultationByIdQuery,
  useGetConsultationSlotsQuery,
  useBookSlotMutation,
  useBookConsultationWithoutIntervalsMutation,
  useGetMyConsultationsQuery,
  useCreateConsultationMutation,
  useUpdateConsultationMutation,
  useDeleteConsultationMutation,
  useExportMyConsultationsMutation,
} from './lib/api';

export type {
  ConsultationListItem,
  ConsultationDetails,
  ConsultationSlot,
  BookSlotPayload,
  BookSlotRequest,
  BookConsultationWithoutIntervalsRequest,
  BookSlotResponse,
  CreateConsultationPayload,
  CreateConsultationResponse,
  MyConsultationItem,
  UpdateConsultationRequest,
  DeleteConsultationResponse,
  ExportMyConsultationsResponse,
} from './model/types';