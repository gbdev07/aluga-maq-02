import React from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";
import * as links from "../../../utils/links"
import "./MainSite.css"
const MainSite = (props) => {
    return (
        <div className="MainSite_container">
            <Link to={links.SIGNIN}>
                <Button>
                    Login
                </Button>
            </Link>
        </div>
    )
}

export default MainSite;
