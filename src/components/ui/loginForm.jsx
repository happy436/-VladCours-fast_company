import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
/* import * as yup from "yup"; */

function LoginForm() {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const handeChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    /* БИБЛИОТЕКА ВАЛИДОТОР ДЛЯ ИНПУТОВ */
    /* const validateSchema = yup.object().shape({
        password: yup.string()
            .required("Обязательно для заполнения")
            .matches(/(?=.*[A-Z])/, "Пароль должен содержать хотя бы одну заглавную букву")
            .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
            .matches(/(?=.*[?!.,@#$%^&*"'])/, "Пароль должен содержать один специальный символ ?!.,@#$%^&*")
            .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов"),
        email: yup.string().required("Обязательно для заполнения").email("Email введет не корректно")
    }); */
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Обязательно для заполнения"
            },
            isEmail: {
                message: "Email введет не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Обязательно для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            minLength: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        /* validateSchema.validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message })); */
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="email"
                label="Email"
                onChange={handeChange}
                value={data.email}
                error={errors.email}
            />
            <TextField
                name="password"
                label="Password"
                type="password"
                onChange={handeChange}
                value={data.password}
                error={errors.password}
            />
            <CheckBoxField
                name="stayOn"
                onChange={handeChange}
                value={data.stayOn}
            >
                Запомнить меня
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Login
            </button>
        </form>
    );
};

/* LoginForm.propTypes = {

}; */

export default LoginForm;
