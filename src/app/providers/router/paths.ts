export enum Routes {
  ROOT = '/',
  CONSULTATIONS = '/consultations',
  ABOUT_US = '/about_us',
  LOGIN = '/login',
  REGISTER = '/register',
  INVITE = '/invite',
}

type ExtractParam<S extends string> = S extends `${string}:${infer Param}/${infer Rest}`
  ? Param | ExtractParam<`/${Rest}`>
  : S extends `${string}:${infer Param}`
    ? Param
    : never;

type ParamsOf<Path extends string> =
  ExtractParam<Path> extends never ? undefined : Record<ExtractParam<Path>, string | number>;

// --- builder, который заменяет ":param" на значение
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
  about: () => Routes.ABOUT_US,
  login: () => Routes.LOGIN,
  register: () => '/register',
  invite: (token: string) => `/invite/${encodeURIComponent(token)}`,
} as const;

// Дополнительно: универсальный helper, если хочется "по ключу"
export function to<P extends Routes>(path: P, params?: ParamsOf<P>) {
  return buildPath(path, params);
}
