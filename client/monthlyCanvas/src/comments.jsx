import './comments.css'
import React, { useEffect, useState } from 'react';

export default function Comments() {
    const [commentsNum, setCommentsNum] = useState(0);
    return (
        <div className='flex-row'>
            <h2>{commentsNum} Comments</h2>
            <input placeholder='Add a comment'></input>
        </div>
    )
}