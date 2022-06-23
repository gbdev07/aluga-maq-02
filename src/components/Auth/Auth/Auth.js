import React from "react";
import "./Auth.css"
import {Button, Checkbox, Col, Input, Row} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import {Link} from "react-router-dom";
import {FiLogIn} from "react-icons/fi"
import {Link} from "react-router-dom";
import forgotPassword from "../ForgotPassword/ForgotPassword";
import * as links from "../../../utils/links"
const Auth = (props) => {
    const {
        authTitle,
        authDescription,
        authFields,
        authSubmit,
        authFooter,
        authImage,
        onsubmit,
        successMessage,
        errorMessage,
        textImage,
        isSignIn,
        isForgotPassword
    } = props;
    return (
        <div className="container">
            <Row className="rowContainer">
                {
                    isForgotPassword && <Col xs={24} md={12} lg={12} xl={12} className="colAuthImage">
                        {authImage && <img className="authImage" src={authImage}/>}
                        {
                            textImage && <>{textImage}</>
                        }
                    </Col>
                }
                <Col xs={24} md={12} lg={12} xl={12} className="colAuthForm">
                    <div className="authBlock">
                        <div className="authTitle">
                            <FiLogIn className="authTitleIcon" />
                            <div className="authTitleText">
                                {authTitle}
                            </div>
                        </div>
                        <div className="authDescription">
                            {authDescription}
                        </div>
                        <div className="authForm">
                            {
                                authFields.map((itemField, indexField) => {
                                    console.log(itemField.error)
                                    switch (itemField.type) {
                                        case "text":
                                            return (
                                                <div className="itemField">
                                                    <div className="itemFieldLabel">
                                                        {itemField.label}
                                                    </div>
                                                    <Input
                                                        placeholder={itemField.placeholder ?? ""}
                                                        value={itemField.value}
                                                        onChange={(event) => {
                                                            if (typeof itemField.setField === "function") {
                                                                itemField.setField(event.target.value)
                                                            }
                                                        }}
                                                        onKeyPress={(event) => {
                                                            if(event.key === 'Enter'){
                                                                onsubmit();
                                                            }
                                                        }}
                                                    />
                                                    {itemField.error && <div className="itemFieldError">
                                                        {itemField.error}
                                                    </div>}
                                                </div>
                                            )
                                        case "password":
                                            return (
                                                <div className="itemField">
                                                    <div className="itemFieldLabel">
                                                        {itemField.label}
                                                    </div>
                                                    <Input.Password
                                                        placeholder={itemField.placeholder ?? ""}
                                                        value={itemField.value}
                                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                        onChange={(event) => {
                                                            if (typeof itemField.setField === "function") {
                                                                itemField.setField(event.target.value)
                                                            }
                                                        }}
                                                        onKeyPress={(event) => {
                                                            if(event.key === 'Enter'){
                                                                onsubmit();
                                                            }
                                                        }}
                                                    />
                                                    {itemField.error && <div className="itemFieldError">
                                                        {itemField.error}
                                                    </div>}
                                                </div>
                                            )
                                        case "checkbox":
                                            return (
                                                <div className="itemField">
                                                    <Checkbox
                                                        value={itemField.value}
                                                        onChange={(event) => {
                                                            if (typeof itemField.setField === "function") {
                                                                itemField.setField(event.target.checked)
                                                            }
                                                        }}
                                                    >
                                                        <div className="itemFieldLabelCheckbox">
                                                            <div dangerouslySetInnerHTML={{ __html: itemField.label }}></div>
                                                        </div>
                                                    </Checkbox>
                                                    {itemField.error && <div className="itemFieldError">
                                                        {itemField.error}
                                                    </div>}
                                                </div>
                                            )

                                    }
                                    return (
                                        <></>
                                    )
                                })
                            }
                        </div>
                        <Button className="authSubmit" onClick={() => {
                            if (typeof onsubmit === "function") {
                                onsubmit()
                            }
                        }}>
                            {authSubmit}
                        </Button>
                        {
                            isSignIn && <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                padding: '10px 0'
                            }}>
                                <Link to={links.FORGOTPASSWORD}>
                                    Esqueci minha senha
                                </Link>
                            </div>
                        }
                        {
                            Array.isArray(authFooter)
                                ?
                                <div className="authFooter">
                                    {
                                        authFooter.map((item, index) => {
                                            return (
                                                <div className="itemAuthFooter">
                                                    <div>
                                                        {item.text1}
                                                    </div>
                                                    <Link
                                                        to={item.link}
                                                    >   {item.text2}
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <></>
                        }
                        {
                            successMessage && <div className="successMessage">
                                {successMessage}
                            </div>
                        }
                        {
                            errorMessage && <div className="errorMessage">
                                <div dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
                            </div>
                        }
                    </div>
                </Col>
                {
                    !isForgotPassword && <Col xs={24} md={12} lg={12} xl={12} className="colAuthImage">
                    {authImage && <img className="authImage" src={authImage}/>}
                    {
                        textImage && <>{textImage}</>
                    }
                </Col>}
            </Row>
        </div>
    )
}

export default Auth;
