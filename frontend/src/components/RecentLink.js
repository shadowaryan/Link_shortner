import { Card } from 'antd';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const RecentLink = () => {
    const [recentlink, setRecentLink] = useState([]);

    
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
    console.log(recentlink,'hii')
// 



    return (
  <div>
      <ul>{recentlink}</ul>    
  </div>
    )
};

export default RecentLink;













// import { Card } from 'antd';
// import React from 'react';
// import axios from 'axios';
// import { useState, useEffect } from 'react';

// const Recent_Link = () => {
//     const [recent_link, setRecentLink] = useState([]);


//     useEffect(()=>{
//         axios.get('http://localhost:8000/recent-links/1')
//         .then(resp =>{
//             setRecentLink(resp.data)
//             console.log(resp.data)
//         }).catch(err=>{
//             console.log(err)
//         }
//         )
//     }
//     ,[])
    




//     return (
//   <div className="site-card-border-less-wrapper">
//     <Card
//       title="Recent Links"
//       bordered={false}
//       style={{
//         width: 300,
//       }}
//     >
//       <p></p>
//     </Card>
//   </div>
//     )
// };

// export default Recent_Link;