import Giscus from '@giscus/react'
import classNames from 'classnames'

export default function Comments() {
    const theme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light'

    return (
        <div className='mt-16'>
            <h1 className={classNames(
                'mb-5 flex items-center gap-5 sm:text-4xl',
                'after:block after:h-px after:flex-1 after:bg-zinc-200 dark:after:bg-zinc-700',
                'before:hidden before:h-px before:bg-zinc-200 dark:before:bg-zinc-700 sm:before:block sm:before:w-10'
            )}>
               Leave a comment
            </h1>
            <Giscus 
                repo={'vikasrathod4299/portfolio-2'}
                repoId='R_kgDOPqfWJA'
                category='General'
                categoryId='DIC_kwDOPqfWJM4CxDVx'
                mapping="pathname"
                strict="0"
                reactionsEnabled="0"        
                emitMetadata="0"
                inputPosition="top"
                theme={theme === 'light' ? 'catppuccin_latte' : 'catppuccin_mocha'}
                lang="en"
                loading="lazy"
             />
        </div>
    )

}