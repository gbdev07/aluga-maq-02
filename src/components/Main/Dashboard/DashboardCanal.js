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
import {CANAL_SEARCH_FORNECEDORES} from "../../../utils/links";
const DashboardCanal = (props) => {
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
    const [dataCurrentDetail, setDataCurrentDetail] = useState(null);

    useEffect(() => {
        if (!hasData) {
            navigate(links.CANAL_EDIT_PROFILE);
            // setNotiMessage('Você precisa preencher seus dados antes de usar o sistema');
            setNotiMessage({
                type: 'success',
                message: 'Você precisa preencher seus dados antes de usar o sistema'
            })
        }
    }, [])
    const columns = [
        {
            title: 'Top 3 da plataforma',
            dataIndex: 'nameCompany',
            key: 'nameCompany',
            render: (text) => <div style={{
                fontWeight: 700,
            }}>{text}</div>,
        },
        {
            title: 'Categoria',
            dataIndex: 'areaAtuacao',
            key: 'areaAtuacao',
        },
        {
            title: 'Cidade',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Ação',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div className="Dashboard_favDetail" onClick={() => {
                        setDataCurrentDetail(record)
                    }}>
                        DETALHES
                    </div>
                )
            },
        },
    ];

    useEffect(() => {
        dataData();
    }, [])
    const dataData = () => {
        axios.get(`${REACT_APP_API_BASE_URL}/dashboard-canal`, {
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
    }
    const onDisLikedCanal = () => {
        if (dataCurrentDetail) {
            setIsLoading(true);
            axios.post(`${REACT_APP_API_BASE_URL}/fornecedor-unlike-canal`, {
                idCanal: dataCurrentDetail.idCanal
            }, {
                headers: {
                    "x-access-token": token,
                    "content-type": "application/json"
                }
            })
                .then(res => {
                    setIsLoading(false);
                    if (res.status === 200 && res.data) {
                        setDataCurrentDetail(null);
                        dataData();
                    }
                })
                .catch(err => {
                    setIsLoading(false);
                    setNotiMessage({
                        type: 'error',
                        message: `Hmm, ${err.response?.data?.error ?? "error"}`
                    })
                    if ([401, 403].includes(err.response.status)) {
                        // setNotiMessage('A sua sessão expirou, para continuar faça login novamente.');
                        setNotiMessage({
                            type: 'error',
                            message: 'A sua sessão expirou, para continuar faça login novamente.'
                        })
                        setDataUser(null);
                    }
                })
        }
    }

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
                            <Link to={links.CANAL_SEARCH_FORNECEDORES}>
                                <div className="arrowBottomLink">
                                    <img src={ArrowBottomIcon} alt=""/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={24} lg={8} xl={8} className="Dashboard_col">
                    <div className="Dashboard_staBlock">
                        <Link to={links.CANAL_SEARCH_FORNECEDORES} className="Dashboard_staBlockLinkA">
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
                            <Link to={links.CANAL_SEARCH_FORNECEDORES}>
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
                                <Link to={links.CANAL_MY_FITS} className="Dashboard_staBlockLinkA">
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
                        {/*<Link to={links.CANAL_MY_FITS} className="Dashboard_staBlockLinkA">*/}
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
                            <Link to={links.CANAL_MY_FITS}>
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
                                <Link to={links.CANAL_FAVORITES_PREMIUM} className="Dashboard_col_tableLinkA">
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
                                    <Link to={links.CANAL_BUY_PREMIUM}>Seja Premium</Link> libere todos os recursos
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
            {dataCurrentDetail && <Modal
                visible={!!dataCurrentDetail}
                footer={null}
                header={null}
                className="Dashboard_modal"
                onCancel={() => {
                    setDataCurrentDetail(null)
                }}
            >
                <div className="Dashboard_modalDetail">
                    <div className="Dashboard_modalAction">
                        <div className="Dashboard_modalClose" onClick={() => {
                            setDataCurrentDetail(null)
                            // setIsLiked(null)
                        }}>
                            X
                        </div>
                    </div>
                    <Row>
                        <Col xs={24}>
                            <div className="Dashboard_modalDetailText1">
                                {dataCurrentDetail.description ?? ""}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="Dashboard_modalDetailText2">
                                Pessoa Responsável: {dataCurrentDetail.responsiblePerson}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="Dashboard_modalDetailText2">
                                País: {dataCurrentDetail.country}.
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="Dashboard_modalDetailText2">
                                Empresa: R$: {dataCurrentDetail.nameCompany}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="Dashboard_modalDetailText2">
                                Cidade: {dataCurrentDetail.city}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="Dashboard_modalDetailText2">
                                Faturamento Anual: {dataCurrentDetail.mediaFaturamentoAnual}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="Dashboard_modalDetailText2">
                                Estado: {dataCurrentDetail.state}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="Dashboard_modalDetailText2">
                                Área de Atuação: {dataCurrentDetail.areaAtuacao}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="Dashboard_modalDetailText2">
                                Endereço: {dataCurrentDetail.street}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="Dashboard_modalDetailText2">
                                Segmento: {dataCurrentDetail.segmento}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>

                        </Col>
                        <Col xs={24} md={24} lg={8} xl={8} className="Dashboard_modalDetailCol">
                            <div className="Dashboard_modalDetailText3">
                                Telefone
                            </div>
                            {
                                dataCurrentDetail.phone
                                    ?
                                    <a href={`tel:${dataCurrentDetail.phone}`} target={"_blank"} className="FornecedorFavorites_modalDetailViewLink">
                                        <div className="FornecedorFavorites_modalDetailView">
                                            {dataCurrentDetail.phone}
                                        </div>
                                    </a>
                                    :
                                    <div className="FornecedorFavorites_modalDetailView">
                                        Não Informado.
                                    </div>
                            }
                        </Col>
                        <Col xs={24} md={24} lg={8} xl={8} className="Dashboard_modalDetailCol">
                            <div className="Dashboard_modalDetailText3">
                                Whatsapp
                            </div>
                            {
                                dataCurrentDetail.whatsapp
                                    ?
                                    <a href={`https://wa.me/550${dataCurrentDetail.whatsapp}`} target={"_blank"} className="FornecedorFavorites_modalDetailViewLink">
                                        <div className="FornecedorFavorites_modalDetailView">
                                            {dataCurrentDetail.whatsapp}
                                        </div>
                                    </a>
                                    :
                                    <div className="FornecedorFavorites_modalDetailView">
                                        Não Informado.
                                    </div>
                            }
                        </Col>
                        <Col xs={24} md={24} lg={8} xl={8} className="Dashboard_modalDetailCol">
                            <div className="Dashboard_modalDetailText3">
                                Site
                            </div>
                            {
                                dataCurrentDetail.website
                                    ?
                                    <a href={dataCurrentDetail.website} target={"_blank"}
                                       className="FornecedorSearchCanais_modalDetailViewLink">
                                        <div className="FornecedorSearchCanais_modalDetailView">
                                            Clique aqui para acessar .
                                        </div>
                                    </a>
                                    :
                                    <div className="FornecedorSearchCanais_modalDetailView">
                                        Não Informado.
                                    </div>
                            }
                        </Col>
                        <Col xs={24} className="Dashboard_modalDetailCol">
                            {/*{*/}
                            {/*    isLiked === false*/}
                            {/*        ?*/}
                            {/*        <div className="Dashboard_like" onClick={() => {*/}
                            {/*            onLikedCanal();*/}
                            {/*        }}>*/}
                            {/*            FAVORITAR*/}
                            {/*        </div>*/}
                            {/*        :*/}
                            {/*        isLiked === true*/}
                            {/*            ?*/}

                            {/*            <div className="Dashboard_like" onClick={() => {*/}
                            {/*                onDisLikedCanal();}*/}
                            {/*            }>*/}
                            {/*                Desfavoritar*/}
                            {/*            </div>*/}
                            {/*            :*/}
                            {/*            <></>*/}
                            {/*}*/}
                            {/*<div className="FornecedorFavorites_like" onClick={() => {*/}
                            {/*    onDisLikedCanal();}*/}
                            {/*}>*/}
                            {/*    Desfavoritar*/}
                            {/*</div>*/}
                        </Col>
                    </Row>
                </div>
            </Modal>}
        </div>
    )
}

export default DashboardCanal;
