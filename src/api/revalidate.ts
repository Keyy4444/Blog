import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { tags } = req.body;

    if (tags.includes("posts")) {
      await res.revalidate("/posts");
    }

    return res.json({ revalidated: true });
  } catch (err) {
    console.error("Revalidation error:", err);
    return res.status(500).json({ message: "Error revalidating" });
  }
}
