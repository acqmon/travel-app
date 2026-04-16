"use client";
import { SidebarView } from "../components";
import { NAVIGATION } from "@/constants/navigation.constant";
import { ROLE } from "@/constants/role.constant";
import { ButtonView } from "../components";
import { useSignOut } from "@/service/auth.js/auth.queries";
import { useRouter } from "next/navigation";
import LoaderView from "@/app/components/Loader/LoaderView";
import { toast } from "react-toastify";

const menu = NAVIGATION[ROLE.CUSTOMER];

export default function CustomerLayout({ children }) {
  const { mutate: signOut, isPending } = useSignOut();
  const router = useRouter();
  return (
    <div className="flex h-screen bg-background">
      {isPending && <LoaderView label="Logging out..." />}
      {/* Sidebar */}
      <SidebarView title="Customer Panel" menu={menu} />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Header (empty for now) */}
        <header className="h-16 border-b border-clr-light bg-white flex items-center justify-end px-6">
          {/* Future header content */}
          <ButtonView
            title={isPending ? "Logging out..." : "Logout"}
            onClick={() => {
              signOut(undefined, {
                onSuccess: (response) => {
                  toast.success(response.message || "Logout successful");
                  router.replace("/login"); // redirect
                },
                onError: (error) => {
                  toast.error(error.message || "Logout failed");
                },
              });
            }}
            variant="primary"
          />
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>

        {/* Footer (empty for now) */}
        <footer className="h-12 border-t border-clr-light bg-white flex items-center justify-center text-sm text-clr-medium">
          {/* Future footer */}
        </footer>
      </div>
    </div>
  );
}
