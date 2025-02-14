import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const careerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  resume: z.instanceof(File, { message: "Resume is required" }),
  message: z.string().optional(),
});

type CareerFormValues = z.infer<typeof careerFormSchema>;

export default function Careers() {
  const { toast } = useToast();
  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema),
  });

  const onSubmit = (data: CareerFormValues) => {
    // In a real application, you would send this to your backend
    toast({
      title: "Application received",
      description: "Thank you for your interest! We'll review your application and get back to you soon.",
    });
    form.reset();
  };

  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Careers at ModelProof</h1>
        <p className="text-lg text-muted-foreground">
          Join us in shaping the future of AI quality assurance
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for talented AI Validation Engineers to join our growing team. 
            If you're passionate about ensuring AI systems are reliable, ethical, and effective, 
            we'd love to hear from you.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                Work with cutting-edge AI technologies and validation methodologies
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                Collaborate with industry experts and thought leaders
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                Flexible work arrangements and competitive benefits
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-6">Submit Your Application</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resume"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Resume</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(file);
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your experience with AI validation..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit Application
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}