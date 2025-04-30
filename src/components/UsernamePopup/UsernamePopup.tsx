import { useFormik } from 'formik';
import { useState } from 'react';
import { InfoIcon, NextIcon } from '../../assets/icons/icons';
import { useAppDispatch } from '../../store/store';
import { setKey } from '../../store/user.slice';
import { Yup } from '../../utils/utils';
import Button from '../Button/Button';
import Input from '../Input/Input';
import "./UsernamePopup.scss";

const MAX_CHARS = 6;

const UsernamePopup = () => {
    const [show, setShow] = useState(true);
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            user_key: "",
        },
        validationSchema: Yup.object({
            user_key: Yup.string().required().min(6).max(6).label("User key"),
        }),
        onSubmit: values => {
            console.log('values: ', values);
            dispatch(setKey(values.user_key))
            setShow(false);
        }
    })
    if (!show) {
        return null;
    }
    return (
        <div className="username_popup">
            <div className="dialog">
                <div className="content">
                    <form onSubmit={formik.handleSubmit}>
                        <Input
                            {...formik.getFieldProps("user_key")}
                            error={formik.touched.user_key && formik.errors.user_key || ""}
                            placeholder={`Enter ${MAX_CHARS} characters`}
                            label='User Key'
                            rightIcon={<Button type="submit"><NextIcon /></Button>}
                        />
                        <p className="note_txt"><InfoIcon /> Enter your key to get your credentials.</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UsernamePopup