import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

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
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message || '');
      formData.append('resume', data.resume);
      
      const res = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Application received",
        description: "Thank you for your interest! We'll review your application and get back to you soon.",
        duration: 3000,
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const onSubmit = (data: CareerFormValues) => {
    mutation.mutate(data);
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
          Building the future of trusted AI solutions
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-6">
            We're growing fast and looking for talented professionals to join our mission. Whether you're passionate about AI validation, conversational AI development, or helping businesses deploy reliable AI systems, we'd love to hear from you.
          </p>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Current Opportunities:</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">AI Validation Engineers</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Conversational AI Developers</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Customer Success Specialists</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Business Development Representatives</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Why ModelProof?</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Work with cutting-edge AI technologies across validation and implementation
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Collaborate with industry experts and innovative clients
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Shape the future of AI quality and automation
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Flexible work arrangements and competitive benefits
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Be part of a growing company at the forefront of AI solutions
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">What We're Looking For:</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Technical expertise in AI/ML systems</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Passion for quality, reliability, and innovation</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Experience with enterprise client relationships</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Commitment to ethical AI development</span>
              </div>
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
                render={({ field: { value, onChange, ...field } }) => (
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