import React from "react";
import "./Auth.css"
import {Button, Checkbox, Col, Input, Row} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {Link} from "react-router-dom";
import {FiLogIn} from "react-icons/fi"
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
        errorMessage
    } = props;
    return (
        <div className="container">
            <Row className="rowContainer">
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
                                                            {itemField.label}
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
                                                    <a
                                                        href={item.link}
                                                    >   {item.text2}
                                                    </a>
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
                                {errorMessage}
                            </div>
                        }
                    </div>
                </Col>
                <Col xs={24} md={12} lg={12} xl={12} className="colAuthImage">
                    {authImage && <img className="authImage" src={authImage}/>}
                </Col>
            </Row>
        </div>
    )
}

export default Auth;
