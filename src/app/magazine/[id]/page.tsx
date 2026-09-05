import { redirect, notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { hasUserPaidForMagazine } from "@/lib/order";

import MagazineReader from "@/components/magazine/MagazineReader";
import MagazinePayment from "@/components/payment/MagazinePayment";
interface MagazinePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MagazinePage({
  params,
}: MagazinePageProps) {
  const { id } = await params;

  // Only one magazine currently exists
  if (id !== "latest") {
    notFound();
  }

  // --------------------------------------------------
  // 1. Check authentication
  // --------------------------------------------------

  const user = await getCurrentUser();

  if (!user) {
    redirect(
      `/login?redirect=${encodeURIComponent(
        `/magazine/${id}`
      )}`
    );
  }

  // --------------------------------------------------
  // 2. Check whether this user already paid
  // --------------------------------------------------

  const hasPaid = await hasUserPaidForMagazine(
    user.id,
    "latest"
  );

  // --------------------------------------------------
  // 3. Already paid → show magazine
  // --------------------------------------------------

  if (hasPaid) {
    return <MagazineReader />;
  }

  // --------------------------------------------------
  // 4. Logged in but hasn't paid → show payment
  // --------------------------------------------------

  return (
    <MagazinePayment
      magazineId="latest"
      price={100}
    />
  );
}