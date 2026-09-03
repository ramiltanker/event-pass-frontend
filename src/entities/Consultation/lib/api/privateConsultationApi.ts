import type {
  CreateConsultationPayload,
  CreateConsultationResponse,
  DeleteConsultationResponse,
  ExportMyConsultationsResponse,
  MyConsultationItem,
  UpdateConsultationRequest,
} from '../../model/types';
import { privateApi } from 'shared/api';

const DEFAULT_EXPORT_FILENAME = 'consultations.xlsx';

const getExportFilename = (response: Response | undefined) => {
  const disposition = response?.headers.get('content-disposition') ?? '';
  const match = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);

  return match?.[1] ? decodeURIComponent(match[1]) : DEFAULT_EXPORT_FILENAME;
};

const triggerBlobDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = Object.assign(document.createElement('a'), { href: url, download: filename });

  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

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
    // Downloads a binary .xlsx file. Uses queryFn (rather than a plain
    // query/transformResponse pair) so the Blob is only ever handled here and
    // never lands in the Redux store, which only accepts serializable data.
    exportMyConsultations: builder.mutation<ExportMyConsultationsResponse, void>({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: '/consultations/my/export',
          method: 'GET',
          responseHandler: async (response) => {
            if (!response.ok) {
              try {
                return await response.json();
              } catch {
                return null;
              }
            }

            return response.blob();
          },
          cache: 'no-cache',
        });

        if (result.error) {
          return { error: result.error };
        }

        const blob = result.data as Blob;
        const filename = getExportFilename(result.meta?.response);

        triggerBlobDownload(blob, filename);

        return { data: { filename } };
      },
    }),
  }),
});

export const {
  useGetMyConsultationsQuery,
  useCreateConsultationMutation,
  useUpdateConsultationMutation,
  useDeleteConsultationMutation,
  useExportMyConsultationsMutation,
} = privateConsultationApi;