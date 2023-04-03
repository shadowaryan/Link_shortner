import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import axios from "axios";
import { Input, Row, Col } from 'antd';

const DrawerCreateLink = () => {
  const [visible, setVisible] = useState(false);
  const [original_url, setOriginal_url] = useState();
  const [resp_link , setResp_link] = useState();
  const [resp_short_link , setResp_short_link] = useState();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  var resp_data
  function handleSubmit(){
    axios.post('http://localhost:8000/', {original_url:original_url})
    .then(resp=>{
        setResp_link(JSON.stringify(resp.data.original_url))
        setResp_short_link(JSON.stringify(resp.data.short_url))
        console.log(resp.data)
    })
  }


  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Create Link
      </Button>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
      <Input type="text" placeholder="Enter URL"  value={original_url} onChange={(e)=> setOriginal_url(e.target.value) }/>
      <button type="submit" onClick={handleSubmit}>Short Link</button>
      <p>Entered Url:- {resp_link}</p>
      <p>Short Url:- {resp_short_link}</p>
      </Drawer>
      
    </>
  );
};

export default DrawerCreateLink;