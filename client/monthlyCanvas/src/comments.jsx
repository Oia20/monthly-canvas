import React, { useEffect, useState } from 'react';
import './comments.css';
import { createClient } from '@supabase/supabase-js';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient'

export default function Comments(props) {
    const [commentsNum, setCommentsNum] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const date = new Date();
    const month = date.getMonth() + 1;

      useEffect(() => {
        fetchUser();
      }, []);
    async function fetchUser() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user.aud) {
            setUser(user.aud)
          }
      }
    const handleTextareaChange = (event) => {
        const charCount = comment.length;
            // If it exceeds, trim the text to the limit
            setComment(event.target.value);
            if (charCount >= 250) {
                // If it exceeds, trim the text to the limit
                setComment(event.target.value.substring(0, 250))
            }
        }

    // Function to handle posting the comment
    const postComment = () => {
        setComment("");
        if (comment.length > 0 && user) {
            const url = new URL('https://remarkable-flexibility-production.up.railway.app/comments/post');
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
                }
            })
            .catch(error => {
            });
        } else if (!user) {
            navigate("/monthly-canvas/login")
        } else {
            return
        }
        setTimeout(fetchComments, 1000);
    };

    // Fetch comments when component mounts
    useEffect(() => {
        fetchComments();
    }, []);

    // Function to fetch comments
    const fetchComments = () => {
        fetch('https://remarkable-flexibility-production.up.railway.app/comments')
            .then(response => response.json())
            .then(data => {
                const filteredComments = data.filter(comment => comment.month === month)
            
                // Set filtered comments and their count
                setComments(filteredComments);
                setCommentsNum(filteredComments.length);
            })
            .catch(error => {
                setTimeout(fetchComments, 1000);
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
