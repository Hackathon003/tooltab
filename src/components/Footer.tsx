export default function Footer() {
  return (
    <footer
      style={{ borderTop: "2px solid #0f0f0f" }}
      className="bg-[#0f0f0f] text-[#f5f2eb] px-4 sm:px-6 py-6 mt-auto"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-center sm:text-left">
        <span className="font-display font-bold">
          TOOL<span className="text-[#e8500a]">TAB</span>
        </span>
        <span className="text-[#9e9e8f]">Free tools, no signup needed.</span>
        <span className="text-[#9e9e8f]">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}