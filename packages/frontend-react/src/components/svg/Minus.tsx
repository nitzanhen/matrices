import React from "react";
import { BaseComponentProps } from "../../types";

export const Minus: React.VFC<BaseComponentProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24">
    <path d="M19,13H5V11H19V13Z" />
  </svg>
);
