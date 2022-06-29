import React, { useContext } from 'react';
import { Result, Button, Modal } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'

import AuthContext from '../../context/AuthContext';

function SignUpSuccessModal(props) {
    const { setIsPanelRightActive } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleRedirect = () => {
        props.handleClose();
        setIsPanelRightActive(false);
        navigate('/');
    }

    return (
        <Modal visible={true} footer={null}  onCancel={props.handleClose}>
            <Result
                status="success"
                title="Congratulations! Registration completed successfully!"
                subTitle="Now you can automatically sign in to our system."
                extra={[
                    <Button 
                        type="primary" 
                        shape="round" 
                        icon={<LoginOutlined />} 
                        key="console" 
                        onClick={handleRedirect}
                    >
                        Sign In now
                    </Button>,
                ]}
            />
        </Modal>

    )
}

export default React.memo(SignUpSuccessModal)