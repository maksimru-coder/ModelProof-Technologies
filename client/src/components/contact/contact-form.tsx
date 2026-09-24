import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { insertContactSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

export function ContactForm() {
  const { toast } = useToast();
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [vertical, setVertical] = useState("");

  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "Please run a free AI visibility mini-scan.",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const extras = [
        city && `City: ${city}`,
        website && `Website / Google Business Profile: ${website}`,
        vertical && `Type of business: ${vertical}`,
      ].filter(Boolean).join("\n");
      const payload = {
        ...data,
        message: extras ? `${data.message || "Free AI visibility mini-scan request."}\n\n${extras}` : (data.message || "Free AI visibility mini-scan request."),
      };
      const res = await apiRequest("POST", "/api/contact", payload);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Request sent", description: "We'll run the mini-scan and send results within 24-48 hours.", duration: 4000 });
      form.reset();
      setCity("");
      setWebsite("");
      setVertical("");
    },
    onError: () => {
      toast({ title: "Error", description: "Something went wrong. Email maksim@modelproof.ai instead.", variant: "destructive", duration: 4000 });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl><Input placeholder="Your name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input type="email" placeholder="you@business.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="company" render={({ field }) => (
          <FormItem>
            <FormLabel>Business name</FormLabel>
            <FormControl><Input placeholder="Your practice or company" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="space-y-2">
          <label className="text-sm font-medium">City</label>
          <Input placeholder="City customers search in" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Website or Google Business Profile</label>
          <Input placeholder="https://..." value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Type of business</label>
          <Input placeholder="Dentist, HVAC, law firm, med spa..." value={vertical} onChange={(e) => setVertical(e.target.value)} />
        </div>
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel>Anything we should know</FormLabel>
            <FormControl><Textarea placeholder="Locations, competitors, or a specific customer question..." className="min-h-[120px]" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Sending..." : "Request free mini-scan"}
        </Button>
      </form>
    </Form>
  );
}
