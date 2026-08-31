/**
 * payment.ts
 * ------------------------------------------------------------------
 * Shared UPI payment configuration + deep-link builder.
 *
 * This app accepts payments on the owner's personal PhonePe UPI handle.
 * A dynamic QR / deep link is built from the standard NPCI "upi://pay"
 * spec. When the customer scans it (or taps the pay link) with any UPI
 * app (PhonePe, GPay, Paytm, ...), the amount is pre-filled because we
 * include the "am" parameter.
 *
 * See: https://business.phonepe.com/payment-gateway (Dynamic QR / UPI Intent)
 * ------------------------------------------------------------------
 */

/** Payee Virtual Payment Address (this owner's PhonePe UPI ID). */
export const UPI_ID = "9790933818@ybl";

/** Payee display name shown inside the UPI app. */
export const UPI_PAYEE_NAME = "ByteCraft";

/** Payee name as shown alongside the QR image. */
export const UPI_DISPLAY_NAME = "PhonePe";

/** Merchant category code (optional, improves identification in some apps). */
export const UPI_MERCHANT_CODE = "0000";

export interface UpiUriOptions {
  /** Payee VPA. Defaults to UPI_ID. */
  vpa?: string;
  /** Payee name. Defaults to UPI_PAYEE_NAME. */
  name?: string;
  /** Payment amount in rupees (will be serialised with two decimals). */
  amount: number;
  /** Free-form transaction note (e.g. plan name). */
  note?: string;
  /** Transaction reference id. */
  tr?: string;
  /** Merchant category code. Defaults to UPI_MERCHANT_CODE. */
  mc?: string;
}

/**
 * Build a compliant `upi://pay?...` deep link / QR payload.
 *
 * The "am" value MUST be a two-decimal string so UPI apps lock the amount
 * instead of leaving it editable. Omitting "am" would let the payer choose
 * any amount.
 */
export function buildUpiUri(opts: UpiUriOptions): string {
  const params: Array<[string, string]> = [
    ["pa", opts.vpa ?? UPI_ID],
    ["pn", opts.name ?? UPI_PAYEE_NAME],
    ["am", opts.amount.toFixed(2)],
    ["cu", "INR"],
  ];
  if (opts.note) params.push(["tn", opts.note]);
  if (opts.tr) params.push(["tr", opts.tr]);
  params.push(["mc", opts.mc ?? UPI_MERCHANT_CODE]);

  return (
    "upi://pay?" +
    params.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&")
  );
}

/** WhatsApp number used for completed-payment notifications. */
export const WHATSAPP_NUMBER = "919790933818";
