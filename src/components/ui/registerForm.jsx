import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

function RegisterForm() {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});
    const handeChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProfession(data);
        });
        API.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);
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
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Невозможно использовать сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
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
            <SelectField
                label={"Выберите вашу профессию"}
                value={data.profession}
                onChange={handeChange}
                defaultOption={"Choose ..."}
                options={professions}
                error={errors.profession}
                name="profession"
            />
            <RadioField
                label={"Выберите ваш пол"}
                value={data.sex}
                onChange={handeChange}
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                error={errors.profession}
                name="sex"
            />
            <MultiSelectField
                onChange={handeChange}
                options={qualities}
                name="qualities"
                defaultValue={data.qualities}
                label="Выберите ваши качества"
            />
            <CheckBoxField
                name="licence"
                onChange={handeChange}
                value={data.licence}
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
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
}

export default RegisterForm;
