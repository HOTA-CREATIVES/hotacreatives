import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
  Clock,
  Loader2,
  Sparkles,
  ShieldCheck,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { useSEO } from "@/components/shared/SEO";
import { contact, socialLinks, LOTTIE_ANIMATIONS } from "../constants";
import LottieAnimation from "@/components/ui/LottieAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, {
      message: "Phone number must be exactly 10 digits.",
    }),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
});

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwaJLwpyoWSCeh5NklVgjTAR7jPvOlwZYbCWMxkYU9k_KWIpuVjaKyFixzFR8h9FNbF/exec";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "text/plain" },
      });

      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
        toast.success("Message sent!", {
          description: "We'll get back to you within 24 hours.",
          style: { background: "#22c55e", color: "#fff" },
        });
        setTimeout(() => setIsSubmitted(false), 6000);
        form.reset();
      } else {
        const msg = result.message || "Something went wrong. Please try again.";
        setErrorMsg(msg);
        toast.error("Submission failed", {
          description: msg,
          style: { background: "#ef4444", color: "#fff" },
        });
      }
    } catch {
      const msg =
        "Network error \u2013 please check your connection and try again.";
      setErrorMsg(msg);
      toast.error("Network error", {
        description: msg,
        style: { background: "#ef4444", color: "#fff" },
      });
    } finally {
      setIsLoading(false);
    }
  };
  useSEO({
    title: "Contact Us",
    description:
      "Ready to grow your brand? Get in touch with HOTA Creative Growth Agency. WhatsApp, email, or fill out our contact form. We respond within 24 hours.",
    keywords:
      "contact creative agency India, digital marketing consultation, brand growth agency contact, Mumbai agency contact",
    canonicalUrl: "https://hotacreatives.in/contact",
  });
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-bg-secondary py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
          style={{ backgroundImage: "url('/images/hero-contact.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(244,194,13,0.2),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.1),transparent_35%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <Sparkles size={14} />
              Contact HOTA
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Speak to a team that
              <span className="block text-accent">
                ships growth, not slides.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-text-secondary sm:text-lg">
              Tell us your brand goals, funnel issues, or content bottlenecks.
              We&apos;ll respond with practical next steps within 24 hours.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: "Trusted delivery" },
                { icon: Rocket, label: "Execution focused" },
                { icon: Clock, label: "24h response" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-bg-card/80 px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <Icon size={16} className="text-accent" />
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="lg:col-span-2 border-border/80 bg-bg-card/70 backdrop-blur-sm">
            <CardContent className="pt-6">
              <LottieAnimation
                src={LOTTIE_ANIMATIONS.contact}
                className="h-52 w-full"
              />
              <p className="mt-4 text-sm text-text-secondary">
                No hard sells. No bloated decks. Just clear strategy,
                implementation, and measurable growth actions.
              </p>
              <div className="mt-5 flex items-center justify-between rounded-xl border border-border bg-bg-card px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
                    Priority Channel
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">
                    WhatsApp Response Desk
                  </p>
                </div>
                <InteractiveHoverButton
                  text="Start Chat"
                  onClick={() =>
                    window.open(
                      socialLinks.whatsapp,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className="w-36 border-border bg-bg-card text-text-primary"
                  aria-label="Start WhatsApp Chat"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 xl:grid-cols-5 lg:px-8">
          <Card className="xl:col-span-3 border-border/80 bg-bg-card/80">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-text-primary">
                Send Us a Message
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Fill in your details and our team will contact you with a clear
                action plan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted && (
                <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
                  Thank you! We&apos;ve received your message and will get back
                  to you within 24 hours.
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                  {errorMsg}
                </div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text-secondary">
                            Your Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 rounded-xl border-border bg-bg-card"
                              placeholder="Rajesh Kumar"
                              {...field}
                            />
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
                          <FormLabel className="text-text-secondary">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              className="h-12 rounded-xl border-border bg-bg-card"
                              placeholder="rajesh@company.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-text-secondary">
                            Phone Number *
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <span className="inline-flex select-none items-center rounded-l-xl border border-r-0 border-border bg-bg-card px-3 py-3 text-text-muted">
                                +91
                              </span>
                              <Input
                                type="tel"
                                maxLength={10}
                                onChange={(e) => {
                                  const val = e.target.value.replace(
                                    /[^0-9]/g,
                                    "",
                                  );
                                  onChange(val);
                                }}
                                className="h-12 rounded-l-none rounded-r-xl border-border bg-bg-card"
                                placeholder="9876543210"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text-secondary">
                            Company / Brand Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 rounded-xl border-border bg-bg-card"
                              placeholder="Your Brand Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text-secondary">
                            Service Interested In
                          </FormLabel>
                          <FormControl>
                            <select
                              className="h-12 w-full rounded-xl border border-border bg-bg-card px-4 text-text-primary transition-colors duration-300 focus:border-accent focus:outline-none"
                              {...field}
                            >
                              <option value="">Select a service</option>
                              <option value="social-media">
                                Social Media Management
                              </option>
                              <option value="content">Content Creation</option>
                              <option value="performance">
                                Performance Marketing
                              </option>
                              <option value="branding">Brand Identity</option>
                              <option value="video">Video Production</option>
                              <option value="website">Website Design</option>
                              <option value="full-package">Full Package</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-text-secondary">
                            Monthly Budget Range
                          </FormLabel>
                          <FormControl>
                            <select
                              className="h-12 w-full rounded-xl border border-border bg-bg-card px-4 text-text-primary transition-colors duration-300 focus:border-accent focus:outline-none"
                              {...field}
                            >
                              <option value="">Select budget range</option>
                              <option value="50k-1l">
                                ₹50,000 – ₹1,00,000
                              </option>
                              <option value="1l-2l">
                                ₹1,00,000 – ₹2,00,000
                              </option>
                              <option value="2l-3l">
                                ₹2,00,000 – ₹3,00,000
                              </option>
                              <option value="3l+">₹3,00,000+</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text-secondary">
                          Tell Us About Your Project
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            className="rounded-xl border-border bg-bg-card"
                            placeholder="Tell us about your brand, goals, and what you're looking for..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="group h-12 rounded-full bg-accent px-8 text-base font-bold text-black hover:bg-accent-hover"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6 xl:col-span-2">
            <Card className="border-border/80 bg-bg-card/80">
              <CardHeader>
                <CardTitle className="text-xl font-black text-text-primary">
                  Reach Us Directly
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Choose your preferred communication channel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="contact" className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-2 bg-bg-card">
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="social">Social</TabsTrigger>
                  </TabsList>

                  <TabsContent value="contact" className="space-y-3">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center justify-between rounded-xl border border-border bg-bg-card p-4 transition-colors hover:border-accent/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-accent/10 p-2">
                          <Mail size={18} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-text-muted">
                            Email
                          </p>
                          <p className="text-sm font-semibold text-text-primary">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-text-muted" />
                    </a>

                    <a
                      href={`tel:+${contact.phoneRaw}`}
                      className="flex items-center justify-between rounded-xl border border-border bg-bg-card p-4 transition-colors hover:border-accent/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-accent/10 p-2">
                          <Phone size={18} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-text-muted">
                            Phone
                          </p>
                          <p className="text-sm font-semibold text-text-primary">
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-text-muted" />
                    </a>

                    <div className="rounded-xl border border-border bg-bg-card p-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-accent/10 p-2">
                          <MapPin size={18} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-text-muted">
                            Office
                          </p>
                          <p className="text-sm font-semibold text-text-primary">
                            {contact.location}
                          </p>
                          <p className="mt-1 text-xs text-text-muted">
                            {contact.workingHours}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="social" className="space-y-3">
                    <a
                      href={socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 p-4 text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                    >
                      <MessageCircle size={20} />
                      <span className="text-sm font-semibold">
                        Chat on WhatsApp
                      </span>
                    </a>

                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-pink-500/40 bg-pink-500/10 p-4 text-pink-400 transition-colors hover:bg-pink-500/20"
                    >
                      <Instagram size={20} />
                      <span className="text-sm font-semibold">
                        Follow on Instagram
                      </span>
                    </a>

                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-blue-500/40 bg-blue-500/10 p-4 text-blue-400 transition-colors hover:bg-blue-500/20"
                    >
                      <Linkedin size={20} />
                      <span className="text-sm font-semibold">
                        Connect on LinkedIn
                      </span>
                    </a>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
