import { InputHTMLAttributes, ReactNode } from "react";
import Error from "../Error/Error";
import Label from "../Label/Label";
import { clsx } from "../../utils/utils";
import { ErrorIcon } from "../../assets/icons/icons";

type propTypes = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    name: string;
    error?: string;
    icon?: ReactNode;
    rightIcon?: ReactNode;
    disableDecimal?: boolean;
    onlyChar?: boolean;
};

const Input = (props: propTypes) => {
    const { className, icon, rightIcon, error, name, label, ...rest } = props;
    return (
        <div className={clsx("custom_input", className)}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <div className={clsx("input_in", icon && "icon_input", rightIcon && "right_icon_input", error && "error_input")}>
                {icon && <div className="input_icon">{!error ? icon : <ErrorIcon />}</div>}
                <input
                    type={"text"}
                    {...rest}
                    name={name}
                    id={name}
                    autoComplete="off"
                />
                {rightIcon && <div className="input_right_icon">{rightIcon}</div>}
            </div>
            {error && <Error>{error}</Error>}
        </div>
    );
};

export default Input;
