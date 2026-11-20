import * as React from "react";
import { Terminal } from "lucide-react";

interface ParsedBlock {
  type: "h2" | "h3" | "code" | "paragraph";
  text: string;
  language?: string;
  id?: string;
}

export function extractHeadings(markdown: string): { id: string; text: string }[] {
  const lines = markdown.split("\n");
  const headings: { id: string; text: string }[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      const cleanText = trimmed.replace(/^#{2,3}\s+/, "");
      const id = cleanText
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      headings.push({ id, text: cleanText });
    }
  }

  return headings;
}

function parseTechnicalMarkdown(markdown: string): ParsedBlock[] {
  const lines = markdown.split("\n");
  const blocks: ParsedBlock[] = [];
  let inCodeBlock = false;
  let codeLanguage = "sql";
  let codeLines: string[] = [];
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({
        type: "paragraph",
        text: paragraphLines.join(" ").trim(),
      });
      paragraphLines = [];
    }
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (trimmed.startsWith("```")) {
      flushParagraph();
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = trimmed.replace("```", "").trim() || "text";
        codeLines = [];
      } else {
        blocks.push({
          type: "code",
          language: codeLanguage,
          text: codeLines.join("\n"),
        });
        inCodeBlock = false;
        codeLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    if (trimmed === "") {
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      const text = trimmed.replace(/^###\s+/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      blocks.push({ type: "h3", text, id });
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      const text = trimmed.replace(/^##\s+/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      blocks.push({ type: "h2", text, id });
      continue;
    }

    paragraphLines.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

function renderInlineCode(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={idx}
          className="font-mono text-xs bg-zinc-100 text-zinc-900 border border-zinc-200/80 px-1.5 py-0.5 rounded-md"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export function NoteContentRenderer({ content }: { content: string }) {
  const blocks = parseTechnicalMarkdown(content);

  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              id={block.id}
              className="text-lg font-semibold tracking-tight text-zinc-900 pt-3 border-b border-zinc-100 pb-2 scroll-mt-20"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3
              key={index}
              id={block.id}
              className="text-sm font-semibold text-zinc-900 pt-2 scroll-mt-20"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "code") {
          return (
            <div
              key={index}
              className="rounded-xl overflow-hidden border border-zinc-200/80 bg-zinc-950 text-zinc-100 shadow-xs"
            >
              <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <Terminal className="size-3.5 text-zinc-400" aria-hidden="true" />
                  <span>snippet.{block.language}</span>
                </span>
                <span className="uppercase">{block.language}</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed tabular-nums">
                <code>{block.text}</code>
              </pre>
            </div>
          );
        }

        return (
          <p
            key={index}
            className="text-sm leading-relaxed text-zinc-600 text-pretty"
          >
            {renderInlineCode(block.text)}
          </p>
        );
      })}
    </div>
  );
}
