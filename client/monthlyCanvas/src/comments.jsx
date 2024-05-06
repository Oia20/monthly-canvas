import React, { useEffect, useState } from 'react';
import './comments.css';

export default function Comments() {
    const [commentsNum, setCommentsNum] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const date = new Date();
    const month = date.getMonth() + 1;

    const handleTextareaChange = (event) => {
        setComment(event.target.value);
    };

    // Function to handle posting the comment
    const postComment = () => {
    setComment("")
    if (comment.length > 0) {
        const url = new URL('http://localhost:5102/comments/post');
        url.searchParams.append('month', month);
        
        const postData = {
            "comment": comment.toString(),
            "month": month
        };
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => {
            if (response.ok) {
                console.log('Comment posted successfully');
                // Update comments using the callback version of setComments
                setComments(prevComments => [
                    ...prevComments,
                    { id: prevComments.length + 1, comment: comment }
                ]);
                setCommentsNum(commentsNum + 1);
                setComment(''); // Clear the comment input
            } else {
                console.error('Failed to post comment');
            }
        })
        .catch(error => {
            console.error('Error posting comment:', error);
        });
    } else {
        console.log("empty")
    }
};

    // Fetch comments when component mounts
    useEffect(() => {
        fetchComments();
    }, []);

    // Function to fetch comments
    const fetchComments = () => {
        fetch('http://localhost:5102/comments')
            .then(response => response.json())
            .then(data => {
                setComments(data);
                setCommentsNum(data.length);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    };

    // Automatically resize textarea when component mounts
    useEffect(() => {
        const textarea = document.getElementById('commentInput');
        const textareaLineHeight = 2; // Adjust as needed
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight + textareaLineHeight) + 'px';
    }, []);

    return (
        <div className='flex-row'>
            <h2>{commentsNum} Comments</h2>
            <textarea
                id="commentInput"
                value={comment}
                onChange={handleTextareaChange}
                placeholder='Add a comment'
                className='comment-textarea'
            ></textarea>
            <button onClick={postComment}><h4>Comment</h4></button>
            <div>
                {comments.slice().reverse().map(comment => (
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
