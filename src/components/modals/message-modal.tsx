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
import { insertMessageSchema, type InsertMessage } from "@/shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      senderId: "user-student-1", // This would come from auth context
      recipientId: "",
      subject: "",
      content: "",
      read: false,
    },
  });

  const createMessageMutation = useMutation({
    mutationFn: async (data: InsertMessage) => {
      const response = await apiRequest("POST", "/api/messages", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      toast({
        title: "Success",
        description: "Message sent successfully!",
      });
      form.reset();
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertMessage) => {
    setIsSubmitting(true);
    createMessageMutation.mutate(data);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" data-testid="message-modal">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>
            Send a message to teachers, parents, or administrators.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="recipientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>

                    <FormControl>
                      <SelectTrigger data-testid="message-recipient">
                        <SelectValue placeholder="Select Recipient" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user-teacher-1">Ms. Sarah Chen - Mathematics</SelectItem>
                      <SelectItem value="teacher-science">Dr. James Liu - Science</SelectItem>
                      <SelectItem value="user-admin-1">Mr. David Tan - Principal</SelectItem>
                      <SelectItem value="user-parent-1">Parent/Guardian</SelectItem>
                      <SelectItem value="counselor">School Counselor</SelectItem>
                      <SelectItem value="nurse">School Nurse</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <FormControl>
                    <Input
                      placeholder="Enter message subject"
                      {...field}
                      data-testid="message-subject"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here..."
                      rows={6}
                      {...field}
                      data-testid="message-content"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                data-testid="message-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || createMessageMutation.isPending}
                data-testid="message-submit"
              >
                <Send className="w-4 h-4 mr-2" />
                {createMessageMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
