export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#020202] px-8 py-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-3 font-sans text-xs text-white/30 sm:flex-row">
        <p>
          created for{" "}
          <a
            href="https://github.com/raiellgod?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white/70 no-underline transition-transform duration-200 visited:text-white/70 hover:scale-105 hover:text-white/70 active:text-white/70"
          >
            <span className="border-b border-[#ff4156] pb-1 text-white/70">Raiel Godinho</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
