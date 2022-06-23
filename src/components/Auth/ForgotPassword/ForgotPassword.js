import "./ForgotPassword.css";
import axios from "axios";
import React, {useContext, useState} from "react";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import Auth from "../Auth/Auth";
import * as links from '../../../utils/links'
import forgotpassword from "../../../assets/images/forgotpassword.png";
import {CANAL, REACT_APP_API_BASE_URL} from "../../../utils/constants";

const initialDataForgotPassword = {
    email: '',
    password: '',
}

const initErrorField = {
    email: undefined,
    password: undefined,
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const ForgotPassword = (props) => {
    const [dataAuth, setDataAuth] = useState({...initialDataForgotPassword});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [errorField, setErrorField] = useState({...initErrorField});
    const [isLoading, setIsLoading] = useState(false)

    const onsubmit = () => {
        let dataErrorField = {};
        if (dataAuth.email.trim() === '') {
            dataErrorField = {
                ...dataErrorField,
                email: 'Email obrigatório.'
            }
        } else if (!validateEmail(dataAuth.email.trim())) {
            dataErrorField = {
                ...dataErrorField,
                email: 'Email inválido.'
            }
        }
        console.log(dataErrorField)
        setSuccess(false)
        if (Object.keys(dataErrorField).length === 0) {
            setIsLoading(true)
            setError(null)
            axios.post(`${REACT_APP_API_BASE_URL}/forgotpassword`, {
                email: dataAuth.email.trim(),
            })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data)
                        setIsLoading(false)
                        setSuccess("Verifique seu email para ativar sua conta")
                        setDataAuth({
                            ...initialDataForgotPassword
                        })

                    } else {
                        throw new Error();
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    setError('Erro, algo deu errado ' + (err.response?.data?.error ?? "") )

                })
        } else {
            setErrorField(prev => {
                return {
                    ...prev,
                    ...dataErrorField
                }
            })
        }

    }

    console.log(errorField)

    return (
        <>
            {isLoading && <LoadingAction />}
            <Auth
                authTitle={'Redefinição de Senha'}
                authDescription={"Informe seu email que te enviaremos um link para redefinir sua senha."}
                authFields={[
                    {
                        label: 'E-mail',
                        placeholder: 'Digite seu e-mail',
                        name: 'email',
                        value: dataAuth?.email ?? "",
                        type: 'text',
                        setField: (value) => {
                            setDataAuth(prev => ({
                                ...prev,
                                email: value
                            }))
                            setErrorField(prev => ({
                                ...prev,
                                email: undefined
                            }))
                        },
                        error: errorField?.email ?? ""
                    }
                ]}
                authSubmit={"redefinir"}
                authFooter={[
                    {
                        text1: 'Voltar para ',
                        text2: 'Login.',
                        link: links.SIGNIN
                    }
                ]}
                authImage={forgotpassword}
                onsubmit={() => {
                    onsubmit()
                }}
                successMessage={success ?? ""}
                errorMessage={error ?? ""}
                textImage={
                    <div className="ForgotPassword_textImage1">
                        <div className="ForgotPassword_textTitle">
                            Fit2Sell
                        </div>
                        <div className="ForgotPassword_textDescription">
                            Facilitando a vida de Fornecedores e Canais.
                        </div>
                    </div>
                }
                isForgotPassword={true}
            />
        </>
    )
}

export default ForgotPassword;
