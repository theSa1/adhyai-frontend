import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootComponent = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Outlet />
            {import.meta.env.DEV && <TanStackRouterDevtools />}
          </TooltipProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ClerkProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
