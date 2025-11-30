export async function login(email: string, password: string) {
  const res = await fetch(`http://localhost:5000/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json(); // { token: "...", user: {...} }
}

export async function register(email: string, password: string, name: string) {
  const res = await fetch(`http://localhost:5000/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json(); // { token: "...", user: {...} }
}
