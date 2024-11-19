import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { BookMarkIcon, DownloadIcon, NoDataIcon } from "./assets/icons/icons";
import Button from "./components/Button/Button";
import DataItem from "./components/DataItem/DataItem";
import Input from "./components/Input/Input";
import { Yup } from "./utils/utils";
import toast from "react-hot-toast";

export type DataType = {
    title: string,
    value: string,
    time: string,
}

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
            setDataList([newData, ...dataList]);
            formik.resetForm();
            helpers.setSubmitting(false);
            toast.success("Data Added");
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

    // Function to convert data to XML format and trigger download
    const handleDownload = (data: { title: string; value: string; }[]) => {
        let xmlData = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n';
        data.forEach(item => {
            xmlData += `  <item>\n    <title>${item.title}</title>\n    <value>${item.value}</value>\n  </item>\n`;
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

    return (
        <div className="application">
            {/* <h1>Extension <button></button></h1> */}
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
                    <button type="button" title="Export data" className="download_btn" onClick={() => handleDownload(dataList)}><DownloadIcon /></button>
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
                                        <DataItem
                                            handleDelete={() => handleDelete(index)}
                                            title={item.title}
                                            value={item.value}
                                        />
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
