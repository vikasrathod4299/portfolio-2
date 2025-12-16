import classNames from "classnames";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface MobileMenuProps {
    children: ReactNode
    isOpen: boolean
}

export default function MobileMenu({children, isOpen}: MobileMenuProps) {
    const [isClosing, setIsClosing] = useState(false)
    const [isOpening, setIsOpening] = useState(false)
    const [isShown, setIsShown] = useState(isOpen)

    useEffect(() => { 
        let timer: ReturnType<typeof setTimeout>

        if(isOpen){
            setIsOpening(true)
            setIsShown(true)

            timer = setTimeout(() => setIsOpening(false), 300)
        }else{
            setIsClosing(true)

            timer = setTimeout(() => {
                setIsShown(false)
                setIsClosing(false)
            }, 300)
        }
        return () => clearTimeout(timer)
    },[isOpen])


    if (!isShown) return null
    
    return  (
       <div className={
        classNames('fixed z-50 top-0 mt-16 flex w-full flex-col shadow backdrop-blur-md sm:hidden',
            'border-zinc-300 bg-white bg-opacity-70', 
            'dark:border-zinc-700 dark:bg-[#18181b] dark:bg-opacity-90',
            {
                'animate-scale-in-right-reverse': isClosing,
                'animate-scale-in-right': isOpening,
            }
        )}>
           {children}
       </div> 
    )

}