import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';

const small = 'small';
const medium = 'medium';

interface CounterInterface {
    min?: number;
    max?: number;
    onIncrease?: (newValue: number) => void;
    onDecrease?: (newValue: number) => void;
    size?: 'small' | 'medium' | 'large';
    iconColor?: string;
    buttonColor?: string;
    textColor?: string;
}

const Counter = (props: CounterInterface) => {

    const [one, setOne] = useState(props?.min === undefined || props?.min < 9 ? undefined : Math.floor(props?.min / 10));
    const [two, setTwo] = useState(props?.min);
    const [curr, setCurr] = useState(props?.min ?? 0);

    const counter_par = useRef<HTMLDivElement | null>(null);
    const one_ref = useRef<any>(null);
    const two_ref = useRef<any>(null);

    const stop_animation = () => {
        const gtl = gsap.timeline();

        gtl.to(
            counter_par.current,
            {
                x: -10,
                filter: 'blur(5px)',
                duration: 0.03,
                opacity: 1
            }
        ).to(
            counter_par.current,
            {
                x: 10,
                filter: 'blur(0px)',
                duration: 0.03,
                opacity: 1
            }
        )
            .to(
                counter_par.current,
                {
                    x: -10,
                    filter: 'blur(5px)',
                    duration: 0.03,
                    opacity: 1
                }
            ).to(
                counter_par.current,
                {
                    x: 10,
                    duration: 0.03,
                    opacity: 1
                }
            )
            .to(
                counter_par.current,
                {
                    x: 0,
                    filter: 'blur(0px)',
                    duration: 0.05,
                    opacity: 1
                }
            )
    }

    const handleIncrease = () => {
        if (curr === props?.max) {
            stop_animation();
            return;
        }
        setCurr(prev => prev + 1);
        props.onIncrease?.(curr + 1);
        const gtl = gsap.timeline();

        const curr_arr = () => {
            return [two_ref.current, ...(one !== Math.floor((curr + 1) / 10) ? [one_ref.current] : [])];
        };

        gtl.to(
            curr_arr(),
            {
                scale: 0.8,
                y: -20,
                filter: 'blur(5px)',
                duration: 0.2,
                opacity: 0
            }
        ).to(
            curr_arr(),
            {
                y: 20,
                duration: 0,
                opacity: 1,
            }
        ).to(
            curr_arr(),
            {
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.3,
            }
        )
    }

    const handleDecrease = () => {
        if (curr === props?.min) {
            stop_animation();
            return;
        }
        setCurr(prev => prev - 1);
        props.onDecrease?.(curr - 1);
        const gtl = gsap.timeline();
        const curr_arr = () => {
            return [two_ref.current, ...(one !== Math.floor((curr - 1) / 10) ? [one_ref.current] : [])];
        };

        gtl.to(
            curr_arr(),
            {
                scale: 0.8,
                y: 20,
                filter: 'blur(5px)',
                duration: 0.2,
                opacity: 0
            }
        ).to(
            curr_arr(),
            {
                y: -20,
                duration: 0,
                opacity: 1,
            }
        ).to(
            curr_arr(),
            {
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.3,
            }
        )
    }

    useEffect(() => {
        if (curr <= 9) {
            setOne(undefined);
            setTwo(curr);
        } else {
            setOne(Math.floor(curr / 10));
            setTwo(Math.floor(curr % 10));
        }
    }, [curr]);

    const svg_size = props?.size === small ? '8' : props?.size === medium ? '16' : '24';

    return (
        <div
            ref={counter_par}
            style={{
                gap: props?.size === small ? '10px' : props?.size === medium ? '20px' : '32px',
                fontSize: props?.size === small ? '10px' : props?.size === medium ? '20px' : '40px',
            }}
            className={`flex counter_par flex-row font-bold`}
        >
            <Button
                buttonColor={props?.buttonColor}
                iconColor={props?.iconColor}
                size={props?.size || 'large'}
                onClick={() => handleDecrease()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={svg_size} height={svg_size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /></svg>
            </Button>
            <div
                style={{
                    width: props?.size === small ? '10px' : props?.size === medium ? '20px' : '30px',
                }}
                className={`number flex flex-row items-center justify-center text-white`}
            >
                <div
                    ref={one_ref}
                    style={{
                        ...(props?.textColor ? { color: props.textColor } : {}),
                    }}
                    className="one"
                >
                    {one}
                </div>
                <div
                    ref={two_ref}
                    style={{
                        ...(props?.textColor ? { color: props.textColor } : {}),
                    }}
                    className="two"
                >
                    {two}
                </div>
            </div>
            <Button
                buttonColor={props?.buttonColor}
                iconColor={props?.iconColor}
                size={props?.size || 'large'}
                onClick={() => handleIncrease()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={svg_size} height={svg_size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
            </Button>
        </div>
    )
}

interface ButtonInterface {
    onClick: () => void;
    size: 'small' | 'medium' | 'large';
    buttonColor?: string;
    iconColor?: string;
    children?: React.ReactNode;
}

const Button = ({ onClick, size, buttonColor, iconColor, children }: ButtonInterface) => {
    const button_size = size === small ? '20px' : size === 'medium' ? '40px' : '60px';
    const text_size = size === small ? '5px' : size === 'medium' ? '10px' : '15px';

    return (
        <motion.button
            whileTap={{
                scale: 0.75
            }}
            transition={{
                duration: 0.2,
                ease: 'linear'
            }}
            onClick={onClick}
            style={{
                height: button_size,
                width: button_size,
                fontSize: text_size,
                ...(buttonColor ? { backgroundColor: buttonColor } : {}),
                ...(iconColor ? { color: iconColor } : {}),
            }}
            className={`cursor-pointer flex justify-center items-center text-white font-bold rounded-full bg-neutral-600`}
        >
            {children}
        </motion.button>
    );
};

export default Counter