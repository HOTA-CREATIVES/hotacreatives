// Application-wide configuration
// Environment variables, API base URLs, feature flags, etc.

export const APP_CONFIG = {
  APP_NAME: "HOTA",
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "",
  CLOUDINARY_UPLOAD_FOLDER: import.meta.env.VITE_CLOUDINARY_UPLOAD_FOLDER || "",
  IS_PRODUCTION: import.meta.env.PROD,
} as const;
