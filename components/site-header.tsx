import Link from 'next/link'
import ToggleTheme from './toggle-theme'

import ReactTooltip from './ui/tooltip'
import { Icons } from './icons'

function SiteHeader() {
  return (
    <header className='sticky top-0 left-0 z-50 w-full max-w-full h-[72px] py-3 bg-header'>
      <div className="flex flex-row justify-between items-center max-w-6xl gap-2 h-full mx-auto">
        <Link
          href={'/'}
          className='lg:text-xl inline-flex p-3 rounded text-sm transition-colors hover:bg-zinc-50 outline-none dark:hover:bg-zinc-800'
        >
          FileFlexConverter
        </Link>
        <div className="flex flex-row flex-end items-center h-full">
          <Link
            href={'/about'}
            className='text-sm font-normal py-1.5 px-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded'
          >
            About
          </Link>

          <Link
            id='github'
            href={'https://github.com/rahmadnasutionn/file-flex-converter'}
            className='text-sm font-normal py-1.5 px-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded transition-colors'
          >
            <Icons.github className='w-5 h-5' />
            <span className="sr-only">Github Icon</span>

          </Link>
          <ReactTooltip anchorSelect='#github' place='bottom'>
            Github
          </ReactTooltip>

          <ToggleTheme />

          <ReactTooltip
            anchorSelect='#toggle-theme'
            place='bottom'
          >
            Toggle Theme
          </ReactTooltip>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader