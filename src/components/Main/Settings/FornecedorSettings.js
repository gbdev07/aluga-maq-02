import React, {useContext, useState} from "react";
import "./FornecedorSettings.css"
import {AuthContext} from "../../../contexts/AuthContext";
import {Link, useLocation} from "react-router-dom";
import moment from "moment";
import premiumIcon from "../../../assets/images/premium3.png"
import {AiOutlinePlus} from "react-icons/ai"
import {Button, Input} from "antd";
import {format} from "date-fns";
import eoLocale from "date-fns/locale/pt-BR";
import * as links from "../../../utils/links"
import axios from "axios";
import {REACT_APP_API_BASE_URL} from "../../../utils/constants";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
const FornecedorSettings = (props) => {

    const {
        setDataUser,
        loading,
        authInfo,
        notiMessage,
        setNotiMessage
    } = useContext(AuthContext);
    console.log(authInfo?.dataUser)
    const email = authInfo?.dataUser?.premiumExpiration ?? '';
    const token = authInfo?.dataUser?.token;
    const premiumExpiration = authInfo?.dataUser?.premiumExpiration ?? null;
    const isPremium = (premiumExpiration && moment(premiumExpiration) > moment());
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [errorfeedbackText, setErrorfeedbackText] = useState(null);

    const sendFeedback = () => {
        if (feedbackText.trim().length >= 10) {
            setIsLoading(true)
            axios.post(`${REACT_APP_API_BASE_URL}/send-feedback`, {
                feedback: feedbackText,
            }, {
                headers: {
                    "x-access-token": token,
                    "content-type": "application/json"
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setNotiMessage({
                            type: 'success',
                            message: 'Feedback enviado com sucesso!'
                        })
                        setIsLoading(false)
                        setFeedbackText('');
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
        } else {
            setErrorfeedbackText('Min caracteres 10.')
        }
    }
    return (
        <div className="FornecedorSettings_container">
            {isLoading && <LoadingAction />}
            <div className="FornecedorSettings_top">
                <div className="FornecedorSettings_title">
                    Configurações
                </div>
                <div className="FornecedorSettings_content">
                    <div className="FornecedorSettings_info">
                        <div>
                            Email: {email}
                        </div>
                        <div>
                            Conta criada em 16 de Junho  de 2022.
                        </div>
                        <div>
                            Plano: {isPremium ? "Premium" : "Basic"}.
                        </div>
                        {
                            isPremium
                                ?
                                <div>
                                    Expira em {Math.ceil(moment.duration(moment(premiumExpiration).diff(moment())).asDays())} dias em {format(new Date(premiumExpiration), "d 'de' MMMM yyyy", { locale: eoLocale })}.
                                </div>
                                :
                                <div className="FornecedorSettings_premiumAction">
                                    <Link to={links.FORNECEDOR_BUY_PREMIUM} className="FornecedorSettings_premiumLink">
                                        <Button className="FornecedorSettings_premiumBtn">
                                            <AiOutlinePlus />
                                            <div>Seja Premium</div>
                                        </Button>
                                    </Link>
                                    <img src={premiumIcon} alt=""/>
                                </div>
                        }

                    </div>
                    {
                        isPremium && <div className="FornecedorSettings_premium">
                            <img src={premiumIcon} alt=""/>
                        </div>
                    }
                </div>
                <div className="FornecedorSettings_feedback">
                    <div className="FornecedorSettings_feedbackTitle">
                        Envie-nos um feedback
                    </div>
                    <Input
                        className="FornecedorSettings_feedbackInput"
                        value={feedbackText}
                        onChange={(event) => {
                            setFeedbackText(event.target.value)
                            setErrorfeedbackText(null)
                        }}
                    />
                    {
                        errorfeedbackText && <div className="FornecedorSettings_errorfeedbackText">
                            {errorfeedbackText}
                        </div>
                    }
                    <div className="FornecedorSettings_feedbackDescription">
                        Exemplo: Gostei da página de busca, pois encontrei facilmente um canal quando digitei apenas a cidade. (Tamanho Máximo: 500 caracteres, Mínimo 10)
                    </div>
                    <Button className="FornecedorSettings_feedbackButton" onClick={() => {
                        sendFeedback();
                    }}>
                        ENVIAR
                    </Button>
                </div>
            </div>

            <div className="FornecedorSettings_bottom">
                <a href="mailto:suporte@fit2sell.com.br" className="FornecedorSettings_LinkRemove">
                    <Button className="FornecedorSettings_buttonRemove" >
                        <div> － </div>
                        <div>Remover minha conta</div>
                    </Button>
                </a>
            </div>
        </div>
    )
}

export default FornecedorSettings;