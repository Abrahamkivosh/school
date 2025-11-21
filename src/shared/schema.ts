//shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication and basic user info
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role").notNull().$type<"student" | "parent" | "teacher" | "admin">(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Students table
export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  studentId: varchar("student_id").notNull().unique(), // SC24-0847 format
  grade: varchar("grade").notNull(),
  className: varchar("class_name").notNull(),
  rfidStatus: boolean("rfid_status").default(true),
  parentId: varchar("parent_id").references(() => users.id),
  wellbeingScore: decimal("wellbeing_score", { precision: 3, scale: 1 }).default("0.0"),
  currentLocation: varchar("current_location"),
  busRoute: varchar("bus_route"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Assignments table
export const assignments = pgTable("assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  subject: varchar("subject").notNull(),
  teacherId: varchar("teacher_id").references(() => users.id),
  classId: varchar("class_id"),
  dueDate: timestamp("due_date").notNull(),
  priority: varchar("priority").$type<"low" | "medium" | "high">().default("medium"),
  attachments: jsonb("attachments").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

// Assignment submissions
export const submissions = pgTable("submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assignmentId: varchar("assignment_id").references(() => assignments.id),
  studentId: varchar("student_id").references(() => students.id),
  content: text("content"),
  attachments: jsonb("attachments").$type<string[]>().default([]),
  grade: varchar("grade"),
  feedback: text("feedback"),
  status: varchar("status").$type<"pending" | "submitted" | "graded">().default("pending"),
  submittedAt: timestamp("submitted_at"),
  gradedAt: timestamp("graded_at"),
});

// Messages table
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").references(() => users.id),
  recipientId: varchar("recipient_id").references(() => users.id),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Attendance records
export const attendance = pgTable("attendance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id),
  date: timestamp("date").notNull(),
  status: varchar("status").$type<"present" | "absent" | "late" | "excused">().notNull(),
  arrivalTime: timestamp("arrival_time"),
  departureTime: timestamp("departure_time"),
  location: varchar("location"), // Bus, School, etc.
  notes: text("notes"),
});

// Safety logs for tracking student movements
export const safetyLogs = pgTable("safety_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id),
  location: varchar("location").notNull(),
  action: varchar("action").notNull(), // entry, exit, emergency, etc.
  timestamp: timestamp("timestamp").defaultNow(),
  rfidScanned: boolean("rfid_scanned").default(false),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
});

// Transportation tracking
export const transportation = pgTable("transportation", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  busNumber: varchar("bus_number").notNull(),
  route: varchar("route").notNull(),
  driverName: varchar("driver_name").notNull(),
  currentLocation: varchar("current_location"),
  status: varchar("status").$type<"on_route" | "delayed" | "arrived" | "maintenance">().default("on_route"),
  capacity: integer("capacity").default(50),
  studentsOnBoard: jsonb("students_on_board").$type<string[]>().default([]),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Wellbeing assessments
export const wellbeingAssessments = pgTable("wellbeing_assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id),
  assessorId: varchar("assessor_id").references(() => users.id),
  type: varchar("type").$type<"daily" | "weekly" | "kiva" | "virtue">().notNull(),
  scores: jsonb("scores").$type<Record<string, number>>().notNull(),
  notes: text("notes"),
  date: timestamp("date").defaultNow(),
});

// Announcements
export const announcements = pgTable("announcements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  authorId: varchar("author_id").references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  priority: varchar("priority").$type<"low" | "medium" | "high">().default("medium"),
  targetRoles: jsonb("target_roles").$type<string[]>().notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Financial records
export const financialRecords = pgTable("financial_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id),
  type: varchar("type").$type<"tuition" | "meal" | "transport" | "activity">().notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  status: varchar("status").$type<"pending" | "paid" | "overdue">().default("pending"),
  dueDate: timestamp("due_date"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
});

export const insertAssignmentSchema = createInsertSchema(assignments).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertAttendanceSchema = createInsertSchema(attendance).omit({
  id: true,
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;

export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;

export type Submission = typeof submissions.$inferSelect;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;

export type SafetyLog = typeof safetyLogs.$inferSelect;

export type Transportation = typeof transportation.$inferSelect;

export type WellbeingAssessment = typeof wellbeingAssessments.$inferSelect;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type FinancialRecord = typeof financialRecords.$inferSelect;
