/**
 * UpiQr.tsx
 * ------------------------------------------------------------------
 * Renders a dynamic UPI QR code for a given amount. The QR encodes a
 * standard `upi://pay?...&am=AMOUNT...` deep link, so scanning it with
 * any UPI app (PhonePe, GPay, Paytm, ...) opens with the amount
 * already filled in.
 * ------------------------------------------------------------------
 */
"use client";

import { useEffect, useMemo, useState } from "react";

import { buildUpiUri } from "@/lib/payment";

export function UpiQr({
  amount,
  note,
  size = 196,
}: {
  amount: number;
  note?: string;
  size?: number;
}) {
  const uri = useMemo(() => buildUpiUri({ amount, note }), [amount, note]);
  const [data, setData] = useState<{ uri: string; src: string } | null>(null);
  const [failed, setFailed] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    // Lazy-load qrcode only when the QR is about to be shown.
    import("qrcode")
      .then(({ default: QRCode }) =>
        QRCode.toDataURL(uri, {
          width: size,
          margin: 1,
          color: { dark: "#0f0f11", light: "#ffffff" },
        })
      )
      .then((url) => alive && setData({ uri, src: url }))
      .catch(() => alive && setFailed(uri));

    return () => {
      alive = false;
    };
  }, [uri, size]);

  const src = data?.uri === uri ? data.src : null;

  if (failed === uri) {
    return <p className="text-sm text-faint">QR unavailable.</p>;
  }

  if (!src) {
    return (
      <div
        style={{ width: size, height: size }}
        className="animate-pulse rounded bg-surface"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={size}
      height={size}
      alt="Dynamic UPI QR code with pre-filled amount"
      className="rounded"
    />
  );
}
