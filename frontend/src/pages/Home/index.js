import React from 'react';
import { GithubOutlined, LogoutOutlined } from '@ant-design/icons';
import { MoreOutlined, LikeFilled, DislikeFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Avatar, Badge, Card, Divider, Tag, Statistic } from 'antd';
const { Meta } = Card;
import { Col, Row } from 'antd';

const tagStyle = {
    padding: '0 2px',
    fontSize: 10,
    marginRight: 4
};
import { Helmet } from "react-helmet";
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

// import { actionSignOut } from '../../redux/actions/auth';
import { actionSignOut } from '../../redux';
import './home.css';

export default function Home() {
    const dispatch = useDispatch()

    const handleSignOut = () => {
        dispatch(actionSignOut())
    }
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Koitoror University - HOME" />
            </Helmet>

            <div className="home-page">
                <div className="home-overlay">
                    <p style={{marginTop: 20}}> Learn <b>YOUR</b> Language!</p>
                    <p style={{marginTop: -50}}> <b style={{padding: 0, fontSize: "3rem"}}>KALENJIN</b> </p>
                    <p style={{marginTop: -40, fontSize: '1rem'}}> Pick from the subtribes listed below to learn more !</p>
                    {/* <Button shape='round' style={{float: 'right'}} onClick={handleSignOut} icon={<LogoutOutlined />}>Sign Out</Button> */}

                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                            <Col span={8}>

                                <Card
                                    size="small"

                                    hoverable
                                    title={
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginRight: 8 }}>
                                                    <Avatar size="medium" src="" />
                                                </div>
                                                <div>
                                                    <b>Keiyo</b>
                                                    <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12 }}>5.3.0-alpha</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '4px 0' }}>
                                                <Tag color="blue" style={tagStyle}>Beginner</Tag>
                                                <Tag color="blue" style={tagStyle}>Intermediate</Tag>
                                                <Tag color="blue" style={tagStyle}>Advanced</Tag>
                                            </div>
                                        </div>
                                    }
                                    extra={<MoreOutlined />}
                                    style={{ width: 300 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                                        <Statistic title="Connected" value="Yes" prefix={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />} />
                                        <Statistic title="Authentication" value="In-Valid" prefix={<CloseCircleFilled style={{ color: '#f50', fontSize: 16 }} />} />
                                        <Statistic title="Availability" value="Full" />
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>

                                <Card
                                    size="small"

                                    hoverable
                                    title={
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginRight: 8 }}>
                                                    <Avatar size="medium" src="" />
                                                </div>
                                                <div>
                                                    <b>Nandi/Lumbwa</b>
                                                    <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12 }}>5.3.0-alpha</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '4px 0' }}>
                                                <Tag color="blue" style={tagStyle}>Beginner</Tag>
                                                <Tag color="blue" style={tagStyle}>Intermediate</Tag>
                                                <Tag color="blue" style={tagStyle}>Advanced</Tag>
                                            </div>
                                        </div>
                                    }
                                    extra={<MoreOutlined />}
                                    style={{ width: 300 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                                        <Statistic title="Connected" value="Yes" prefix={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />} />
                                        <Statistic title="Authentication" value="In-Valid" prefix={<CloseCircleFilled style={{ color: '#f50', fontSize: 16 }} />} />
                                        <Statistic title="Availability" value="Full" />
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>

                                <Card
                                    size="small"

                                    hoverable
                                    title={
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginRight: 8 }}>
                                                    <Avatar size="medium" src="" />
                                                </div>
                                                <div>
                                                    <b>Kipsigis</b>
                                                    <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12 }}>5.3.0-alpha</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '4px 0' }}>
                                                <Tag color="blue" style={tagStyle}>Beginner</Tag>
                                                <Tag color="blue" style={tagStyle}>Intermediate</Tag>
                                                <Tag color="blue" style={tagStyle}>Advanced</Tag>
                                            </div>
                                        </div>
                                    }
                                    extra={<MoreOutlined />}
                                    style={{ width: 300 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                                        <Statistic title="Connected" value="Yes" prefix={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />} />
                                        <Statistic title="Authentication" value="In-Valid" prefix={<CloseCircleFilled style={{ color: '#f50', fontSize: 16 }} />} />
                                        <Statistic title="Availability" value="Full" />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>,
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                            <Col span={8}>

                                <Card
                                    size="small"

                                    hoverable
                                    title={
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginRight: 8 }}>
                                                    <Avatar size="medium" src="" />
                                                </div>
                                                <div>
                                                    <b>Marakwet</b>
                                                    <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12 }}>5.3.0-alpha</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '4px 0' }}>
                                                <Tag color="blue" style={tagStyle}>Beginner</Tag>
                                                <Tag color="blue" style={tagStyle}>Intermediate</Tag>
                                                <Tag color="blue" style={tagStyle}>Advanced</Tag>
                                            </div>
                                        </div>
                                    }
                                    extra={<MoreOutlined />}
                                    style={{ width: 300 }}
                                // bordered={false}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                                        <Statistic title="Connected" value="Yes" prefix={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />} />
                                        <Statistic title="Authentication" value="In-Valid" prefix={<CloseCircleFilled style={{ color: '#f50', fontSize: 16 }} />} />
                                        <Statistic title="Availability" value="Full" />
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>

                                <Card
                                    size="small"

                                    hoverable
                                    title={
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginRight: 8 }}>
                                                    <Avatar size="medium" src="" />
                                                </div>
                                                <div>
                                                    <b>Sabaot/Sebei</b>
                                                    <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12 }}>5.3.0-alpha</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '4px 0' }}>
                                                <Tag color="blue" style={tagStyle}>Beginner</Tag>
                                                <Tag color="blue" style={tagStyle}>Intermediate</Tag>
                                                <Tag color="blue" style={tagStyle}>Advanced</Tag>
                                            </div>
                                        </div>
                                    }
                                    extra={<MoreOutlined />}
                                    style={{ width: 300 }}
                                // bordered={false}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                                        <Statistic title="Connected" value="Yes" prefix={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />} />
                                        <Statistic title="Authentication" value="In-Valid" prefix={<CloseCircleFilled style={{ color: '#f50', fontSize: 16 }} />} />
                                        <Statistic title="Availability" value="Full" />
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>

                                <Card
                                    size="small"

                                    hoverable
                                    title={
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginRight: 8 }}>
                                                    <Avatar size="medium" src="" />
                                                </div>
                                                <div>
                                                    <b>Tugen/Lembus/Endorois</b>
                                                    <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12 }}>5.3.0-alpha</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '4px 0' }}>
                                                <Tag color="blue" style={tagStyle}>Beginner</Tag>
                                                <Tag color="blue" style={tagStyle}>Intermediate</Tag>
                                                <Tag color="blue" style={tagStyle}>Advanced</Tag>
                                            </div>
                                        </div>
                                    }
                                    extra={<MoreOutlined />}
                                    style={{ width: 300 }}
                                // bordered={false}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                                        <Statistic title="Connected" value="Yes" prefix={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />} />
                                        <Statistic title="Authentication" value="In-Valid" prefix={<CloseCircleFilled style={{ color: '#f50', fontSize: 16 }} />} />
                                        <Statistic title="Availability" value="Full" />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>,
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                            <Col span={8}>

                                <Card
                                    size="small"

                                    hoverable
                                    title={
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginRight: 8 }}>
                                                    <Avatar size="medium" src="" />
                                                </div>
                                                <div>
                                                    <b>Terik</b>
                                                    <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12 }}>5.3.0-alpha</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '4px 0' }}>
                                                <Tag color="blue" style={tagStyle}>Beginner</Tag>
                                                <Tag color="blue" style={tagStyle}>Intermediate</Tag>
                                                <Tag color="blue" style={tagStyle}>Advanced</Tag>
                                            </div>
                                        </div>
                                    }
                                    extra={<MoreOutlined />}
                                    style={{ width: 300 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                                        <Statistic title="Connected" value="Yes" prefix={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />} />
                                        <Statistic title="Authentication" value="In-Valid" prefix={<CloseCircleFilled style={{ color: '#f50', fontSize: 16 }} />} />
                                        <Statistic title="Availability" value="Full" />
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>

                                <Card
                                    size="small"

                                    hoverable
                                    title={
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginRight: 8 }}>
                                                    <Avatar size="medium" src="" />
                                                </div>
                                                <div>
                                                    <b>Sengwer/Cherengany</b>
                                                    <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12 }}>5.3.0-alpha</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '4px 0' }}>
                                                <Tag color="blue" style={tagStyle}>Beginner</Tag>
                                                <Tag color="blue" style={tagStyle}>Intermediate</Tag>
                                                <Tag color="blue" style={tagStyle}>Advanced</Tag>
                                            </div>
                                        </div>
                                    }
                                    extra={<MoreOutlined />}
                                    style={{ width: 300 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                                        <Statistic title="Connected" value="Yes" prefix={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />} />
                                        <Statistic title="Authentication" value="In-Valid" prefix={<CloseCircleFilled style={{ color: '#f50', fontSize: 16 }} />} />
                                        <Statistic title="Availability" value="Full" />
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>

                                <Card
                                    size="small"

                                    hoverable
                                    title={
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ marginRight: 8 }}>
                                                    <Avatar size="medium" src="" />
                                                </div>
                                                <div>
                                                    <b>Ogiek/Endorois</b>
                                                    <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12 }}>5.3.0-alpha</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '4px 0' }}>
                                                <Tag color="blue" style={tagStyle}>Beginner</Tag>
                                                <Tag color="blue" style={tagStyle}>Intermediate</Tag>
                                                <Tag color="blue" style={tagStyle}>Advanced</Tag>
                                            </div>
                                        </div>
                                    }
                                    extra={<MoreOutlined />}
                                    style={{ width: 300 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                                        <Statistic title="Connected" value="Yes" prefix={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />} />
                                        <Statistic title="Authentication" value="In-Valid" prefix={<CloseCircleFilled style={{ color: '#f50', fontSize: 16 }} />} />
                                        <Statistic title="Availability" value="Full" />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <p></p>
                    {/* <p>Thank you! - Koitoror</p> */}
                    {/* <Button shape='round' onClick={handleSignOut} icon={<LogoutOutlined />}>Sign Out</Button> */}

                </div>

            </div>


        </>
    )
}

