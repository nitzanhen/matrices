import { CSSProperties } from 'react';

/**
 * Base props that components should accept.
 */
export interface BaseComponentProps {
  className?: string;
  style?: CSSProperties;
}