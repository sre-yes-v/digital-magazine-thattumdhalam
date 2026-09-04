export function normalizeIndianPhone(value: string): string | null {
  if (typeof value !== "string") {
    return null;
  }

  // Remove spaces, brackets, hyphens, etc.
  // Keep only digits and an optional +
  const cleaned = value.replace(/[^\d+]/g, "");

  let digits: string;

  // +919876543210
  if (cleaned.startsWith("+91")) {
    digits = cleaned.slice(3);
  }
  // 919876543210
  else if (cleaned.startsWith("91")) {
    digits = cleaned.slice(2);
  }
  // 9876543210
  else {
    digits = cleaned;
  }

  // Only digits from this point
  digits = digits.replace(/\D/g, "");

  // Valid Indian mobile numbers start with 6, 7, 8 or 9
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return null;
  }

  return `+91${digits}`;
}