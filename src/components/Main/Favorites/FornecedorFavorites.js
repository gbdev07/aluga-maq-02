import React, {useContext, useEffect, useState} from "react";
import './FornecedorFavorites.css'
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import {AuthContext} from "../../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import moment from "moment";
import * as links from "../../../utils/links";
import {Button, Col, Row, Table} from "antd";
import {AiOutlinePlus} from "react-icons/ai";
import premiumIcon from "../../../assets/images/premium3.png";
import axios from "axios";
import {REACT_APP_API_BASE_URL} from "../../../utils/constants";
const FornecedorFavorites = (props) => {
    const {
        setDataUser,
        loading,
        authInfo,
        setNotiMessage
    } = useContext(AuthContext);
    let navigate = useNavigate();
    const token = authInfo?.dataUser?.token;
    const premiumExpiration = authInfo?.dataUser?.premiumExpiration ?? null;
    const isPremium = !!(premiumExpiration && moment(premiumExpiration) > moment());
    const [isLoading, setIsLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [data, setData] = useState([]);
    const [dataCurrentDetail, setDataCurrentDetail] = useState(null);
    const [loadingTable, setLoadingTable] = useState(false);

    // const []
    const [isLiked, setIsLiked] = useState(null);
    useEffect(() => {
        getFavorites();
    }, [])

    const getFavorites = () => {
        setLoadingTable(true);
        axios.post(`${REACT_APP_API_BASE_URL}/fornecedor-my-favorites`, {},{
            headers: {
                "x-access-token": token,
                "content-type": "application/json"
            }
        })
            .then(res => {
                setLoadingTable(false);
                if (res.status === 200) {
                    console.log(res.data)
                    if (Array.isArray(res.data)) {
                        setData(res.data)
                    }
                    setIsLoading(false);
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                setLoadingTable(false);
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

    const onOpenModalDetail = (data) => {
        console.log(data)
        setDataCurrentDetail(data)
    }

    const columns = [
        {
            title: 'CANAL',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'DESCRIÇÃO',
        //     dataIndex: 'description',
        //     key: 'description',
        // },
        // {
        //     title: 'CIDADE',
        //     dataIndex: 'city',
        //     key: 'city',
        //     render: (_, record) => {
        //         return (
        //             <div>
        //                 {record.city} - {record.state}
        //             </div>
        //         )
        //     },
        // },
        {
            title: 'DETALHAR',
            dataIndex: 'detail',
            key: 'detail',
            render: (_, record) => {
                return (
                    <div
                        className="FornecedorFavorites_detailBtn"
                    >
                        <Button
                            onClick={() => {
                                onOpenModalDetail(record)
                            }}>
                            ...
                        </Button>
                    </div>
                )
            },
        },
    ];

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
                        console.log(res.data)
                        setIsLiked(false)
                        setDataCurrentDetail(null);
                        getFavorites();
                        // setData(prev => prev.filter(item => item.idCanal !== dataCurrentDetail.idCanal))
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


    return (
        <div className="FornecedorFavorites_container">
            {isLoading && <LoadingAction />}
            <div className="FornecedorFavorites_title">
                Canais Favoritos
            </div>
            {
                true
                ?
                    <div className="FornecedorFavorites_body">
                        {dataCurrentDetail && <div className="FornecedorFavorites_modalDetail">
                            <div className="FornecedorFavorites_modalAction">
                                <div className="FornecedorFavorites_modalClose" onClick={() => {
                                    setDataCurrentDetail(null)
                                    setIsLiked(null)
                                }}>
                                    X
                                </div>
                            </div>
                            <Row>
                                <Col xs={24}>
                                    <div className="FornecedorFavorites_modalDetailText1">
                                        {dataCurrentDetail.description ?? ""}
                                    </div>
                                </Col>
                                <Col xs={24} md={24} lg={12} xl={12}>
                                    <div className="FornecedorSearchCanais_modalDetailText2">
                                        Número Aprox. de Clientes: R$: {dataCurrentDetail.numeroAproxClientes}
                                    </div>
                                </Col>
                                <Col xs={24} md={24} lg={12} xl={12}>
                                    <div className="FornecedorSearchCanais_modalDetailText2">
                                        Cidade: {dataCurrentDetail.city}
                                    </div>
                                </Col>
                                <Col xs={24} md={24} lg={12} xl={12}>
                                    <div className="FornecedorSearchCanais_modalDetailText2">
                                        Descrição de Produtos e Serviços: {dataCurrentDetail.descricaoProdutosServicos}
                                    </div>
                                </Col>
                                <Col xs={24} md={24} lg={12} xl={12}>
                                    <div className="FornecedorSearchCanais_modalDetailText2">
                                        Estado: {dataCurrentDetail.state}
                                    </div>
                                </Col>
                                <Col xs={24} md={24} lg={12} xl={12}>
                                    <div className="FornecedorSearchCanais_modalDetailText2">
                                        Área de Atuação: {dataCurrentDetail.areaAtuacao}
                                    </div>
                                </Col>
                                <Col xs={24} md={24} lg={12} xl={12}>
                                    <div className="FornecedorSearchCanais_modalDetailText2">
                                        Endereço: {dataCurrentDetail.street}
                                    </div>
                                </Col>
                                <Col xs={24} md={24} lg={12} xl={12}>
                                    <div className="FornecedorSearchCanais_modalDetailText2">
                                        Segmento: {dataCurrentDetail.segmento}
                                    </div>
                                </Col>
                                <Col xs={24} md={24} lg={12} xl={12}>

                                </Col>
                                <Col xs={24} md={24} lg={8} xl={8} className="FornecedorFavorites_modalDetailCol">
                                    <div className="FornecedorFavorites_modalDetailText3">
                                        Telefone
                                    </div>
                                    <a href={`tel:${dataCurrentDetail.phone}`} target={"_blank"} className="FornecedorFavorites_modalDetailViewLink">
                                        <div className="FornecedorFavorites_modalDetailView">
                                            {dataCurrentDetail.phone}
                                        </div>
                                    </a>
                                </Col>
                                <Col xs={24} md={24} lg={8} xl={8} className="FornecedorFavorites_modalDetailCol">
                                    <div className="FornecedorFavorites_modalDetailText3">
                                        Whatsapp
                                    </div>
                                    <a href={`https://wa.me/${dataCurrentDetail.whatsapp}`} target={"_blank"} className="FornecedorFavorites_modalDetailViewLink">
                                        <div className="FornecedorFavorites_modalDetailView">
                                            {dataCurrentDetail.whatsapp}
                                        </div>
                                    </a>
                                </Col>
                                <Col xs={24} md={24} lg={8} xl={8} className="FornecedorFavorites_modalDetailCol">
                                    <div className="FornecedorFavorites_modalDetailText3">
                                        Site
                                    </div>
                                    <a href={dataCurrentDetail.website} target={"_blank"} className="FornecedorFavorites_modalDetailViewLink">
                                        <div className="FornecedorFavorites_modalDetailView">
                                            {dataCurrentDetail.website}
                                        </div>
                                    </a>
                                </Col>
                                <Col xs={24} className="FornecedorFavorites_modalDetailCol">
                                    {/*{*/}
                                    {/*    isLiked === false*/}
                                    {/*        ?*/}
                                    {/*        <div className="FornecedorFavorites_like" onClick={() => {*/}
                                    {/*            onLikedCanal();*/}
                                    {/*        }}>*/}
                                    {/*            FAVORITAR*/}
                                    {/*        </div>*/}
                                    {/*        :*/}
                                    {/*        isLiked === true*/}
                                    {/*            ?*/}

                                    {/*            <div className="FornecedorFavorites_like" onClick={() => {*/}
                                    {/*                onDisLikedCanal();}*/}
                                    {/*            }>*/}
                                    {/*                Desfavoritar*/}
                                    {/*            </div>*/}
                                    {/*            :*/}
                                    {/*            <></>*/}
                                    {/*}*/}
                                    <div className="FornecedorFavorites_like" onClick={() => {
                                        onDisLikedCanal();}
                                    }>
                                        Desfavoritar
                                    </div>
                                </Col>
                            </Row>
                        </div>}
                        <div className="FornecedorFavorites_titleList">
                            <div>
                                Meus Favoritos
                            </div>
                            <div className="FornecedorFavorites_nbList">{data.length}</div>
                        </div>
                        <Table columns={columns} dataSource={data} pagination={false} loading={loadingTable}/>
                    </div>
                    :
                    <div>
                        <div className="FornecedorFavorites_premiumAction">
                            <Link to={links.FORNECEDOR_BUY_PREMIUM} className="FornecedorFavorites_premiumLink">
                                <Button className="FornecedorFavorites_premiumBtn">
                                    <AiOutlinePlus />
                                    <div>
                                        Seja Premium e veja todos os canais que te favoritaram
                                    </div>
                                </Button>
                            </Link>
                            <img src={premiumIcon} alt=""/>
                        </div>
                    </div>
            }
        </div>
    )
}

export default FornecedorFavorites;