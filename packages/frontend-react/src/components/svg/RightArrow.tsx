import React from 'react';

import { BaseComponentProps } from '../../types';

export const RightArrow: React.VFC<BaseComponentProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox='0 0 24 24'>
    <path d='M16.01 11H4v2h12.01v3L20 12l-3.99-4z' />
  </svg>
);
