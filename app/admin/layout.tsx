import AdminNav from "./components/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)" }}>
      <AdminNav />
      <main className="admin-main">{children}</main>
    </div>
  );
}
