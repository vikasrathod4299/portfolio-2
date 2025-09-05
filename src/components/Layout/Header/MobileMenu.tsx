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
        if(isOpening){
            setIsOpening(true)
            setIsShown(true)

            timer = setTimeout(() => {
                setIsOpening(false)
            }, 300)
        }else{
            setIsClosing(true)
            timer = setTimeout(() => {
                setIsClosing(false)
                setIsShown(false)
            }, 300)
        }
        return () => clearTimeout(timer)
    },[isOpen])

    if(!isShown) return null

    return  (
       <div className={
        classNames('fixed z-50 mt-16 flex w-full flex-col shadow backdrop-blur-md sm:hidden',
            'border-zinc-300 bg-white bg-opacity-70', 
            'dark:border-zinc-700 dark:bg-zinc-900 dark:bg-opacity-90',
            {
                'animate-scale-in-right-reverse': isClosing,
                'animate-scale-in-right': isOpening,
            }
        )}>
           {children}
       </div> 
    )

}