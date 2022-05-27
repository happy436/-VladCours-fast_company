import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CommentForm from "./form";
import CommentList from "./сommentList";
import { useParams } from "react-router-dom";
import API from "../../../api";

function CommentBlock({ users }) {
    const { UserId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        API.comments
            .fetchCommentsForUser(UserId)
            .then((data) => setComments(data));
    }, []);
    const handleDeleteComment = (id) => {
        API.comments.remove(id).then((id) => {
            setComments(comments.filter((item) => item._id !== id));
        });
    };
    const handleAddComment = (data) => {
        API.comments.add(data).then((data) => {
            setComments((prevState) => [...prevState, data]);
        });
        const sort = [...comments].sort((a, b) => {
            return b.created_at - a.created_at;
        });
        setComments(sort);
    };
    const sortComment = () => {
        const sort = [...comments].sort((a, b) => {
            return b.created_at - a.created_at;
        });
        return sort;
    };
    return (
        <section className="col-md-8">
            <CommentForm
                handleAddComment={handleAddComment}
                users={users}
                pageId={UserId}
            />
            <CommentList
                handleDeleteComment={handleDeleteComment}
                comments={sortComment()}
            />
        </section>
    );
}

CommentBlock.propTypes = {
    users: PropTypes.array
};

export default CommentBlock;
