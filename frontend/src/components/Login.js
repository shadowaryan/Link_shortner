import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';

import { Input, Row, Col } from 'antd';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

// const Login = () => {
//   const onFinish = (values) => {
//     console.log('Received values of form: ', values);
//   };

  // return (
//     <Form
//       name="normal_login"
//       className="login-form"
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//     >
//       <Form.Item
//         name="email"
//         rules={[
//           {
//             type: "email",
//             message: "The input is not valid E-mail!",
//           },
//           {
//             required: true,
//             message: "Please input your E-mail!",
//           },
//         ]}
//       >
//         <Input prefix={<MailOutlined />}
//           type="email"
//           placeholder="Email"/>
//       </Form.Item>

//       <Form.Item
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your Password!',
//           },
//         ]}
//       >
//         <Input
//           prefix={<LockOutlined className="site-form-item-icon" />}
//           type="password"
//           placeholder="Password"
//         />
//       </Form.Item>
//       <Form.Item>
//         <Form.Item name="remember" valuePropName="checked" noStyle>
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>

//         <a className="login-form-forgot" href="">
//           Forgot password
//         </a>
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" className="login-form-button">
//           Log in
//         </Button>
//         Or <a href='http://localhost:3000/signup'>register now!</a>
//       </Form.Item>
//     </Form>
//   );
// };



const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    function handleSubmit() {
        // e.preventDefault();
        // console.log(e);
        console.log(email);
        axios.post('http://localhost:8000/login_verification/',{email: email, password: password
         }).then(res =>{ 
            if(res.status===200){console.log(res.status)}})
            .catch(err => {console.log(err.response.status)})
        

        axios.post('http://localhost:8000/token/', {
            email: email,
            password: password,
        }).then(res => {
            if (res.status === 200) {
            localStorage.setItem('accessToken', res.data.access);
            localStorage.setItem('refreshToken', res.data.refresh);
            navigate('/');
            }
        })

    }


    return (
        <div>
            <Row  align="middle">
                <Col span={12}>
                    <img src="https://wallpaperaccess.com/full/152608.jpg" style={{height:'100vh'}}/>
                </Col>
                <Col span={12} style={{textAlign:'center'}}>
                    <div>
                    <h2>Sign In</h2>
                    <span className="text-muted">Enter your email and password to login</span>
                    </div>
                    <div style={{paddingTop:'6%'}}>
                    <Input type="email" placeholder="Email" style={{width:'40%', border: '1px solid #C7CCD0', borderRadius:'8px'}} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <br/>
                    <Input type="password" placeholder="Password" style={{width:'40%', border: '1px solid #C7CCD0', borderRadius:'8px', marginTop:'1%'}} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <button className="btn btn-danger" style={{
                        marginTop:'3%',
                        padding: '0.5% 7%',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        background: "linear-gradient(180deg, #E93B77 0%, #DA1F63 100%)"}}
                        onClick={ handleSubmit }>
                            SIGN IN</button>
                    </div>

                    <br/>
                    <span className="text-muted">Don't have an account?
                    <span style={{color:"#DA1F63", fontWeight:'bold'}}><Link to='/signup'> Sign Up </Link> </span>
                    </span>

                    <div className="text-muted" style={{paddingTop:'7%'}}>
                    <br/>
                    © SHADOW All Rights Reserved
                    </div>
                </Col>

            </Row>
        </div>
    )
}



export default Login;