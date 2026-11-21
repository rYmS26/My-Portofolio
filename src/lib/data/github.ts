import { cacheLife, cacheTag } from "next/cache";

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubMonthLabel {
  label: string;
  weekIndex: number;
}

export interface GitHubContributionData {
  username: string;
  totalLastYear: number;
  weeks: GitHubContributionDay[][];
  months: GitHubMonthLabel[];
  isLive: boolean;
}

interface JogruberApiResponse {
  total?: Record<string, number>;
  contributions?: {
    date: string;
    count: number;
    level: number;
  }[];
}

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function extractGitHubUsername(githubUrl: string): string {
  const cleaned = githubUrl
    .trim()
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/^@/, "")
    .split("/")[0];

  return cleaned || "rYmS26";
}

function clampLevel(level: number): 0 | 1 | 2 | 3 | 4 {
  if (level <= 0) return 0;
  if (level === 1) return 1;
  if (level === 2) return 2;
  if (level === 3) return 3;
  return 4;
}

function buildWeeksAndMonths(days: GitHubContributionDay[]): {
  weeks: GitHubContributionDay[][];
  months: GitHubMonthLabel[];
} {
  if (days.length === 0) {
    return { weeks: [], months: [] };
  }

  const weeks: GitHubContributionDay[][] = [];
  let currentWeek: GitHubContributionDay[] = [];

  const firstDate = new Date(`${days[0].date}T00:00:00Z`);
  const leadingEmpty = Number.isNaN(firstDate.getTime())
    ? 0
    : firstDate.getUTCDay();

  for (let i = 0; i < leadingEmpty; i++) {
    currentWeek.push({ date: "", count: 0, level: 0 });
  }

  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", count: 0, level: 0 });
    }
    weeks.push(currentWeek);
  }

  const months: GitHubMonthLabel[] = [];
  let lastMonth = -1;

  weeks.forEach((week, weekIndex) => {
    const validDay = week.find((d) => d.date !== "");
    if (!validDay) return;
    const parsed = new Date(`${validDay.date}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return;
    const month = parsed.getUTCMonth();
    if (month !== lastMonth) {
      months.push({ label: SHORT_MONTHS[month], weekIndex });
      lastMonth = month;
    }
  });

  return { weeks, months };
}

function buildFallbackData(username: string): GitHubContributionData {
  const today = new Date("2026-11-20T00:00:00Z");
  const totalDays = 365;
  const days: GitHubContributionDay[] = [];

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - i);
    const iso = d.toISOString().slice(0, 10);
    days.push({ date: iso, count: 0, level: 0 });
  }

  const { weeks, months } = buildWeeksAndMonths(days);

  return {
    username,
    totalLastYear: 61,
    weeks,
    months,
    isLive: false,
  };
}

export async function getGitHubContributions(
  githubUrl: string
): Promise<GitHubContributionData> {
  "use cache";
  cacheTag("github-contributions");
  cacheLife("hours");

  const username = extractGitHubUsername(githubUrl);

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
        username
      )}?y=last`,
      {
        headers: {
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(4500),
      }
    );

    if (!response.ok) {
      return buildFallbackData(username);
    }

    const payload = (await response.json()) as JogruberApiResponse;
    if (
      !Array.isArray(payload.contributions) ||
      payload.contributions.length === 0
    ) {
      return buildFallbackData(username);
    }

    const normalizedDays: GitHubContributionDay[] = payload.contributions.map(
      (entry) => ({
        date: entry.date,
        count: entry.count,
        level: clampLevel(entry.level),
      })
    );

    const totalLastYear =
      typeof payload.total?.lastYear === "number"
        ? payload.total.lastYear
        : normalizedDays.reduce((acc, item) => acc + item.count, 0);

    const { weeks, months } = buildWeeksAndMonths(normalizedDays);

    return {
      username,
      totalLastYear,
      weeks,
      months,
      isLive: true,
    };
  } catch {
    return buildFallbackData(username);
  }
}
