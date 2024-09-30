import { createFileRoute, Outlet } from "@tanstack/react-router";

const Layout = () => {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-background">
      <Outlet />
    </main>
  );
};

export const Route = createFileRoute("/_auth")({
  component: Layout,
});
