import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import MagazineReader from "@/components/magazine/MagazineReader";

export default async function MagazinePage() {
  const user = await requireAuth();

  if (!user) {
    redirect("/login");
  }
  return <MagazineReader />;
}