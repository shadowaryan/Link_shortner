import React from 'react'
import { Row, Col, Drawer } from 'antd';
import LinkStats from '../components/LinkStats';
import TopLink from '../components/TopLink'
import App from '../components/DrawerCreateLink'

function Dashboard() {
  return (
    <div>
    <Row align='middle'>
    <Col span={12} >
     <App/>
     </Col>
    <Col span={12} ><TopLink/>
    <Row span={12}>
      heello
    </Row>
    <Row span={12}></Row>
    </Col>
  
  </Row>
  </div>
  )
}

export default Dashboard