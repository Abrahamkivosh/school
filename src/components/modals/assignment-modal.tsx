import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAssignmentSchema, type InsertAssignment } from "@/shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload } from "lucide-react";

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssignmentModal({ isOpen, onClose }: AssignmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertAssignment>({
    resolver: zodResolver(insertAssignmentSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      teacherId: "user-teacher-1", // This would come from auth context
      classId: "",
      priority: "medium",
      attachments: [],
    },
  });

  const createAssignmentMutation = useMutation({
    mutationFn: async (data: InsertAssignment) => {
      const response = await apiRequest("POST", "/api/assignments", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assignments"] });
      toast({
        title: "Success",
        description: "Assignment created successfully!",
      });
      form.reset();
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create assignment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertAssignment) => {
    setIsSubmitting(true);
    createAssignmentMutation.mutate(data);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="assignment-modal">
        <DialogHeader>
          <DialogTitle>Create New Assignment</DialogTitle>
          <DialogDescription>
            Create a new assignment for your students with detailed instructions and attachments.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignment Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter assignment title"
                        {...field}
                        data-testid="assignment-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="assignment-subject">
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="literature">Literature</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value ? field.value.toISOString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                        data-testid="assignment-due-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>

                      <FormControl>
                        <SelectTrigger data-testid="assignment-priority">
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>

                    <FormControl>
                      <SelectTrigger data-testid="assignment-class">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="8A">Grade 8A</SelectItem>
                      <SelectItem value="8B">Grade 8B</SelectItem>
                      <SelectItem value="9A">Grade 9A</SelectItem>
                      <SelectItem value="9B">Grade 9B</SelectItem>
                      <SelectItem value="10A">Grade 10A</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                   <Textarea
  data-testid="assignment-description"
  onChange={field.onChange}
  onBlur={field.onBlur}
  value={field.value || ""}
  disabled={field.disabled}
  name={field.name}
  ref={field.ref}
  placeholder="Enter assignment description..."
  rows={4}
/>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Attachments</FormLabel>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors mt-2">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                <input type="file" multiple className="hidden" id="assignmentFiles" />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('assignmentFiles')?.click()}
                  data-testid="assignment-file-upload"
                >
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                data-testid="assignment-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || createAssignmentMutation.isPending}
                data-testid="assignment-submit"
              >
                <Plus className="w-4 h-4 mr-2" />
                {createAssignmentMutation.isPending ? "Creating..." : "Create Assignment"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
