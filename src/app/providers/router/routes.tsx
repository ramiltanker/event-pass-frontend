import { Navigate, type RouteObject } from 'react-router-dom';
import { Routes } from './paths';
import { GuestOnlyGuard, RegisterInviteGuard, RequireAuth } from './guards';

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
          {
            Component: RequireAuth,
            children: [
              {
                path: Routes.TEACHER_DASHBOARD,
                lazy: async () => {
                  const mod = await import('pages/TeacherDashboardPage');
                  return { Component: mod.default };
                },
              },
            ],
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
            Component: GuestOnlyGuard,
            children: [
              {
                path: Routes.LOGIN,
                lazy: async () => {
                  const mod = await import('pages/LoginPage');
                  return { Component: mod.default };
                },
              },
              {
                path: Routes.FORGOT_PASSWORD,
                lazy: async () => {
                  const mod = await import('pages/ForgotPasswordPage');
                  return { Component: mod.default };
                },
              },
              {
                path: Routes.RESET_PASSWORD,
                lazy: async () => {
                  const mod = await import('pages/ResetPasswordPage');
                  return { Component: mod.default };
                },
              },
            ],
          },
          {
            Component: RegisterInviteGuard,
            children: [
              {
                path: Routes.REGISTER,
                lazy: async () => {
                  const mod = await import('pages/RegisterPage');
                  return { Component: mod.default };
                },
              },
            ],
          },
        ],
      },
      {
        path: Routes.INVITE,
        Component: () => <Navigate to={Routes.ROOT} replace />,
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
