import React, {useCallback, useContext, useEffect, useState} from "react";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import "./FornecedorSearchCanais.css"
import {Button, Col, Input, Row, Table} from "antd";
import search2Icon from "../../../assets/images/search2.png"
import {AiOutlinePlus} from "react-icons/ai";
import {AuthContext} from "../../../contexts/AuthContext";
import {Link, useNavigate, useLocation} from "react-router-dom";
import moment from "moment";
import * as links from "../../../utils/links";
import premiumIcon from "../../../assets/images/premium3.png";
import _, {debounce} from 'lodash';
import axios from "axios";
import {REACT_APP_API_BASE_URL} from "../../../utils/constants";
import { useParams } from 'react-router-dom';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const FornecedorSearchCanais = (props) => {
    const location = useLocation();
    const maquinaInfos = location.state;
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
    // const [searchText, setsearchText] = useState('');
    const [searchText, setSearchText] = useState('');
    const [listCanals, setListCanals] = useState([]);
    const [estornos, setEstornos] = useState('');
    const [total, setTotal] = useState('');
    const [dataCurrentDetail, setDataCurrentDetail] = useState(null);
    const [loadingTable, setLoadingTable] = useState(false);
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFim, setDataFim] = useState(null);

    // const []
    const [isLiked, setIsLiked] = useState(null);
    const { id } = useParams();
    const { RangePicker } = DatePicker;

    useEffect(() => {
        if (dataCurrentDetail) {
            setLoadingTable(true)
            axios.post(`${REACT_APP_API_BASE_URL}/fornecedor-loves-me`, {
                idCanal: dataCurrentDetail.idCanal
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

    useEffect(() => {
        getData(id);
    }, [])

    const getData = (id) => {
        if (id.trim()!== "") {
            setLoadingTable(true)
            axios.get(`${REACT_APP_API_BASE_URL}/pagamentos/${id}`, {
                headers: {
                    "x-access-token": token,
                    "content-type": "application/json"
                }
            })
                .then(res => {
                    setLoadingTable(false)
                    setEstornos(res.data.estornos);
                    setTotal(res.data.total);
                    if (res.status === 200 && Array.isArray(res.data.pagamentos)) {
                        setListCanals(res.data.pagamentos);
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
    }
    
    const getPaymentsPeriod = (dataInicio, dataFim) => {

        if (id.trim()!== "") {
            setLoadingTable(true)
            const url = `${REACT_APP_API_BASE_URL}/pagamentos-periodo/${id}`;
            axios.post(url, {
                dataInicio: dataInicio + "T00:00:00.000Z",
                dataFim: dataFim + "T23:59:00.000Z",
                }, {
                headers: {
                    "x-access-token": token,
                    "content-type": "application/json",
                },
                })
                .then(res => {
                    setLoadingTable(false)
                    setEstornos(res.data.estornos);
                    setTotal(res.data.total);
                    if (res.status === 200 && Array.isArray(res.data.pagamentos)) {
                        setListCanals(res.data.pagamentos);
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
    }

    const columns = [
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
            width: 500,
            render: (data) => (
                <span>{moment(data).utc().format("DD/MM/YYYY HH:mm:ss")}</span>
              ),
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key: 'valor',
            render: (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor),
        },
        {
            title: 'Identificador MP',
            dataIndex: 'mercadoPagoId',
            key: 'mercadoPagoId',
        },
        {
            title: 'Estornado',
            dataIndex: 'estornado',
            key: 'estornado',
            width: 100,
            render: (estornado, record) => (
                estornado ? (
                  <OverlayTrigger
                    key={record.key}
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top-${record.key}`}>
                        {record.motivoEstorno ? record.motivoEstorno : "Sem motivo registrado"}
                      </Tooltip>
                    }
                  >
                    <span
                      style={{ color: 'gray', cursor: 'pointer' }}
                    >
                      {estornado ? 'Estornado' : 'Recebido'}
                    </span>
                  </OverlayTrigger>
                ) : (
                  <span style={{ color: estornado ? 'gray' : 'green'}}>{estornado ? 'Estornado' : 'Recebido'}</span>
                )
              ),
            // render: (estornado) => (
            //     <span style={{ color: estornado ? 'gray' : 'green'}}>
            //       {estornado ? 'Estornado' : 'Recebido'}
            //     </span>
            //   ),
        }
    ];


    // return (
    //     <div className="FornecedorSearchCanais_container">
    //         {isLoading && <LoadingAction />}
    //         <div className="FornecedorSearchCanais_body">
    //                     <div className="FornecedorSearchCanais_content">
    //                         <div className="FornecedorSearchCanais_titleList">
    //                             <div>
    //                                 Total
    //                             </div>
    //                             <div className="FornecedorSearchCanais_nbList">{total}</div>
    //                             <div style={{marginLeft: '20px'}}>
    //                                 Estornos
    //                             </div>
    //                             <div className="FornecedorSearchCanais_nbList">{estornos}</div>
    //                         </div>
    //                         <Table
    //                             columns={columns}
    //                             dataSource={listCanals}
    //                             pagination={false}
    //                             loading={loadingTable}
    //                             locale={{ emptyText: (searchText.trim() !== "") ? <div>Não foram encontrados resultados para sua pesquisa.</div> : <div>Não Informado.</div>}}
    //                         />
    //                     </div>
    //         </div>
    //     </div>
    // )

    return (
        <div className="FornecedorSearchCanais_container">
          {isLoading && <LoadingAction />}
            <div className="Dashboard_staBlockTitle">
                {maquinaInfos.nome}
            </div>
          <div className="FornecedorSearchCanais_body">
            <div className="FornecedorSearchCanais_content">
              <div className="FornecedorSearchCanais_datePicker">
                {/* <span> Filtro por data:</span> */}
                <FontAwesomeIcon style={{marginBottom: '10px', marginRight: '10px'}}icon={faSearch} onClick={() =>  getPaymentsPeriod(dataInicio, dataFim)}></FontAwesomeIcon>
                <RangePicker
                  style={{border: '1px solid', borderRadius: '4px'}}
                  placeholder={['Data Inicial', 'Data Final']}
                  onChange={(dates, dateStrings) => {
                    setDataInicio(dateStrings ? dateStrings[0] : null);
                    setDataFim(dateStrings ? dateStrings[1] : null);
                  }}
                />
              </div>
              <div className="FornecedorSearchCanais_titleList" style={{marginBottom: '10px'}}>
                <div>Total</div>
                <div className="FornecedorSearchCanais_nbList">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</div>
                <div style={{ marginLeft: "20px" }}>Estornos</div>
                <div className="FornecedorSearchCanais_nbList">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(estornos)}</div>
                <div style={{ marginLeft: "20px" }}>Pulso</div>
                <div className="FornecedorSearchCanais_nbList">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(maquinaInfos.pulso)}</div>
                <div style={{ marginLeft: "20px" }}>Store ID</div>
                <div className="FornecedorSearchCanais_nbList">{maquinaInfos.storeId}</div>
              </div>
              <Table
                columns={columns}
                dataSource={listCanals}
                pagination={false}
                loading={loadingTable}
                locale={{
                  emptyText: searchText.trim() !== "" ? (
                    "-"
                      ) : (
                      <div>Não foram encontrados resultados para sua pesquisa.</div>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      );
}

export default FornecedorSearchCanais;