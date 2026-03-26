import type {
  BookConsultationWithoutIntervalsRequest,
  BookSlotRequest,
  BookSlotResponse,
  ConsultationDetails,
  ConsultationListItem,
  ConsultationSlot,
} from '../../model/types';

import { api } from 'shared/api';

export const consultationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConsultations: builder.query<ConsultationListItem[], void>({
      query: () => '/consultations',
    }),
    getConsultationById: builder.query<ConsultationDetails, number>({
      query: (id) => `/consultations/${id}`,
    }),
    getConsultationSlots: builder.query<ConsultationSlot[], number>({
      query: (id) => `/consultations/${id}/slots`,
    }),
    bookSlot: builder.mutation<BookSlotResponse, BookSlotRequest>({
      query: ({ slotId, body }) => ({
        url: `/slots/${slotId}/book`,
        method: 'POST',
        body,
      }),
    }),
    bookConsultationWithoutIntervals: builder.mutation<
      BookSlotResponse,
      BookConsultationWithoutIntervalsRequest
    >({
      query: ({ consultationId, body }) => ({
        url: `/consultations/${consultationId}/book`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetConsultationsQuery,
  useGetConsultationByIdQuery,
  useGetConsultationSlotsQuery,
  useBookSlotMutation,
  useBookConsultationWithoutIntervalsMutation,
} = consultationApi;