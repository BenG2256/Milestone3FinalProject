
import { useContext } from "react";
import { CurrentUser } from '../contexts/CurrentUser'

function CommentCard({ comment, onDelete }) {

    const { currentUser } = useContext(CurrentUser)

    let deleteButton = null;

    if (currentUser?.userId === comment.authorId) {
        deleteButton = (
            <button className="btn btn-danger" onClick={onDelete} >
                Delete Comment
            </button>
        )
    }

    return (
        <div className="border col-sm-4">
            <h2 >Comments</h2>
            <h4>{comment.rating_description}</h4>
            <h3>
                <strong>- {comment.author.username}</strong>
            </h3>
            <h4>Rating: {comment.stars}</h4>
            {deleteButton}
        </div>
    )
}

export default CommentCard;