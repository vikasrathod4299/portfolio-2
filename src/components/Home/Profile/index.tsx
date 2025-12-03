import { useState } from 'react'
import {ReactTyped} from 'react-typed'
import classNames from 'classnames'
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  IconBrandTwitter,
  IconDownload,
  IconArrowUpRight,
} from '@tabler/icons-react'
import SocialIcon from './SocialIcons'
import SpotifyNowPlaying from './SpotifyNowPlaying'

const height = 'h-[calc(100vh-8rem)]'

const socialIcons = [
  {
    url: 'https://github.com/vikasrathod4299',
    icon: <IconBrandGithub />,
  },
  {
    url: 'https://linkedin.com/in/vikasrathod4299',
    icon: <IconBrandLinkedin />,
  },
  {
    url: 'https://twitter.com/vikasxrathod',
    icon: <IconBrandTwitter />,
  },
  {
    url: 'https://www.instagram.com/vikasxrathod/',
    icon: <IconBrandInstagram />,
  },
  {
    url: 'mailto:vikas.rv4299@gmail.com',
    icon: <IconMail />,
  },
]

export default function Profile() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      className={classNames(
        'flex flex-grow items-center justify-center',
        height,
      )}
    >
      <div className="relative flex flex-col w-full gap-4 animate-fade-in">
        {/* Profile Image with brutalist border */}
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 mb-2">
          <div className="absolute inset-0 border-2 border-gray-800 dark:border-white/80 rounded-lg translate-x-1.5 translate-y-1.5" />
          {/* Placeholder while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 z-10 rounded-lg border-2 border-gray-800 dark:border-white/80 bg-zinc-800 animate-pulse" />
          )}
          <img
            src="/media/profile.jpeg"
            alt="Vikas Rathod"
            width={112}
            height={112}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
            className={classNames(
              "relative z-10 h-full w-full object-cover rounded-lg border-2 border-gray-800 dark:border-white/80 bg-white dark:bg-zinc-900 transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {/* Main heading with brutalist accent */}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hi, I am <span className="relative inline-block">
            Vikas
            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 sm:h-1 bg-gray-800 dark:bg-white/80" />
          </span>.
        </h1>

        <ReactTyped
          strings={['I build software.', 'I craft experiences.', 'I solve problems.']}
          typeSpeed={80}
          backSpeed={40}
          backDelay={2000}
          loop={true}
          showCursor={true}
          cursorChar="_"
          className="text-xl sm:text-3xl font-mono text-gray-600 dark:text-gray-400" 
        />
        
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 max-w-md leading-relaxed">
          I&apos;m a software engineer with experience in delivering clean,
          elegant and efficient code.
        </p>

        {/* Brutalist buttons */}
        <div className='flex gap-3 flex-wrap mt-1'>
          <a 
            href="/blog"
            className="group relative inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium uppercase tracking-wider
                       border-2 border-gray-800 dark:border-white/80 bg-transparent
                       text-gray-800 dark:text-white
                       hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900
                       transition-all duration-200 active:scale-[0.98]"
          >
            <span>Blog</span>
            <IconArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button 
            onClick={() => window.open('/media/Vikas-Rathod-Resume.pdf', '_blank')} 
            className="group relative inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium uppercase tracking-wider
                       border-2 border-gray-800 dark:border-white/80
                       bg-gray-800 dark:bg-white text-white dark:text-gray-900
                       hover:bg-transparent hover:text-gray-800 dark:hover:bg-transparent dark:hover:text-white
                       transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <span>Resume</span>
            <IconDownload size={14} className="transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>

        {/* Social icons */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center mt-2">
          <div className="flex gap-3">
            {socialIcons.map((social) => (
              <SocialIcon
                icon={social.icon}
                url={social.url}
                key={social.url}
              />
            ))}
          </div>
          <SpotifyNowPlaying />
        </div>
      </div>
    </div>
  )
}
