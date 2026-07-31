import { requireAdmin } from "@/lib/admin-auth";
import { getHomepageServices } from "@/lib/homepage-services";
import ServicesAdminEditor from "./ServicesAdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  await requireAdmin();
  const services = await getHomepageServices();

  return <ServicesAdminEditor initial={services} />;
}
