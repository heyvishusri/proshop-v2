/**
 * Utility function to get the correct image URL
 * Handles both relative paths (/uploads/...) and absolute URLs
 * Works in both development and production environments
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/images/sample.jpg'; // fallback image
  }

  // If it's already an absolute URL (http:// or https://), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it starts with /, it's an absolute path from root - return as is
  // This works because the backend serves /uploads and /images from root
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // Otherwise, treat as relative path and prepend /
  return `/${imagePath}`;
};

