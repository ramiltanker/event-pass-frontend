import type { ConsultationListItem } from '../../model/types';

import { api } from 'shared/api';

export const consultationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConsultations: builder.query<ConsultationListItem[], void>({
      query: () => '/consultations',
    }),
  }),
});

export const { useGetConsultationsQuery } = consultationApi;