import type {
  CreateConsultationPayload,
  CreateConsultationResponse,
  DeleteConsultationResponse,
  MyConsultationItem,
  UpdateConsultationRequest,
} from '../../model/types';
import { privateApi } from 'shared/api';

export const privateConsultationApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyConsultations: builder.query<MyConsultationItem[], void>({
      query: () => ({
        url: '/consultations/my',
        method: 'GET',
      }),
    }),
    createConsultation: builder.mutation<
      CreateConsultationResponse,
      CreateConsultationPayload
    >({
      query: (body) => ({
        url: '/consultations',
        method: 'POST',
        body,
      }),
    }),
    updateConsultation: builder.mutation<
      CreateConsultationResponse,
      UpdateConsultationRequest
    >({
      query: ({ id, body }) => ({
        url: `/consultations/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteConsultation: builder.mutation<DeleteConsultationResponse, number>({
      query: (id) => ({
        url: `/consultations/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMyConsultationsQuery,
  useCreateConsultationMutation,
  useUpdateConsultationMutation,
  useDeleteConsultationMutation,
} = privateConsultationApi;