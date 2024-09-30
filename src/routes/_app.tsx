import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { FileText, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/sidebar";
import { useRecoilState } from "recoil";
import { selectedCourseState } from "@/lib/state";
import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const Layout = () => {
  const router = useRouterState();
  const [selectedCourse] = useRecoilState(selectedCourseState);
  const auth = useAuth();

  if (!auth.isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="flex dark:bg-[#020817] bg-[#f9f9fa] text-foreground">
      <Sidebar />
      <div className="flex-1 h-dvh relative">
        <div className="h-full w-full overflow-x-auto">
          <div className="flex justify-center absolute top-0 left-0 right-0 w-full z-30 h-28 bg-gradient-to-b from-background to-transparent p-5">
            <div className="flex gap-1 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground border shadow w-52 h-max">
              {[
                { name: "Chat", to: "/chat" },
                { name: "Quiz", to: "/quiz" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={cn(
                    "flex-1 flex justify-center rounded-sm px-3 py-1 text-sm font-semibold ring-offset-background",
                    {
                      "bg-background text-foreground shadow":
                        router.location.pathname.startsWith(item.to),
                    }
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          {!selectedCourse ? (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-3xl text-foreground/70 font-semibold">
                Select a course
              </h1>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_app")({
  component: Layout,
});
