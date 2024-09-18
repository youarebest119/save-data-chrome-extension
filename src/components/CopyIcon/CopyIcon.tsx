import { motion } from "framer-motion";
import { useState } from "react";

const CopyIcon = ({ value }: { value?: string }) => {
    const variants = {
        hidden: {
            pathLength: 0,
        },
        visible: {
            pathLength: 1,
            transition: {
                duration: 0.3,
            },
        },
        hover: {
            pathLength: [0, 1],
            transition: {
                duration: 0.4,
            },
        },
    };

    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        if (value) {
            setCopied(true);
            navigator.clipboard.writeText(value).then(() => { }).catch(err => {
                console.error('Could not copy text: ', err);
            });

            setTimeout(() => {
                setCopied(false);
            }, 1000);
        }
    };

    return (
        <>
            <motion.button
                onClick={handleClick}
                className="copy-icon"
                whileHover={!copied ? "hover" : ""}
                initial="hidden"
                animate="visible"
                title="Copy"
            >
                {!copied ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <motion.rect
                            variants={variants}
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            ry="2"
                            stroke="currentColor"
                        />
                        <motion.path
                            variants={variants}
                            d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                            stroke="currentColor"
                        />
                    </svg>
                ) : (
                    <svg
                        width={24}
                        height={24}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <motion.path
                            variants={variants}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                            stroke="currentColor"
                        />
                    </svg>
                )}
            </motion.button>
        </>
    );
};

export default CopyIcon;
