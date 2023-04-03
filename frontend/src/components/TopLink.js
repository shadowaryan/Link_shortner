import { Card } from 'antd';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const TopLink = () => {
    const [recent_link, setRecentLink] = useState([]);

    
    useEffect(()=>{
    axios.get('http://localhost:8000/recent-links/1')
    .then(resp =>{
        let response = resp.data
        
        setRecentLink(response.map((e) => {return(<>
            <li>Original Url : {e.original_url}</li>
            <li>Short Url : {e.short_url}</li>
            </>)
        }))

        console.log(response)
    
    }).catch(err=>{
        console.log(err)
    }
    )
    }
    ,[])
    console.log(recent_link,'hii')

    
    // 



//     return (
//   <div>
//       <ul>{recent_link}</ul>    
//   </div>
//     )
};

export default TopLink;