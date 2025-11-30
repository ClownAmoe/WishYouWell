export async function getCards(): Promise<string[]> {
  const res = await fetch("http://localhost:5000/cards");
  if (!res.ok) {
    throw new Error("Failed to fetch cards");
  }
  return res.json();
}
