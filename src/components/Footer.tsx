export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <p className="text-center text-sm text-slate-600">
        &copy; {new Date().getFullYear()} Unmesh Joshi. All rights reserved.
      </p>
    </footer>
  );
}
