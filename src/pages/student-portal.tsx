import DashboardLayout from "@/components/dashboard-layout";
// import { useRole } from "@/hooks/use-role";

export default function StudentPortal() {
  // const { role } = useRole();

  const studentData = {
    name: "Alex Johnson",
    title: "Student Portal",
    icon: "🎓",
  };

  return (
    <DashboardLayout 
      userRole="student" 
      userData={studentData}
    />
  );
}
