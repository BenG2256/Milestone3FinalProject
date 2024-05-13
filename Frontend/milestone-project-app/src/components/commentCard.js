
import { useContext } from "react";
import { CurrentUser } from '../contexts/CurrentUser'

function CommentCard({ comment, onDelete }) {

    const { currentUser } = useContext(CurrentUser)

    let deleteButton = null;

    if (currentUser?.user_id === comment.author_id) {
        deleteButton = (
            <button className="btn btn-danger" onClick={onDelete} >
                Delete Comment
            </button>
        )
    }

    return (
        <div className="border col-sm-4">
            <h3>
                <strong>- {comment.author.username} Says: </strong>
            </h3>
            <h4>{comment.rating_description}</h4>
            <h4>Rating: {comment.rating}</h4>
            {deleteButton}
        </div>
    )
}

export default CommentCard;