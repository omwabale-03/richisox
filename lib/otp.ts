import axios from "axios";

interface OTPEntry {
  otp: string;
  expiresAt: number;
}

const otpStore = new Map<string, OTPEntry>();

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(mobile: string, otp: string): void {
  otpStore.set(mobile, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });
}

export function verifyOTP(mobile: string, otp: string): boolean {
  const entry = otpStore.get(mobile);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(mobile);
    return false;
  }
  if (entry.otp !== otp) return false;
  otpStore.delete(mobile);
  return true;
}

export async function sendOTP(mobile: string, otp: string): Promise<void> {
  const authKey = process.env.MSG91_AUTH_KEY;

  if (!authKey) {
    console.log(`[DEV] OTP for ${mobile}: ${otp}`);
    return;
  }

  const templateId = process.env.MSG91_TEMPLATE_ID;
  const senderId = process.env.MSG91_SENDER_ID || "RICHYX";

  await axios.post(
    "https://api.msg91.com/api/v5/otp",
    {
      template_id: templateId,
      mobile: `91${mobile}`,
      authkey: authKey,
      otp,
    },
    {
      headers: {
        "Content-Type": "application/json",
        authkey: authKey,
      },
      params: {
        otp,
        mobile: `91${mobile}`,
        authkey: authKey,
        template_id: templateId,
        sender: senderId,
      },
    }
  );
}
