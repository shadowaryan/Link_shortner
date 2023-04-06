import React from "react";
import { Form, Input, Row, Col } from "antd";
import axios from "axios";


import 'antd/dist/reset.css';
import "../index.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";



axios.defaults.withCredentials = true

const Signup = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = (data) => {
    if(confirmPassword === password && email !== '' && password !== '' && userName !== '' && confirmPassword !== ''){
      
      axios.post('http://localhost:8000/signup/',{email: email, password: password, username: userName})
      data = {email: email, password: password, username: userName} 
      console.log(data);
      
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:8000/req/',
      //   data: {email: email, password: password, userName: userName},
      // });
    // console.log("Received values of form: ", email , password, confirmPassword, userName);
    // navigate('/login');
  }
  else{
    alert("Password and Confirm Password do not match OR some field in form is empty")}};


  // return (
  //   <>
  //   <Row gutter={12}>
  //     <Col span={12}>
  //       Image
  //     </Col>
  //     <Col span={12}>
  //       Form
  //     </Col>
  //   </Row>
  //   </>
  // )
  // const alert = useAlert()
  
  return (
    <>
    {/* <NavBars/> */}
    <Row align="middle">
       <Col span={12}>
       <img src="https://wallpaperaccess.com/full/152608.jpg" style={{height:'100vh'}}/>
       </Col>
       <Col  span={12} style={{textAlign:'center'}}>
       <div>
        <h2>Sign Up</h2>
        <span className="text-muted">Enter your email and password to signup</span>
       </div>
      
       <div style={{paddingTop:'6%'}}>
                    <Input type="text" placeholder="Username" style={{width:'40%', border: '1px solid #C7CCD0', borderRadius:'8px'}} value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <br/>
                    <Input type="email" placeholder="Email" style={{width:'40%', border: '1px solid #C7CCD0', borderRadius:'8px', marginTop:'1%'}} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <br/>
                    <Input type="password" placeholder="Password" style={{width:'40%', border: '1px solid #C7CCD0', borderRadius:'8px', marginTop:'1%'}} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <Input type="password" placeholder="Confirm Password" style={{width:'40%', border: '1px solid #C7CCD0', borderRadius:'8px', marginTop:'1%'}} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <br/>
                    <button className="btn btn-danger" style={{
                        marginTop:'3%',
                        padding: '0.5% 7%',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        background: "linear-gradient(180deg, #E93B77 0%, #DA1F63 100%)"}}
                        onClick={onFinish}>
                            SIGN UP</button>
                    </div>

                    <br/>
                    <span className="text-muted">Don't have an account?
                    <span style={{color:"#DA1F63", fontWeight:'bold'}}> <Link to='/login'> Sign In </Link></span>
                    </span>

                    <div className="text-muted" style={{paddingTop:'7%'}}>
                    <br/>
                    © SHADOW All Rights Reserved
                    </div>
       </Col>
     </Row>
    
    </>
  );
};

export default Signup;
