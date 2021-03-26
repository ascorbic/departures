import * as React from "react";
import { layout } from "./layout.module.css";
import "../style/style.css";
export const Layout: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = function Layout({ className, ...props }) {
  return <div className={`${layout} ${className}`} {...props} />;
};
