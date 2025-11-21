export const roleConfigs = {
  student: {
    title: 'Student Portal',
    icon: 'graduation-cap',
    primaryColor: 'var(--finnish-green)',
    user: 'Alex Johnson',
    metrics: {
      metric1: { value: '95%', label: 'Grade Average', change: '+5%' },
      metric2: { value: '8.7/10', label: 'Wellbeing Score', change: 'Excellent' },
      metric3: { value: '98%', label: 'Attendance Rate', change: 'Perfect' },
      metric4: { value: '12', label: 'Assignments Due', change: 'This Week' }
    },
    activities: [
      { icon: 'book', title: 'Math Assignment Submitted', time: '2 hours ago', type: 'success' },
      { icon: 'star', title: 'Received Kindness Award', time: '1 day ago', type: 'achievement' },
      { icon: 'clock', title: 'Science Lab Tomorrow', time: '2 days left', type: 'reminder' },
      { icon: 'users', title: 'Study Group Invitation', time: '3 hours ago', type: 'social' }
    ],
    quickActions: [
      { icon: '📤', title: 'Submit Assignment', action: 'submitAssignment' },
      { icon: '📅', title: 'View Schedule', action: 'viewSchedule' },
      { icon: '💬', title: 'Message Teacher', action: 'messageTeacher' },
      { icon: '❓', title: 'Get Help', action: 'getHelp' }
    ]
  },
  parent: {
    title: 'Parent Portal',
    icon: 'users',
    primaryColor: 'var(--primary)',
    user: 'Jennifer Johnson',
    metrics: {
      metric1: { value: '95%', label: "Alex's Grade Average", change: '+5%' },
      metric2: { value: '8.7/10', label: 'Wellbeing Score', change: 'Excellent' },
      metric3: { value: '100%', label: 'Week Attendance', change: 'Perfect' },
      metric4: { value: '3', label: 'New Messages', change: 'Today' }
    },
    activities: [
      { icon: 'bus', title: 'Alex arrived safely at school', time: '8:15 AM', type: 'safety' },
      { icon: 'star', title: 'Monthly virtue award received', time: '2 days ago', type: 'achievement' },
      { icon: 'calendar', title: 'Parent-teacher conference scheduled', time: '3 days ago', type: 'event' },
      { icon: 'credit-card', title: 'School fees payment reminder', time: '1 week', type: 'finance' }
    ],
    quickActions: [
      { icon: '📍', title: 'Track Bus', action: 'trackBus' },
      { icon: '💳', title: 'Pay Fees', action: 'payFees' },
      { icon: '💬', title: 'Message Teacher', action: 'messageTeacher' },
      { icon: '📊', title: 'View Progress', action: 'viewProgress' }
    ]
  },
  teacher: {
    title: 'Teacher Portal',
    icon: 'chalkboard-teacher',
    primaryColor: 'var(--singapore-blue)',
    user: 'Ms. Sarah Chen',
    metrics: {
      metric1: { value: '125', label: 'Total Students', change: '+3 new' },
      metric2: { value: '87%', label: 'Class Average', change: '+2%' },
      metric3: { value: '24', label: 'Assignments to Grade', change: 'Due today' },
      metric4: { value: '6', label: 'Classes Today', change: 'Schedule' }
    },
    activities: [
      { icon: 'clipboard-check', title: '15 assignments graded', time: '1 hour ago', type: 'work' },
      { icon: 'bullhorn', title: 'Class announcement posted', time: '3 hours ago', type: 'communication' },
      { icon: 'user-plus', title: 'New student enrolled', time: '1 day ago', type: 'admin' },
      { icon: 'chart-line', title: 'Weekly performance report ready', time: '2 days ago', type: 'report' }
    ],
    quickActions: [
      { icon: '➕', title: 'Create Assignment', action: 'createAssignment' },
      { icon: '📊', title: 'View Analytics', action: 'viewAnalytics' },
      { icon: '👥', title: 'Take Attendance', action: 'takeAttendance' },
      { icon: '🔔', title: 'Send Announcement', action: 'sendAnnouncement' }
    ]
  },
  admin: {
    title: 'Admin Portal',
    icon: 'shield-alt',
    primaryColor: 'var(--safety-red)',
    user: 'Mr. David Tan',
    metrics: {
      metric1: { value: '1,247', label: 'Total Students', change: '+23 this term' },
      metric2: { value: '99.9%', label: 'System Uptime', change: '99.9% target' },
      metric3: { value: '48', label: 'Cameras Active', change: 'All operational' },
      metric4: { value: '12', label: 'Critical Alerts', change: 'Past 24h' }
    },
    activities: [
      { icon: 'shield-alt', title: 'Security system check completed', time: '30 minutes ago', type: 'security' },
      { icon: 'users', title: 'Monthly enrollment report generated', time: '2 hours ago', type: 'report' },
      { icon: 'exclamation-triangle', title: 'Fire drill scheduled for tomorrow', time: '4 hours ago', type: 'safety' },
      { icon: 'credit-card', title: 'Fee collection summary updated', time: '1 day ago', type: 'finance' }
    ],
    quickActions: [
      { icon: '📹', title: 'Monitor CCTV', action: 'monitorCCTV' },
      { icon: '📊', title: 'View Reports', action: 'viewReports' },
      { icon: '👥', title: 'Manage Staff', action: 'manageStaff' },
      { icon: '⚙️', title: 'System Settings', action: 'systemSettings' }
    ]
  }
};
