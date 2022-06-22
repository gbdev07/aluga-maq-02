import "./Login.css";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
// import LogoLogin from "./../../assets/images/logo_login.png"
import LabelAndInput from "../../../themes/LabelAndInput/LabelAndInput";
import {NavLink} from "react-router-dom";
import axios from "axios";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";

const initialDataLogin = {
    id: '',
    password: '',
    remember: false
}
const initErrorField = {
    password: undefined,
    id: undefined,
}
const SignIn = () => {
    const {
        authInfo,
        setDataUser
    } = useContext(AuthContext)


    const [dataLogin, setDataLogin] = useState({...initialDataLogin});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [errorField, setErrorField] = useState({...initErrorField});
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const DataLoginParse = localStorage.getItem("dataLogin");
        if (DataLoginParse) {
            const dataLoginInitial = JSON.parse(DataLoginParse);
            if (dataLoginInitial.remember) {
                setDataLogin({
                    ...initialDataLogin,
                    ...dataLoginInitial
                })
            }
        }
    }, [])

    const onChange = (e) => {
        const name = e.currentTarget.name;
        const newValue = name === "remember" ? e.currentTarget.checked : e.currentTarget.value;
        setDataLogin(prev => {
            return {
                ...prev,
                [name]: newValue
            }
        })
        setErrorField(prev => {
            return {
                ...prev,
                [name]: null
            }
        })
    }
    const onsubmit = () => {
        let dataErrorField = {};
        if (dataLogin.id.trim() == '') {
            dataErrorField = {
                ...dataErrorField,
                id: 'ID é obrigatório.'
            }
        }
        if (dataLogin.password.trim() == '') {
            dataErrorField = {
                ...dataErrorField,
                password: 'Senha é obrigatória.'
            }
        } else if (dataLogin.password.trim().length < 6) {
            dataErrorField = {
                ...dataErrorField,
                password: 'Senha precisa ter no mínimo 6 dígitos.'
            }
        }
        if (Object.keys(dataErrorField).length === 0) {
            setIsLoading(true)
            setError(null)
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
                id: Number(dataLogin.id),
                password: dataLogin.password,
            })
                .then(res => {
                    if (res.status === 200) {
                        setDataUser(res.data);
                        if (dataLogin.remember) {
                            localStorage.setItem("dataLogin", JSON.stringify(dataLogin));
                        } else {
                            localStorage.removeItem("dataLogin")
                        }
                        setIsLoading(false)
                    } else {
                        throw new Error();
                    }
                })
                .catch(err => {
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

    return (
        <div>

            SignIn
        </div>
    )
    // return (
    //     <div className="LoginWrapper">
    //         {isLoading && <LoadingAction />}
    //         <div className="LoginFormBlock">
    //             <div className="LoginLogoWrapper">
    //                 <img src={LogoLogin} alt=""/>
    //                 <div className="LoginLogoTitle">
    //                     Sistema do Departamento de Polícia
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="LoginFormBlock">
    //             <div className="LoginForm">
    //                 <div className="LoginFormTitle">
    //                     Sign in
    //                 </div>
    //                 <div className="LoginFormRow">
    //                     <LabelAndInput
    //                         label={"ID"}
    //                         input={
    //                             <input
    //                                 value={dataLogin.id}
    //                                 name="id"
    //                                 onChange={onChange}
    //                                 type="number"
    //                             />
    //                         }
    //                         validate={errorField.id}
    //                     />
    //                 </div>
    //                 <div className="LoginFormRow">
    //                     <LabelAndInput
    //                         label={"Senha"}
    //                         input={
    //                             <input
    //                                 value={dataLogin.password}
    //                                 name="password"
    //                                 onChange={onChange}
    //                                 type="password"
    //                                 onKeyDown={(e) => {
    //                                     if (e.key === 'Enter') {
    //                                         onsubmit();
    //                                     }}
    //                                 }
    //                             />
    //                         }
    //                         validate={errorField.password}
    //                     />
    //                 </div>
    //                 <div className="LoginFormRow">
    //                     <div className="LoginFormRemember">
    //                         <input onChange={onChange} type="checkbox" id="vehicle1" name="remember" checked={dataLogin.remember} />
    //                         <label htmlFor="vehicle1">Lembrar</label>
    //                     </div>
    //                 </div>
    //
    //                 <button className="LoginFormBtn" onClick={() => {
    //                     onsubmit();
    //                 }}>
    //                     Entrar
    //                 </button>
    //                 {
    //                     error && <div className="SignUpFormError">
    //                         Não foi possível completar a sua solicitação: {error}
    //                     </div>
    //                 }
    //                 {
    //                     success && <div className="SignUpFormSuccess">
    //                         Usuário cadastrado com sucesso!
    //                     </div>
    //                 }
    //                 <div className="LoginFormFooter">
    //                     <div className="LoginFormForgotPassword">Esqueceu sua senha?</div>
    //                     <NavLink className="LoginFormSignUp" to="/signup">Faça seu cadastro</NavLink>
    //                 </div>
    //                 <div className="LoginFormCopyright">
    //                     Criado por: ozo (Lucas)#0661 | 2021
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default SignIn;
