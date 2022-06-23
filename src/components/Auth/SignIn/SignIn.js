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
}

export default SignIn;
