import { APP_CONFIG } from "@/config";

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

async function uploadImageToCloudinary(
  file: File,
  folder?: string,
): Promise<string> {
  if (!APP_CONFIG.CLOUDINARY_CLOUD_NAME) {
    throw new Error("Missing VITE_CLOUDINARY_CLOUD_NAME in environment.");
  }

  if (!APP_CONFIG.CLOUDINARY_UPLOAD_PRESET) {
    throw new Error("Missing VITE_CLOUDINARY_UPLOAD_PRESET in environment.");
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${APP_CONFIG.CLOUDINARY_CLOUD_NAME}/image/upload`;
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", APP_CONFIG.CLOUDINARY_UPLOAD_PRESET);

  const selectedFolder = folder || APP_CONFIG.CLOUDINARY_UPLOAD_FOLDER;
  if (selectedFolder) {
    body.append("folder", selectedFolder);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(
      `Cloudinary upload failed: ${errText || response.statusText}`,
    );
  }

  const data = (await response.json()) as CloudinaryUploadResult;
  if (!data?.secure_url) {
    throw new Error("Cloudinary upload did not return a secure URL.");
  }

  return data.secure_url;
}

export async function uploadProfileImageToCloudinary(
  file: File,
): Promise<string> {
  return uploadImageToCloudinary(file, APP_CONFIG.CLOUDINARY_UPLOAD_FOLDER);
}

export async function uploadBlogImageToCloudinary(file: File): Promise<string> {
  return uploadImageToCloudinary(file, "blog-posts");
}
