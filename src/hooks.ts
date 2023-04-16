import {useState, useEffect, CSSProperties} from 'react'

export const useAnimatedScale = (scGap : number  = 0.01, delay : number = 20) => {
    const [scale, setScale] = useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)
    return {
        scale, 
        start() {
            if (!animated) { 
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number)  => {
    const position = 'absolute'
    const background = 'purple'
    const size : number = Math.min(w, h) / 8
    return {
        lineStyle() : CSSProperties {
            const width : string = `${Math.min(w, h) / 60}px`
            const height : string = `${size}px`
            const top : string = `${(h / 2 - size) * sinify(scale)}px`
            const left : string = `${w / 2 - Math.min(w, h) / 120}px`
            return {
                width, 
                height, 
                left, 
                top, 
                background, 
                position 
            }
        }, 
        barStyle() : CSSProperties {
            const width : string = `${size}px`
            const height : string = `${size}px`
            const top : string = `${h / 2 - size / 2}px`
            const left : string = `${(w / 2 - size / 2) * (1 + sinify(scale))}px`
            return {
                width, 
                height,
                left, 
                top, 
                background,
                position 
            }
        }
    }
}