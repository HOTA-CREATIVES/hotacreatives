# Firestore Schema

This document describes the Firestore collections used by the HOTA Creatives app and the data shape expected by the blog service and security rules.

## Overview

Implemented collections:

- `admins`
- `settings`
- `admin_audit_logs`
- `blog_posts`
- `blog_authors`
- `blog_categories`
- `blog_tags`

Planned collection referenced in the blog analysis notes but not yet wired into the current rules or service layer:

- `blog_newsletter_subscribers`

## Access Model

- Public read: `blog_posts`, `blog_authors`, `blog_categories`, `blog_tags`
- Admin-only read/write: `settings`, `admin_audit_logs`
- Admin-only write and admin-read: `admins`
- Default deny for all other documents

## Collection Schemas

### `admins/{uid}`

Stores elevated identities used by the security rules.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `uid` | string | yes | Must match the document id. |
| `role` | string | yes | Must remain unchanged on client updates; expected value is `admin`. |
| `isActive` | boolean | yes | Must remain unchanged on client updates. |
| `createdAt` | timestamp | no | Usually set by trusted server tooling. |
| `updatedAt` | timestamp | no | Usually set by trusted server tooling. |

### `settings/{docId}`

Shared admin configuration document(s).

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | recommended | If present, should mirror the document id. |
| `updatedAt` | timestamp | no | Useful for auditability. |
| `createdAt` | timestamp | no | Optional metadata. |
| other fields | mixed | optional | No fixed shape is enforced in the current rules. |

### `admin_audit_logs/{logId}`

Immutable audit trail for admin-sensitive actions.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `action` | string | yes | Example: `create_post`, `update_author`. |
| `actorUid` | string | yes | Admin user who performed the action. |
| `targetType` | string | yes | Example: `blog_posts`, `blog_authors`. |
| `targetId` | string | yes | Document that was affected. |
| `payload` | object | no | Optional snapshot of the change. |
| `createdAt` | timestamp | yes | Immutable once written. |

### `blog_authors/{authorId}`

Author profile documents used in blog pages and author listings.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | yes | Usually matches the document id. |
| `name` | string | yes | Display name. |
| `slug` | string | yes | Used for author pages and queries. |
| `avatar` | string | yes | Profile image URL. |
| `role` | string | yes | Short role/title. |
| `bio` | string | yes | Long-form bio. |
| `socialLinks` | object | no | May include `twitter`, `linkedin`, `instagram`, `website`. |
| `isActive` | boolean | no | Used by admin tooling and visibility controls. |
| `nameLower` | string | no | Search helper field. |
| `searchTokens` | string[] | no | Search helper field. |
| `createdAt` | timestamp | no | Set by admin writes. |
| `updatedAt` | timestamp | no | Set by admin writes. |

### `blog_categories/{categoryId}`

Category taxonomy for grouping posts.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | yes | Usually matches the document id. |
| `name` | string | yes | Display name. |
| `slug` | string | yes | Used for category pages and queries. |
| `description` | string | yes | Category summary. |
| `color` | string | yes | Accent color used in the UI. |
| `sortOrder` | number | no | Admin ordering hint. |
| `isActive` | boolean | no | Used by admin tooling and visibility controls. |
| `nameLower` | string | no | Search helper field. |
| `searchTokens` | string[] | no | Search helper field. |
| `createdAt` | timestamp | no | Set by admin writes. |
| `updatedAt` | timestamp | no | Set by admin writes. |

### `blog_tags/{tagId}`

Post tags used for filtering and article metadata.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | yes | Usually matches the document id. |
| `name` | string | yes | Display name. |
| `slug` | string | yes | Used for tag labels and search. |
| `isActive` | boolean | no | Used by admin tooling. |
| `nameLower` | string | no | Search helper field. |
| `searchTokens` | string[] | no | Search helper field. |
| `createdAt` | timestamp | no | Set by admin writes. |
| `updatedAt` | timestamp | no | Set by admin writes. |

