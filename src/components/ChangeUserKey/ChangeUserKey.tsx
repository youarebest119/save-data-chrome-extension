import { Modal } from "react-bootstrap";
import "./ChangeUserKey.scss";
import Input from "../Input/Input";
import { useFormik } from "formik";
import { Yup } from "../../utils/utils";
import Button from "../Button/Button";

const ChangeUserKey = ({ show, handleClose }: { show: boolean, handleClose: () => void, }) => {
    const formik = useFormik({
        initialValues: {
            current_user_key: "",
            new_user_key: "",
        },
        validationSchema: Yup.object({
            current_user_key: Yup.string().required().min(6).max(6).label("Current user key"),
            new_user_key: Yup.string().required().min(6).max(6).label("New user key"),
        }),
        onSubmit: values => {
            console.log('values: ', values);
        }
    })
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="change_user_key_modal"
            container={document.querySelector("#root") as HTMLDivElement}
        >
            <h3>Change user key</h3>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    {...formik.getFieldProps("current_user_key")}
                    placeholder="Current user key"
                    error={formik.touched.current_user_key && formik.errors.current_user_key || ""}
                />
                <Input
                    {...formik.getFieldProps("new_user_key")}
                    placeholder="New user key"
                    error={formik.touched.new_user_key && formik.errors.new_user_key || ""}
                />
                <Button fluid loading={formik.isSubmitting} type='submit' disabled={!formik.isValid}>Update</Button>
                <button type="button" onClick={handleClose} className="cancel_btn">Cancel</button>
            </form>
        </Modal>
    )
}

export default ChangeUserKey