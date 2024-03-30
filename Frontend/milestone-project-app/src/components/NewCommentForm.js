// import React, { useState, useContext } from 'react';
// import { CurrentUser } from '../contexts/CurrentUser'

// function ReviewForm({ restaurants, selectedRestaurant, map }) {
//     console.log("Comment form: ", selectedRestaurant, restaurants)
//     const { currentUser } = useContext(CurrentUser)

//     const [comment, setComment] = useState({
//         // location_id: ,
//         rating_description: '',
//         rating: 5,
//     })

//     const handleInputChange = (e) => {
//         const { name, value } = e.target
//         setComment({
//             ...comment,
//             [name]: value,
//         });
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();

//         const response = await fetch(`http://localhost:3001/reviews/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             },
//             body: JSON.stringify(comment)
//         })
//         const review = await response.json()
//         setComment({ review })
//     }

//     if (!currentUser) {
//         return <p>You must be logged in to leave a review</p>
//     }


//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="rating">Rating:</label>
//                 <input type="number" id="rating" name="rating" value={comment.rating} onChange={handleInputChange} min="1" max="10" />
//             </div>
//             <div>
//                 <label htmlFor="rating_description">Comments:</label>
//                 <textarea id="rating_description" name="rating_description" value={comment.rating_description} onChange={handleInputChange} />
//             </div>
//             <div>
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     )
// }

// export default ReviewForm