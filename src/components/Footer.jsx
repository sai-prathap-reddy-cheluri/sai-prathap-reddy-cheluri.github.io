export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-400 flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Sai Prathap Reddy Cheluri</span>
        <div className="flex gap-4">
          <a href="https://github.com/sai-prathap-reddy-cheluri" target="_blank" className="hover:text-cyan-300">GitHub</a>
          <a href="https://www.linkedin.com/in/sai-prathap-reddy/" target="_blank" className="hover:text-cyan-300">LinkedIn</a>
          <a href="mailto:saiprath.1061@gmail.com" className="hover:text-cyan-300">Email</a>
        </div>
      </div>
    </footer>
  );
}