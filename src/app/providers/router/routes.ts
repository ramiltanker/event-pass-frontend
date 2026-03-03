import type { RouteObject } from 'react-router-dom';
import { Routes } from './paths';

export const routes: RouteObject[] = [
  {
    path: Routes.ROOT,
    lazy: async () => {
      const [layout, error] = await Promise.all([
        import('pages/MainPage'),
        import('./ui/RootRouteError'),
      ]);

      return {
        Component: layout.default,
        ErrorBoundary: error.default,
      };
    },
    children: [
      // ... дальше как выше
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const mod = await import('pages/NotFoundPage');

      return { Component: mod.default };
    },
  },
];
