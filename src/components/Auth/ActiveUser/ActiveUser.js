import "./ActiveUser.css";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import axios from "axios";
import {REACT_APP_API_BASE_URL} from "../../../utils/constants";
import logo from "../../../assets/images/logo.png";
import * as links from "../../../utils/links"
import {NotificationContainer, NotificationManager} from 'react-notifications';

const ActiveUser = (props) => {
    const params = useParams();
    const {
        token
    } = params;
    const [isLoading, setIsLoading] = useState(true);
    const [checkDone, setCheckDone] = useState(null);
    useEffect(() => {
        console.log('BBBBBBBBBBBBBBBBBBBBBBBB')
        if (token) {
            axios.put(`${REACT_APP_API_BASE_URL}/activateuser`, {
                id: token
            })
                .then(res => {
                    if (res.status === 200) {
                        setIsLoading(false)
                        setCheckDone(true);
                        NotificationManager.success('Operação Realizada com Sucesso.', 'Sucesso!');
                    } else {
                        throw new Error();
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    setCheckDone(false)
                    NotificationManager.error('Aconteceu algum problema, já estamos dando uma olhada... suporte@fit2sell.com.br', 'Hmm... ');
                })
            // return () => {
            //     ourRequest.cancel() // <-- 3rd step
            // }
        } else {
            setIsLoading(false);
            setCheckDone(false)
            NotificationManager.error('Aconteceu algum problema, já estamos dando uma olhada... suporte@fit2sell.com.br', 'Hmm... ');

        }
    }, [])

    return (
        <div className="ActiveUser_container">
            <NotificationContainer/>
            {isLoading
                ?
                <LoadingAction/>
                :
                <div className="ActiveUser_messageActive">
                    <div className="ActiveUser_messageActiveTop">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="ActiveUser_logoText">
                        Fit2Sell
                    </div>
                    {
                        checkDone === true
                        ?
                            <div className="ActiveUser_messageActiveSuccess">
                                Sua conta está ativa.
                            </div>
                            :
                            checkDone === false
                            ?

                                <div className="ActiveUser_messageActiveError">
                                <div>
                                    Aconteceu algum erro ao tentar
                                    ativar sua conta.
                                </div>

                                <a href="mailto:suporte@fit2sell.com.br">suporte@fit2sell.com.br.</a>
                            </div>
                                :
                                <></>
                    }
                    <div className="ActiveUser_messageActiveBottom">
                        <Link
                            to={links.SIGNIN}
                            className="ActiveUser_loginBtn"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default ActiveUser;
