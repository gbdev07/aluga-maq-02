import "./SignIn.css";
import axios from "axios";
import React, {useContext, useState} from "react";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import Auth from "../Auth/Auth";
import * as links from '../../../utils/links'
import signin from "../../../assets/images/signin.png";
import {CANAL, REACT_APP_API_BASE_URL} from "../../../utils/constants";
import {AuthContext} from "../../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const initialDataSignIn = {
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


const SignIn = (props) => {
    const {
        type
    } = props;
    const {
        setDataUser,
        loading
    } = useContext(AuthContext)
    let navigate = useNavigate();

    const [dataAuth, setDataSingUp] = useState({...initialDataSignIn});
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
        if (dataAuth.password.trim() === '') {
            dataErrorField = {
                ...dataErrorField,
                password: 'Senha obrigatória'
            }
        } else if (dataAuth.password.trim().length < 6) {
            dataErrorField = {
                ...dataErrorField,
                password: 'Senha tem que ter no mínimo 6 dígitos.'
            }
        }
        console.log(dataErrorField)
        setSuccess(false)
        if (Object.keys(dataErrorField).length === 0) {
            setIsLoading(true)
            setError(null)
            axios.post(`${REACT_APP_API_BASE_URL}/login`, {
                password: dataAuth.password,
                email: dataAuth.email.trim(),
            })
                .then(res => {
                    if (res.status === 200) {
                        setIsLoading(false)
                        setSuccess(true)
                        setDataSingUp({
                            ...initialDataSignIn
                        })
                        setDataUser({
                            ...res.data,
                        })
                        navigate(res.data.type === CANAL ? links.DASHBOARD_CANAL : links.DASHBOARD_FORNECEDOR)

                    } else {
                        throw new Error();
                    }
                })
                .catch(err => {
                    setIsLoading(false)

                    if (err.response.status === 500) {
                        setError('Usuário já existe, <a target="_blank" href='+links.FORGOTPASSWORD+'>esqueceu sua senha<a/>?')
                    } else {
                        setError('Erro, algo deu errado ' + (err.response?.data?.error ?? "") )
                    }
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
                authTitle={type === CANAL ? 'Faça seu login' : 'Faça seu login'}
                authDescription={type === CANAL ? "Entre com suas informações de cadastro." : "Entre com suas informações de cadastro."}
                authFields={[
                    {
                        label: 'E-mail',
                        placeholder: 'Digite seu e-mail',
                        name: 'email',
                        value: dataAuth?.email ?? "",
                        type: 'text',
                        setField: (value) => {
                            setDataSingUp(prev => ({
                                ...prev,
                                email: value
                            }))
                            setErrorField(prev => ({
                                ...prev,
                                email: undefined
                            }))
                        },
                        error: errorField?.email ?? ""
                    },
                    {
                        label: 'Senha',
                        placeholder: 'Digite sua senha',
                        name: 'password',
                        value: dataAuth?.password ?? "",
                        type: 'password',
                        setField: (value) => {
                            setDataSingUp(prev => ({
                                ...prev,
                                password: value
                            }))
                            setErrorField(prev => ({
                                ...prev,
                                password: undefined
                            }))
                        },
                        error: errorField?.password ?? ""
                    },
                ]}
                authSubmit={"Entrar"}
                authFooter={[
                    {
                        text1: 'Não tem uma conta?',
                        text2: 'Registre-se',
                        link: type === CANAL ? links.SIGNUP_CANAL: links.SIGNUP_FORNECEDOR
                    },
                    {
                        text1: 'Registrar-se como',
                        text2: type === CANAL ? 'Fornecedor' : 'Canal',
                        link: type === CANAL ? links.SIGNUP_FORNECEDOR : links.SIGNUP_CANAL
                    }
                ]}
                authImage={type === CANAL ? signin : signin}
                onsubmit={() => {
                    onsubmit()
                }}
                successMessage={success ? 'Usuário cadastrado com sucesso!' : ""}
                errorMessage={error ?? ""}
                textImage={
                    type === CANAL ?
                        <div className="SignIn_textImage1">
                            <div className="SignIn_textTitle">
                                Fit2Sell
                            </div>
                            <div className="SignIn_textDescription">
                                Facilitando a vida de Fornecedores e Canais.
                            </div>
                        </div>
                        :
                        <div className="SignIn_textImage1">
                            <div className="SignIn_textTitle">
                                Fit2Sell
                            </div>
                            <div className="SignIn_textDescription">
                                Facilitando a vida de Fornecedores e Canais.
                            </div>
                        </div>
                }
                isSignIn={true}
            />
        </>
    )
}

export default SignIn;
