import "./SignUp.css";
import axios from "axios";
import React, { useState} from "react";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import Auth from "../Auth/Auth";
import * as links from '../../../utils/links'
import signup_1 from "../../../assets/images/signup_1.png";
import signup_2 from "../../../assets/images/signup_2.png";
import {CANAL, REACT_APP_API_BASE_URL} from "../../../utils/constants";

const initialDataSignUp = {
    email: '',
    name: '',
    password: '',
    isAgree: false,
}

const initErrorField = {
    email: undefined,
    name: undefined,
    password: undefined,
    isAgree: undefined,
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const SignUp = (props) => {
    const {
        type
    } = props;
    console.log(type)
    const [dataAuth, setDataSingUp] = useState({...initialDataSignUp});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [errorField, setErrorField] = useState({...initErrorField});
    const [isLoading, setIsLoading] = useState(false)

    const onsubmit = () => {
        let dataErrorField = {};

        if (dataAuth.name.trim() === '') {
            dataErrorField = {
                ...dataErrorField,
                name: 'Nome é obrigatório.'
            }
        } else if (dataAuth.name.trim().length > 20) {
            dataErrorField = {
                ...dataErrorField,
                name: 'Nome não pode ter mais que 20 caracteres'
            }
        }
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
        if (!dataAuth.isAgree) {
            dataErrorField = {
                ...dataErrorField,
                isAgree: 'Para criar uma conta é necessário concordar com os Termos de Uso.'
            }
        }
        setSuccess(false)
        if (Object.keys(dataErrorField).length === 0) {
            setIsLoading(true)
            setError(null)
            axios.post(`${REACT_APP_API_BASE_URL}/usuario`, {
                name: dataAuth.name,
                password: dataAuth.password,
                email: dataAuth.email.trim(),
                type: type
            })
                .then(res => {
                    if (res.status === 200) {
                        setIsLoading(false)
                        setSuccess(true)
                        setDataSingUp({
                            ...initialDataSignUp
                        })
                    } else {
                        throw new Error();
                    }
                })
                .catch(err => {
                    console.log(err.response)
                    setIsLoading(false)
                    setError(err.response?.data?.error ?? "erro" )
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
                authTitle={type === CANAL ? 'Novo Canal' : 'Novo Fornecedor'}
                authDescription={type === CANAL ? "Você está se registrando como um Canal" : "Você está se registrando como um Fornecedor"}
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
                        label: 'Nome',
                        placeholder: 'Digite seu nome',
                        name: 'name',
                        value: dataAuth?.name ?? "",
                        type: 'text',
                        setField: (value) => {
                            setDataSingUp(prev => ({
                                ...prev,
                                name: value
                            }))
                            setErrorField(prev => ({
                                ...prev,
                                name: undefined
                            }))
                        },
                        error: errorField?.name ?? ""
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
                    {
                        label: 'Concordo com os <a target="_blank" href="https://docs.google.com/document/d/1PdeTd7O6TxMojMP88dhLWIhalbQVkP9spRxvxXHod9I/edit?usp=sharing">Termos de Uso</a>',
                        name: 'isAgree',
                        value: !!dataAuth?.isAgree,
                        type: 'checkbox',
                        setField: (value) => {
                            setDataSingUp(prev => ({
                                ...prev,
                                isAgree: value
                            }))
                            setErrorField(prev => ({
                                ...prev,
                                isAgree: undefined
                            }))
                        },
                        error: errorField?.isAgree ?? ""
                    }
                ]}
                authSubmit={"criar conta"}
                authFooter={[
                    {
                        text1: 'Voltar para',
                        text2: 'Login',
                        link: type === CANAL ? links.SIGNIN_CANAL: links.SIGNIN_FORNECEDOR
                    },
                    {
                        text1: 'Registrar-se como',
                        text2: type === CANAL ? 'Fornecedor' : 'Canal',
                        link: type === CANAL ? links.SIGNUP_FORNECEDOR : links.SIGNUP_CANAL
                    }
                ]}
                authImage={type === CANAL ? signup_1 : signup_2}
                onsubmit={() => {
                    onsubmit()
                }}
                successMessage={success ? 'Usuário cadastrado com sucesso!' : ""}
                errorMessage={error ?? ""}
                textImage={
                    type === CANAL ?
                    <div className="textImage1">
                        <div className="textTitle">
                            Fit2Sell
                        </div>
                        <div className="textDescription">
                            Seja um Canal e encontre Fornecedores que atuam no seu segmento de negócio.
                        </div>
                    </div>
                         :
                        <div className="textImage2">
                            <div className="textTitle">
                                Fit2Sell
                            </div>
                            <div className="textDescription">
                                Seja um Canal e encontre Fornecedores que atuam no seu segmento de negócio.
                            </div>
                        </div>
                }
            />
        </>
    )
}

export default SignUp;
