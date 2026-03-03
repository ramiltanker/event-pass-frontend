export enum Routes {
  ROOT = '/',
  LOGIN = '/login',
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
  login: () => Routes.LOGIN,
} as const;

// Дополнительно: универсальный helper, если хочется "по ключу"
export function to<P extends Routes>(path: P, params?: ParamsOf<P>) {
  return buildPath(path, params);
}
