import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { changeAdminPassword } from "@/lib/admin-credentials";

export async function PUT(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    };
    const currentPassword = body.currentPassword ?? "";
    const newPassword = body.newPassword ?? "";
    const confirmPassword = body.confirmPassword ?? "";

    if (!currentPassword) {
      return NextResponse.json({ ok: false, error: "Password saat ini wajib diisi." }, { status: 400 });
    }
    if (!newPassword) {
      return NextResponse.json({ ok: false, error: "Password baru wajib diisi." }, { status: 400 });
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ ok: false, error: "Konfirmasi password tidak cocok." }, { status: 400 });
    }

    await changeAdminPassword(currentPassword, newPassword);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
