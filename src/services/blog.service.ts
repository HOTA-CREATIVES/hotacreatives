import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  writeBatch,
  updateDoc,
  where,
  orderBy,
  limit,
  documentId,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import type { BlogAuthor, BlogCategory, BlogPost, BlogTag } from "@/interfaces";
import {
  BLOG_AUTHORS,
  BLOG_CATEGORIES,
  BLOG_POSTS,
  BLOG_TAGS,
  getBlogAuthorBySlug,
  getBlogPostBySlug,
  getPostsByAuthor,
  getPostsByCategory,
  getRelatedPosts,
} from "@/constants/blog.constants";

type FirestoreLikeTimestamp = {
  toDate?: () => Date;
  seconds?: number;
};

function toIsoDate(value: unknown): string {
  if (!value) return new Date().toISOString();

  if (typeof value === "string") return value;

  const maybeTimestamp = value as FirestoreLikeTimestamp;
  if (typeof maybeTimestamp.toDate === "function") {
    return maybeTimestamp.toDate().toISOString();
  }

  if (typeof maybeTimestamp.seconds === "number") {
    return new Date(maybeTimestamp.seconds * 1000).toISOString();
  }

  return new Date().toISOString();
}

interface RawAuthor {
  id?: string;
  name?: string;
  slug?: string;
  avatar?: string;
  role?: string;
  bio?: string;
  socialLinks?: BlogAuthor["socialLinks"];
}

interface RawCategory {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  color?: string;
}

interface RawTag {
  id?: string;
  name?: string;
  slug?: string;
}

interface RawPost {
  id?: string;
  title?: string;
  slug?: string;
  metaDescription?: string;
  excerpt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  authorSnapshot?: RawAuthor;
  author?: RawAuthor;
  authorId?: string;
  authorSlug?: string;
  authorName?: string;
  categorySnapshot?: RawCategory;
  category?: RawCategory;
  categoryId?: string;
  categorySlug?: string;
  categoryName?: string;
  tagSnapshots?: RawTag[];
  tags?: RawTag[];
  publishedAt?: unknown;
  publishDate?: unknown;
  updatedAt?: unknown;
  readTime?: number;
  featured?: boolean;
  content?: BlogPost["content"];
  relatedPostIds?: string[];
}

function mapAuthor(raw: RawAuthor): BlogAuthor {
  const avatar =
    raw?.avatar ||
    "https://res.cloudinary.com/diiyy6bar/image/upload/v1778660479/WhatsApp_Image_2026-04-24_at_11.24.35_PM_c4ewol.jpg";

  return {
    id: raw?.id || "author-1",
    name: raw?.name || "Chinni Suryan",
    slug: raw?.slug || "chinni-suryan",
    avatar,
    role: raw?.role || "Founder of HOTA",
    bio: raw?.bio || "",
    socialLinks: raw?.socialLinks || {},
  };
}

function mapCategory(raw: RawCategory): BlogCategory {
  return {
    id: raw?.id || "cat-unknown",
    name: raw?.name || "Uncategorized",
    slug: raw?.slug || "uncategorized",
    description: raw?.description || "",
    color: raw?.color || "#94a3b8",
  };
}

function mapTag(raw: RawTag): BlogTag {
  return {
    id: raw?.id || "tag-unknown",
    name: raw?.name || "General",
    slug: raw?.slug || "general",
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function generateSearchTokens(...values: string[]): string[] {
  const tokenSet = new Set<string>();

  for (const value of values) {
    if (!value) continue;
    const rawTokens = value
      .toLowerCase()
      .trim()
      .split(/[^a-z0-9]+/g)
      .map((token) => token.trim())
      .filter((token) => token.length >= 2);

    for (const token of rawTokens) tokenSet.add(token);
  }

  return Array.from(tokenSet);
}

function mapPost(docId: string, raw: RawPost): BlogPost {
  const author = mapAuthor(
    raw.authorSnapshot ||
      raw.author || {
        id: raw.authorId,
        slug: raw.authorSlug,
        name: raw.authorName,
      },
  );

  const category = mapCategory(
    raw.categorySnapshot ||
      raw.category || {
        id: raw.categoryId,
        slug: raw.categorySlug,
        name: raw.categoryName,
      },
  );

  const tagsRaw = raw.tagSnapshots || raw.tags || [];
  const tags = Array.isArray(tagsRaw) ? tagsRaw.map(mapTag) : [];

  return {
    id: raw.id || docId,
    title: raw.title || "Untitled",
    slug: raw.slug || docId,
    metaDescription: raw.metaDescription || "",
    excerpt: raw.excerpt || "",
    coverImage: raw.coverImage || "",
    coverImageAlt: raw.coverImageAlt || raw.title || "",
    category,
    tags,
    author,
    publishDate: toIsoDate(raw.publishedAt || raw.publishDate),
    updatedDate: toIsoDate(raw.updatedAt),
    readTime: raw.readTime || 1,
    featured: Boolean(raw.featured),
    content: Array.isArray(raw.content) ? raw.content : [],
    relatedPostIds: Array.isArray(raw.relatedPostIds) ? raw.relatedPostIds : [],
  };
}

function getFallbackPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );
}

