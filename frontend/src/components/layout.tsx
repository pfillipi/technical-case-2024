import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import styles from "@/styles/css/layout.module.css";
import { Navbar } from "./navbar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </main>
  );
}
