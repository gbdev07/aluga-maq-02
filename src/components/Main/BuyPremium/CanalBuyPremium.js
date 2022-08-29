import React, { useContext, useState } from "react";
import moment from "moment";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Premium3Icon from "../../../assets/images/premium3.png";
import premium_type1 from "../../../assets/images/premium_type1.png";
import premium_type2 from "../../../assets/images/premium_type2.png";
import premium_type3 from "../../../assets/images/premium_type3.png";
import "./FornecedorBuyPremium.css"
import { Button, Col, Row } from "antd";
import checkIcon from "../../../assets/images/check.png"
import axios from "axios";
import { REACT_APP_API_BASE_URL, REACT_APP_PAYMENT_ACCESS_TOKEN } from "../../../utils/constants";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import eoLocale from 'date-fns/locale/pt-BR'
import { format } from "date-fns";

const CanalBuyPremium = (props) => {
    const {
        setDataUser,
        loading,
        authInfo,
        setNotiMessage,
    } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    const token = authInfo?.dataUser?.token;
    const premiumExpiration = authInfo?.dataUser?.premiumExpiration ?? null;
    const userId = authInfo?.dataUser?.id;
    const isPremium = (premiumExpiration && moment(premiumExpiration) > moment());

    const onNewPayment = (dataPayment) => {
        setIsLoading(true)
        axios.post(`${REACT_APP_API_BASE_URL}/newpayment`, {
            usuario: userId,
            ...dataPayment
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    // setIsLoading(false)
                    // setSuccess("Verifique seu email para ativar sua conta")
                    // setDataAuth({
                    //     ...initialDataForgotPassword
                    // })
                    paymentApi(res.data.message, dataPayment)
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                setIsLoading(false)
                // setError('Erro, algo deu errado ' + (err.response?.data?.error ?? "") )

            })
    }

    const paymentApi = (idPayment, dataPayment) => {
        axios.post(`https://api.mercadopago.com/checkout/preferences?access_token=${REACT_APP_PAYMENT_ACCESS_TOKEN}`, {
            "notification_url": "https://fit2sell.herokuapp.com/webhookpaymentupdate",
            "external_reference": idPayment,
            "items": [
                {
                    "title": dataPayment["plano"],
                    "quantity": 1,
                    "currency_id": "BRL",
                    "unit_price": dataPayment["valor"],
                    "picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsukewkd6yT1tRrUyP5z6Q-awGcfySUE8cB_eAL3N0cjk2lhyO_4yc1RYY9jPIdOG3zIw&usqp=CAU"
                }
            ]
        })
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data)
                    const sandbox_init_point = res.data.sandbox_init_point;
                    setNotiMessage({
                        type: 'success',
                        message: 'Você será redirecionado para um ambiente seguro de pagamento.'
                    })
                    setTimeout(() => {
                        window.location.href = sandbox_init_point;
                    }, 1000)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 2000)
                    // setSuccess("Verifique seu email para ativar sua conta")
                    // setDataAuth({
                    //     ...initialDataForgotPassword
                    // })

                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                setIsLoading(false)
                // setError('Erro, algo deu errado ' + (err.response?.data?.error ?? "") )
            })
    }


    const listPremiumType = [
        {
            icon: premium_type1,
            text1: 'Gratuito',
            text2: 'Free',
            text3: 'Totalmente Grátis',
            listCheck: [
                'Acesso limitado a canais',
                'Não tem acesso aos fits',
                'Não sabe quem te favoritou'
            ],
            buttonText: 'Gratuito',
            onSubmit: () => {
                setNotiMessage({
                    type: 'info',
                    message: 'Você já possui esse plano, assine o premium e acesse todos os recursos premium da plataforma.'
                })
            },
            textDark: true,
        },
        {
            icon: premium_type2,
            text1: 'Premium 12 meses',
            text2: 'R$: 1.143,00',
            text3: 'por 12 meses',
            listCheck: [
                'Acesso a todos os recursos',
                'Prioridade no suporte',
                'Sabe os canais que te favoritou',
                'Acesso aos fits',
                'desconto de 5% em relação ao plano de 6 meses'],
            buttonText: 'Seja Premium',
            onSubmit: () => {
                onNewPayment({
                    "plano": "PREMIUM 12 MESES",
                    "valor": 1143
                })
            },
            textDark: true,
        },
        {
            icon: premium_type3,
            text1: 'Premium 6 meses',
            text2: 'R$: 762,00',
            text3: 'por 6 meses',
            listCheck: [
                'Acesso a todos os recursos',
                'Prioridade no suporte',
                'Acesso ilimitado a todos os canais',
                'Sabe os canais que te favoritou',
                'Acesso aos fits'
            ],
            buttonText: 'Seja Premium',
            onSubmit: () => {
                onNewPayment({
                    "plano": "PREMIUM 6 MESES",
                    "valor": 762
                })
            }
        }
    ]
    return (
        <div className="FornecedorBuyPremium_container">
            {isLoading && <LoadingAction />}
            {
                isPremium
                    ?
                    <>
                        {/*<div className="FornecedorBuyPremium_doneTitle">*/}
                        {/*    PREMIUM*/}
                        {/*</div>*/}
                        <div className="FornecedorBuyPremium_done">
                            <img src={Premium3Icon} alt="" />
                            <div className="FornecedorBuyPremium_doneText">
                                <div>
                                    Você é um assinante PREMIUM.
                                </div>
                                <div className="FornecedorBuyPremium_doneText2">
                                    {/*Assinatura expira em {moment(premiumExpiration).locale('pt-br').format('LL')}.*/}
                                    Assinatura expira em {format(new Date(premiumExpiration), "d 'de' MMMM yyyy", { locale: eoLocale })}.
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div className="FornecedorBuyPremium_buy">
                        <Row>
                            {
                                listPremiumType.map((item, index) => {
                                    return (
                                        <Col xs={24} md={24} lg={8} xl={8} className="FornecedorBuyPremium_buyBlockCol">
                                            <div className={"FornecedorBuyPremium_buyBlock" + (item.textDark ? " textDark" : " textNotDark")}>
                                                <div className="FornecedorBuyPremium_buyBlockTop">
                                                    <img src={item.icon} alt="" />
                                                </div>
                                                <div>
                                                    {item.text1}
                                                </div>
                                                <div className="text2">
                                                    {item.text2}
                                                </div>
                                                <div>
                                                    {item.text3}
                                                </div>
                                                <div className="FornecedorBuyPremium_buyBlockListCheck">
                                                    {
                                                        item.listCheck.map((itemCheck, indexCheck) => {
                                                            return (
                                                                <div className="FornecedorBuyPremium_buyBlockItemCheck">
                                                                    {/*<img src={checkIcon} alt=""/>*/}
                                                                    <div>
                                                                        ✓
                                                                    </div>
                                                                    <div>
                                                                        {itemCheck}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className="FornecedorBuyPremium_buyBlockTop">
                                                    <Button
                                                        onClick={() => {
                                                            if (typeof item.onSubmit === 'function') {
                                                                item.onSubmit();
                                                            }
                                                        }}
                                                        className="FornecedorBuyPremium_buyBlockButton"
                                                    >
                                                        {item.buttonText}
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
            }
        </div>
    )
}

export default CanalBuyPremium;