type AdminBlogPayload = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  metaDescription: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  category: BlogCategory;
  tags: BlogTag[];
  author: BlogAuthor;
  relatedPostIds: string[];
  publishDate?: string;
  readTime: number;
  featured: boolean;
  content: BlogPost["content"];
};

type AdminAuthorPayload = {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  role: string;
  bio: string;
  socialLinks?: BlogAuthor["socialLinks"];
  isActive: boolean;
};

type AdminCategoryPayload = {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
};

type AdminTagPayload = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
};

function normalizeIsoDate(value?: string): string {
  if (!value) return new Date().toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}

function toFirestoreAuthor(payload: AdminAuthorPayload) {
  return {
    id: payload.id,
    name: payload.name,
    slug: payload.slug,
    avatar: payload.avatar,
    role: payload.role,
    bio: payload.bio,
    socialLinks: payload.socialLinks || {},
    isActive: payload.isActive,
    nameLower: payload.name.toLowerCase(),
    searchTokens: generateSearchTokens(
      payload.name,
      payload.slug,
      payload.role,
    ),
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  };
}

function toFirestoreCategory(payload: AdminCategoryPayload) {
  return {
    id: payload.id,
    name: payload.name,
    slug: payload.slug,
    description: payload.description,
    color: payload.color,
    sortOrder: payload.sortOrder,
    isActive: payload.isActive,
    nameLower: payload.name.toLowerCase(),
    searchTokens: generateSearchTokens(payload.name, payload.slug),
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  };
}

function toFirestoreTag(payload: AdminTagPayload) {
  return {
    id: payload.id,
    name: payload.name,
    slug: payload.slug,
    isActive: payload.isActive,
    nameLower: payload.name.toLowerCase(),
    searchTokens: generateSearchTokens(payload.name, payload.slug),
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  };
}

function toFirestorePost(payload: AdminBlogPayload) {
  const publishIso = normalizeIsoDate(payload.publishDate);
  const tagNames = payload.tags.map((tag) => tag.name);
  const tagSlugs = payload.tags.map((tag) => tag.slug);
  const searchTokens = generateSearchTokens(
    payload.title,
    payload.slug,
    payload.excerpt,
    payload.metaDescription,
    payload.author.name,
    payload.category.name,
    ...tagNames,
    ...tagSlugs,
  );

  return {
    id: payload.id,
    schemaVersion: 2,
    status: payload.status,
    title: payload.title,
    slug: payload.slug,
    metaDescription: payload.metaDescription,
    excerpt: payload.excerpt,
    coverImage: payload.coverImage,
    coverImageAlt: payload.coverImageAlt,
    featured: payload.featured,
    readTime: payload.readTime,
    relatedPostIds: payload.relatedPostIds,
    content: payload.content,

    authorId: payload.author.id,
    authorSlug: payload.author.slug,
    authorName: payload.author.name,
    categoryId: payload.category.id,
    categorySlug: payload.category.slug,
    categoryName: payload.category.name,
    tagIds: payload.tags.map((tag) => tag.id),
    tagSlugs,

    authorSnapshot: {
      id: payload.author.id,
      name: payload.author.name,
      slug: payload.author.slug,
      avatar: payload.author.avatar,
      role: payload.author.role,
    },
    categorySnapshot: {
      id: payload.category.id,
      name: payload.category.name,
      slug: payload.category.slug,
      color: payload.category.color,
    },
    tagSnapshots: payload.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })),

    author: {
      ...payload.author,
    },
    category: payload.category,
    tags: payload.tags,

    publishDate: publishIso,
    publishedAt: publishIso,
    searchTokens,
    stats: {
      viewCount: 0,
      shareCount: 0,
    },
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  };
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const q = query(
      collection(db, "posts"),
      where("status", "==", "published"),
      orderBy("publishDate", "desc"),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => mapPost(d.id, d.data()));
  } catch {
    return getFallbackPosts();
  }
}

