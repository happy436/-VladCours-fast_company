import React from "react";
import Card from "../../common/Card";
import Comment from "./сomment";
import PropTypes from "prop-types";

function CommentList({ handleDeleteComment, comments }) {
    return (
        <Card>
            <h2>Comments</h2>
            <hr />
            {comments.length > 0
                ? comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        id={comment._id}
                        data={comment}
                        handleDeleteComment={handleDeleteComment}
                    />
                ))
                : <div className="bg-light card-body mb-3">No comments</div>}
        </Card>
    );
}

CommentList.propTypes = {
    handleDeleteComment: PropTypes.func,
    comments: PropTypes.array
};

export default React.memo(CommentList);
