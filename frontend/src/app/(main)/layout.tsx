import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-weak">
      <Sidebar />
      <div className="flex-1 px-3 py-2">
        <div className="bg-white border border-faded rounded-lg h-full flex flex-col">
          <Header />
          <div className="px-6 py-4 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
