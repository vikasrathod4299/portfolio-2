import {ReactTyped} from 'react-typed'
import classNames from 'classnames'
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  IconBrandTwitter,
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
      <div className="relative flex flex-col w-full gap-4 sm:gap-5 animate-fade-in">
        <div className="h-32 w-32">
          {/* Halo (behind) */}
           <div className="pointer-events-none absolute inset-0 -z-10">
            <span
              className="absolute left-1/6 top-1/7 -translate-x-1/2 -translate-y-1/2
                     w-40 h-40 rounded-full bg-sky-200/20 blur-2xl mix-blend-screen sm:left-1/11"
            ></span>
            {/* <span
              className="absolute left-1/2 top-1/2 translate-x-6 -translate-y-40
                     w-56 h-56 rounded-full bg-purple-600/20 blur-3xl mix-blend-screen"
            ></span>
            <span
              className="absolute left-1/2 top-1/2 translate-x-12 -translate-y-40
                     w-72 h-72 rounded-full bg-orange-400/15 blur-[90px] mix-blend-screen"
            ></span> */}
          </div>  

          {/* Image (in front) */}
          <img
            src="/media/profile.jpeg"
            alt="Vikas Rathod"
            className="rounded-full object-cover"
          />
        </div>

        <span className="mt-6 text-4xl sm:text-5xl ">
          Hi, I am Vikas.
        </span>

        {/* do not animate this section only  */}
        <ReactTyped
          strings={['I build software.']}
          typeSpeed={60}
          backSpeed={40}
          showCursor={true}
          className="text-2xl sm:text-4xl" // do not animate-fade-in this section
        />
        <span className="sm:text-lg">
          I&apos;m a software engineer with experience in delivering clean,
          elegant and efficent code.
        </span>
        <div>
          <button className="flex items-center gap-4 rounded border px-2 py-1 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 sm:text-base">
            <span>Download Resume </span>
          </button>
        </div>
        <div className="flex flex-col gap-4 sm:gap-5 xl:flex-row xl:items-center">
          <div className="flex gap-5">
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
