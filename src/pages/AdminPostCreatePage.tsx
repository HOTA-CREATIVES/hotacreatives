import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { ROUTES } from "@/routes";
import { auth } from "@/services/firebase";
import {
  createBlogPostFromAdmin,
  getBlogAuthorsForAdmin,
  getBlogCategoriesForAdmin,
  getBlogTagsForAdmin,
  uploadBlogImageToCloudinary,
} from "@/services";
import type { BlogAuthor, BlogCategory, BlogPost, BlogTag } from "@/interfaces";
import AdminSidebar from "@/components/shell/AdminSidebar";
import { Button } from "@/components/base/button";

type PostStatus = "draft" | "published" | "archived";

type PostFormState = {
  title: string;
  slug: string;
  status: PostStatus;
  metaDescription: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  categoryId: string;
  authorId: string;
  relatedPostIdsCsv: string;
  publishDate: string;
  readTime: number;
  featured: boolean;
  tagsCsv: string;
  contentJson: string;
};

const initialPostForm: PostFormState = {
  title: "",
  slug: "",
  status: "published",
  metaDescription: "",
  excerpt: "",
  coverImage: "",
  coverImageAlt: "",
  categoryId: "",
  authorId: "",
  relatedPostIdsCsv: "",
  publishDate: "",
  readTime: 6,
  featured: false,
  tagsCsv: "",
  contentJson: JSON.stringify([{ type: "paragraph", content: "" }], null, 2),
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminPostCreatePage() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [postForm, setPostForm] = useState<PostFormState>(initialPostForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function bootstrap() {
      try {
        const [authorData, categoryData, tagData] = await Promise.all([
          getBlogAuthorsForAdmin(),
          getBlogCategoriesForAdmin(),
          getBlogTagsForAdmin(),
        ]);
        setAuthors(authorData);
        setCategories(categoryData);
        setTags(tagData);
        setPostForm((prev) => ({
          ...prev,
          authorId: authorData[0]?.id || "",
          categoryId: categoryData[0]?.id || "",
        }));
      } finally {
        setIsLoading(false);
      }
    }

    void bootstrap();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  }

  async function handleCoverImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      return;
    }

    setMessage("");
    setIsUploadingImage(true);
    try {
      const imageUrl = await uploadBlogImageToCloudinary(selected);
      setPostForm((prev) => ({ ...prev, coverImage: imageUrl }));
      setMessage("Cover image uploaded to Cloudinary.");
    } catch {
      setMessage("Image upload failed. Check Cloudinary env configuration.");
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  }

  const selectedAuthor = useMemo(
    () => authors.find((a) => a.id === postForm.authorId) || null,
    [authors, postForm.authorId],
  );

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === postForm.categoryId) || null,
    [categories, postForm.categoryId],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedAuthor || !selectedCategory) {
      setMessage("Select a valid author and category.");
      return;
    }

    let parsedContent: BlogPost["content"] = [];
    try {
      const value = JSON.parse(postForm.contentJson);
      if (!Array.isArray(value)) {
        setMessage("Content JSON must be an array of blocks.");
        return;
      }
      parsedContent = value;
    } catch {
      setMessage("Content JSON is invalid.");
      return;
    }

    const parsedTags = postForm.tagsCsv
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => slugify(item));

    const uniqueTagSlugs = Array.from(new Set(parsedTags));
    const payloadTags = uniqueTagSlugs.map((slug) => {
      const existing = tags.find(
        (tag) => tag.slug === slug || slugify(tag.name) === slug,
      );
      if (existing) return existing;
      return {
        id: `tag-${slug}`,
        name: slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        slug,
      };
    });

    const payload = {
      id: `post-${slugify(postForm.slug || postForm.title)}`,
      title: postForm.title.trim(),
      slug: slugify(postForm.slug || postForm.title),
      status: postForm.status,
      excerpt: postForm.excerpt.trim(),
      metaDescription: (postForm.metaDescription || postForm.excerpt).trim(),
      coverImage: postForm.coverImage.trim(),
      coverImageAlt: postForm.coverImageAlt.trim() || postForm.title.trim(),
      author: selectedAuthor,
      category: selectedCategory,
      tags: payloadTags,
      relatedPostIds: postForm.relatedPostIdsCsv
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      publishDate: postForm.publishDate || new Date().toISOString(),
      readTime: Number(postForm.readTime) || 6,
      featured: postForm.featured,
      content: parsedContent,
    };

    setIsSaving(true);
    setMessage("");
    try {
      await createBlogPostFromAdmin(payload);
      setMessage("Post created successfully.");
      navigate(ROUTES.ADMIN_BLOGS, { replace: true });
    } catch {
      setMessage("Failed to save post. Check Firebase permissions for writes.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <AdminSidebar activePage="content" onLogout={handleLogout} />

        <section className="space-y-6" aria-labelledby="create-post-heading">
          <header className="rounded-2xl border border-border/70 bg-bg-secondary/80 p-5 shadow-lg backdrop-blur-sm sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
              HOTA Admin
            </p>
            <h1 id="create-post-heading" className="mt-1 text-3xl font-black">
              Create New Post
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Create a post in a dedicated editor page with Cloudinary-backed
              cover image upload.
            </p>
          </header>

          {message && (
            <p className="rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm text-text-secondary">
              {message}
            </p>
          )}

          {isLoading ? (
            <p className="text-sm text-text-secondary">
              Loading post dependencies...
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-bg-secondary p-6 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={postForm.title}
                  onChange={(e) =>
                    setPostForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  placeholder="Title"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  value={postForm.slug}
                  onChange={(e) =>
                    setPostForm((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="Slug (optional, auto from title)"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </div>

              <textarea
                value={postForm.excerpt}
                onChange={(e) =>
                  setPostForm((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                required
                rows={3}
                placeholder="Excerpt"
                className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
              />

              <textarea
                value={postForm.metaDescription}
                onChange={(e) =>
                  setPostForm((prev) => ({
                    ...prev,
                    metaDescription: e.target.value,
                  }))
                }
                rows={2}
                placeholder="Meta description"
                className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
              />

              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <input
                  value={postForm.coverImage}
                  onChange={(e) =>
                    setPostForm((prev) => ({
                      ...prev,
                      coverImage: e.target.value,
                    }))
                  }
                  required
                  placeholder="Cover image URL (auto-filled by upload)"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm">
                  {isUploadingImage ? "Uploading..." : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverImageUpload}
                    disabled={isUploadingImage}
                  />
                </label>
              </div>

              <input
                value={postForm.coverImageAlt}
                onChange={(e) =>
                  setPostForm((prev) => ({
                    ...prev,
                    coverImageAlt: e.target.value,
                  }))
                }
                placeholder="Cover image alt"
                className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
              />

              <div className="grid gap-4 sm:grid-cols-3">
                <select
                  value={postForm.authorId}
                  onChange={(e) =>
                    setPostForm((prev) => ({
                      ...prev,
                      authorId: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                >
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>

                <select
                  value={postForm.categoryId}
                  onChange={(e) =>
                    setPostForm((prev) => ({
                      ...prev,
                      categoryId: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select
                  value={postForm.status}
                  onChange={(e) =>
                    setPostForm((prev) => ({
                      ...prev,
                      status: e.target.value as PostStatus,
                    }))
                  }
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                >
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                  <option value="archived">archived</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={postForm.tagsCsv}
                  onChange={(e) =>
                    setPostForm((prev) => ({
                      ...prev,
                      tagsCsv: e.target.value,
                    }))
                  }
                  placeholder="Tags by slug or name (comma separated)"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  value={postForm.relatedPostIdsCsv}
                  onChange={(e) =>
                    setPostForm((prev) => ({
                      ...prev,
                      relatedPostIdsCsv: e.target.value,
                    }))
                  }
                  placeholder="Related post IDs (comma separated)"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </div>

              <textarea
                value={postForm.contentJson}
                onChange={(e) =>
                  setPostForm((prev) => ({
                    ...prev,
                    contentJson: e.target.value,
                  }))
                }
                required
                rows={10}
                placeholder="Content JSON array"
                className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-xs font-mono outline-none focus:border-accent"
              />

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={isSaving || isUploadingImage}>
                  {isSaving ? "Saving..." : "Create Post"}
                </Button>
                <Button asChild variant="outline">
                  <Link to={ROUTES.ADMIN_BLOGS}>Cancel</Link>
                </Button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
