import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { ROUTES } from "@/routes";
import { auth } from "@/services/firebase";
import AdminSidebar from "@/components/shell/AdminSidebar";
import {
  createBlogAuthorFromAdmin,
  createBlogCategoryFromAdmin,
  createBlogPostFromAdmin,
  createBlogTagFromAdmin,
  deleteBlogAuthorFromAdmin,
  deleteBlogCategoryFromAdmin,
  deleteBlogPostFromAdmin,
  deleteBlogTagFromAdmin,
  getBlogAuthorsForAdmin,
  getBlogCategoriesForAdmin,
  getBlogPostsForAdmin,
  getBlogTagsForAdmin,
  updateBlogAuthorFromAdmin,
  updateBlogCategoryFromAdmin,
  updateBlogPostFromAdmin,
  updateBlogTagFromAdmin,
} from "@/services";
import type { BlogAuthor, BlogCategory, BlogPost, BlogTag } from "@/interfaces";

type AdminSection = "posts" | "authors" | "categories" | "tags";
type PostStatus = "draft" | "published" | "archived";

type PostFormState = {
  id: string;
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

type AuthorFormState = {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  role: string;
  bio: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  website: string;
  isActive: boolean;
};

type CategoryFormState = {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
};

type TagFormState = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
};

const initialPostForm: PostFormState = {
  id: "",
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

const initialAuthorForm: AuthorFormState = {
  id: "",
  name: "",
  slug: "",
  avatar: "",
  role: "",
  bio: "",
  linkedin: "",
  instagram: "",
  twitter: "",
  website: "",
  isActive: true,
};

const initialCategoryForm: CategoryFormState = {
  id: "",
  name: "",
  slug: "",
  description: "",
  color: "#f4c20d",
  sortOrder: 1,
  isActive: true,
};

const initialTagForm: TagFormState = {
  id: "",
  name: "",
  slug: "",
  isActive: true,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toDateInput(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

export default function AdminBlogsPage() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<AdminSection>("posts");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);

  const [postForm, setPostForm] = useState<PostFormState>(initialPostForm);
  const [authorForm, setAuthorForm] =
    useState<AuthorFormState>(initialAuthorForm);
  const [categoryForm, setCategoryForm] =
    useState<CategoryFormState>(initialCategoryForm);
  const [tagForm, setTagForm] = useState<TagFormState>(initialTagForm);

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingAuthorId, setEditingAuthorId] = useState<string | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null,
  );
  const [editingTagId, setEditingTagId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [postSearch, setPostSearch] = useState("");
  const [postStatusFilter, setPostStatusFilter] = useState<"all" | PostStatus>(
    "all",
  );

  const selectedAuthor = useMemo(
    () => authors.find((a) => a.id === postForm.authorId) || null,
    [authors, postForm.authorId],
  );

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === postForm.categoryId) || null,
    [categories, postForm.categoryId],
  );

  const selectedTagSlugs = useMemo(() => {
    return postForm.tagsCsv
      .split(",")
      .map((item) => slugify(item.trim()))
      .filter(Boolean);
  }, [postForm.tagsCsv]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const rawStatus = (post as { status?: string }).status || "published";
      const matchesStatus =
        postStatusFilter === "all" ? true : rawStatus === postStatusFilter;

      const query = postSearch.trim().toLowerCase();
      if (!query) return matchesStatus;

      const haystack = [
        post.title,
        post.slug,
        post.author.name,
        post.category.name,
        post.excerpt,
        ...post.tags.map((tag) => tag.name),
      ]
        .join(" ")
        .toLowerCase();

      return matchesStatus && haystack.includes(query);
    });
  }, [posts, postSearch, postStatusFilter]);

  const sidebarItems = useMemo(
    () => [
      { key: "posts" as const, label: "Posts", count: posts.length },
      { key: "authors" as const, label: "Authors", count: authors.length },
      {
        key: "categories" as const,
        label: "Categories",
        count: categories.length,
      },
      { key: "tags" as const, label: "Tags", count: tags.length },
    ],
    [posts.length, authors.length, categories.length, tags.length],
  );

  async function refreshData() {
    const [postData, authorData, categoryData, tagData] = await Promise.all([
      getBlogPostsForAdmin(),
      getBlogAuthorsForAdmin(),
      getBlogCategoriesForAdmin(),
      getBlogTagsForAdmin(),
    ]);

    setPosts(postData);
    setAuthors(authorData);
    setCategories(categoryData);
    setTags(tagData);

    if (!postForm.authorId && authorData[0]) {
      setPostForm((prev) => ({ ...prev, authorId: authorData[0].id }));
    }

    if (!postForm.categoryId && categoryData[0]) {
      setPostForm((prev) => ({ ...prev, categoryId: categoryData[0].id }));
    }
  }

  useEffect(() => {
    async function bootstrap() {
      try {
        await refreshData();
      } finally {
        setIsLoading(false);
      }
    }

    bootstrap();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  }

  function clearPostForm() {
    setEditingPostId(null);
    setMessage("");
    setPostForm((prev) => ({
      ...initialPostForm,
      authorId: prev.authorId,
      categoryId: prev.categoryId,
    }));
  }

  function clearAuthorForm() {
    setEditingAuthorId(null);
    setAuthorForm(initialAuthorForm);
    setMessage("");
  }

  function clearCategoryForm() {
    setEditingCategoryId(null);
    setCategoryForm(initialCategoryForm);
    setMessage("");
  }

  function clearTagForm() {
    setEditingTagId(null);
    setTagForm(initialTagForm);
    setMessage("");
  }

  function populatePostForEdit(post: BlogPost) {
    setEditingPostId(post.id);
    setMessage("");
    const rawStatus = ((post as { status?: string }).status ||
      "published") as PostStatus;

    setPostForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      status: rawStatus,
      metaDescription: post.metaDescription,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      coverImageAlt: post.coverImageAlt,
      categoryId: post.category.id,
      authorId: post.author.id,
      relatedPostIdsCsv: post.relatedPostIds.join(", "),
      publishDate: toDateInput(post.publishDate),
      readTime: post.readTime,
      featured: post.featured,
      tagsCsv: post.tags.map((tag) => tag.slug).join(", "),
      contentJson: JSON.stringify(post.content, null, 2),
    });
  }

  function populateAuthorForEdit(author: BlogAuthor) {
    setEditingAuthorId(author.id);
    setAuthorForm({
      id: author.id,
      name: author.name,
      slug: author.slug,
      avatar: author.avatar,
      role: author.role,
      bio: author.bio,
      linkedin: author.socialLinks?.linkedin || "",
      instagram: author.socialLinks?.instagram || "",
      twitter: author.socialLinks?.twitter || "",
      website: author.socialLinks?.website || "",
      isActive: true,
    });
    setMessage("");
  }

  function populateCategoryForEdit(category: BlogCategory, index: number) {
    setEditingCategoryId(category.id);
    setCategoryForm({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
      sortOrder: index + 1,
      isActive: true,
    });
    setMessage("");
  }

  function populateTagForEdit(tag: BlogTag) {
    setEditingTagId(tag.id);
    setTagForm({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      isActive: true,
    });
    setMessage("");
  }

  function addTagToPostForm(slug: string) {
    if (selectedTagSlugs.includes(slug)) return;
    const next = [...selectedTagSlugs, slug].join(", ");
    setPostForm((prev) => ({ ...prev, tagsCsv: next }));
  }

  function removeTagFromPostForm(slug: string) {
    const next = selectedTagSlugs.filter((value) => value !== slug).join(", ");
    setPostForm((prev) => ({ ...prev, tagsCsv: next }));
  }

  async function handlePostSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedAuthor || !selectedCategory) {
      setMessage("Select a valid author and category.");
      return;
    }

    let parsedContent: BlogPost["content"] = [];
    try {
      const value = JSON.parse(postForm.contentJson);
      if (!Array.isArray(value)) {
        setMessage("Content JSON must be an array of content blocks.");
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
      id: postForm.id || `post-${slugify(postForm.slug || postForm.title)}`,
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
      if (editingPostId) {
        await updateBlogPostFromAdmin(editingPostId, payload);
        setMessage("Post updated successfully.");
      } else {
        await createBlogPostFromAdmin(payload);
        setMessage("Post created successfully.");
      }
      await refreshData();
      clearPostForm();
    } catch {
      setMessage("Failed to save post. Check Firebase permissions for writes.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAuthorSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      id:
        authorForm.id ||
        `author-${slugify(authorForm.slug || authorForm.name)}`,
      name: authorForm.name.trim(),
      slug: slugify(authorForm.slug || authorForm.name),
      avatar: authorForm.avatar.trim(),
      role: authorForm.role.trim(),
      bio: authorForm.bio.trim(),
      socialLinks: {
        linkedin: authorForm.linkedin.trim() || undefined,
        instagram: authorForm.instagram.trim() || undefined,
        twitter: authorForm.twitter.trim() || undefined,
        website: authorForm.website.trim() || undefined,
      },
      isActive: authorForm.isActive,
    };

    setIsSaving(true);
    setMessage("");
    try {
      if (editingAuthorId) {
        await updateBlogAuthorFromAdmin(editingAuthorId, payload);
        setMessage("Author updated successfully.");
      } else {
        await createBlogAuthorFromAdmin(payload);
        setMessage("Author created successfully.");
      }
      await refreshData();
      clearAuthorForm();
    } catch {
      setMessage("Failed to save author.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleCategorySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      id:
        categoryForm.id ||
        `cat-${slugify(categoryForm.slug || categoryForm.name)}`,
      name: categoryForm.name.trim(),
      slug: slugify(categoryForm.slug || categoryForm.name),
      description: categoryForm.description.trim(),
      color: categoryForm.color,
      sortOrder: Number(categoryForm.sortOrder) || 1,
      isActive: categoryForm.isActive,
    };

    setIsSaving(true);
    setMessage("");
    try {
      if (editingCategoryId) {
        await updateBlogCategoryFromAdmin(editingCategoryId, payload);
        setMessage("Category updated successfully.");
      } else {
        await createBlogCategoryFromAdmin(payload);
        setMessage("Category created successfully.");
      }
      await refreshData();
      clearCategoryForm();
    } catch {
      setMessage("Failed to save category.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleTagSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      id: tagForm.id || `tag-${slugify(tagForm.slug || tagForm.name)}`,
      name: tagForm.name.trim(),
      slug: slugify(tagForm.slug || tagForm.name),
      isActive: tagForm.isActive,
    };

    setIsSaving(true);
    setMessage("");
    try {
      if (editingTagId) {
        await updateBlogTagFromAdmin(editingTagId, payload);
        setMessage("Tag updated successfully.");
      } else {
        await createBlogTagFromAdmin(payload);
        setMessage("Tag created successfully.");
      }
      await refreshData();
      clearTagForm();
    } catch {
      setMessage("Failed to save tag.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePostDelete(postId: string) {
    const confirmed = window.confirm("Delete this post permanently?");
    if (!confirmed) return;

    try {
      await deleteBlogPostFromAdmin(postId);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      if (editingPostId === postId) clearPostForm();
    } catch {
      setMessage(
        "Failed to delete post. Check Firebase permissions for writes.",
      );
    }
  }

  async function handleAuthorDelete(authorId: string) {
    const referenced = posts.some((post) => post.author.id === authorId);
    if (referenced) {
      setMessage("Cannot delete author while posts still reference it.");
      return;
    }

    const confirmed = window.confirm("Delete this author permanently?");
    if (!confirmed) return;

    try {
      await deleteBlogAuthorFromAdmin(authorId);
      setAuthors((prev) => prev.filter((author) => author.id !== authorId));
      if (editingAuthorId === authorId) clearAuthorForm();
    } catch {
      setMessage("Failed to delete author.");
    }
  }

  async function handleCategoryDelete(categoryId: string) {
    const referenced = posts.some((post) => post.category.id === categoryId);
    if (referenced) {
      setMessage("Cannot delete category while posts still reference it.");
      return;
    }

    const confirmed = window.confirm("Delete this category permanently?");
    if (!confirmed) return;

    try {
      await deleteBlogCategoryFromAdmin(categoryId);
      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId),
      );
      if (editingCategoryId === categoryId) clearCategoryForm();
    } catch {
      setMessage("Failed to delete category.");
    }
  }

  async function handleTagDelete(tagId: string) {
    const referenced = posts.some((post) =>
      post.tags.some((tag) => tag.id === tagId),
    );
    if (referenced) {
      setMessage("Cannot delete tag while posts still reference it.");
      return;
    }

    const confirmed = window.confirm("Delete this tag permanently?");
    if (!confirmed) return;

    try {
      await deleteBlogTagFromAdmin(tagId);
      setTags((prev) => prev.filter((tag) => tag.id !== tagId));
      if (editingTagId === tagId) clearTagForm();
    } catch {
      setMessage("Failed to delete tag.");
    }
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary px-4 py-16 sm:px-6 lg:px-8">
      <a
        href="#admin-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to admin content
      </a>
      <section
        id="admin-content"
        className="mx-auto max-w-7xl space-y-8"
        aria-labelledby="admin-cms-heading"
      >
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <AdminSidebar
            items={sidebarItems}
            activeSection={activeSection}
            activePage="dashboard"
            onSectionChange={setActiveSection}
            onLogout={handleLogout}
          />

          <div className="space-y-6">
            <div className="rounded-2xl border border-border/70 bg-bg-secondary/80 p-5 shadow-lg backdrop-blur-sm sm:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                Admin Dashboard
              </p>
              <h1 id="admin-cms-heading" className="mt-1 text-3xl font-black">
                Blog CMS Operations
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                Create, update, and manage all publishing entities from one place.
              </p>
            </div>

            {message && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm text-text-secondary"
              >
                {message}
              </div>
            )}

            {activeSection === "posts" && (
          <div
            id="admin-panel-posts"
            role="tabpanel"
            aria-labelledby="admin-tab-posts"
            className="grid gap-8 lg:grid-cols-2"
          >
            <div className="rounded-2xl border border-border bg-bg-secondary p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingPostId ? "Edit Post" : "Create Post"}
              </h2>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <input
                  value={postForm.title}
                  onChange={(e) =>
                    setPostForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  placeholder="Title"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={postForm.slug}
                    onChange={(e) =>
                      setPostForm((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="Slug (optional, auto from title)"
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                  />
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

                <textarea
                  value={postForm.excerpt}
                  onChange={(e) =>
                    setPostForm((prev) => ({
                      ...prev,
                      excerpt: e.target.value,
                    }))
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

                <input
                  value={postForm.coverImage}
                  onChange={(e) =>
                    setPostForm((prev) => ({
                      ...prev,
                      coverImage: e.target.value,
                    }))
                  }
                  required
                  placeholder="Cover image URL"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />

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

                <div className="grid gap-4 sm:grid-cols-2">
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
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <input
                    type="number"
                    min={1}
                    value={postForm.readTime}
                    onChange={(e) =>
                      setPostForm((prev) => ({
                        ...prev,
                        readTime: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                  />

                  <input
                    type="datetime-local"
                    value={postForm.publishDate}
                    onChange={(e) =>
                      setPostForm((prev) => ({
                        ...prev,
                        publishDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                  />

                  <label className="flex items-center gap-2 rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm text-text-secondary">
                    <input
                      type="checkbox"
                      checked={postForm.featured}
                      onChange={(e) =>
                        setPostForm((prev) => ({
                          ...prev,
                          featured: e.target.checked,
                        }))
                      }
                    />
                    Featured
                  </label>
                </div>

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

                {tags.length > 0 && (
                  <div className="rounded-xl border border-border bg-bg-primary p-3">
                    <p className="text-xs uppercase tracking-[0.14em] text-text-muted mb-2">
                      Quick tag picker
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => {
                        const selected = selectedTagSlugs.includes(tag.slug);
                        return (
                          <button
                            key={tag.id}
                            type="button"
                            onClick={() =>
                              selected
                                ? removeTagFromPostForm(tag.slug)
                                : addTagToPostForm(tag.slug)
                            }
                            className={`rounded-full border px-3 py-1 text-xs ${
                              selected
                                ? "border-accent bg-accent text-black"
                                : "border-border text-text-secondary"
                            }`}
                          >
                            {tag.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

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
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black disabled:opacity-60"
                  >
                    {isSaving
                      ? "Saving..."
                      : editingPostId
                        ? "Update Post"
                        : "Create Post"}
                  </button>
                  {editingPostId && (
                    <button
                      type="button"
                      onClick={clearPostForm}
                      className="rounded-xl border border-border px-5 py-3 text-sm"
                    >
                      Cancel edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-border bg-bg-secondary p-6">
              <h2 className="text-xl font-bold mb-4">All Posts</h2>

              <div className="grid gap-3 sm:grid-cols-2 mb-4">
                <input
                  value={postSearch}
                  onChange={(e) => setPostSearch(e.target.value)}
                  placeholder="Search by title, slug, author, tag"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <select
                  value={postStatusFilter}
                  onChange={(e) =>
                    setPostStatusFilter(e.target.value as "all" | PostStatus)
                  }
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                >
                  <option value="all">all status</option>
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                  <option value="archived">archived</option>
                </select>
              </div>

              {isLoading ? (
                <p className="text-text-secondary text-sm">Loading posts...</p>
              ) : filteredPosts.length === 0 ? (
                <p className="text-text-secondary text-sm">No posts found.</p>
              ) : (
                <ul className="space-y-3 max-h-[70vh] overflow-auto pr-2">
                  {filteredPosts.map((post) => {
                    const status =
                      (post as { status?: string }).status || "published";
                    return (
                      <li
                        key={post.id}
                        className="rounded-xl border border-border p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold leading-tight">
                            {post.title}
                          </p>
                          <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                            {status}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mt-1">
                          /{post.slug}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {post.category.name} - {post.author.name}
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => populatePostForEdit(post)}
                            className="text-sm text-accent hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePostDelete(post.id)}
                            className="text-sm text-red-400 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
            )}

            {activeSection === "authors" && (
          <div
            id="admin-panel-authors"
            role="region"
            aria-label="Authors management"
            className="grid gap-8 lg:grid-cols-2"
          >
            <div className="rounded-2xl border border-border bg-bg-secondary p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingAuthorId ? "Edit Author" : "Create Author"}
              </h2>
              <form onSubmit={handleAuthorSubmit} className="space-y-4">
                <input
                  value={authorForm.name}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  placeholder="Author name"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  value={authorForm.slug}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="Slug (optional)"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  value={authorForm.avatar}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({
                      ...prev,
                      avatar: e.target.value,
                    }))
                  }
                  placeholder="Avatar URL"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  value={authorForm.role}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                  required
                  placeholder="Role"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <textarea
                  value={authorForm.bio}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={4}
                  placeholder="Bio"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={authorForm.linkedin}
                    onChange={(e) =>
                      setAuthorForm((prev) => ({
                        ...prev,
                        linkedin: e.target.value,
                      }))
                    }
                    placeholder="LinkedIn URL"
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                  <input
                    value={authorForm.instagram}
                    onChange={(e) =>
                      setAuthorForm((prev) => ({
                        ...prev,
                        instagram: e.target.value,
                      }))
                    }
                    placeholder="Instagram URL"
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                  <input
                    value={authorForm.twitter}
                    onChange={(e) =>
                      setAuthorForm((prev) => ({
                        ...prev,
                        twitter: e.target.value,
                      }))
                    }
                    placeholder="Twitter URL"
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                  <input
                    value={authorForm.website}
                    onChange={(e) =>
                      setAuthorForm((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    placeholder="Website URL"
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-text-secondary">
                  <input
                    type="checkbox"
                    checked={authorForm.isActive}
                    onChange={(e) =>
                      setAuthorForm((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                  />
                  Active author
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black disabled:opacity-60"
                  >
                    {isSaving
                      ? "Saving..."
                      : editingAuthorId
                        ? "Update Author"
                        : "Create Author"}
                  </button>
                  {editingAuthorId && (
                    <button
                      type="button"
                      onClick={clearAuthorForm}
                      className="rounded-xl border border-border px-5 py-3 text-sm"
                    >
                      Cancel edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-border bg-bg-secondary p-6">
              <h2 className="text-xl font-bold mb-4">All Authors</h2>
              {isLoading ? (
                <p className="text-text-secondary text-sm">
                  Loading authors...
                </p>
              ) : authors.length === 0 ? (
                <p className="text-text-secondary text-sm">No authors found.</p>
              ) : (
                <ul className="space-y-3 max-h-[70vh] overflow-auto pr-2">
                  {authors.map((author) => (
                    <li
                      key={author.id}
                      className="rounded-xl border border-border p-4"
                    >
                      <p className="font-semibold">{author.name}</p>
                      <p className="text-xs text-text-muted mt-1">
                        /{author.slug}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        {author.role}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => populateAuthorForEdit(author)}
                          className="text-sm text-accent hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAuthorDelete(author.id)}
                          className="text-sm text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
            )}

            {activeSection === "categories" && (
          <div
            id="admin-panel-categories"
            role="region"
            aria-label="Categories management"
            className="grid gap-8 lg:grid-cols-2"
          >
            <div className="rounded-2xl border border-border bg-bg-secondary p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingCategoryId ? "Edit Category" : "Create Category"}
              </h2>
              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <input
                  value={categoryForm.name}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                  placeholder="Category name"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  value={categoryForm.slug}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      slug: e.target.value,
                    }))
                  }
                  placeholder="Slug (optional)"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <textarea
                  value={categoryForm.description}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Description"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm text-text-secondary">
                    <span className="block text-xs uppercase tracking-[0.12em] mb-2 text-text-muted">
                      Color
                    </span>
                    <input
                      type="color"
                      value={categoryForm.color}
                      onChange={(e) =>
                        setCategoryForm((prev) => ({
                          ...prev,
                          color: e.target.value,
                        }))
                      }
                      className="h-9 w-full cursor-pointer rounded-md border border-border bg-bg-primary"
                    />
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={categoryForm.sortOrder}
                    onChange={(e) =>
                      setCategoryForm((prev) => ({
                        ...prev,
                        sortOrder: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-text-secondary">
                  <input
                    type="checkbox"
                    checked={categoryForm.isActive}
                    onChange={(e) =>
                      setCategoryForm((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                  />
                  Active category
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black disabled:opacity-60"
                  >
                    {isSaving
                      ? "Saving..."
                      : editingCategoryId
                        ? "Update Category"
                        : "Create Category"}
                  </button>
                  {editingCategoryId && (
                    <button
                      type="button"
                      onClick={clearCategoryForm}
                      className="rounded-xl border border-border px-5 py-3 text-sm"
                    >
                      Cancel edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-border bg-bg-secondary p-6">
              <h2 className="text-xl font-bold mb-4">All Categories</h2>
              {isLoading ? (
                <p className="text-text-secondary text-sm">
                  Loading categories...
                </p>
              ) : categories.length === 0 ? (
                <p className="text-text-secondary text-sm">
                  No categories found.
                </p>
              ) : (
                <ul className="space-y-3 max-h-[70vh] overflow-auto pr-2">
                  {categories.map((category, index) => (
                    <li
                      key={category.id}
                      className="rounded-xl border border-border p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold">{category.name}</p>
                        <span
                          className="h-4 w-4 rounded-full border border-border"
                          style={{ backgroundColor: category.color }}
                        />
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        /{category.slug}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        {category.description}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            populateCategoryForEdit(category, index)
                          }
                          className="text-sm text-accent hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCategoryDelete(category.id)}
                          className="text-sm text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
            )}

            {activeSection === "tags" && (
          <div
            id="admin-panel-tags"
            role="region"
            aria-label="Tags management"
            className="grid gap-8 lg:grid-cols-2"
          >
            <div className="rounded-2xl border border-border bg-bg-secondary p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingTagId ? "Edit Tag" : "Create Tag"}
              </h2>
              <form onSubmit={handleTagSubmit} className="space-y-4">
                <input
                  value={tagForm.name}
                  onChange={(e) =>
                    setTagForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  placeholder="Tag name"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  value={tagForm.slug}
                  onChange={(e) =>
                    setTagForm((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="Slug (optional)"
                  className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <label className="flex items-center gap-2 text-sm text-text-secondary">
                  <input
                    type="checkbox"
                    checked={tagForm.isActive}
                    onChange={(e) =>
                      setTagForm((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                  />
                  Active tag
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-xl bg-accent px-5 py-3 text-sm font-bold text-black disabled:opacity-60"
                  >
                    {isSaving
                      ? "Saving..."
                      : editingTagId
                        ? "Update Tag"
                        : "Create Tag"}
                  </button>
                  {editingTagId && (
                    <button
                      type="button"
                      onClick={clearTagForm}
                      className="rounded-xl border border-border px-5 py-3 text-sm"
                    >
                      Cancel edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-border bg-bg-secondary p-6">
              <h2 className="text-xl font-bold mb-4">All Tags</h2>
              {isLoading ? (
                <p className="text-text-secondary text-sm">Loading tags...</p>
              ) : tags.length === 0 ? (
                <p className="text-text-secondary text-sm">No tags found.</p>
              ) : (
                <ul className="space-y-3 max-h-[70vh] overflow-auto pr-2">
                  {tags.map((tag) => (
                    <li
                      key={tag.id}
                      className="rounded-xl border border-border p-4"
                    >
                      <p className="font-semibold">{tag.name}</p>
                      <p className="text-xs text-text-muted mt-1">
                        /{tag.slug}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => populateTagForEdit(tag)}
                          className="text-sm text-accent hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTagDelete(tag.id)}
                          className="text-sm text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
