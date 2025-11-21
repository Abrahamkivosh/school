import DashboardLayout from "@/components/dashboard-layout";
// import { useRole } from "@/hooks/use-role";

export default function TeacherPortal() {
  // const { role } = useRole();

  const teacherData = {
    name: "Ms. Sarah Chen",
    title: "Teacher Portal",
    icon: "👩‍🏫",
  };

  return (
    <DashboardLayout 
      userRole="teacher" 
      userData={teacherData}
    />
  );
}
