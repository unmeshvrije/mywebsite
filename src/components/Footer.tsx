export default function Footer({ showUnYogLink = true }: { showUnYogLink?: boolean }) {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <p className="text-center text-sm text-slate-600">
        &copy; {new Date().getFullYear()} Unmesh Joshi. All rights reserved.
        {showUnYogLink && (
          <>
            {" "}&middot;{" "}
            <a href="/unyog" className="hover:text-slate-400 transition-colors">
              UnYog
            </a>
          </>
        )}
      </p>
    </footer>
  );
}
