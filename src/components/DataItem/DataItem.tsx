import { useState } from 'react';
import { DeleteIcon, EyeClosed, EyeOpen } from '../../assets/icons/icons';
import CopyIcon from '../CopyIcon/CopyIcon';

type PropTypes = {
    title: string;
    value: string;
    handleDelete: () => void,
}

const DataItem = ({ title, handleDelete, value }: PropTypes) => {
    const [show, setShow] = useState(false);
    return (
        <div className="data_list_item">
            <div className="data_list_item_left">
                <h3 title={title}>{title}</h3>
                <p {...(show ? { title: value } : {})}>{show ? value : "••••••••••"}</p>
            </div>
            <div className="data_list_item_right">
                <button title="show/hide" type="button" onClick={() => setShow(!show)}>
                    {!show ? <EyeClosed /> : <EyeOpen />}
                </button>
                {/* <button type="button"><PenIcon /></button> */}
                <CopyIcon value={value} />
                <button title="Delete" type="button" onClick={handleDelete}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}

export default DataItem
