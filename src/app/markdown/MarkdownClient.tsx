"use client";
import { useState } from "react";


import AdSlot from "@/components/AdSlot";

function parseMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
   .replace(/(<li>[\s\S]*<\/li>)/g, "<ul>$1</ul>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^---$/gm, "<hr/>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[a-z])(.+)$/gm, "<p>$1</p>");
}

const SAMPLE = `# Hello Markdown

Write **bold**, *italic*, or \`inline code\`.

## Lists

- Item one
- Item two
- Item three

## Links

[Visit Tooltab](https://tooltab.xyz)

> This is a blockquote.

---

Enjoy your preview!
`;

export default function MarkdownClient() {
  const [md, setMd] = useState(SAMPLE);

  return (
    <>
      
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1">
        <h1 className="font-display font-black text-4xl text-[#0f0f0f] mb-2">Markdown Previewer</h1>
        <p className="text-[#9e9e8f] mb-8">Write Markdown on the left, see the preview on the right.</p>

        <AdSlot label="Top Banner" />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-display font-bold text-sm mb-2 uppercase tracking-widest">Markdown</label>
            <textarea
              value={md}
              onChange={(e) => setMd(e.target.value)}
              rows={24}
              style={{ border: "2px solid #0f0f0f" }}
              className="w-full p-4 rounded font-mono text-sm bg-[#f5f2eb] resize-none focus:outline-none focus:border-[#e8500a]"
            />
          </div>
          <div>
            <label className="block font-display font-bold text-sm mb-2 uppercase tracking-widest">Preview</label>
            <div
              style={{ border: "2px solid #0f0f0f" }}
              className="rounded p-4 min-h-[400px] prose prose-sm max-w-none bg-white"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(md) }}
            />
          </div>
        </div>

        <AdSlot label="Bottom Banner" />
      </main>
      
    </>
  );
}