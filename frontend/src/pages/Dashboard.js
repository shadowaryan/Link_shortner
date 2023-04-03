import React from 'react'
import { Row, Col, Drawer } from 'antd';
import LinkStats from '../components/LinkStats';
import TopLink from '../components/TopLink'
import DrawerCreateLink from '../components/DrawerCreateLink'
import RecentLink from '../components/Recent_Link';
import LinksInfo from '../components/LinksInfo';

function Dashboard() {

  return (
    <>
    <Row align="middle">
      <Col span={24}>
        <LinksInfo/>
      </Col>
    </Row>
    <Row>
    <Col span={24}>
        <LinkStats/>
      </Col>
      {/* <Col span={12}>
      <DrawerCreateLink/>
      </Col> */}
    </Row>
    </>
  )

  // return (
  //   <div>
  //   <Row align='middle'>
  //   <Col span={12} >
  //    <DrawerCreateLink/>
  //    </Col>
    
    
  //   <Row >
  //     <LinkStats/>
  //   </Row>
  //   <Row ></Row>
  //   </Col>
  
  // </Row>
  // </div>
  // )
}

export default Dashboard