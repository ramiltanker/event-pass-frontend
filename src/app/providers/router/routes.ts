import type { RouteObject } from 'react-router-dom';
import { Routes } from './paths';

export const routes: RouteObject[] = [
  {
    path: Routes.ROOT,
    lazy: async () => {
      const mod = await import('layouts/RootLayout');
      return { Component: mod.RootLayout };
    },
    children: [
      {
        lazy: async () => {
          const mod = await import('layouts/SiteLayout');
          return { Component: mod.SiteLayout };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const mod = await import('pages/MainPage');
              return { Component: mod.default };
            },
          },
          {
            path: Routes.CONSULTATIONS,
            lazy: async () => {
              const mod = await import('pages/ConsultationsPage');
              return { Component: mod.default };
            },
          },
          {
            path: Routes.CONSULTATION_DETAILS,
            lazy: async () => {
              const mod = await import('pages/ConsultationBookingPage');
              return { Component: mod.default };
            },
          },
          {
            path: Routes.ABOUT_US,
            lazy: async () => {
              const mod = await import('pages/AboutPage');
              return { Component: mod.default };
            },
          },
        ],
      },
      {
        lazy: async () => {
          const mod = await import('layouts/AuthLayout');
          return { Component: mod.AuthLayout };
        },
        children: [
          {
            path: Routes.LOGIN,
            lazy: async () => {
              return { Component: null };
            },
          },
          {
            path: Routes.REGISTER,
            lazy: async () => {
              return { Component: null };
            },
          },
        ],
      },
      {
        path: `${Routes.INVITE}/:token`,
        lazy: async () => {
          const mod = await import('pages/InvitePage');
          return { Component: mod.default };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const mod = await import('pages/NotFoundPage');
          return { Component: mod.default };
        },
      },
    ],
  },
];