export async function getFeaturedBlogPost(): Promise<BlogPost | null> {
  try {
    const q = query(
      collection(db, "posts"),
      where("status", "==", "published"),
      where("featured", "==", true),
      orderBy("publishDate", "desc"),
      limit(1),
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return mapPost(doc.id, doc.data());
  } catch {
    return getFallbackPosts().find((post) => post.featured) || null;
  }
}

export async function getBlogPostBySlugFromDb(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const q = query(
      collection(db, "posts"),
      where("status", "==", "published"),
      where("slug", "==", slug),
      limit(1),
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return mapPost(doc.id, doc.data());
  } catch {
    return getBlogPostBySlug(slug) || null;
  }
}

export async function getRelatedPostsFromDb(
  post: BlogPost,
): Promise<BlogPost[]> {
  if (!post.relatedPostIds.length) return [];

  try {
    const ids = post.relatedPostIds.slice(0, 10);
    const q = query(
      collection(db, "posts"),
      where(documentId(), "in", ids),
    );
    const snapshot = await getDocs(q);

    return snapshot.docs
      .map((d) => mapPost(d.id, d.data()))
      .filter((p) => p.id !== post.id)
      .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  } catch {
    return getRelatedPosts(post);
  }
}

export async function getBlogCategoriesFromDb(): Promise<BlogCategory[]> {
  try {
    const snapshot = await getDocs(collection(db, "categories"));
    return snapshot.docs.map((d) => mapCategory({ id: d.id, ...d.data() }));
  } catch {
    return BLOG_CATEGORIES;
  }
}

export async function getBlogAuthorBySlugFromDb(
  slug: string,
): Promise<BlogAuthor | null> {
  try {
    const q = query(
      collection(db, "authors"),
      where("slug", "==", slug),
      limit(1),
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return mapAuthor({ id: doc.id, ...doc.data() });
  } catch {
    return getBlogAuthorBySlug(slug) || null;
  }
}

export async function getPostsByAuthorSlugFromDb(
  slug: string,
): Promise<BlogPost[]> {
  try {
    const q = query(
      collection(db, "posts"),
      where("status", "==", "published"),
      where("authorSlug", "==", slug),
      orderBy("publishDate", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => mapPost(d.id, d.data()));
  } catch {
    const author = getBlogAuthorBySlug(slug);
    if (!author) return [];
    return getPostsByAuthor(author.id);
  }
}

export async function getPostsByCategorySlugFromDb(
  slug: string,
): Promise<BlogPost[]> {
  try {
    const q = query(
      collection(db, "posts"),
      where("status", "==", "published"),
      where("categorySlug", "==", slug),
      orderBy("publishDate", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => mapPost(d.id, d.data()));
  } catch {
    return getPostsByCategory(slug);
  }
}

export async function getBlogPostsForAdmin(): Promise<BlogPost[]> {
  try {
    const snapshot = await getDocs(collection(db, "posts"));
    return snapshot.docs
      .map((item) => mapPost(item.id, item.data()))
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
      );
  } catch {
    return getFallbackPosts();
  }
}

export async function getBlogAuthorsForAdmin(): Promise<BlogAuthor[]> {
  try {
    const snapshot = await getDocs(collection(db, "authors"));
    if (snapshot.empty) {
      return BLOG_AUTHORS.length > 0
        ? BLOG_AUTHORS
        : BLOG_POSTS.length > 0
          ? [BLOG_POSTS[0].author]
          : [];
    }

    return snapshot.docs.map((item) =>
      mapAuthor({ id: item.id, ...item.data() }),
    );
  } catch {
    return BLOG_AUTHORS.length > 0
      ? BLOG_AUTHORS
      : BLOG_POSTS.length > 0
        ? [BLOG_POSTS[0].author]
        : [];
  }
}

export async function syncBlogAuthorAvatarFromProfile(
  authorName: string,
  avatarUrl: string,
) {
  const normalizedAvatarUrl = avatarUrl.trim();
  if (!normalizedAvatarUrl) return;

  const authorSlug = slugify(authorName);
  const [authorsSnapshot, postsSnapshot] = await Promise.all([
    getDocs(
      query(collection(db, "authors"), where("slug", "==", authorSlug)),
    ),
    getDocs(
      query(
        collection(db, "posts"),
        where("authorSlug", "==", authorSlug),
      ),
    ),
  ]);

  if (authorsSnapshot.empty && postsSnapshot.empty) return;

  const batch = writeBatch(db);

  authorsSnapshot.docs.forEach((snapshot) => {
    batch.update(snapshot.ref, {
      avatar: normalizedAvatarUrl,
      updatedAt: serverTimestamp(),
    });
  });

  postsSnapshot.docs.forEach((snapshot) => {
    batch.update(snapshot.ref, {
      "author.avatar": normalizedAvatarUrl,
      "authorSnapshot.avatar": normalizedAvatarUrl,
      updatedAt: serverTimestamp(),
    });
  });

  await batch.commit();
}

export async function getBlogCategoriesForAdmin(): Promise<BlogCategory[]> {
  try {
    const snapshot = await getDocs(collection(db, "categories"));
    if (snapshot.empty) {
      return BLOG_CATEGORIES;
    }

    return snapshot.docs.map((item) =>
      mapCategory({ id: item.id, ...item.data() }),
    );
  } catch {
    return BLOG_CATEGORIES;
  }
}

export async function getBlogTagsForAdmin(): Promise<BlogTag[]> {
  try {
    const snapshot = await getDocs(collection(db, "tags"));
    if (snapshot.empty) {
      return BLOG_TAGS;
    }

    return snapshot.docs.map((item) => mapTag({ id: item.id, ...item.data() }));
  } catch {
    return BLOG_TAGS;
  }
}

export async function createBlogPostFromAdmin(payload: AdminBlogPayload) {
  const ref = doc(db, "posts", payload.id);
  await setDoc(ref, toFirestorePost(payload));
}

export async function updateBlogPostFromAdmin(
  postId: string,
  payload: AdminBlogPayload,
) {
  const ref = doc(db, "posts", postId);
  const { createdAt, ...data } = toFirestorePost(payload);
  void createdAt;
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlogPostFromAdmin(postId: string) {
  const ref = doc(db, "posts", postId);
  await deleteDoc(ref);
}

export async function createBlogAuthorFromAdmin(payload: AdminAuthorPayload) {
  const id = payload.id || `author-${slugify(payload.slug || payload.name)}`;
  const ref = doc(db, "authors", id);
  await setDoc(ref, toFirestoreAuthor({ ...payload, id }));
}

export async function updateBlogAuthorFromAdmin(
  authorId: string,
  payload: AdminAuthorPayload,
) {
  const ref = doc(db, "authors", authorId);
  const { createdAt, ...data } = toFirestoreAuthor(payload);
  void createdAt;
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlogAuthorFromAdmin(authorId: string) {
  const ref = doc(db, "authors", authorId);
  await deleteDoc(ref);
}

export async function createBlogCategoryFromAdmin(
  payload: AdminCategoryPayload,
) {
  const id = payload.id || `cat-${slugify(payload.slug || payload.name)}`;
  const ref = doc(db, "categories", id);
  await setDoc(ref, toFirestoreCategory({ ...payload, id }));
}

export async function updateBlogCategoryFromAdmin(
  categoryId: string,
  payload: AdminCategoryPayload,
) {
  const ref = doc(db, "categories", categoryId);
  const { createdAt, ...data } = toFirestoreCategory(payload);
  void createdAt;
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlogCategoryFromAdmin(categoryId: string) {
  const ref = doc(db, "categories", categoryId);
  await deleteDoc(ref);
}

export async function createBlogTagFromAdmin(payload: AdminTagPayload) {
  const id = payload.id || `tag-${slugify(payload.slug || payload.name)}`;
  const ref = doc(db, "tags", id);
  await setDoc(ref, toFirestoreTag({ ...payload, id }));
}

export async function updateBlogTagFromAdmin(
  tagId: string,
  payload: AdminTagPayload,
) {
  const ref = doc(db, "tags", tagId);
  const { createdAt, ...data } = toFirestoreTag(payload);
  void createdAt;
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlogTagFromAdmin(tagId: string) {
  const ref = doc(db, "tags", tagId);
  await deleteDoc(ref);
}
