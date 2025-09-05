import classNames from 'classnames'
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import SocialIcon from './SocialIcons'

const height = 'h-[calc[100vh-8rem]]'

const socialIcons = [
  {
    url: 'https://github.com/vikasrathod4299',
    icon: <Github />,
  },
  {
    url: 'https://linkedin.com/in/vikasrathod4299',
    icon: <Linkedin />,
  },
  {
    url: 'https://twitter.com/vikasxrathod',
    icon: <Twitter />,
  },
  {
    url: 'https://www.instagram.com/vikasxrathod/',
    icon: <Instagram />,
  },
  {
    url: 'mailto:vikas.rv4299@gmail.com',
    icon: <Mail />,
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
      <div className="flex flex-col w-full gap-4 sm:gap-5">
        <div className="h-32 w-32">
          <img
            src="/media/profile.jpg"
            alt="Vikas Rathod"
            className="h-32 w-32 rounded-full object-cover"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl">Hi, I'm Vikas.</h1>
        <h2 className="text-2xl sm:text-4xl">I build software.</h2>
        <span className="sm:text-lg">
          I&apos;m a software engineer with experience in delivering clean,
          elegant and efficent code.
        </span>
        <div>
          <button className="rounded border px-2 py-1 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 sm:text-base">
            Download Resume
          </button>
        </div>
        <div className='flex flex-col gap-4 sm:gap-5 xl:flex-row xl:items-center'>
          <div className='flex gap-5'>
            {socialIcons.map((social) => (
              <SocialIcon icon={social.icon} url={social.url} key={social.url}  />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
