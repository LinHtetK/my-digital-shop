import { ReactNode } from "react";
import LogoutButton from "./LogoutButton";

interface Props {
  children: ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{title}</h1>
        <LogoutButton />
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
