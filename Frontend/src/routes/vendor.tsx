import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/vendor")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const role = localStorage.getItem("vp_role");
    const authed = localStorage.getItem("vp_auth") === "1";
    if (!authed) throw redirect({ to: "/login", search: { as: "vendor" } });
    if (role !== "vendor") {
      // wrong persona — bounce back to login so they can switch
      throw redirect({ to: "/login", search: { as: "vendor" } });
    }
  },
  component: () => <Outlet />,
});
