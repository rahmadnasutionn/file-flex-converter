"use client";

import { Tooltip } from "react-tooltip";

interface ReactTooltipProps {
  anchorSelect: string;
  children: React.ReactNode;
  place?: 'top' | 'bottom' | 'left' | 'right';
};

function ReactTooltip({
  anchorSelect,
  children,
  place = 'top'
}: ReactTooltipProps) {
  return (
    <Tooltip 
      anchorSelect={anchorSelect}
      place={place}
      noArrow
    >
      {children}
    </Tooltip>
  );
};

export default ReactTooltip;