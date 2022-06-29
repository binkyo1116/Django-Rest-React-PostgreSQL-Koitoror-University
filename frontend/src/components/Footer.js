import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
    return (
        <Footer style={{ textAlign: "center" }}>
            {/* Koitoror Designs ©2022 <Link to="https://degem.ml" >Degem-Ventures</Link> */}
            {/* <Link to="/" >Koitoror University </Link> ©2022 <Link to="https://degem.ml" > Degem-Ventures</Link> */}
            <Link to="/" >Koitoror University </Link> ©2022 <a href="https://degem.ml"> Degem-Ventures</a>
            {/* Koitoror Designs ©2022 Degem-Ventures */}

        </Footer>

    )
}

export default FooterComponent
