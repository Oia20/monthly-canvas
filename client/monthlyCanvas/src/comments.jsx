import './comments.css';
import React, { useEffect, useState } from 'react';

export default function Comments() {
    const [commentsNum, setCommentsNum] = useState(0);
    const [comment, setComment] = useState('');
    const date = new Date();
    const month = date.getMonth() + 1;
    const handleTextareaChange = (event) => {
        const textareaLineHeight = 24; // Adjust as needed
        const previousScrollHeight = event.target.scrollHeight;
        event.target.style.maxHeight = 'none'; // Reset max-height to get accurate scrollHeight
        event.target.style.height = 'auto';
        event.target.style.height = (event.target.scrollHeight + textareaLineHeight) + 'px';
        event.target.style.maxHeight = '200px'; // Adjust max-height as needed
        setComment(event.target.value);
    };

    // Reset textarea height when focus is lost
    const handleTextareaBlur = (event) => {
        event.target.style.height = 'auto';
    };
    const postData =  {
        "comment": comment.toString(),
        "month": month
    }
    // Function to handle posting the comment
    const postComment = () => {
        const url = new URL('http://localhost:5102/comments/post');
        url.searchParams.append('month', month);
    
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
            } else {
                console.error('Failed to post comment');
            }
        })
        .catch(error => {
            console.error('Error posting comment:', error);
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
                onBlur={handleTextareaBlur}
                placeholder='Add a comment'
                className='comment-textarea'
            ></textarea>
            <button onClick={postComment}><h4>Comment</h4></button>
        </div>
    );
}
