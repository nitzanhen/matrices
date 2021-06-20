import React from 'react';

import { BaseComponentProps } from '../../types';

export const Equal: React.VFC<BaseComponentProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox='0 0 24 24'>
    <path d='M19,10H5V8H19V10M19,16H5V14H19V16Z' />
  </svg>
);
