const MONTHS_PT = {
  janeiro: 0,
  fevereiro: 1,
  marco: 2,
  março: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
};

function normalizeText(input) {
  return String(input ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function toUtcMs(year, monthIndex, day) {
  if (!Number.isFinite(year) || !Number.isFinite(monthIndex) || !Number.isFinite(day)) {
    return Number.POSITIVE_INFINITY;
  }
  const ms = Date.UTC(year, monthIndex, day);
  return Number.isFinite(ms) ? ms : Number.POSITIVE_INFINITY;
}

function parseIsoYmd(text) {
  const match = text.match(/\b(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})\b/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  return { year, month, day };
}

function parseDmy(text) {
  const match = text.match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})\b/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const yRaw = match[3];
  const year = yRaw.length === 2 ? 2000 + Number(yRaw) : Number(yRaw);
  return { year, month, day };
}

function parseDmAssumingYear(text, now) {
  const match = text.match(/\b(\d{1,2})[\/-](\d{1,2})\b/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const year = now.getUTCFullYear();
  return { year, month, day };
}

function parsePtMonthName(text, now) {
  // Example: "10 de janeiro de 2026" / "10 janeiro" / "10 de janeiro"
  const match = text.match(
    /\b(\d{1,2})\b[^a-z0-9]{0,15}(?:de\s*)?(janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)(?:\s*(?:de\s*)?(\d{4}))?/,
  );
  if (!match) return null;
  const day = Number(match[1]);
  const month = MONTHS_PT[match[2]];
  const year = match[3] ? Number(match[3]) : now.getUTCFullYear();
  return { year, month, day };
}

function parseDayList(text) {
  // Example: "01-10-15-20" or "1, 10, 15, 20"
  const tokens = text
    .split(/[^0-9]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isFinite(n));

  if (tokens.length < 2) return null;

  // Heuristic: treat as a day list if values look like days
  const dayCandidates = tokens.filter((n) => n >= 1 && n <= 31);
  if (dayCandidates.length < 2) return null;

  return Math.min(...dayCandidates);
}

/**
 * Converts a value (string/array/number) to a sortable key.
 * Returns a number where smaller means earlier. Unknown => +Infinity.
 */
export function getChronoKeyFromValue(value, now = new Date()) {
  if (value == null) return Number.POSITIVE_INFINITY;

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
  }

  if (value instanceof Date) {
    const ms = value.getTime();
    return Number.isFinite(ms) ? ms : Number.POSITIVE_INFINITY;
  }

  if (Array.isArray(value)) {
    // If it's an array of date-ish values, take the earliest
    const keys = value.map((v) => getChronoKeyFromValue(v, now)).filter(Number.isFinite);
    return keys.length ? Math.min(...keys) : Number.POSITIVE_INFINITY;
  }

  const text = normalizeText(value);
  if (!text) return Number.POSITIVE_INFINITY;

  // Priority: full dates > month names > day/month > day-list
  const iso = parseIsoYmd(text);
  if (iso) return toUtcMs(iso.year, iso.month, iso.day);

  const dmy = parseDmy(text);
  if (dmy) return toUtcMs(dmy.year, dmy.month, dmy.day);

  const ptMonthName = parsePtMonthName(text, now);
  if (ptMonthName) return toUtcMs(ptMonthName.year, ptMonthName.month, ptMonthName.day);

  const dm = parseDmAssumingYear(text, now);
  if (dm) return toUtcMs(dm.year, dm.month, dm.day);

  const dayListMin = parseDayList(text);
  if (dayListMin != null) {
    // If we only have day-of-month, keep it sortable (best-effort)
    return dayListMin;
  }

  return Number.POSITIVE_INFINITY;
}

export function sortByChrono(items, getValue) {
  const now = new Date();
  return [...items]
    .map((item, index) => ({
      item,
      index,
      key: getChronoKeyFromValue(getValue(item), now),
    }))
    .sort((a, b) => {
      if (a.key !== b.key) return a.key - b.key;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}
