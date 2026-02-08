import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-weak">
      <Sidebar />
      <div className="flex-1 px-3 py-2">
        <div className="bg-white border border-faded rounded-lg h-full flex flex-col">
          <Header />
          <div className="px-6 py-6 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
