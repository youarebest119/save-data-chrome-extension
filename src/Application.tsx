import { useFormik } from "formik";
import { BookMarkIcon, DeleteIcon, NoDataIcon, PenIcon } from "./assets/icons/icons";
import Button from "./components/Button/Button";
import CopyIcon from "./components/CopyIcon/CopyIcon";
import Input from "./components/Input/Input";
import { Yup } from "./utils/utils";

const Application = () => {
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

            setTimeout(() => {
                helpers.setSubmitting(false);
            }, 3000);

            console.log(values);
        }
    })
    return (
        <div className="application">
            <h2>Save Data</h2>
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
            <div className="data_list">
                {
                    false ?
                        <div className="no_data">
                            <NoDataIcon />
                            <p>No Record Found</p>
                        </div>
                        :
                        <>
                            <h2>Your Data</h2>
                            <div className="data_list_content">
                                <ul>
                                    {
                                        Array.from({ length: 10 }).map((_, index) => {
                                            return (
                                                <li key={index}>
                                                    <div className="data_list_item">
                                                        <div className="data_list_item_left">
                                                            <h3>Title of the </h3>
                                                            <p>value of theladlsfomfowemf omsdafolmpowemf ldkasf opmeofm lsfm pom</p>
                                                        </div>
                                                        <div className="data_list_item_right">
                                                            <button type="button"><PenIcon /></button>
                                                            <CopyIcon value={"value of theladlsfomfowemf omsdafolmpowemf ldkasf opmeofm lsfm pom"} />
                                                            <button type="button"><DeleteIcon /></button>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default Application
