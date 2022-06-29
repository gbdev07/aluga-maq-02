import React, {useCallback, useContext, useEffect, useState} from "react";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import "./FornecedorSearchCanais.css"
import {Button, Col, Input, Row, Table} from "antd";
import search2Icon from "../../../assets/images/search2.png"
import {AiOutlinePlus} from "react-icons/ai";
import {AuthContext} from "../../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import moment from "moment";
import * as links from "../../../utils/links";
import premiumIcon from "../../../assets/images/premium3.png";
import _, {debounce} from 'lodash';
import axios from "axios";
import {REACT_APP_API_BASE_URL} from "../../../utils/constants";

const CanalSearchFornecedores = (props) => {
    const {
        setDataUser,
        loading,
        authInfo,
        setNotiMessage
    } = useContext(AuthContext);
    let navigate = useNavigate();
    const email = authInfo?.dataUser?.email;
    const token = authInfo?.dataUser?.token;
    const hasData = !!authInfo?.dataUser?.hasData
    const premiumExpiration = authInfo?.dataUser?.premiumExpiration ?? null;
    const isPremium = !!(premiumExpiration && moment(premiumExpiration) > moment());
    const [isLoading, setIsLoading] = useState(false);
    const [searchTextTemp, setSearchTextTemp] = useState('');
    const [searchText, setSearchText] = useState('');
    const [listCanals, setListCanals] = useState([]);
    const [dataCurrentDetail, setDataCurrentDetail] = useState(null);
    const [loadingTable, setLoadingTable] = useState(false);
    // const []
    const [isLiked, setIsLiked] = useState(null);

    useEffect(() => {
        if (dataCurrentDetail) {
            setLoadingTable(true)
            axios.post(`${REACT_APP_API_BASE_URL}/canal-loves-me`, {
                idFornecedor: dataCurrentDetail.idFornecedor
            }, {
                headers: {
                    "x-access-token": token,
                    "content-type": "application/json"
                }
            })
                .then(res => {
                    setLoadingTable(false)
                    if (res.status === 200 && res.data) {
                        setIsLiked(!!res.data.message)
                    }
                })
                .catch(err => {
                    setLoadingTable(false)
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
    }, [dataCurrentDetail])


    const onLikedCanal = () => {
        if (dataCurrentDetail) {
            setIsLoading(true);
            axios.post(`${REACT_APP_API_BASE_URL}/canal-like-fornecedor`, {
                idFornecedor: dataCurrentDetail.idFornecedor
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
                        setIsLiked(true)
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

    const onDisLikedCanal = () => {
        if (dataCurrentDetail) {
            setIsLoading(true);
            axios.post(`${REACT_APP_API_BASE_URL}/canal-unlike-fornecedor`, {
                idFornecedor: dataCurrentDetail.idFornecedor
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

    const onActionFilter = () => {
        setNotiMessage({
            type: 'info',
            message: '"Funcionalidade em desenvolvimento...'
        })
    }

    const onChangeSearch = (value) => {
        setSearchText(value);
        getData(value);
    }

    // useEffect(() => {
    //     axios.post(`${REACT_APP_API_BASE_URL}/search-canais`, {
    //         description: searchText,
    //         type : "CANAL",
    //         email : email
    //     }, {
    //         headers: {
    //             "x-access-token": token,
    //             "content-type": "application/json"
    //         }
    //     })
    //         .then(res => {
    //             if (res.status === 200 && Array.isArray(res.data)) {
    //                 console.log(res.data)
    //                 setListCanals(res.data);
    //             }
    //         })
    //         .catch(err => {
    //             if ([401, 403].includes(err.response.status)) {
    //                 // setNotiMessage('A sua sessão expirou, para continuar faça login novamente.');
    //                 setNotiMessage({
    //                     type: 'error',
    //                     message: 'A sua sessão expirou, para continuar faça login novamente.'
    //                 })
    //                 setDataUser(null);
    //             }
    //         })
    // }, [searchText])

    const getData = (description) => {

        if (description.trim()!== "") {
            setLoadingTable(true)
            axios.post(`${REACT_APP_API_BASE_URL}/search-fornecedor`, {
                description: description.trim(),
                type: "FORNECEDOR",
                email: email
            }, {
                headers: {
                    "x-access-token": token,
                    "content-type": "application/json"
                }
            })
                .then(res => {
                    setLoadingTable(false)
                    if (res.status === 200 && Array.isArray(res.data)) {
                        setListCanals(res.data);
                    }
                })
                .catch(err => {
                    setLoadingTable(false)
                    if ([401, 403].includes(err.response.status)) {
                        // setNotiMessage('A sua sessão expirou, para continuar faça login novamente.');
                        setNotiMessage({
                            type: 'error',
                            message: 'A sua sessão expirou, para continuar faça login novamente.'
                        })
                        setDataUser(null);
                    }
                })
        } else {
            setListCanals([])
        }
    }
    const debounceUpdate = useCallback(debounce((nextValue) => {
        onChangeSearch(nextValue);
    }, 300), [])
    useEffect(() => {
        if (searchTextTemp !== searchText) {
            debounceUpdate(searchTextTemp)
        }
    }, [searchTextTemp])

    const onOpenModalDetail = (data) => {
        console.log(data)
        setDataCurrentDetail(data)
    }

    const columns = [
        {
            title: 'FORNECEDOR',
            dataIndex: 'nameCompany',
            key: 'nameCompany',
        },
        {
            title: 'DESCRIÇÃO',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'CIDADE',
            dataIndex: 'city',
            key: 'city',
            render: (_, record) => {
                return (
                    <div>
                        {record.city} - {record.state}
                    </div>
                )
            },
        },
        {
            title: 'DETALHAR',
            dataIndex: 'detail',
            key: 'detail',
            render: (_, record) => {
                return (
                    <div
                        className="FornecedorSearchCanais_detailBtn"
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

    const onSearch = () => {
        if (searchText.trim() !==  "") {
            getData(searchText)
        } else {
            if (hasData) {
                setNotiMessage({
                    type: 'warning',
                    message: 'Insira algo para buscar, como por exemplo: marketing ou software ou erp em São Paulo'
                })
            } else {
                setNotiMessage({
                    type: 'success',
                    message: 'Insira algo para buscar, como por exemplo: marketing ou software ou erp em São Paulo'
                })
            }
        }
    }

    return (
        <div className="FornecedorSearchCanais_container">
            {isLoading && <LoadingAction />}
            <div className="FornecedorSearchCanais_title">
                Buscar Fornecedores
            </div>

            <div className="FornecedorSearchCanais_body">
                {dataCurrentDetail && <div className="FornecedorSearchCanais_modalDetail">
                    <div className="FornecedorSearchCanais_modalAction">
                        <div className="FornecedorSearchCanais_modalClose" onClick={() => {
                            setDataCurrentDetail(null)
                            setIsLiked(null)
                        }}>
                            X
                        </div>
                    </div>
                    <Row>
                        <Col xs={24}>
                            <div className="FornecedorSearchCanais_modalDetailText1">
                                {dataCurrentDetail.description ?? ""}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="FornecedorSearchCanais_modalDetailText2">
                                Pessoa Responsável: {dataCurrentDetail.responsiblePerson}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="FornecedorSearchCanais_modalDetailText2">
                                País: {dataCurrentDetail.country}.
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="FornecedorSearchCanais_modalDetailText2">
                                Empresa: R$: {dataCurrentDetail.nameCompany}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="FornecedorSearchCanais_modalDetailText2">
                                Cidade: {dataCurrentDetail.city}
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className="FornecedorSearchCanais_modalDetailText2">
                                Faturamento Anual: {dataCurrentDetail.mediaFaturamentoAnual}
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
                        <Col xs={24} md={24} lg={8} xl={8} className="FornecedorSearchCanais_modalDetailCol">
                            <div className="FornecedorSearchCanais_modalDetailText3">
                                Telefone
                            </div>
                            <a href={`tel:${dataCurrentDetail.phone}`} target={"_blank"} className="FornecedorSearchCanais_modalDetailViewLink">
                                <div className="FornecedorSearchCanais_modalDetailView">
                                    {dataCurrentDetail.phone ?? " "}
                                </div>
                            </a>
                        </Col>
                        <Col xs={24} md={24} lg={8} xl={8} className="FornecedorSearchCanais_modalDetailCol">
                            <div className="FornecedorSearchCanais_modalDetailText3">
                                Whatsapp
                            </div>
                            <a href={`https://wa.me/${dataCurrentDetail.whatsapp}`} target={"_blank"} className="FornecedorSearchCanais_modalDetailViewLink">
                                <div className="FornecedorSearchCanais_modalDetailView">
                                    {dataCurrentDetail.whatsapp ?? " "}
                                </div>
                            </a>
                        </Col>
                        <Col xs={24} md={24} lg={8} xl={8} className="FornecedorSearchCanais_modalDetailCol">
                            <div className="FornecedorSearchCanais_modalDetailText3">
                                Site
                            </div>
                            <a href={dataCurrentDetail.website} target={"_blank"} className="FornecedorSearchCanais_modalDetailViewLink">
                                <div className="FornecedorSearchCanais_modalDetailView">
                                    Clique aqui para acessar.
                                </div>
                            </a>
                        </Col>
                        <Col xs={24} className="FornecedorSearchCanais_modalDetailCol">
                            {
                                isLiked === false
                                    ?
                                    <div className="FornecedorSearchCanais_like" onClick={() => {
                                        onLikedCanal();
                                    }}>
                                        FAVORITAR
                                    </div>
                                    :
                                    isLiked === true
                                        ?

                                        <div className="FornecedorSearchCanais_like" onClick={() => {
                                            onDisLikedCanal();}
                                        }>
                                            Desfavoritar
                                        </div>
                                        :
                                        <></>
                            }

                        </Col>
                    </Row>
                </div>}
                {
                    !dataCurrentDetail &&
                    <>
                        <div className="FornecedorSearchCanais_header">
                            <div className="FornecedorSearchCanais_search">
                                <Input
                                    className="FornecedorSearchCanais_inputSearch"
                                    value={searchTextTemp}
                                    onChange={(event) => {
                                        setSearchTextTemp(event.target.value)
                                    }}
                                    onKeyPress={(event) => {
                                        if(event.key === 'Enter'){
                                            onSearch();
                                        }
                                    }}
                                    disabled={!hasData}
                                />
                                <img src={search2Icon} alt="" onClick={() => {
                                    onSearch()
                                }}/>
                            </div>
                            {isPremium && <Button className="FornecedorSearchCanais_btnSubmit" onClick={() => {
                                // onSave();
                                onActionFilter();
                            }}>
                                <AiOutlinePlus />
                                <div>
                                    Mais filtros
                                </div>
                            </Button>}
                        </div>
                        <div className="FornecedorSearchCanais_content">
                            <div className="FornecedorSearchCanais_titleList">
                                <div>
                                    Resultados Encontrados
                                </div>
                                <div className="FornecedorSearchCanais_nbList">{listCanals.length}</div>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={isPremium ? listCanals : listCanals.slice(0,3)}
                                pagination={false}
                                loading={loadingTable}
                                // noDataContent={}
                                locale={{ emptyText: <div>Não foram encontrados resultados para sua pesquisa.</div> }}
                            />
                        </div>
                        {
                            !isPremium && <>
                                <div className="FornecedorSearchCanais_premiumAction">
                                    <Link to={links.FORNECEDOR_BUY_PREMIUM} className="FornecedorSearchCanais_premiumLink">
                                        <Button className="FornecedorSearchCanais_premiumBtn">
                                            <AiOutlinePlus />
                                            <div>
                                                Seja Premium e Veja Todos Os Resultados.
                                            </div>
                                        </Button>
                                    </Link>
                                    <img src={premiumIcon} alt=""/>
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default CanalSearchFornecedores;