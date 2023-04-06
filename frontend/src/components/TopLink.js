import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { Skeleton } from 'antd';


const TopLink = () => {
    <Skeleton />
    const [topLink, setTopLink] = useState([]);

    let topLink_ = []
    useEffect(()=>{
    axios.get('http://localhost:8000/top-links/1')
    .then(resp =>{
        let response = resp.data
        console.log(response)
        // setTopLink(response.map((e) => {return(<>
        //     <li>Original Url : {e.original_url}</li>
        //     <li>Short Url : {e.short_url}</li>
        //     </>)
        // }))

        // console.log(response)
        let key = Object.keys(response)
            let value = Object.values(response)
            console.log(key.length)
            for (var i = 0; i < key.length; i++){
                topLink_.push({
                    link : key[i],
                    clicks : value[i]
                });
            }
            console.log(topLink_);
            return topLink_
    }).catch(err=>{
        console.log(err)
    }).then(response=>{
        setTopLink(topLink_)
    })
    }
    ,[])
    console.log(topLink,'Toplink')

    
    // 



//     return (
//   <div>
//       <ul>{recent_link}</ul>    
//   </div>
//     )

const config = {
    data: topLink,
    xField: 'link',
    yField: 'clicks',
  };
  return(
    
    <> 
  <Column {...config} />
  
  </>
  );


};

export default TopLink;