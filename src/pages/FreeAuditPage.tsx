import { useState, useCallback } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  BarChart3,
  Globe,
  Instagram,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Upload,
  FileText,
  Image as ImageIcon,
  X,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { useSEO } from "@/components/shell/SEO";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import { Textarea } from "@/components/base/textarea";
import { InteractiveHoverButton } from "@/components/composite/interactive-hover-button";
import { socialLinks } from "@/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/base/form";

const AUDIT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwnlKBfblE-gXXulkmIrmmdYT2eqjAJMdWjamtlxP7QLMtZ-NJcRPyxDgHF40h4SfmW/exec";

const industries = [
  "Fashion & Apparel",
  "Beauty & Skincare",
  "Food & Beverage",
  "Health & Fitness",
  "Real Estate",
  "Education & EdTech",
  "SaaS / Technology",
  "E-commerce / D2C",
  "Hospitality & Travel",
  "Finance & Fintech",
  "Healthcare",
  "Retail",
  "Other",
];

const revenueRanges = [
  "Under ?5 Lakh / month",
  "?5 � ?25 Lakh / month",
  "?25 � ?75 Lakh / month",
  "?75 Lakh � ?2 Crore / month",
  "?2 Crore+ / month",
  "Prefer not to say",
];

const steps = [
  { icon: Sparkles, text: "We analyze your current brand presence" },
  { icon: BarChart3, text: "We benchmark against your category leaders" },
  { icon: Globe, text: "We send a practical 48-hour growth roadmap" },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  businessName: z
    .string()
    .min(2, { message: "Business name must be at least 2 characters." }),
  industry: z.string().min(1, { message: "Please select an industry." }),
  revenueRange: z.string().optional(),
  website: z
    .union([
      z.string().url({ message: "Invalid URL." }),
      z.string().length(0),
      z.literal(""),
    ])
    .optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Valid phone number is required." }),
  biggestChallenge: z.string().optional(),
});

