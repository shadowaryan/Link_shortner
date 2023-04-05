import { Card } from 'antd';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table } from 'antd';


const RecentLink = () => {
    const [recentLink, setRecentLink] = useState("");

    let recent_link = []

    useEffect(()=>{
    axios.get('http://localhost:8000/recent-links/1')
    .then(resp =>{
        let resp_data = resp.data
        console.log(resp_data,"resp_data")//total clicks
        
        let keys = Object.keys(resp_data)
        let value = Object.values(resp_data)
        console.log(keys)
        for (var i = 0; i < keys.length; i++){
            recent_link.push({
                key : (i+1).toString(),
                original_url : value[i].original_url,
                short_url : "http://localhost:8000/redirect/"+value[i].short_url,
                clicks : value[i].clicks
            });
        }
        console.log(recent_link,"pushed array data")
        // recent_link = resp_data
        return recent_link
    }).then(resp=>{
        setRecentLink(recent_link)
    }).catch(err=>{
        console.log(err)})
        
        // setRecentLink(response.map((e) => {return(<>
        //     <li>Original Url : {e.original_url}</li>
        //     <li>Short Url : {e.short_url}</li>
        //     </>)
        // }))

        
    
    }
    ,[])

    

    console.log(recentLink,'hii')
// 


const columns = [
//   {
//     title: 'No.',
//     dataIndex: 'v',
//     key: 'No.',
//     // render: (text) => <a>{text}</a>,
//     width: 50,
//   },
  {
    title: 'Url',
    dataIndex: 'original_url',
    key: 'original_url',
    ellipsis: true,
  },
  {
    title: 'Short Url',
    dataIndex: 'short_url',
    key: 'short_url',
    ellipsis: true,
  },
  {
    title: 'Clicks',
    dataIndex: 'clicks',
    key: 'clicks',
    ellipsis: true,
  },

//   {
//     title: 'Long Column Long Column Long Column',
//     dataIndex: 'address',
//     key: 'address 2',
//     ellipsis: true,
//   },
//   {
//     title: 'Long Column Long Column',
//     dataIndex: 'address',
//     key: 'address 3',
//     ellipsis: true,
//   },
];
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 2 Lake Park, London No. 2 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park, Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },

// ];



    return (
  <div>
     <Table columns={columns} dataSource={recentLink} />
      {/* <ul>{recentLink}</ul>     */}
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