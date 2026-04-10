import { NextResponse } from "next/server";

export function ok(data: unknown, message = "Success") {
  return NextResponse.json({ success: true, data, message }, { status: 200 });
}

export function created(data: unknown, message = "Created") {
  return NextResponse.json({ success: true, data, message }, { status: 201 });
}

export function err(message = "Internal Server Error", status = 500) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function badRequest(message = "Bad Request") {
  return NextResponse.json({ success: false, error: message }, { status: 400 });
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ success: false, error: message }, { status: 401 });
}

export function forbidden(message = "Forbidden") {
  return NextResponse.json({ success: false, error: message }, { status: 403 });
}

export function notFound(message = "Not Found") {
  return NextResponse.json({ success: false, error: message }, { status: 404 });
}
