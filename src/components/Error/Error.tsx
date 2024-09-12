import { ReactNode, useEffect, useRef, useState } from 'react';
import { clsx } from '../../utils/utils';

const Error = (props: { children?: ReactNode, className?: string, }) => {
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(props.children ? contentRef.current.scrollHeight : 0);
        }
    }, [props.children]);

    return (
        <p
            className={clsx("error_msg", props.className)}
            ref={contentRef}
            style={{ height: `${height}px` }}
        >
            {props.children}
        </p>
    );
}

export default Error;

