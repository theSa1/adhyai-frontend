import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY =
  "pk_test_bGlnaHQtdGVycmFwaW4tODUuY2xlcmsuYWNjb3VudHMuZGV2JA";

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
            <TanStackRouterDevtools position="bottom-right" />
          </TooltipProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ClerkProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
