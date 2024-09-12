import { useFormik } from "formik";
import { BookMarkIcon, DeleteIcon, NoDataIcon, PenIcon } from "./assets/icons/icons";
import Button from "./components/Button/Button";
import CopyIcon from "./components/CopyIcon/CopyIcon";
import Input from "./components/Input/Input";
import { Yup } from "./utils/utils";
import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";

const Application = () => {
    const [search, setSearch] = useState("");
    const [dataList, setDataList] = useState<{ title: string; value: string; }[]>([]);

    // Load persisted data from localStorage on mount
    useEffect(() => {
        const storedData = localStorage.getItem('dataList');
        if (storedData) {
            setDataList(JSON.parse(storedData));
        }
    }, []);

    // Update localStorage when dataList changes
    useEffect(() => {
        localStorage.setItem('dataList', JSON.stringify(dataList));
    }, [dataList]);

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

            // Add the new data to the list and reset the form
            const newData = { title: values.title, value: values.value };
            setDataList([...dataList, newData]);
            formik.resetForm();
            helpers.setSubmitting(false);
        }
    });

    // Delete item from the list
    const handleDelete = (index: number) => {
        const updatedDataList = dataList.filter((_, i) => i !== index);
        setDataList(updatedDataList);
    };

    // Filtered data based on search
    const filteredDataList = dataList.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.value.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="application">
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
                    />
                </div>
                {(dataList.length === 0 || filteredDataList.length === 0) ? (
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
                                        <div className="data_list_item">
                                            <div className="data_list_item_left">
                                                <h3>{item.title}</h3>
                                                <p>{item.value}</p>
                                            </div>
                                            <div className="data_list_item_right">
                                                <button type="button"><PenIcon /></button>
                                                <CopyIcon value={item.value} />
                                                <button type="button" onClick={() => handleDelete(index)}>
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Application;
