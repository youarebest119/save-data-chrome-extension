import { clsx } from "../../utils/utils";
import "./Spinner.scss";

const Spinner = ({ className }: { className?: string }) => {
    return (
        <div className={clsx("spinner", className)}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Spinner
