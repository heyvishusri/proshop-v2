/**
 * Utility function to get the correct image URL
 * Handles both relative paths (/uploads/...) and absolute URLs
 * Works in both development and production environments
 * 
 * How it works:
 * - Development: Vite serves /images from public folder, proxies /uploads to backend
 * - Production: Backend serves both /uploads and /images from the same origin
 * - Paths starting with / work in both environments
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/images/sample.jpg'; // fallback image
  }

  // If it's already an absolute URL (http:// or https://), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it starts with /, it's an absolute path from root
  // In development: Vite handles /images (from public) and proxies /uploads (to backend)
  // In production: Backend serves both from the same origin
  // This works seamlessly in both environments
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // Otherwise, treat as relative path and prepend /
  // This ensures all paths are absolute and work consistently
  return `/${imagePath}`;
};

