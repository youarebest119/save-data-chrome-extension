import * as Yup from "yup";
type ClassValue = string | number | boolean | undefined | null;

function clsx(...args: ClassValue[]): string {
    return args
        .filter(Boolean)
        .map(arg => String(arg))
        .join(' ');
}

export { clsx, Yup };
