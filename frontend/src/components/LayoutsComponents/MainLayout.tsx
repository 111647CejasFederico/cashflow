import { NavLink, Outlet } from "react-router";

import LanguageSwitcher from "../UXComponents/LanguageSwitcher";

export default function MainLayout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <nav className="flex gap-3">
          <NavLink to="/" className={({ isActive }) => (isActive ? "font-semibold" : "opacity-80")}>
            Home
          </NavLink>
          <NavLink
            to="/masters"
            className={({ isActive }) => (isActive ? "font-semibold" : "opacity-80")}
          >
            Masters
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
