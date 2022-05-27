import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "../../common/Card";

function CommentForm({ users, handleAddComment, pageId }) {
    const [input, setInput] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const handleChange = ({ target }) => {
        setInput(target.value);
    };
    const handleSelect = ({ target }) => {
        setSelectedUser(target.value);
    };
    const onHandleClick = () => {
        if (input !== "".trim() && selectedUser !== "") {
            handleAddComment({ content: input.trim(), pageId: pageId, userId: selectedUser });
            setInput("");
        }
    };
    return (
        <Card extraClassName="mb-2">
            <div>
                <h2>New comment</h2>
                <span className="mb-4">
                    <select
                        className="form-select"
                        name="userId"
                        onChange={handleSelect}
                        defaultValue=""
                    >
                        <option disabled value="">
                            Выберите пользователя
                        </option>
                        {users ? users.map((user) => (
                            <option
                                key={user._id}
                                value={user._id}
                            >
                                {user.name}
                            </option>
                        )) : null}
                    </select>
                </span>
                <span className="mb-4">
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >
                        Сообщение
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={input}
                        onChange={handleChange}
                    ></textarea>
                </span>
                <button className="btn btn-primary mt-2" onClick={onHandleClick}>
                    Опубликовать
                </button>
            </div>
        </Card>
    );
};

CommentForm.propTypes = {
    users: PropTypes.array,
    handleAddComment: PropTypes.func,
    pageId: PropTypes.string
};

export default CommentForm;
