import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import API from "../../api";
import { useHistory, useParams } from "react-router-dom";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import * as yup from "yup";

function EditForm() {
    const validateSchema = yup.object().shape({
        email: yup
            .string()
            .required("Обязательно для заполнения")
            .email("Email введет не корректно"),
        profession: yup.object().shape({
            _id: yup.string().required("Обязательно выберите вашу профессию"),
            name: yup.string().required("Обязательно выберите вашу профессию")
        })
    });
    const [fetchData, setFetchData] = useState();
    const params = useParams();
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
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
        API.users.getById(params.UserId).then((fetchData) => {
            setFetchData(fetchData);
            setData(() => ({
                name: fetchData.name,
                email: fetchData.email,
                profession: fetchData.profession,
                sex: fetchData.sex,
                qualities: fetchData.qualities.map(item => ({ label: item.name, value: item._id, color: item.color }))
            }));
        });
    }, []);

    const handleAllUsers = () => {
        const updateData = {
            bookmark: fetchData.bookmark,
            completedMeetings: fetchData.completedMeetings,
            email: data.email,
            name: data.name,
            rate: data.rate,
            sex: data.sex,
            _id: fetchData._id,
            profession: data.profession,
            qualities: data.qualities.map((item) => ({ _id: item.value, name: item.label, color: item.color }))
        };
        history.push(`/users/${params.UserId}`);
        API.users.update(params.UserId, updateData);
    };
    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
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
    const render = () => {
        if (fetchData) {
            return (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    name="name"
                                    label="Имя"
                                    onChange={handeChange}
                                    value={data.name}
                                />
                                <TextField
                                    name="email"
                                    label="Email"
                                    onChange={handeChange}
                                    value={data.email}
                                    error={errors.email}
                                />
                                <SelectField
                                    label={"Выберите вашу профессию"}
                                    value={data.profession._id}
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
                                    defaultValue={fetchData.qualities.map(
                                        (item) => ({
                                            label: item.name,
                                            value: item._id,
                                            color: item.color
                                        })
                                    )}
                                    label="Выберите ваши качества"
                                />
                                <button
                                    className="btn btn-primary w-100 mx-auto"
                                    type="submit"
                                    disabled={!isValid}
                                    onClick={() => handleAllUsers()}
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <h1>Loading</h1>;
        }
    };

    return render();
}

export default EditForm;
