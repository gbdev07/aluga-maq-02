import React, {useContext} from 'react';
import {Button, Dropdown, Menu} from "antd";
import {AuthContext} from "../../../contexts/AuthContext";
import {CANAL} from "../../../utils/constants";
import './Main.css'
import * as links from "../../../utils/links";
import DashboardIcon from "../../../assets/images/dashboard.png";
import EditProfileIcon from "../../../assets/images/edit_profile.png";
import SearchIcon from '../../../assets/images/search.png';
import FavoritesIcon from '../../../assets/images/favorites.png';
import SettingsIcon from "../../../assets/images/settings.png";
import UserIcon from "../../../assets/images/user.png"
import DropdownIcon from "../../../assets/images/chevron-left.png"
import {Link, useLocation} from "react-router-dom";

const Main = (props) => {
    const {
        children
    } = props;
    const {
        setDataUser,
        loading,
        authInfo,
    } = useContext(AuthContext);
    const location = useLocation();

    const {
        dataUser
    } =  authInfo;
    console.log(location.pathname)
    const listMenuFornecedor = [
        {
            icon: DashboardIcon,
            text: 'Dashboard',
            link: links.DASHBOARD_FORNECEDOR,
        },
        {
            icon: EditProfileIcon,
            text: 'Editar Perfil',
            link: links.FORNECEDOR_EDIT_PROFILE,
        },
        {
            icon: SearchIcon,
            text: 'Buscar Canais',
            link: links.FORNECEDOR_SEARCH_CANAIS,
        },
        {
            icon: FavoritesIcon,
            text: 'Favoritos',
            link: links.FORNECEDOR_FAVORITES,
        },
        {
            icon: SettingsIcon,
            text: 'Configurações',
            link: links.FORNECEDOR_SETTINGS,
        }
    ]

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <div
                            onClick={() => {
                                setDataUser(null)
                            }}
                        >
                            Logout
                        </div>
                    ),
                },
            ]}
        />
    );
    const renderScreenTitle = () => {
        const menuFornecedor = listMenuFornecedor.find(item => item.link === location.pathname)
        if (menuFornecedor) {
            return menuFornecedor.text
        }
        return '';
    }
    if (dataUser?.type === CANAL) {
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
    } else {
        return (
            <div className="Main_container">
                <div className="Main_sidebar">
                    {
                        listMenuFornecedor.map((item, index) => {
                            return (
                                <Link to={item.link} className={"Main_menuitemLink" + (location.pathname === item.link ? " Main_menuitemLinkActive" : "")}>
                                    <div className="Main_menuitem">
                                        <img src={item.icon} alt=""/>
                                        <div>{item.text}</div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="Main_right">
                    <div className="Main_header">
                        <div className="Main_header_title">{renderScreenTitle()}</div>
                        <div className="Main_headerBetween">

                        </div>
                        <Dropdown overlay={menu} placement="bottomRight" arrow>
                            <div className="Main_menuProfile">
                                <img src={UserIcon} alt=""/>
                                <img className="Main_dropdownIcon" src={DropdownIcon} alt=""/>
                            </div>
                        </Dropdown>
                    </div>
                    <div className="Main_content">
                        {children}
                    </div>
                </div>

            </div>
        )
    }
}

export default Main;
