import { Card } from 'antd';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const RecentLink = () => {
    const [recent_link, setRecentLink] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:8000/recent-links/1')
        .then(resp =>{
            setRecentLink(resp.data)
        }).catch(err=>{
            console.log(err)
        }
        )
    }
    ,[])
    




    return (
  <div className="site-card-border-less-wrapper">
    <Card
      title="Recent Links"
      bordered={false}
      style={{
        width: 300,
      }}
    >
      <p></p>
    </Card>
  </div>
    )
};

export default RecentLink;