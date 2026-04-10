import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Address from "@/models/Address";
import { ok, unauthorized, badRequest, err } from "@/lib/response";

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return unauthorized();

    await connectDB();
    const addresses = await Address.find({ userId: user.userId });
    return ok(addresses);
  } catch {
    return err("Failed to fetch addresses");
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return unauthorized();

    await connectDB();
    const body = await req.json();

    if (body.isDefault) {
      await Address.updateMany({ userId: user.userId }, { isDefault: false });
    }

    const address = await Address.create({ ...body, userId: user.userId });
    return ok(address, "Address saved");
  } catch {
    return err("Failed to save address");
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return unauthorized();

    await connectDB();
    const { searchParams } = new URL(req.url);
    const addressId = searchParams.get("id");
    if (!addressId) return badRequest("Address ID required");

    await Address.findOneAndDelete({ _id: addressId, userId: user.userId });
    return ok(null, "Address deleted");
  } catch {
    return err("Failed to delete address");
  }
}
