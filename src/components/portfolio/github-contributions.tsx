"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import type {
  GitHubContributionData,
  GitHubContributionDay,
} from "@/lib/data/github";

function getCellClass(level: 0 | 1 | 2 | 3 | 4, isEmpty: boolean): string {
  if (isEmpty) return "bg-transparent border-transparent";
  switch (level) {
    case 1:
      return "bg-emerald-200/80 dark:bg-emerald-950 border-emerald-300/60 dark:border-emerald-900";
    case 2:
      return "bg-emerald-400 dark:bg-emerald-800 border-emerald-500/50 dark:border-emerald-700";
    case 3:
      return "bg-emerald-600 dark:bg-emerald-600 border-emerald-700/50 dark:border-emerald-500";
    case 4:
      return "bg-emerald-800 dark:bg-emerald-400 border-emerald-900/50 dark:border-emerald-300";
    default:
      return "bg-zinc-100 dark:bg-zinc-900 border-zinc-200/70 dark:border-zinc-800";
  }
}

function formatReadableDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function GitHubContributions({
  data,
  githubUrl,
}: {
  data: GitHubContributionData;
  githubUrl: string;
}) {
  const [hoveredDay, setHoveredDay] =
    React.useState<GitHubContributionDay | null>(null);

  return (
    <div className="p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-xs font-mono font-medium text-zinc-900 dark:text-zinc-100 tabular-nums">
            {data.totalLastYear.toLocaleString("id-ID")} contributions in the
            last year
          </p>
          {data.isLive && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/70 px-1.5 py-0.5 rounded-full">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span>Live</span>
            </span>
          )}
        </div>

        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <span>@{data.username}</span>
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3.5 overflow-x-auto">
        <div className="min-w-[640px] space-y-1.5">
          <div className="flex items-center pl-8 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 relative h-3.5">
            {data.months.map((month, idx) => (
              <span
                key={`${month.label}-${month.weekIndex}-${idx}`}
                style={{
                  left: `${32 + month.weekIndex * 11.5}px`,
                }}
                className="absolute top-0 whitespace-nowrap"
              >
                {month.label}
              </span>
            ))}
          </div>

          <div className="flex items-start gap-2">
            <div className="flex flex-col justify-between h-[80px] py-[11px] text-[10px] font-mono text-zinc-400 dark:text-zinc-500 select-none w-6 shrink-0">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div className="flex gap-[2.5px]">
              {data.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[2.5px]">
                  {week.map((day, dIdx) => {
                    const isEmpty = day.date === "";
                    return (
                      <button
                        key={`${wIdx}-${dIdx}`}
                        type="button"
                        disabled={isEmpty}
                        aria-label={
                          isEmpty
                            ? undefined
                            : `${day.count} contributions on ${day.date}`
                        }
                        onMouseEnter={() => {
                          if (!isEmpty) setHoveredDay(day);
                        }}
                        onFocus={() => {
                          if (!isEmpty) setHoveredDay(day);
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`size-[9px] rounded-[2px] border transition-[transform,border-color] duration-100 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 ${getCellClass(
                          day.level,
                          isEmpty
                        )} ${isEmpty ? "pointer-events-none" : "hover:scale-125"}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
        <span>
          {hoveredDay
            ? `${hoveredDay.count} contributions pada ${formatReadableDate(
                hoveredDay.date
              )}`
            : "Arahkan kursor ke kotak untuk melihat jumlah commit per tanggal"}
        </span>

        <div className="inline-flex items-center gap-1">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((lvl) => (
            <span
              key={lvl}
              className={`size-2.5 rounded-[2px] border ${getCellClass(
                lvl,
                false
              )}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
