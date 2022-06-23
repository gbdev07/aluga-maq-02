import React, {useContext} from 'react';
import {Button} from "antd";
import {AuthContext} from "../../../contexts/AuthContext";

const Main = (props) => {
    const {
        children
    } = props;
    const {
        setDataUser,
        loading
    } = useContext(AuthContext)
    return (
        <div>
            {children}
            <Button
                style={{
                    padding: '10px 20px',
                    margin: 20,
                }}
                onClick={() => {
                    setDataUser(null)
                }}
            >
                Logout
            </Button>
        </div>
    )
}

export default Main;