### `blog_posts/{postId}`

Primary content documents for the blog.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | yes | Usually matches the document id. |
| `schemaVersion` | number | yes | Current admin payload uses `2`. |
| `status` | string | yes | Expected values: `draft`, `published`, `archived`. |
| `title` | string | yes | Post title. |
| `slug` | string | yes | Unique URL slug. |
| `metaDescription` | string | yes | SEO description. |
| `excerpt` | string | yes | Short preview text. |
| `coverImage` | string | yes | Hero image URL. |
| `coverImageAlt` | string | yes | Accessible alt text. |
| `featured` | boolean | yes | Used for homepage and listing prioritization. |
| `readTime` | number | yes | Estimated reading time in minutes. |
| `relatedPostIds` | string[] | yes | Related blog document ids. |
| `content` | array | yes | Rich content blocks. |
| `authorId` | string | yes | Author document id. |
| `authorSlug` | string | yes | Duplicate lookup field for queries. |
| `authorName` | string | yes | Duplicate lookup field for queries and display. |
| `categoryId` | string | yes | Category document id. |
| `categorySlug` | string | yes | Duplicate lookup field for queries. |
| `categoryName` | string | yes | Duplicate lookup field for queries and display. |
| `tagIds` | string[] | yes | Tag document ids. |
| `tagSlugs` | string[] | yes | Duplicate lookup field for queries. |
| `authorSnapshot` | object | yes | Denormalized author snapshot. |
| `categorySnapshot` | object | yes | Denormalized category snapshot. |
| `tagSnapshots` | object[] | yes | Denormalized tag snapshots. |
| `author` | object | yes | Full embedded author object. |
| `category` | object | yes | Full embedded category object. |
| `tags` | object[] | yes | Full embedded tag objects. |
| `publishDate` | string | yes | ISO date string. |
| `publishedAt` | string | yes | Alias used by older reads. |
| `searchTokens` | string[] | yes | Search helper tokens. |
| `stats` | object | yes | Currently uses `viewCount` and `shareCount`. |
| `updatedAt` | timestamp | yes | Last update timestamp. |
| `createdAt` | timestamp | yes | Creation timestamp. |

#### `content` block shape

The `content` array contains rich content blocks with these block types:

- `paragraph`
- `heading`
- `image`
- `quote`
- `code`
- `callout`
- `video`
- `list`

Common block fields:

- `content`: string
- `id`: string for headings
- `level`: `2` or `3` for headings
- `src`: image URL
- `alt`: image alt text
- `caption`: image caption
- `language`: code block language
- `calloutType`: `info`, `warning`, `tip`, or `note`
- `videoUrl`: video URL
- `items`: string array for lists
- `ordered`: boolean for lists

## Relationships

- `blog_posts.authorId` points to `blog_authors/{authorId}`.
- `blog_posts.categoryId` points to `blog_categories/{categoryId}`.
- `blog_posts.tagIds` points to `blog_tags/{tagId}`.
- `blog_posts.relatedPostIds` points to other `blog_posts/{postId}` documents.

## Query Support

The blog service expects these common queries:

- Published posts ordered by `publishDate desc`.
- Featured post filtered by `featured == true`.
- Posts filtered by `authorSlug`.
- Posts filtered by `categorySlug`.
- Posts searched by `searchTokens`.
- Related posts fetched by document ids.

Suggested composite indexes:

- `status ASC, publishDate DESC`
- `status ASC, categorySlug ASC, publishDate DESC`
- `status ASC, featured ASC, publishDate DESC`
- `status ASC, searchTokens ARRAY, publishDate DESC`

## Notes

- The app keeps both normalized references and denormalized snapshots in `blog_posts` so listing pages can render without extra joins.
- Slugs should remain unique for posts, authors, categories, and tags.
- `blog_newsletter_subscribers` is a planned extension mentioned in the analysis notes, but it is not currently part of the rules or service layer.