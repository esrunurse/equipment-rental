export default function imageUrl(path: string) {
  if (!path) return "";
  const backendOrigin = process.env.BACKEND_URL?.replace(/\/api\/v1\/?$/, "");
  return `${backendOrigin}${path}`;
}
