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
import UserPremiumIcon from "../../../assets/images/user_header_premium.svg"
import DropdownIcon from "../../../assets/images/chevron-left.png"
import {Link, useLocation} from "react-router-dom";
import SearchHeaderIcon from "../../../assets/images/search_icon.png";
import NotiHeaderIcon from "../../../assets/images/noti.png";
import NotiHasHeaderIcon from "../../../assets/images/noti_has.png";

import moment from "moment";
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
    const premiumExpiration = authInfo?.dataUser?.premiumExpiration ?? null;
    const hasNotification = !!authInfo?.dataUser?.hasNotification;
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
            <>
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
                            <div className="Main_headerRight">
                                <div className="Main_headerSearch">
                                    <Link to={links.FORNECEDOR_SEARCH_CANAIS}>
                                        <img src={SearchHeaderIcon} alt=""/>
                                    </Link>
                                </div>
                                <div className="Main_headerNoti">
                                    {
                                        hasNotification ? <Link to={links.FORNECEDOR_NOTI}>
                                                <img src={NotiHasHeaderIcon} alt=""/>
                                            </Link>
                                            :
                                            <img src={NotiHeaderIcon} alt=""/>
                                    }

                                </div>
                                <Dropdown overlay={menu} placement="bottomRight" arrow>
                                    <div className="Main_menuProfile">
                                        <img src={(premiumExpiration && moment(premiumExpiration) > moment()) ? UserPremiumIcon : UserIcon} alt=""/>
                                        <img className="Main_dropdownIcon" src={DropdownIcon} alt=""/>
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="Main_content">
                            {children}
                        </div>
                    </div>

                </div>
                {/*<div className="FornecedorSettings_bottom">*/}
                {/*    <a href="mailto:suporte@fit2sell.com.br" className="FornecedorSettings_LinkRemove">*/}
                {/*        <Button className="FornecedorSettings_buttonRemove" >*/}
                {/*            <div> － </div>*/}
                {/*            <div>Remover minha conta</div>*/}
                {/*        </Button>*/}
                {/*    </a>*/}
                {/*</div>*/}
            </>

        )
    }
}

export default Main;
