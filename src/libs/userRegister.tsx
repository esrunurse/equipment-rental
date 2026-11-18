export default async function userRegister(user: {
  name: string;
  email: string;
  tel: string;
  password: string;
}) {
  const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...user, role: "member" }),
  });
  return await response.json();
}
