import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

import HeaderComponent from '../components/Header'
import FooterComponent from '../components/Footer'


export default function CustomLayout(props) {
  // console.log('PROPS Layout ----> ', props)

  return (
    <Layout
      className="layout"
      id="layout"
      style={{
        // height: '100vh', 
        padding: 0,
        margin: 0
      }}
    >

      <HeaderComponent {...props} />
      <Content style={{ padding: "0 50px" }}>

        <div style={{ background: "#fff", padding: 24, minHeight: 280, width: "80vw" }}>
          
          <Outlet />  {/* {props.children} */}

        </div>
      </Content>
      
      <FooterComponent />

    </Layout>
  );
}
