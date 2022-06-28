import React, {useContext, useEffect, useState} from "react";
import './Dashboard.css'
import {Col, Modal, Row, Table} from "antd";
import block1 from "../../../assets/images/block1.png"
import block2 from "../../../assets/images/block2.png"
import block3 from "../../../assets/images/block3.png"
import premiumIcon from "../../../assets/images/premium.png"
import axios from "axios";
import {REACT_APP_API_BASE_URL} from "../../../utils/constants";
import * as links from "../../../utils/links";
import {AuthContext} from "../../../contexts/AuthContext";
import moment from "moment";
import {Link, useNavigate} from "react-router-dom";
import ArrowBottomIcon from "../../../assets/images/arrow_bottom.png"
import premium2Icon from "../../../assets/images/premium2.png"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import {format} from "date-fns";
import eoLocale from "date-fns/locale/pt-BR";
const DashboardFornecedor = (props) => {
    const {
        setDataUser,
        loading,
        authInfo,
        setNotiMessage
    } = useContext(AuthContext);
    let navigate = useNavigate();
    const token = authInfo?.dataUser?.token;
    const premiumExpiration = authInfo?.dataUser?.premiumExpiration ?? null;
    const hasData = !!authInfo?.dataUser?.hasData
    const [favorites, setFavorites] = useState([]);
    const [meusFits, setMeusFits] = useState(null);
    const [totalCanais, setTotalCanais] = useState(null);
    const [totalFornecedores, setTotalFornecedores] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!hasData) {
            navigate(links.FORNECEDOR_EDIT_PROFILE);
            // setNotiMessage('Você precisa preencher seus dados antes de usar o sistema');
            setNotiMessage({
                type: 'success',
                message: 'Você precisa preencher seus dados antes de usar o sistema'
            })
        }
    }, [])
    const columns = [
        {
            title: 'Canal',
            dataIndex: 'canal',
            key: 'canal',
            render: (text) => <div style={{
                fontWeight: 700,
            }}>{text}</div>,
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            key: 'categoria',
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
        },
        {
            title: 'Ação',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div className="Dashboard_favDetail">
                        DETALHES
                    </div>
                )
            },
        },
    ];

    useEffect(() => {
        axios.get(`${REACT_APP_API_BASE_URL}/dashboard-fornecedor`, {
            headers: {
                "x-access-token": token,
                "content-type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setIsLoading(false);
                    if (Array.isArray(res.data.favorites)) {
                        setFavorites(res.data.favorites)
                    }
                    setMeusFits(res.data.meusFits);
                    setTotalCanais(res.data.totalCanais);
                    setTotalFornecedores(res.data.totalFornecedores);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                setIsLoading(false);
                if ([401, 403].includes(err.response.status)) {
                    // setNotiMessage('A sua sessão expirou, para continuar faça login novamente.');
                    setNotiMessage({
                        type: 'error',
                        message: 'A sua sessão expirou, para continuar faça login novamente.'
                    })
                    setDataUser(null);
                }
            })
    }, [])

    const isPremium = (premiumExpiration && moment(premiumExpiration) > moment());
    return (
        <div className="Dashboard_container">
            {isLoading && <LoadingAction />}
            <Row>
                <Col xs={24} md={24} lg={8} xl={8} className="Dashboard_col">
                    <div className="Dashboard_staBlock">
                        <div className="Dashboard_staBlockTitle">
                            Total Fornecedores
                        </div>
                        <div className="Dashboard_staBlockAmount">
                            {totalFornecedores !== null ? totalFornecedores : ""}
                        </div>
                        <div className="Dashboard_staBlockBottom">
                            <img src={block1} alt=""/>
                        </div>
                        <div className="Dashboard_staBlockBottomLink">
                            <Link to={links.FORNECEDOR_SEARCH_CANAIS}>
                                <div className="arrowBottomLink">
                                    <img src={ArrowBottomIcon} alt=""/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={24} lg={8} xl={8} className="Dashboard_col">
                    <div className="Dashboard_staBlock">
                        <Link to={links.FORNECEDOR_SEARCH_CANAIS} className="Dashboard_staBlockLinkA">
                            <div className="Dashboard_staBlockLink">
                                <div>Buscar</div>
                                <img src={ArrowBottomIcon} alt=""/>
                            </div>
                        </Link>
                        <div className="Dashboard_staBlockTitle">
                            Total de Canais
                        </div>
                        <div className="Dashboard_staBlockAmount">
                            {totalCanais !== null ? totalCanais : ""}
                        </div>
                        <div className="Dashboard_staBlockBottom">
                            <img src={block2} alt=""/>
                        </div>
                        <div className="Dashboard_staBlockBottomLink">
                            <Link to={links.FORNECEDOR_SEARCH_CANAIS}>
                                <div className="arrowBottomLink">
                                    <img src={ArrowBottomIcon} alt=""/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={24} lg={8} xl={8} className="Dashboard_col">
                    <div className="Dashboard_staBlock">
                        {
                            isPremium
                            ?
                                <Link to={links.FORNECEDOR_MY_FITS} className="Dashboard_staBlockLinkA">
                                    <div className="Dashboard_staBlockLink">
                                        <img src={premium2Icon} alt=""/>
                                        <div>Ver Fits</div>
                                        <img src={ArrowBottomIcon} alt=""/>
                                    </div>
                                </Link>
                                :
                                <div className="Dashboard_staBlockLinkA">
                                    <div className="Dashboard_staBlockLink">
                                        <img src={premium2Icon} alt=""/>
                                        <div>Ver Fits</div>
                                        <img src={ArrowBottomIcon} alt=""/>
                                    </div>
                                </div>
                        }
                        {/*<Link to={links.FORNECEDOR_MY_FITS} className="Dashboard_staBlockLinkA">*/}
                        {/*    <div className="Dashboard_staBlockLink">*/}
                        {/*        <img src={premium2Icon} alt=""/>*/}
                        {/*        <div>Ver Fits</div>*/}
                        {/*        <img src={ArrowBottomIcon} alt=""/>*/}
                        {/*    </div>*/}
                        {/*</Link>*/}
                        <div className="Dashboard_staBlockTitle">
                            Meus Fits
                        </div>
                        <div className="Dashboard_staBlockAmount">
                            {meusFits !== null ? meusFits : ""}
                        </div>
                        <div className="Dashboard_staBlockBottom">
                            <img src={block3} alt=""/>
                        </div>
                        <div className="Dashboard_staBlockBottomLink">
                            <Link to={links.FORNECEDOR_MY_FITS}>
                                <div className="arrowBottomLink">
                                    <img src={ArrowBottomIcon} alt=""/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={24} lg={14} xl={14} className="Dashboard_col Dashboard_col_table">
                    <div className="Dashboard_table">
                        <div className="Dashboard_tableTitle">
                            Canais que te favoritaram
                        </div>
                        {
                            isPremium
                            ?
                                <Link to={links.FORNECEDOR_FAVORITES_PREMIUM} className="Dashboard_col_tableLinkA">
                                    <div className="Dashboard_col_tableLink">
                                        <img src={premium2Icon} alt=""/>
                                        <div>Ver todos</div>
                                        <img src={ArrowBottomIcon} alt=""/>
                                    </div>
                                </Link>
                                :
                                <div className="Dashboard_col_tableLinkA">
                                    <div className="Dashboard_col_tableLink" >
                                        <img src={premium2Icon} alt=""/>
                                        <div>Ver todos</div>
                                        <img src={ArrowBottomIcon} alt=""/>
                                    </div>
                                </div>
                        }

                        <Table columns={columns} dataSource={favorites} />
                    </div>
                </Col>
                <Col xs={24} md={24} lg={10} xl={10} className="Dashboard_col">
                    <div className="Dashboard_premium">
                        <div className="Dashboard_premiumText">
                            {/*<span className="Dashboard_premiumBtn" onClick={() => {*/}
                            {/*    setIsModalVisible(true);*/}
                            {/*}}>Seja Premium</span> */}
                            {isPremium ? <>
                                    Assinatura expira em {format(new Date(premiumExpiration), "d 'de' MMMM yyyy", { locale: eoLocale })}.
                                </> :
                            <>
                                <Link to={links.FORNECEDOR_BUY_PREMIUM}>Seja Premium</Link> libere todos os recursos
                            </>}
                        </div>
                        {
                            isPremium
                            ?
                                <img src={premiumIcon} alt=""/>
                                :
                                <img src={premiumIcon} alt=""/>
                        }

                    </div>
                </Col>
            </Row>
            <Modal
                title="Preencha seus dados!"
                visible={isModalVisible}
                onOk={() => {
                    navigate(links.FORNECEDOR_EDIT_PROFILE)
                    setIsModalVisible(false);
                }}
                onCancel={() => {
                    setIsModalVisible(false);
                }}
            >
                <div>
                    Para poder iniciar as buscas é necessário completar o seu cadastro.
                </div>
            </Modal>
        </div>
    )
}

export default DashboardFornecedor;
