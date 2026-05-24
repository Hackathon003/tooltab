"use client";
import { useState, useRef } from "react";
import AdSlot from "@/components/AdSlot";

export default function ImageCompressorClient() {
  const [original, setOriginal] = useState<{ url: string; size: number; name: string } | null>(null);
  const [compressed, setCompressed] = useState<{ url: string; size: number } | null>(null);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setOriginal({ url, size: file.size, name: file.name });
    setCompressed(null);
    compress(file, quality);
  }

  function compress(file: File, q: number) {
    setLoading(true);
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setCompressed({ url: URL.createObjectURL(blob), size: blob.size });
          setLoading(false);
        },
        "image/jpeg",
        q / 100
      );
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  function recompress() {
    if (!inputRef.current?.files?.[0]) return;
    compress(inputRef.current.files[0], quality);
  }

  function cancel() {
    setOriginal(null);
    setCompressed(null);
    setQuality(80);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <>
      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-12 flex-1">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#0f0f0f] mb-2">Image Compressor</h1>
        <p className="text-[#9e9e8f] mb-8">Compress images in your browser. No upload to any server.</p>

        <AdSlot label="Top Banner" />

        {/* Drop zone — only shows when no image selected */}
        {!original && (
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            style={{ border: "2px dashed #0f0f0f" }}
            className="rounded p-10 text-center cursor-pointer hover:border-[#e8500a] transition-colors mb-6"
          >
            <p className="font-display font-bold text-lg mb-1">Drop image here</p>
            <p className="text-[#9e9e8f] text-sm">or click to select — JPG, PNG, WebP</p>
          </div>
        )}

        {/* Hidden file input — always in DOM so ref works */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
        />

        {original && (
          <div>
            {/* File name + X cancel button */}
            <div
              style={{ border: "2px solid #0f0f0f" }}
              className="rounded flex items-center justify-between px-4 py-2 mb-6"
            >
              <span className="font-mono text-sm truncate text-[#0f0f0f]">{original.name}</span>
              <button
                onClick={cancel}
                className="ml-3 text-[#9e9e8f] hover:text-[#e8500a] font-bold text-lg leading-none transition-colors"
                aria-label="Remove image"
              >
                ✕
              </button>
            </div>

            {/* Quality slider */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-display font-bold text-sm uppercase tracking-widest">
                  Quality: {quality}%
                </label>
                <button
                  onClick={recompress}
                  className="bg-[#e8500a] text-[#f5f2eb] font-display font-bold px-5 py-2 rounded hover:bg-[#0f0f0f] transition-colors text-sm"
                >
                  Apply
                </button>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Image comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden">
                <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest flex justify-between">
                  <span>Original</span>
                  <span>{formatSize(original.size)}</span>
                </div>
                <img src={original.url} alt="Original" className="w-full object-contain max-h-48 bg-[#f5f2eb]" />
              </div>
              <div style={{ border: "2px solid #0f0f0f" }} className="rounded overflow-hidden">
                <div className="bg-[#0f0f0f] text-[#f5f2eb] px-4 py-2 font-display font-bold text-sm uppercase tracking-widest flex justify-between">
                  <span>Compressed</span>
                  <span>{compressed ? formatSize(compressed.size) : "—"}</span>
                </div>
                {loading ? (
                  <div className="flex items-center justify-center h-48 bg-[#f5f2eb] text-[#9e9e8f] font-display font-bold text-sm">
                    Compressing...
                  </div>
                ) : compressed ? (
                  <img src={compressed.url} alt="Compressed" className="w-full object-contain max-h-48 bg-[#f5f2eb]" />
                ) : null}
              </div>
            </div>

            {/* Download */}
            {compressed && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="text-sm font-mono text-[#9e9e8f]">
                  Saved {Math.round((1 - compressed.size / original.size) * 100)}% ({formatSize(original.size - compressed.size)})
                </div>
                <a
                  href={compressed.url}
                  download={original.name.replace(/\.[^.]+$/, "") + "-compressed.jpg"}
                  className="bg-[#e8500a] text-[#f5f2eb] font-display font-bold px-6 py-2 rounded hover:bg-[#0f0f0f] transition-colors text-sm"
                >
                  Download
                </a>
              </div>
            )}
          </div>
        )}

        <AdSlot label="Bottom Banner" />
      </main>
    </>
  );
}