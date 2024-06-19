/**
 * Returns the style based on the given status.
 * This is used to style custom Sanity Studio components.
 *
 * @example
 *
 * ```tsx
 * <div
 *   style={{
 *     color: getStyleByStatus(status)({
 *       default: 'var(--card-badge-default-fg-color)',
 *       success: 'var(--card-badge-positive-fg-color)',
 *       error: 'var(--card-badge-critical-fg-color)',
 *       warning: 'var(--card-badge-warning-bg-color)',
 *     }),
 *   }}
 * >
 * ```
 */
export const getStyleByStatus =
  <S extends string>(status: S) =>
  <C extends {default: string} & Partial<Record<S, string>>>(colors: C): string => {
    return colors[status] ?? colors.default
  }
