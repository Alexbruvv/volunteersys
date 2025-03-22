// This type is borrowed from honojs/hono
type ExtractParams<Path extends string> = string extends Path
    ? Record<string, string>
    : Path extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string }
    : Path extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : never;

export default function url<T extends string>(path: T, parameters: ExtractParams<T> = {} as ExtractParams<T>): string {
    const base = (Bun.env.BASE_PATH ?? "") + path;
    return Object.entries(parameters).reduce((acc, [k, v]) => acc.replaceAll(`:${k}`, v.toString()), base);
}

