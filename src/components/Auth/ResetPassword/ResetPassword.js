import "./ResetPassword.css";
import axios from "axios";
import React, {useContext, useState} from "react";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import Auth from "../Auth/Auth";
import * as links from '../../../utils/links'
import resetpassword from "../../../assets/images/resetpassword.png";
import {CANAL, REACT_APP_API_BASE_URL} from "../../../utils/constants";
import {AuthContext} from "../../../contexts/AuthContext";
import {useParams, useNavigate} from "react-router-dom";
const initialDataSignIn = {
    password: '',
    confirmPassword: ''
}

const initErrorField = {
    confirmPassword: undefined,
    password: undefined,
}


const ResetPassword = (props) => {
    const params = useParams();
    const {
        token
    } = params;
    const {
        setDataUser,
        loading
    } = useContext(AuthContext)
    let navigate = useNavigate();

    const [dataAuth, setDataAuth] = useState({...initialDataSignIn});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [errorField, setErrorField] = useState({...initErrorField});
    const [isLoading, setIsLoading] = useState(false)

    const onsubmit = () => {
        let dataErrorField = {};

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
        if (dataAuth.confirmPassword.trim() === '') {
            dataErrorField = {
                ...dataErrorField,
                confirmPassword: 'Senha obrigatória'
            }
        } else if (dataAuth.confirmPassword.trim().length < 6) {
            dataErrorField = {
                ...dataErrorField,
                confirmPassword: 'Senha tem que ter no mínimo 6 dígitos.'
            }
        }
        if (dataAuth.password.trim() !== dataAuth.confirmPassword.trim()) {
            dataErrorField = {
                ...dataErrorField,
                confirmPassword: 'As senhas precisam ser iguais'
            }
        }
        console.log(dataErrorField)
        setSuccess(false)
        if (Object.keys(dataErrorField).length === 0) {
            setIsLoading(true)
            setError(null)
            axios.put(`${REACT_APP_API_BASE_URL}/setnewpassword`, {
                password: dataAuth.password,
            }, {
                headers: {
                    "X-Auth-Token": token,
                    "content-type": "application/json"
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setIsLoading(false)
                        setSuccess(true)
                        navigate(links.SIGNIN_CANAL)
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
                authTitle={'Redefinição de Senha'}
                authDescription={'Crie uma nova senha para acessar sua conta.'}
                authFields={[
                    {
                        label: 'Senha',
                        placeholder: 'Digite sua senha',
                        name: 'password',
                        value: dataAuth?.password ?? "",
                        type: 'password',
                        setField: (value) => {
                            setDataAuth(prev => ({
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
                        label: 'Repita sua Nova Senha',
                        placeholder: 'Digite sua nova senha novamente',
                        name: 'confirmPassword',
                        value: dataAuth?.confirmPassword ?? "",
                        type: 'password',
                        setField: (value) => {
                            setDataAuth(prev => ({
                                ...prev,
                                confirmPassword: value
                            }))
                            setErrorField(prev => ({
                                ...prev,
                                confirmPassword: undefined
                            }))
                        },
                        error: errorField?.confirmPassword ?? ""
                    },
                ]}
                authSubmit={"redefinir"}
                authFooter={[
                    {
                        text1: 'Voltar para ',
                        text2: 'Login.',
                        link: links.SIGNIN_CANAL
                    }
                ]}
                authImage={resetpassword}
                onsubmit={() => {
                    onsubmit()
                }}
                successMessage={success ? 'Usuário cadastrado com sucesso!' : ""}
                errorMessage={error ?? ""}
                textImage={
                    <div className="ResetPassword_textImage1">
                        <div className="ResetPassword_textTitle">
                            Fit2Sell
                        </div>
                        <div className="ResetPassword_textDescription">
                            Facilitando a vida de Fornecedores e Canais.
                        </div>
                    </div>
                }
                isForgotPassword={true}
            />
        </>
    )
}

export default ResetPassword;
