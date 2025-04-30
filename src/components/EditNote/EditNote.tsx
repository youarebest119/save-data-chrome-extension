import { useFormik } from "formik";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { BookMarkIcon } from "../../assets/icons/icons";
import { updateNote } from "../../store/notes.slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Yup } from "../../utils/utils";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./EditNote.scss";
import { Modal } from "react-bootstrap";

const EditNote = ({ id, show, handleClose }: { id: string, show: boolean, handleClose: () => void, }) => {
    const { notes } = useAppSelector(state => state.notes);
    const dispatch = useAppDispatch();
    const currentNote = useMemo(() => {
        return notes.find(item => item.id === id)
    }, [notes, id])

    const formik = useFormik({
        initialValues: {
            note_title: currentNote?.title || "",
            password: currentNote?.password || "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            note_title: Yup.string().required().label("Title"),
            password: Yup.string().required().label("Password"),
        }),
        onSubmit: (values, helpers) => {
            helpers.setSubmitting(true);
            const newData = { title: values.note_title, password: values.password };
            dispatch(updateNote({ id: id, note: newData }))
            formik.resetForm();
            helpers.setSubmitting(false);
            toast.success("Edited");
            handleClose();
        }
    })

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="edit_note_modal"
            container={document.querySelector("#root") as HTMLDivElement}
        >
            <h3>Edit</h3>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    name="note_title"
                    placeholder="Enter the title here"
                    value={formik.values.note_title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={(formik.touched.note_title && formik.errors.note_title) ? formik.errors.note_title : ""}
                    icon={<BookMarkIcon />}
                />
                <Input
                    name="password"
                    value={formik.values.password}
                    placeholder="Enter the password here"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={(formik.touched.password && formik.errors.password) ? formik.errors.password : ""}
                    icon={<BookMarkIcon />}
                />
                <Button fluid loading={formik.isSubmitting} type='submit' disabled={!formik.isValid}>Save</Button>
                <button type="button" onClick={handleClose} className="cancel_btn">Cancel</button>
            </form>
        </Modal>
    )
}

export default EditNote