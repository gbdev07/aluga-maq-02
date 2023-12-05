import React from "react";
import "./Auth.css"
import {Button, Checkbox, Col, Input, Row} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import {Link} from "react-router-dom";
import {FiLogIn} from "react-icons/fi"
import {Link} from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import forgotPassword from "../ForgotPassword/ForgotPassword";
import * as links from "../../../utils/links"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <div className="Auth_container">
            <Row className="Auth_rowContainer">
                {
                    isForgotPassword && <Col xs={24} md={12} lg={12} xl={12} className="Auth_colAuthImage">
                        {authImage && <img className="Auth_authImage" src={authImage}/>}
                        {
                            textImage && <>{textImage}</>
                        }
                    </Col>
                }
                <Col xs={24} md={12} lg={12} xl={12} className="Auth_colAuthForm">
                    <div className="Auth_authBlock">
                        <div className="Auth_authTitle">
                            <FiLogIn className="Auth_authTitleIcon" />
                            <div className="Auth_authTitleText">
                                {authTitle}
                            </div>
                        </div>
                        <div className="Auth_authDescription">
                            {authDescription}
                        </div>
                        <div className="Auth_authForm">
                            {
                                authFields.map((itemField, indexField) => {
                                    console.log(itemField.error)
                                    switch (itemField.type) {
                                        case "text":
                                            return (
                                                <div className="Auth_itemField">
                                                    <div className="Auth_itemFieldLabel">
                                                        {itemField.label}
                                                    </div>
                                                    <Input
                                                        placeholder={itemField.placeholder ?? ""}
                                                        value={itemField.value}
                                                        type="email"
                                                        name="email"
                                                        autoComplete="email"
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
                                                    {itemField.error && <div className="Auth_itemFieldError">
                                                        {itemField.error}
                                                    </div>}
                                                </div>
                                            )
                                        case "password":
                                            return (
                                                <div className="Auth_itemField">
                                                    <div className="Auth_itemFieldLabel">
                                                        {itemField.label}
                                                    </div>
                                                    <Input.Password
                                                        placeholder={itemField.placeholder ?? ""}
                                                        value={itemField.value}
                                                        type="password"
                                                        name="password"
                                                        autoComplete="current-password"
                                                        iconRender={visible => (visible ? <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon> : <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> )}
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
                                                    {itemField.error && <div className="Auth_itemFieldError">
                                                        {itemField.error}
                                                    </div>}
                                                </div>
                                            )
                                        case "checkbox":
                                            return (
                                                <div className="Auth_itemField">
                                                    <Checkbox
                                                        value={itemField.value}
                                                        onChange={(event) => {
                                                            if (typeof itemField.setField === "function") {
                                                                itemField.setField(event.target.checked)
                                                            }
                                                        }}
                                                    >
                                                        <div className="Auth_itemFieldLabelCheckbox">
                                                            <div dangerouslySetInnerHTML={{ __html: itemField.label }}></div>
                                                        </div>
                                                    </Checkbox>
                                                    {itemField.error && <div className="Auth_itemFieldError">
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
                        <Button className="Auth_authSubmit" onClick={() => {
                            if (typeof onsubmit === "function") {
                                onsubmit()
                            }
                        }}>
                            {authSubmit}
                        </Button>
                        {/* {
                            isSignIn && <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                padding: '10px 0'
                            }}>
                                <Link to={links.FORGOTPASSWORD}>
                                    Esqueci minha senha
                                </Link>
                            </div>
                        } */}
                        {
                            Array.isArray(authFooter)
                                ?
                                <div className="Auth_authFooter">
                                    {
                                        authFooter.map((item, index) => {
                                            return (
                                                <div className="Auth_itemAuthFooter">
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
                            successMessage && <div className="Auth_successMessage">
                                {successMessage}
                            </div>
                        }
                        {
                            errorMessage && <div className="Auth_errorMessage">
                                <div dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
                            </div>
                        }
                    </div>
                </Col>
                {
                    !isForgotPassword && <Col xs={24} md={12} lg={12} xl={12} className="Auth_colAuthImage">
                    {authImage && <img className="Auth_authImage" src={authImage}/>}
                    {
                        textImage && <>{textImage}</>
                    }
                </Col>}
            </Row>
        </div>
    )
}

export default Auth;