export default function FreeAuditPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      businessName: "",
      industry: "",
      revenueRange: "",
      website: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      email: "",
      phone: "",
      biggestChallenge: "",
    },
  });

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const files = Array.from(incoming);
      const valid: File[] = [];
      const errors: string[] = [];

      for (const f of files) {
        if (!ALLOWED_TYPES.includes(f.type)) {
          errors.push(`"${f.name}" - unsupported format.`);
        } else if (f.size > MAX_FILE_SIZE) {
          errors.push(`"${f.name}" exceeds 10 MB.`);
        } else if (uploadedFiles.length + valid.length >= MAX_FILES) {
          errors.push(`Max ${MAX_FILES} files allowed.`);
          break;
        } else {
          valid.push(f);
        }
      }

      const newErrorMsg = errors.join(" ");
      if (newErrorMsg) {
        setErrorMsg(newErrorMsg);
        toast.error("File upload error", { description: newErrorMsg });
      } else {
        setErrorMsg("");
      }

      if (valid.length) setUploadedFiles((prev) => [...prev, ...valid]);
    },
    [uploadedFiles.length],
  );

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const filesPayload = await Promise.all(
        uploadedFiles.map(async (f) => ({
          name: f.name,
          mimeType: f.type,
          base64: await fileToBase64(f),
        })),
      );

      const res = await fetch(AUDIT_APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ ...values, files: filesPayload }),
      });

      const json = await res.json();
      if (json.success) {
        setIsSubmitted(true);
        toast.success("Audit request submitted!", {
          description: "You'll receive your free report within 48 hours.",
        });
      } else {
        const msg = json.message || "Something went wrong. Please try again.";
        setErrorMsg(msg);
        toast.error("Submission failed", { description: msg });
      }
    } catch {
      const msg = "Network error - please check your connection and try again.";
      setErrorMsg(msg);
      toast.error("Network error", { description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  useSEO({
    title: "Free Brand Growth Audit",
    description:
      "Get a comprehensive free digital audit report for your brand. We analyze your content, brand positioning, and growth opportunities. No obligations, just actionable insights.",
    keywords:
      "free brand audit, free digital marketing audit India, social media audit, brand positioning analysis, free marketing consultation India",
    canonicalUrl: "https://hotacreatives.in/free-audit",
  });

  if (isSubmitted) {
    return (
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.14),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(244,194,13,0.14),transparent_35%)]" />
        <Card className="relative z-10 mx-auto w-full max-w-2xl border-green-500/30 bg-bg-card/85 text-center backdrop-blur-sm">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle size={40} className="text-green-400" />
            </div>
            <CardTitle className="text-4xl font-black">
              You&apos;re In!
            </CardTitle>
            <CardDescription className="text-base text-text-secondary">
              Our strategy team will review your brand and deliver your
              personalized Free Digital Audit Report within 48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-8 text-sm text-text-muted">
              Check your email ({form.getValues().email || "your inbox"}) and
              WhatsApp for progress updates.
            </p>
            <Button
              asChild
              className="rounded-full bg-accent px-6 py-6 text-sm font-bold text-black hover:bg-accent-hover"
            >
              <Link to="/" className="inline-flex items-center gap-2">
                Back to Home
                <ArrowRight size={16} />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-bg-secondary py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(244,194,13,0.16),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(249,115,22,0.14),transparent_35%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <Sparkles size={14} />
              100% Free Strategic Audit
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Reveal What&apos;s Blocking
              <span className="block text-accent">Your Brand Growth</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-text-secondary sm:text-lg">
              Share your brand details and we&apos;ll send a focused,
              implementation-first audit report with growth opportunities,
              content fixes, and positioning insights.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {steps.map((step, i) => (
                <Card key={i} className="border-border/80 bg-bg-card/75 py-4">
                  <CardContent className="flex items-start gap-3 px-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <step.icon size={18} className="text-accent" />
                    </div>
                    <p className="text-xs leading-relaxed text-text-secondary">
                      {step.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="lg:col-span-2 border-border/80 bg-bg-card/75 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-black text-text-primary">
                What You Receive
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Delivered in 48 hours with practical next steps.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Competitor gap and messaging blind spots",
                "Content and funnel performance recommendations",
                "Priority roadmap for the next 30 days",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 rounded-lg border border-border bg-bg-card px-3 py-2"
                >
                  <CheckCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}

              <div className="rounded-xl border border-border bg-bg-card px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
                  Prefer WhatsApp?
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  Chat with our team for quick clarifications before you submit.
                </p>
                <div className="mt-3">
                  <InteractiveHoverButton
                    text="Open WhatsApp"
                    className="w-44 border-border bg-bg-card text-text-primary"
                    onClick={() =>
                      window.open(
                        socialLinks.whatsapp,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    aria-label="Open WhatsApp Chat"
                  />
                </div>
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
                Submit Your Audit Brief
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Fill in your details once. We&apos;ll do the deep work for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="rounded-xl border border-border bg-bg-card p-5">
                    <h2 className="mb-5 text-lg font-black text-text-primary">
                      1. About You
                    </h2>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2 block text-text-secondary">
                              Your Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="h-12 rounded-xl border-border bg-black/20"
                                placeholder="Priya Sharma"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2 block text-text-secondary">
                              Business / Brand Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="h-12 rounded-xl border-border bg-black/20"
                                placeholder="Your Brand Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-bg-card p-5">
                    <h2 className="mb-5 text-lg font-black text-text-primary">
                      2. Business Details
                    </h2>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2 block text-text-secondary">
                              Industry *
                            </FormLabel>
                            <FormControl>
                              <select
                                className="h-12 w-full rounded-xl border border-border bg-bg-card px-4 text-text-primary transition-colors duration-300 focus:border-accent focus:outline-none"
                                {...field}
                              >
                                <option value="">Select industry</option>
                                {industries.map((ind) => (
                                  <option key={ind} value={ind}>
                                    {ind}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="revenueRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2 block text-text-secondary">
                              Monthly Revenue Range
                            </FormLabel>
                            <FormControl>
                              <select
                                className="h-12 w-full rounded-xl border border-border bg-bg-card px-4 text-text-primary transition-colors duration-300 focus:border-accent focus:outline-none"
                                {...field}
                              >
                                <option value="">Select range</option>
                                {revenueRanges.map((range) => (
                                  <option key={range} value={range}>
                                    {range}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-bg-card p-5">
                    <h2 className="mb-5 text-lg font-black text-text-primary">
                      3. Online Presence
                    </h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2 flex items-center gap-2 text-text-secondary">
                              <Globe size={14} /> Website URL
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                className="h-12 rounded-xl border-border bg-black/20"
                                placeholder="https://yourbrand.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid gap-4 sm:grid-cols-3">
                        <FormField
                          control={form.control}
                          name="instagram"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="mb-2 flex items-center gap-2 text-text-secondary">
                                <Instagram size={14} /> Instagram
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 rounded-xl border-border bg-black/20"
                                  placeholder="@yourbrand"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="facebook"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="mb-2 flex items-center gap-2 text-text-secondary">
                                Facebook
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 rounded-xl border-border bg-black/20"
                                  placeholder="facebook.com/yourbrand"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="linkedin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="mb-2 flex items-center gap-2 text-text-secondary">
                                LinkedIn
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 rounded-xl border-border bg-black/20"
                                  placeholder="linkedin.com/company/yourbrand"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-bg-card p-5">
                    <h2 className="mb-5 text-lg font-black text-text-primary">
                      4. Contact & Goals
                    </h2>
                    <div className="space-y-4">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="mb-2 block text-text-secondary">
                                Email Address *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  className="h-12 rounded-xl border-border bg-black/20"
                                  placeholder="priya@yourbrand.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field: { onChange, ...field } }) => (
                            <FormItem>
                              <FormLabel className="mb-2 block text-text-secondary">
                                WhatsApp Number *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  maxLength={15}
                                  className="h-12 rounded-xl border-border bg-black/20"
                                  placeholder="+91 98765 43210"
                                  onChange={(e) => {
                                    const val = e.target.value.replace(
                                      /[^0-9+]/g,
                                      "",
                                    );
                                    onChange(val);
                                  }}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="biggestChallenge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2 block text-text-secondary">
                              What&apos;s your biggest marketing challenge right
                              now?
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={3}
                                className="rounded-xl border-border bg-black/20"
                                placeholder="e.g., Low engagement on Instagram, weak lead quality, inconsistent content output..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-bg-card p-5">
                    <h2 className="mb-3 text-lg font-black text-text-primary">
                      5. Supporting Documents (Optional)
                    </h2>
                    <p className="mb-4 text-sm text-text-secondary">
                      Upload screenshots, analytics exports, or brand files for
                      deeper context.
                    </p>

                    <label
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleDrop}
                      className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all duration-300 ${
                        isDragOver
                          ? "border-accent bg-accent/5"
                          : "border-border bg-bg-card hover:border-accent/50"
                      }`}
                    >
                      <Upload
                        size={32}
                        className={`transition-colors duration-300 ${
                          isDragOver ? "text-accent" : "text-text-muted"
                        }`}
                      />
                      <div className="text-center">
                        <p className="text-sm font-semibold text-text-primary">
                          Drag and drop files here or{" "}
                          <span className="text-accent underline">browse</span>
                        </p>
                        <p className="mt-1 text-xs text-text-muted">
                          JPG, PNG, WEBP, GIF, PDF - max 10 MB each, up to{" "}
                          {MAX_FILES} files
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept={ALLOWED_TYPES.join(",")}
                        onChange={handleFileInput}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </label>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, idx) => (
                          <div
                            key={`${file.name}-${idx}`}
                            className="flex items-center gap-3 rounded-xl border border-border bg-bg-card px-4 py-3"
                          >
                            {file.type.startsWith("image/") ? (
                              <ImageIcon
                                size={18}
                                className="shrink-0 text-accent"
                              />
                            ) : (
                              <FileText
                                size={18}
                                className="shrink-0 text-accent"
                              />
                            )}
                            <span className="flex-1 truncate text-sm text-text-primary">
                              {file.name}
                            </span>
                            <span className="shrink-0 text-xs text-text-muted">
                              {formatFileSize(file.size)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="rounded-lg p-1 transition-colors hover:bg-red-500/10"
                              aria-label={`Remove ${file.name}`}
                            >
                              <X size={16} className="text-red-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {errorMsg && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                      {errorMsg}
                    </div>
                  )}

                  <div className="pt-1">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="group h-13 rounded-full bg-accent px-10 text-lg font-black text-black hover:bg-accent-hover"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get Your Free Brand Growth Audit
                          <ArrowRight
                            size={20}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </Button>
                    <p className="mt-4 text-xs text-text-muted">
                      Your information stays private. We never share your data.
                      Expect your audit report within 48 hours via email and
                      WhatsApp.
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6 xl:col-span-2">
            <Card className="border-border/80 bg-bg-card/80">
              <CardHeader>
                <CardTitle className="text-xl font-black text-text-primary">
                  Review Scope
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  We review channels, positioning, and growth levers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Brand message clarity and consistency",
                  "Social profile strength and content quality",
                  "Funnel leaks and conversion opportunities",
                  "Competitor benchmark and category gaps",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg border border-border bg-bg-card px-3 py-2"
                  >
                    <CheckCircle size={15} className="text-accent" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-bg-card/80">
              <CardHeader>
                <CardTitle className="text-xl font-black text-text-primary">
                  Before You Submit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-text-secondary">
                <p className="flex items-center gap-2">
                  <TrendingUp size={15} className="text-accent" />
                  Add your current revenue range for better recommendations.
                </p>
                <p className="flex items-center gap-2">
                  <BarChart3 size={15} className="text-accent" />
                  Upload screenshots to improve audit precision.
                </p>
                <p className="flex items-center gap-2">
                  <Sparkles size={15} className="text-accent" />
                  Mention one major challenge to prioritize the roadmap.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
