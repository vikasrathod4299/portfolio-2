import { useTheme } from '@/context/ThemeContext';
import Giscus from '@giscus/react'
import Section from '../Home/Section';

export default function Comments() {
    const { theme } = useTheme();

    return (
        <div className='mt-16'>
            <Section label='Leave a comment'>
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
                    theme={theme === 'light' ? 'catppuccin_latte' : 'transparent_dark'}
                    lang="en"
                    loading="lazy"
                 />
            </Section>
        </div>
    )

}