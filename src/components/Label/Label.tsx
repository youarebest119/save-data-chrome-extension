import { LabelHTMLAttributes } from "react";
import { clsx } from "../../utils/utils";

type propTypes = LabelHTMLAttributes<HTMLLabelElement> & {
}

const Label = (props: propTypes) => {
    const { className, ...rest } = props;
    return (
        <>
            <label {...rest} className={clsx("custom_label", className)}>
                {props.children}
            </label>
        </>
    )
}

export default Label
