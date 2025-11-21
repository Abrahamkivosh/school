import DashboardLayout from "@/components/dashboard-layout";
// import { useRole } from "@/hooks/use-role";

export default function AdminPortal() {
  // const { role } = useRole();

  const adminData = {
    name: "Mr. David Tan",
    title: "Admin Portal",
    icon: "🛡️",
  };

  return (
    <DashboardLayout 
      userRole="admin" 
      userData={adminData}
    />
  );
}
