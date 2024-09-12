import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "../../utils/utils";
import Spinner from "../Spinner/Spinner";
import "./Button.scss"

type propTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
    fluid?: boolean;
    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, propTypes>(({ loading, disabled, fluid, className, children, ...rest }, ref) => {
    return (
        <button
            type="button"
            {...rest}
            ref={ref}
            disabled={loading || disabled}
            className={clsx(className, fluid && "w-100", "custom_btn")}
        >
            <div className={clsx("loading", loading ? "active" : "")}><Spinner /></div>
            {children}
        </button>
    );
}
);

export default Button;
