export default function AdSlot({ label = "Advertisement" }: { label?: string }) {
  if (process.env.NODE_ENV === "production") {
    return <div className="my-6" />;
  }
  return (
    <div
      style={{ border: "2px dashed #9e9e8f" }}
      className="w-full flex items-center justify-center text-[#9e9e8f] text-xs font-body py-8 my-6 rounded"
    >
      [ {label} — Adsterra slot ]
    </div>
  );
}