import { redirect } from "next/navigation";
import { projects } from "@/lib/site";

export default async function WorkCompat({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const fallback = projects[0]?.slug ?? "house-of-four-courts";
  const safe = projects.some((project) => project.slug === slug) ? slug! : fallback;
  redirect(`/work/${safe}`);
}
