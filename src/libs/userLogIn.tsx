export default async function userLogIn(userEmail: string, userPassword: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userEmail, password: userPassword }),
  });
  if (!response.ok) return null;
  const json = await response.json();
  return json.data;
}
