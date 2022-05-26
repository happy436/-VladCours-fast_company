import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../api";
import Card from "../../common/Card";
import Comment from "./Comment";

function CommentList() {
    const { UserId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        API.comments.fetchCommentsForUser(UserId).then((data) =>
            setComments(data)
        );
    }, []);
    const handleDeleteComment = (id) => {
        API.comments.remove(id).then((id) => {
            setComments(comments.filter((item) => item._id !== id));
        });
    };
    return (
        <Card>
            <h2>Comments</h2>
            <hr />
            {comments.map((comment) => (
                <Comment
                    key={comment._id}
                    data={comment}
                    handleDeleteComment={handleDeleteComment}
                />
            ))}
        </Card>
    );
}

CommentList.propTypes = {};

export default React.memo(CommentList);
