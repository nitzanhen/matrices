export class DimensionError extends Error {}
export class EmptyCellError extends Error {}

export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; err: E };

/** Convenient factory for `{ ok: true, value: value }` */
export const ok = <T>(value: T): { ok: true; value: T } => ({ ok: true, value });
/** Convenient factory for `{ ok: false, err: err }` */
export const err = <E>(err: E): { ok: false; err: E } => ({ ok: false, err });
