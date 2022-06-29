import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from 'antd';

import { verify } from "../../redux";

const Activate = (props) => {
  const [verified, setVerified] = useState(false);
  const params = useParams()

  const verify_account = (e) => {
    // const uid = props.match.params.uid;
    // const token = props.match.params.token;
    const uid = params.uid;
    const token = params.token;

    props.verify(uid, token);
    setVerified(true);
  };

  if (verified) return <Navigate to="/" />;
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "200px",
        }}
      >
        <h1>Verify your Account:</h1>
        {/* <button
          onClick={verify_account}
          style={{ marginTop: "50px" }}
          type="button"
          className="btn btn-primary"
        >
          Verify
        </button> */}
        <Button
            // loading={loading}
            // loading={auth.loading}
            type="primary"
            className="form-submit-btn"
            htmlType="submit"
            shape="round"
            // icon={<UserAddOutlined />}
            size="large"
            onClick={verify_account}
            style={{ marginTop: "50px" }}

        >
          Verify
        </Button>
        
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
