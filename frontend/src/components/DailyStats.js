import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import axios from "axios";

const DailyStats = () => {
    const [stats_, setStats_] = useState([]);
    let stats=[]
    useEffect(()=>{
        axios.get('http://localhost:8000/link-stats/1')
        .then(resp =>{
            let resp_data = resp.data
            console.log(resp_data.total_click)//total clicks
            delete resp_data['total_click']
            let key = Object.keys(resp_data)
            let value = Object.values(resp_data)
            console.log(key.length)
            for (var i = 0; i < key.length; i++){
                stats.push({
                    date : key[i],
                    clicks : value[i]
                });
            }
            console.log(stats)
            return stats
        }).then(resp=>{
            setStats_(stats)
        })
        console.log(stats)
        
    }
    ,[])

    
    
//   const data = stats;
//   console.log(data)  
  const config = {
    data: stats_,
    xField: 'date',
    yField: 'clicks',
  };
  return(
    <> 
  <Column {...config} />
  
  </>
  );
};

export default DailyStats;