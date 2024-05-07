import React, { useEffect, useState } from 'react';
import './comments.css';
import { createClient } from '@supabase/supabase-js';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';

export default function Comments(props) {
    const [commentsNum, setCommentsNum] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const date = new Date();
    const month = date.getMonth() + 1;

    const supabase = createClient(
        "https://gliscfokeivkvdrwzlsv.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsaXNjZm9rZWl2a3Zkcnd6bHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MDQ0MDEsImV4cCI6MjAzMDA4MDQwMX0.XTXSScKdkRFNKbvB5lbPy8-XBtEec7oMac29BSb71Is"
      );
      useEffect(() => {
        fetchUser();
      }, []);
    async function fetchUser() {
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user.aud)
        setUser(user.aud)
      }
    const handleTextareaChange = (event) => {
        setComment(event.target.value);
    };

    // Function to handle posting the comment
    const postComment = () => {
        console.log("Authentication Status: ", user)
        setComment("");
        if (comment.length > 0 && user) {
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
                    // Generate a unique ID for the new comment
                    const newCommentId = Date.now();
                    // Update comments using the functional update form of setComments
                    setComments(prevComments => [
                        ...prevComments,
                        { id: newCommentId, comment: comment }
                    ]);
                    setCommentsNum(prevNum => prevNum + 1);
                    setComment(''); // Clear the comment input
                } else {
                    console.error('Failed to post comment');
                }
            })
            .catch(error => {
                console.error('Error posting comment:', error);
            });
        } else {
            navigate("/login")
        }
        setTimeout(fetchComments, 1000);
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
    // useEffect(() => {
    //     // const textarea = document.getElementById('commentInput');
    //     // const textareaLineHeight = 2; // Adjust as needed
    //     // textarea.style.height = 'auto';
    //     // textarea.style.height = (textarea.scrollHeight + textareaLineHeight) + 'px';
    // }, []);

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
            <div className='comments-sec'>
                {comments.slice().reverse().map(comment => (
                    <div key={comment.id}>
                        <h4>{comment.comment}</h4>
            </div>
                ))}
            </div>
        </div>
    );
}
