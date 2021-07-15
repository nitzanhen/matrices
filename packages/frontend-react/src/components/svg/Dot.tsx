import React from 'react';

import { BaseComponentProps } from '../../types';

export const Dot: React.VFC<BaseComponentProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox='0 0 24 24'>
    <circle cx={12} cy={12} r={4} />
  </svg>
);
