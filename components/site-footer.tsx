import Link from 'next/link';
import { Icons } from "./icons";
import ToggleTheme from "./toggle-theme";

function SiteFooter() {
  return (
    <footer className="w-full max-w-6xl mx-auto flex flex-row items-center justify-between gap-4 py-4">
      <div className="flex-1 py-2">
        <p className="text-sm flex gap-x-2">
          Deploy on
          <Link
            href={'https://vercel.com'}
            target='_blank'
            className='underline'
          >
            Vercel
          </Link>
        </p>
      </div>
      <div className="flex-end justify-center flex flex-row items-center select-none">
        <ToggleTheme />
        <Link
          href={'https://github.com/rahmadnasutionn/file-flex-converter'}
          className='py-1.5 transition-colors px-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded'
        >
          <Icons.github className="w-6 h-6" />
          <span className="sr-only">Github</span>
        </Link>
      </div>
    </footer>
  );
};

export default SiteFooter;