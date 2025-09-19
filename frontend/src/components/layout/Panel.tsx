import { CSSProperties, ReactNode } from "react";

interface PanelProps {
  title: string;
  children: ReactNode;
  showLoader?: boolean;
  headerExtra?: ReactNode;
  style?: CSSProperties;
}

export function Panel({
  title,
  children,
  showLoader,
  headerExtra,
  style,
}: PanelProps) {
  return (
    <div className="panel" style={style}>
      <div className="panel-header">
        {title}
        {headerExtra && <span>{headerExtra}</span>}
        {showLoader && <span className="loading"></span>}
      </div>
      <div className="panel-content">{children}</div>
    </div>
  );
}
