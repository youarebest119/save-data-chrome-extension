import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { DeleteIcon, Ellipsis, EyeClosed, EyeOpen, InfoIcon, PenIcon } from '../../assets/icons/icons';
import CopyIcon from '../CopyIcon/CopyIcon';

type PropTypes = {
    title: string;
    value: string;
    handleEdit: () => void,
    handleDelete: () => void,
    updatedAt: string,
}

const DataItem = ({ title, handleEdit, handleDelete, updatedAt, value }: PropTypes) => {
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
                <CopyIcon value={value} />
                <Dropdown className="item_more">
                    <Dropdown.Toggle type="button">
                        <Ellipsis />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {/* <button title="Archive" type="button">
                            {false ? <ArchivedIcon /> : <ArchiveIcon />}
                        </button>
                        <button title="Save" type="button">
                            {true ? <SavedIcon /> : <SaveIcon />}
                        </button>
                        <button title="Favourite" type="button">
                            {true ? <FavedIcon /> : <FavIcon />}
                        </button>
                        <button title="Old Versions" type="button">
                            <HistoryIcon />
                        </button> */}
                        <button title={updatedAt} type="button">
                            <InfoIcon />
                        </button>
                        <button title="Delete" type="button" onClick={handleDelete}>
                            <DeleteIcon />
                        </button>
                        <button title="Edit" type="button" onClick={handleEdit}>
                            <PenIcon />
                        </button>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default DataItem
