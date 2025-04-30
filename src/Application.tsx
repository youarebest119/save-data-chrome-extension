import { useFormik } from "formik";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { Accordion, Dropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { BookMarkIcon, NoDataIcon, UploadIcon } from "./assets/icons/icons";
import Button from "./components/Button/Button";
import DataItem from "./components/DataItem/DataItem";
import EditNote from "./components/EditNote/EditNote";
import Input from "./components/Input/Input";
import { deleteNote, setNote } from "./store/notes.slice";
import { useAppDispatch, useAppSelector } from "./store/store";
import { PROFILE_IMG } from "./utils/constants";
import { Yup } from "./utils/utils";
import { useDropzone } from 'react-dropzone'
import Spinner from "./components/Spinner/Spinner";

export type DataType = {
    title: string,
    value: string,
    time: string,
}


const Application = () => {
    const [search, setSearch] = useState("");
    // const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState("")
    const { notes } = useAppSelector(state => state.notes);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            title: "",
            value: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required().label("Title"),
            value: Yup.string().required().label("Value"),
        }),
        onSubmit: (values, helpers) => {
            helpers.setSubmitting(true);
            const newData = { title: values.title, password: values.value };
            dispatch(setNote(newData))
            formik.resetForm();
            helpers.setSubmitting(false);
            toast.success("Data Added");
        }
    });

    // Delete item from the list
    const handleDelete = useCallback((id: string) => {
        Swal.fire({
            title: "Do you want to continue",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Discard",
            confirmButtonColor: "#e16449",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteNote(id))
                toast.success("Removed")
            }
        });
    }, [dispatch])

    // Filtered data based on search
    const filteredDataList = useMemo(() => {
        return notes.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.password.toLowerCase().includes(search.toLowerCase()) ||
            item.id.toLowerCase().includes(search.toLowerCase()) ||
            item.createdAt.toLowerCase().includes(search.toLowerCase())
        )
    }, [notes, search])

    // Function to convert data to XML format and trigger download
    const handleDownload = () => {
        let xmlData = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n';
        notes.forEach(item => {
            xmlData += `
            <item>
                <id>${item.id}</id> 
                <title>${item.title}</title>
                <password>${item.password}</password> 
                <createdAt>${moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</createdAt> 
                <lastUpdated>${moment(item.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</lastUpdated> 
                ${item.description ? `<description>${item.description}</description>` : ""}
                ${item.isFavourite ? `<favourited>${item.isFavourite}</favourited>` : ""}
                ${item.isSaved ? `<saved>${item.isSaved}</saved>` : ""}
                ${item.isArchived ? `<archived>${item.isArchived}</archived>` : ""}
            </item>`;
        });
        xmlData += '</data>';

        const blob = new Blob([xmlData], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const [isUploading, setIsUploading] = useState(false);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setIsUploading(true);
        if (acceptedFiles.length === 1) {
            let file = acceptedFiles[0];

            const reader = new FileReader();

            reader.onerror = () => { };
            reader.onload = () => {
                let content = reader.result as string;
                if (content) {
                    const parser = new DOMParser();
                    let output = parser.parseFromString(content, "application/xml");
                    const items = output.querySelectorAll("item");
                    if (items.length > 0) {
                        Swal.fire({
                            titleText: "If found, only title and password will be picked from your file.",
                            text: "XML file should have data > item > title + (value | password)",
                        }).then(response => {
                            if (response.isConfirmed) {

                                items.forEach((item) => {
                                    // const id = item.querySelector("id")?.textContent || "";
                                    const title = item.querySelector("title")?.textContent || "";
                                    const password = item.querySelector("password")?.textContent || item.querySelector("value")?.textContent || "";
                                    // const updatedAt = item.querySelector("lastUpdated")?.textContent || "";
                                    // const createdAt = item.querySelector("createdAt")?.textContent || "";

                                    dispatch(setNote({
                                        title,
                                        password,
                                    }))
                                });
                            }
                        })
                    }
                }
            }
            reader.readAsText(file);
        }
        setIsUploading(false);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop })

    return (
        <div className="application">
            <Dropdown className="profile_dropdown">
                <Dropdown.Toggle>
                    <img src={PROFILE_IMG} alt="" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <NavLink to="/">Home</NavLink>
                    {/* <NavLink to="/favourites">Favourites</NavLink>
                    <NavLink to="/saved">Saved</NavLink>
                    <NavLink to="/archived">Archived</NavLink> 
                    <NavLink to="/" onClick={(e) => { e.preventDefault(); setShow(true) }}>Settings</NavLink>
                    */}
                    <NavLink to="/" onClick={() => handleDownload()}>Export</NavLink>
                </Dropdown.Menu>
            </Dropdown>
            {/* <ChangeUserKey show={show} handleClose={() => setShow(false)} /> */}
            <Accordion>
                <Accordion.Item eventKey="save-data">
                    <Accordion.Header>
                        <h2>Save Data</h2>
                    </Accordion.Header>
                    <Accordion.Body>
                        <form onSubmit={formik.handleSubmit}>
                            <Input
                                name="title"
                                placeholder="Enter the title here"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={(formik.touched.title && formik.errors.title) ? formik.errors.title : ""}
                                icon={<BookMarkIcon />}
                            />
                            <Input
                                name="value"
                                value={formik.values.value}
                                placeholder="Enter the value here"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={(formik.touched.value && formik.errors.value) ? formik.errors.value : ""}
                                icon={<BookMarkIcon />}
                            />
                            <Button fluid loading={formik.isSubmitting} type='submit' disabled={!formik.isValid}>Save</Button>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="data_list">
                <div className="data_list_header">
                    <h2>Your Data</h2>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="Search"
                        className="search_input"
                        autoFocus
                    />
                    <div className="upload_area" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <div className="full_screen_upload">
                                    <p>Drop the files here ...</p>
                                </div> :
                                <div className="upload_btn" title="Upload your xml">
                                    {
                                        isUploading ?
                                            <Spinner /> :
                                            <UploadIcon />
                                    }
                                </div>
                        }
                    </div>
                </div>
                {(notes.length === 0 || filteredDataList.length === 0) ? (
                    <div className="no_data">
                        <NoDataIcon />
                        <p>No Record Found</p>
                    </div>
                ) : (
                    <>
                        <div className="data_list_content">
                            <ul>
                                {filteredDataList.map((item, index) => (
                                    <li key={index}>
                                        <DataItem
                                            updatedAt={`Updated ${moment(new Date(item.updatedAt)).fromNow()}`}
                                            handleDelete={() => handleDelete(item.id)}
                                            handleEdit={() => { setEdit(true); setId(item.id) }}
                                            title={item.title}
                                            value={item.password}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
            <EditNote show={edit} id={id} handleClose={() => { setEdit(false); setId("") }} />
        </div>
    );
};

export default Application;
