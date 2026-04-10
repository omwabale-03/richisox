import axios from "axios";

const SHIPROCKET_API = "https://apiv2.shiprocket.in/v1/external";

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getShiprocketToken(): Promise<string> {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const res = await axios.post(`${SHIPROCKET_API}/auth/login`, {
    email: process.env.SHIPROCKET_EMAIL,
    password: process.env.SHIPROCKET_PASSWORD,
  });

  cachedToken = res.data.token;
  tokenExpiry = Date.now() + 9 * 24 * 60 * 60 * 1000;
  return cachedToken!;
}

export async function createShiprocketOrder(orderData: Record<string, unknown>): Promise<Record<string, unknown>> {
  const token = await getShiprocketToken();
  const res = await axios.post(`${SHIPROCKET_API}/orders/create/adhoc`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function trackShiprocketOrder(shipmentId: string): Promise<Record<string, unknown>> {
  const token = await getShiprocketToken();
  const res = await axios.get(`${SHIPROCKET_API}/courier/track/shipment/${shipmentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
