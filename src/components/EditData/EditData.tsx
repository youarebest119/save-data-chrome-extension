import { useFormik } from "formik";
import { Yup } from "../../utils/utils";
import { BookMarkIcon } from "../../assets/icons/icons";
import Input from "../Input/Input";
import Button from "../Button/Button";

const EditData = () => {

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
        <div className="modal_backdrop">
            <div className="my_modal">
                <div className="modal_content">
                    <form>
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
                </div>
            </div>
        </div>
    )
}

export default EditData
