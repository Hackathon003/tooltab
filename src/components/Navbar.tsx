"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const tools = [
  { href: "/diff", label: "Text Diff" },
  { href: "/timezone", label: "Timezone" },
  { href: "/wordcount", label: "Word Counter" },
  { href: "/password", label: "Password" },
  { href: "/json-formatter", label: "JSON Formatter" },
  { href: "/lorem-ipsum", label: "Lorem Ipsum" },
  { href: "/uuid", label: "UUID Generator" },
  { href: "/timestamp", label: "Timestamp" },
  { href: "/base64", label: "Base64" },
  { href: "/urlencode", label: "URL Encoder" },
  { href: "/hex-to-rgb", label: "HEX to RGB" },
  { href: "/unit-converter", label: "Unit Converter" },
  { href: "/markdown", label: "Markdown" },
  { href: "/regex", label: "Regex Tester" },
  { href: "/qr-code", label: "QR Code" },
  { href: "/image-compressor", label: "Image Compressor" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
        <header
          style={{
            borderBottom: "2px solid #0f0f0f",
            background: "#f5f2eb",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              fontWeight: 900,
              fontSize: "20px",
              letterSpacing: "-0.5px",
              color: "#0f0f0f",
              textDecoration: "none",
            }}
          >
            TOOL<span style={{ color: "#e8500a" }}>TAB</span>
          </Link>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open tools menu"
            style={{
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#0f0f0f",
              padding: "8px 4px",
              // Larger tap target for mobile
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Tools ▾
          </button>
        </header>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 98,
          }}
        />
      )}

      {/* Drawer — uses min() so it never exceeds 85vw on small phones */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "min(240px, 85vw)",
          height: "100vh",
          background: "#f5f2eb",
          borderLeft: "2px solid #0f0f0f",
          zIndex: 99,
          overflowY: "auto",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            borderBottom: "2px solid #0f0f0f",
          }}
        >
          <span
            style={{
              fontWeight: 900,
              fontSize: "13px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Tools
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: 700,
              minHeight: "44px",
              minWidth: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "14px 16px",
              fontSize: "14px",
              color: "#0f0f0f",
              textDecoration: "none",
              borderBottom: "1px solid rgba(15,15,15,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "#0f0f0f";
              (e.target as HTMLElement).style.color = "#f5f2eb";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "";
              (e.target as HTMLElement).style.color = "#0f0f0f";
            }}
          >
            {tool.label}
          </Link>
        ))}
      </div>
    </>
  );
}