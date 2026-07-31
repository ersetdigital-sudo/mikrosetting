import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getHomepageServices, saveHomepageServices } from "@/lib/homepage-services";

async function guard() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;

  try {
    const services = await getHomepageServices();
    return NextResponse.json({ ok: true, services });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const body = (await request.json()) as { services?: unknown };
    const services = await saveHomepageServices(body.services ?? []);
    revalidatePath("/");
    revalidatePath("/admin/homepage");
    return NextResponse.json({ ok: true, services });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const status = message.includes("wajib") || message.includes("maksimal") || message.includes("tidak valid") ? 400 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
