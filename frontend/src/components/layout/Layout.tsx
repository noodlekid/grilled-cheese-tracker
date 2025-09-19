import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { RightSidebar } from "./RightSidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-container">
      <Header />
      <div className="container">
        <Sidebar />
        <main className="main-content">{children}</main>
        <RightSidebar />
      </div>
    </div>
  );
}
