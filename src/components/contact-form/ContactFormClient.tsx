"use client"

import React, { useCallback, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

export default function ContactFormClient() {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const formDataRef = useRef({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      formDataRef.current[name as keyof typeof formDataRef.current] = value;
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setLoading(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataRef.current),
        });
        if (!res.ok) throw new Error("Failed to submit");
        toast.success("Your message has been sent successfully!");
        if (formRef.current) {
          formRef.current.reset();
        }
        formDataRef.current = { name: "", email: "", subject: "", message: "" };
      } catch (err) {
        toast.error("There was a problem sending your message.", {
          description: "Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <Input
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        required
        className="bg-muted/50 dark:bg-muted/80"
      />
      <Input
        name="email"
        type="email"
        placeholder="Your Email"
        onChange={handleChange}
        required
        className="bg-muted/50 dark:bg-muted/80"
      />
      <Input
        name="subject"
        placeholder="Subject"
        onChange={handleChange}
        required
        className="bg-muted/50 dark:bg-muted/80"
      />
      <Textarea
        name="message"
        placeholder="Your Message"
        onChange={handleChange}
        required
        className="bg-muted/50 dark:bg-muted/80"
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
