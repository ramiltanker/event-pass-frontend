export enum Routes {
  ROOT = '/',
  CONSULTATIONS = '/consultations',
  CONSULTATION_DETAILS = '/consultations/:id',
  ABOUT_US = '/about-us',
  LOGIN = '/login',
  REGISTER = '/register',
  INVITE = '/invite',
  TEACHER_DASHBOARD = '/teacher/dashboard',
}

type ExtractParam<S extends string> = S extends `${string}:${infer Param}/${infer Rest}`
  ? Param | ExtractParam<`/${Rest}`>
  : S extends `${string}:${infer Param}`
    ? Param
    : never;

type ParamsOf<Path extends string> =
  ExtractParam<Path> extends never ? undefined : Record<ExtractParam<Path>, string | number>;

function buildPath<P extends Routes>(path: P, params?: ParamsOf<P>): string {
  if (!params) return path;

  let out = path as string;
  for (const [k, v] of Object.entries(params)) {
    out = out.replace(`:${k}`, encodeURIComponent(String(v)));
  }
  return out;
}

export const paths = {
  root: () => Routes.ROOT,
  consultations: () => Routes.CONSULTATIONS,
  consultation: (id: string | number) => to(Routes.CONSULTATION_DETAILS, { id }),
  about: () => Routes.ABOUT_US,
  login: () => Routes.LOGIN,
  register: () => Routes.REGISTER,
  invite: (token: string) => `/invite/${encodeURIComponent(token)}`,
  teacherDashboard: () => Routes.TEACHER_DASHBOARD,
} as const;

export function to<P extends Routes>(path: P, params?: ParamsOf<P>) {
  return buildPath(path, params);
}