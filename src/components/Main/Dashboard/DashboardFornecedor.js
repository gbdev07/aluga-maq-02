import React, { useContext, useEffect, useState } from "react";
import './Dashboard.css'
import { Button, Col, Modal, Row, Table } from "antd";
import block1 from "../../../assets/images/block1.png"
import block2 from "../../../assets/images/block2.png"
import block3 from "../../../assets/images/block3.png"
import premiumIcon from "../../../assets/images/premium.png"
import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../../../utils/constants";
import * as links from "../../../utils/links";
import { AuthContext } from "../../../contexts/AuthContext";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import ArrowBottomIcon from "../../../assets/images/arrow_bottom.png"
import premium2Icon from "../../../assets/images/premium2.png"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import { format } from "date-fns";
import eoLocale from "date-fns/locale/pt-BR";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown , faArrowsRotate, faCheckCircle, faXmarkCircle} from '@fortawesome/free-solid-svg-icons';

const DashboardFornecedor = (props) => {
    const {
        setDataUser,
        loading,
        authInfo,
        setNotiMessage
    } = useContext(AuthContext);
    const {
        dataUser
    } =  authInfo;
    let navigate = useNavigate();
    const token = authInfo?.dataUser?.token;
    const premiumExpiration = authInfo?.dataUser?.premiumExpiration ?? null;
    const hasData = !!authInfo?.dataUser?.hasData
    const [favorites, setFavorites] = useState([]);
    const [meusFits, setMeusFits] = useState(null);
    const [totalCanais, setTotalCanais] = useState(null);
    const [totalFornecedores, setTotalFornecedores] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dataCurrentDetail, setDataCurrentDetail] = useState(null);

    // useEffect(() => {
    //     dataData();
    // }, [])

    useEffect(() => {
        dataData();
    
        const intervalId = setInterval(() => {
            dataData(); 
        }, 60000);  
    
        // Limpar o intervalo quando o componente for desmontado para evitar vazamento de memória
        return () => clearInterval(intervalId);
    }, []);

    const dataData = () => {
        setIsLoading(true)
        axios.get(`${REACT_APP_API_BASE_URL}/maquinas`, {
            headers: {
                "x-access-token": token,
                "content-type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setIsLoading(false);
                    setTotalFornecedores(res.data);
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


    const handleMaquinaClick = (id, nome, storeId, pulso) => {
        const maquinaInfos = {nome, storeId, pulso};
        navigate(`${links.FORNECEDOR_SEARCH_CANAIS}/${id}`, { state: maquinaInfos });
    }

    return (
        <div className="Dashboard_container">
            {isLoading && <LoadingAction />}
                {/* <div className="WarningMsg">
                    {dataUser.warningMsg}
                </div> */}
                <div className="Dashboard_staBlockTitle">
                    Monitoramento
                </div>
                <Button style={{marginLeft: '15px'}} onClick={dataData}>
                <FontAwesomeIcon icon={faArrowsRotate} style={{marginRight: '5px'}}/>
                    Atualizar
                </Button>
            <Row>
                {totalFornecedores.map(post => (
                    <Col xs={24} md={24} lg={8} xl={8} className="Dashboard_col">

                        <div className='maquina' key={post.id} onClick={() => handleMaquinaClick(post.id, post.nome, post.store_id, post.pulso)}>
                        <div className='maquina-info'>
                            {(() => {
                            switch (post.status) {
                                case 'ONLINE':
                                return <FontAwesomeIcon icon={faCheckCircle} color={'green'} className="logout-icon fa-3x"/>;
                                case 'OFFLINE':
                                return <FontAwesomeIcon icon={faXmarkCircle} color={'red'} className="logout-icon fa-3x"/>;
                                case 'PAGAMENTO_RECENTE':
                                return <FontAwesomeIcon icon={faCheckCircle} color={'blue'} className="logout-icon fa-3x"/>;
                                default:
                                return null;
                            }
                            })()}
                            <h2>{post.nome}</h2>
                            <h4 style={{ fontWeight: '300' }}>{post.status} - {post.descricao}</h4>
                        </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default DashboardFornecedor;
