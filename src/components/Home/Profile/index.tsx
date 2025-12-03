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
  return (
    <div
      className={classNames(
        'flex flex-grow items-center justify-center',
        height,
      )}
    >
      <div className="relative flex flex-col w-full gap-5 sm:gap-6 animate-fade-in">
        {/* Profile Image with brutalist border */}
        <div className="relative h-28 w-28 sm:h-32 sm:w-32">
          <div className="absolute inset-0 border-2 border-gray-800 dark:border-white/80 rounded-lg translate-x-2 translate-y-2" />
          <img
            src="/media/profile.jpeg"
            alt="Vikas Rathod"
            className="relative z-10 h-full w-full object-cover rounded-lg border-2 border-gray-800 dark:border-white/80 bg-white dark:bg-zinc-900"
          />
        </div>

        {/* Main heading with brutalist accent */}
        <div className="relative">
          <span className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hi, I am <span className="relative inline-block">
              Vikas
            </span>.
          </span>
        </div>

        <ReactTyped
          strings={['I build software.', 'I craft experiences.', 'I solve problems.']}
          typeSpeed={60}
          backSpeed={40}
          backDelay={2000}
          loop={true}
          showCursor={true}
          cursorChar="_"
          className="text-2xl sm:text-4xl font-mono text-gray-700 dark:text-gray-300" 
        />
        
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
          I&apos;m a software engineer with experience in delivering clean,
          elegant and efficient code.
        </p>

        {/* Brutalist buttons */}
        <div className='flex gap-4 flex-wrap'>
          <a 
            href="/blogs"
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium uppercase tracking-wider
                       border-2 border-gray-800 dark:border-white/80 bg-transparent
                       text-gray-800 dark:text-white
                       hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900
                       transition-all duration-200 active:scale-[0.98]"
          >
            <span>Blog</span>
            <IconArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button 
            onClick={() => window.open('/media/Vikas-Rathod-Resume.pdf', '_blank')} 
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium uppercase tracking-wider
                       border-2 border-gray-800 dark:border-white/80
                       bg-gray-800 dark:bg-white text-white dark:text-gray-900
                       hover:bg-transparent hover:text-gray-800 dark:hover:bg-transparent dark:hover:text-white
                       transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <span>Resume</span>
            <IconDownload size={16} className="transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>

        {/* Social icons */}
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center pt-2">
          <div className="flex gap-4">
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
