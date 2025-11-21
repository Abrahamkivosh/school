import DashboardLayout from "@/components/dashboard-layout";
// import { useRole } from "@/hooks/use-role";

export default function ParentPortal() {
  // const { role } = useRole();

  const parentData = {
    name: "Jennifer Johnson",
    title: "Parent Portal", 
    icon: "👨‍👩‍👧‍👦",
  };

  return (
    <DashboardLayout 
      userRole="parent" 
      userData={parentData}
    />
  );
}
