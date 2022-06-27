import React, {useContext, useEffect, useState} from "react";
import './FornecedorEditProfile.css';
import {Button, Col, Input, Row} from "antd";
import {AiOutlinePlus} from "react-icons/ai";
import Select from 'react-select'
import axios from "axios";
import {REACT_APP_API_BASE_URL} from "../../../utils/constants";
import {cnpjValidation, validarCPF, validatePhone} from "../../../utils/functions";
import LoadingAction from "../../../themes/LoadingAction/LoadingAction";
import {AuthContext} from "../../../contexts/AuthContext";

const initialData = {
    idFornecedor: "",
    cnpj : "",
    razaoSocial : "",
    nameCompany : "",
    description : "",
    tamanho : "",
    mediaFaturamentoAnual : "",
    responsiblePerson: '',
    website : "",
    areaAtuacao : "",
    segmento : "",
    zipCode: "",
    country : "",
    number : "",
    street : "",
    reference: "",
    state: "",
    city: "",
    phone : "",
    whatsapp : ""
}

const initErrorField = {
    idFornecedor: undefined,
    cnpj : undefined,
    razaoSocial : undefined,
    nameCompany : undefined,
    description : undefined,
    tamanho : undefined,
    mediaFaturamentoAnual : undefined,
    responsiblePerson: undefined,
    website : undefined,
    areaAtuacao : undefined,
    segmento : undefined,
    zipCode: undefined,
    country : undefined,
    number : undefined,
    street : undefined,
    reference: undefined,
    state: undefined,
    city: undefined,
    phone : undefined,
    whatsapp : undefined
}

const FornecedorEditProfile = (props) => {
    const {
        setDataUser,
        loading,
        authInfo,
        setNotiMessage
    } = useContext(AuthContext);
    const userId = authInfo?.dataUser?.id;
    const token = authInfo?.dataUser?.token;

    const [data, setData] = useState({...initialData});
    const [errorField, setErrorField] = useState({...initErrorField});
    const [isLoading, setIsLoading] = useState(false)
    const [city_options, setCity_options] = useState([]);
    const [areaAtuacao_options, setAreaAtuacao_options] = useState([]);
    const [segmento_options, setSegmento_options] = useState([]);
    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SE/distritos')
            .then(res => {
                if (res.status === 200 && Array.isArray(res.data)) {
                    // let city_NamesTemp = []
                    // let city_optionsTemp = []
                    // res.data.forEach(item => {
                    //     const cityName = item.municipio ? item.municipio["regiao-imediata"] ? item.municipio["regiao-imediata"]["regiao-intermediaria"]?.nome ?? "" : "" : "";
                    //     if (!city_NamesTemp.includes(cityName)) {
                    //         city_NamesTemp = [
                    //             ...city_NamesTemp,
                    //             cityName
                    //         ]
                    //         city_optionsTemp = [
                    //             ...city_optionsTemp,
                    //             {
                    //                 value: cityName,
                    //                 label: cityName
                    //             }
                    //         ]
                    //     }
                    //
                    // })
                    // setCity_options(city_optionsTemp)
                    setCity_options(res.data.map(item => ({
                        value: item.id,
                        label: item.nome
                    })))
                }
            })
        axios.get(`${REACT_APP_API_BASE_URL}/get-area-atuacao`)
            .then(res => {
                if (res.status === 200 && Array.isArray(res.data)) {
                    setAreaAtuacao_options(res.data.map(item => ({
                        ...item,
                        value: item.value,
                        label: item.name,
                    })))
                }
            })


    }, [])


    const {
        idFornecedor,
        cnpj ,
        razaoSocial ,
        nameCompany ,
        description ,
        tamanho ,
        mediaFaturamentoAnual ,
        responsiblePerson,
        website ,
        areaAtuacao ,
        segmento ,
        zipCode,
        country ,
        number ,
        street ,
        reference,
        state,
        city,
        phone ,
        whatsapp
    } = data;

    const onSave = () => {
        console.log('onSave')
        let errorFieldTemp = {}
        if (!cnpjValidation(cnpj.trim())) {
            errorFieldTemp.cnpj = 'você deve ter o formato correto - CNPJ'
        }
        console.log(razaoSocial)
        if (razaoSocial.trim() === "") {
            errorFieldTemp.razaoSocial = 'Este campo é obrigatório'
        }
        if (nameCompany.trim() === "") {
            errorFieldTemp.nameCompany = 'Este campo é obrigatório'
        }
        if (description.trim() === "") {
            errorFieldTemp.description = 'Este campo é obrigatório'
        }
        if (!tamanho) {
            errorFieldTemp.tamanho = 'Este campo é obrigatório'
        }
        if (mediaFaturamentoAnual.trim() === "") {
            errorFieldTemp.mediaFaturamentoAnual = 'Este campo é obrigatório'
        }
        if (!areaAtuacao) {
            errorFieldTemp.areaAtuacao = 'Este campo é obrigatório'
        }
        if (responsiblePerson.trim() === "") {
            errorFieldTemp.responsiblePerson = 'Este campo é obrigatório'
        }
        if (!segmento) {
            errorFieldTemp.segmento = 'Este campo é obrigatório'
        }
        if (!validarCPF(zipCode.trim())) {
            errorFieldTemp.zipCode = 'você deve ter o formato correto - CEP'
        }
        if (country.trim() === "") {
            errorFieldTemp.country = 'Este campo é obrigatório'
        }
        // if (number.trim() === "") {
        //     errorFieldTemp.number = 'Este campo é obrigatório'
        // }
        if (street.trim() === "") {
            errorFieldTemp.street = 'Este campo é obrigatório'
        }
        if (!state) {
            errorFieldTemp.state = 'Este campo é obrigatório'
        }
        if (!city) {
            errorFieldTemp.city = 'Este campo é obrigatório'
        }
        if (!validatePhone(phone.trim())) {
            errorFieldTemp.phone = 'você deve ter o formato correto - phone'
        }
        if (!validatePhone(whatsapp.trim())) {
            errorFieldTemp.whatsapp = 'você deve ter o formato correto - phone'
        }
        if(Object.keys(errorFieldTemp).length === 0) {
            setIsLoading(true);
            axios.post(`${REACT_APP_API_BASE_URL}/upsert-fornecedor`, {
                idFornecedor: userId,
                cnpj: cnpj,
                razaoSocial : razaoSocial,
                nameCompany : nameCompany,
                description : description,
                tamanho : tamanho?.value ?? "",
                mediaFaturamentoAnual : mediaFaturamentoAnual,
                responsiblePerson : responsiblePerson,
                website : website,
                areaAtuacao : areaAtuacao?.label ?? "",
                segmento : segmento?.label ?? "",
                zipCode : zipCode,
                country : country,
                number : Number(number),
                street : street,
                reference : reference,
                state : state?.value ?? "",
                city : state?.label ?? "",
                phone : phone.replace( /^\D+/g, ''),
                whatsapp: whatsapp.replace( /\D/g, ''),
            }, {
                headers: {
                    "x-access-token": token,
                    "content-type": "application/json"
                }
            })
                .then(res => {
                    if (res.status === 200 && res.data) {
                        setNotiMessage({
                            type: 'success',
                            message: 'editar perfil sucesso!'
                        })
                        setIsLoading(false);
                    } else {
                        throw new Error();
                    }
                })
                .catch(err => {
                    setIsLoading(false);
                })
        } else {
            setErrorField(errorFieldTemp);
        }
    }

    console.log(errorField)


    useEffect(() => {
        setCity_options([]);
        if (areaAtuacao) {
            getSegmentoOptions();
            setData(prev => ({
                ...prev,
                segmento: ''
            }))
        }
    }, [areaAtuacao])
    const getSegmentoOptions = () => {
        if (areaAtuacao) {
            axios.post(`${REACT_APP_API_BASE_URL}/get-segmento`, {
                id: areaAtuacao.value
            })
                .then(res => {
                    if (res.status === 200 && Array.isArray(res.data)) {
                        setSegmento_options(res.data.map(item => ({
                            ...item,
                            value: item.value,
                            label: item.name,
                        })))
                    }
                })
        }
    }


    const onChangeData = (name, value) => {
        setData(prev => ({
            ...prev,
            [name]: value
        }))
        setErrorField(prev => ({
            ...prev,
            [name]: undefined
        }))
    }


    // const city_options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

    const state_options = [
        { 'AC': 'Acre' },
        { 'AL': 'Alagoas' },
        { 'AP': 'Amapá' },
        { 'AM': 'Amazonas' },
        { 'BA': 'Bahia' },
        { 'CE': 'Ceará' },
        { 'DF': 'Distrito Federal' },
        { 'ES': 'Espírito Santo' },
        { 'GO': 'Goías' },
        { 'MA': 'Maranhão' },
        { 'MT': 'Mato Grosso' },
        { 'MS': 'Mato Grosso do Sul' },
        { 'MG': 'Minas Gerais' },
        { 'PA': 'Pará' },
        { 'PB': 'Paraíba' },
        { 'PR': 'Paraná' },
        { 'PE': 'Pernambuco' },
        { 'PI': 'Piauí' },
        { 'RJ': 'Rio de Janeiro' },
        { 'RN': 'Rio Grande do Norte' },
        { 'RS': 'Rio Grande do Sul' },
        { 'RO': 'Rondônia' },
        { 'RR': 'Roraíma' },
        { 'SC': 'Santa Catarina' },
        { 'SP': 'São Paulo' },
        { 'SE': 'Sergipe' },
        { 'TO': 'Tocantins' },
    ].map(item => {
        const key = Object.keys(item)[0];
        return ({
            value: key,
            label: item[key]
        })
    });

    const tamanho_options = [
        {
            value: '1',
            label: 'Apenas 1 colaborador'
        },
        {
            value: '1-5',
            label: '1-5 Colaboradores'
        },
        {
            value: '5-10',
            label: '5-10 Colaboradores'
        },
        {
            value: '10-50',
            label: '10-50 Colaboradores'
        },
        {
            value: '51+',
            label: '50+ Colaboradores'
        }
    ]

    return (
        <div className="FornecedorEditProfile_container">
            {isLoading && <LoadingAction />}
            <div className="FornecedorEditProfile_title">
                Editar Perfil
            </div>
            <div className="FornecedorEditProfile_content">
                <Row>
                    <Col xs={24} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_groupText">
                            Dados da empresa
                        </div>
                    </Col>

                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={cnpj}
                                onChange={(event) => {
                                    onChangeData('cnpj', event.target.value)
                                }}
                                placeholder="CNPJ"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.cnpj && <div className="FornecedorEditProfile_fieldError">
                                {errorField.cnpj}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: 00.000.000/0001-99
                        </div>
                    </Col>
                    <Col xs={24} md={16} lg={16} xl={16} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={razaoSocial}
                                onChange={(event) => {
                                    onChangeData('razaoSocial', event.target.value)
                                }}
                                placeholder="Razão Social"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.razaoSocial && <div className="FornecedorEditProfile_fieldError">
                                {errorField.razaoSocial}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: LbeB Associados LTDA
                        </div>
                    </Col>

                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={nameCompany}
                                onChange={(event) => {
                                    onChangeData('nameCompany', event.target.value)
                                }}
                                placeholder="Nome da Empresa"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.nameCompany && <div className="FornecedorEditProfile_fieldError">
                                {errorField.nameCompany}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: LbeB Associados LTDA
                        </div>
                    </Col>
                    <Col xs={24} md={16} lg={16} xl={16} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={description}
                                onChange={(event) => {
                                    onChangeData('description', event.target.value)
                                }}
                                placeholder="Descrição"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.description && <div className="FornecedorEditProfile_fieldError">
                                {errorField.description}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: Atuamos no segmento de consultoria em TI. (Tamanho Máximo: 250 caracteres, Mínimo 10.
                        </div>
                    </Col>

                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Select
                                options={tamanho_options}
                                className="FornecedorEditProfile_fieldSelect"
                                value={tamanho}
                                onChange={(value) => {
                                    // console.log(value)
                                    onChangeData('tamanho', value)
                                }}
                                placeholder="Tamanho da Empresa"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.tamanho && <div className="FornecedorEditProfile_fieldError">
                                {errorField.tamanho}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: LbeB Associados LTDA
                        </div>
                    </Col>
                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={mediaFaturamentoAnual}
                                onChange={(event) => {
                                    onChangeData('mediaFaturamentoAnual', event.target.value)
                                }}
                                placeholder="Média de Faturamento Anual"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.mediaFaturamentoAnual && <div className="FornecedorEditProfile_fieldError">
                                {errorField.mediaFaturamentoAnual}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: 150.000,00
                        </div>
                    </Col>
                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Select
                                options={areaAtuacao_options}
                                className="FornecedorEditProfile_fieldSelect"
                                value={areaAtuacao}
                                onChange={(value) => {
                                    // console.log(value)
                                    onChangeData('areaAtuacao', value)
                                }}
                                placeholder="Área de Atuação"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.areaAtuacao && <div className="FornecedorEditProfile_fieldError">
                                {errorField.areaAtuacao}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: Agronegócio
                        </div>
                    </Col>

                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={responsiblePerson}
                                onChange={(event) => {
                                    onChangeData('responsiblePerson', event.target.value)
                                }}
                                placeholder="Responsável"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.responsiblePerson && <div className="FornecedorEditProfile_fieldError">
                                {errorField.responsiblePerson}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: Joseph Stalin Santos
                        </div>
                    </Col>
                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={website}
                                onChange={(event) => {
                                    onChangeData('website', event.target.value)
                                }}
                                placeholder="Web Site Url"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                {/***/}
                            </div>
                        </div>
                        {
                            errorField.website && <div className="FornecedorEditProfile_fieldError">
                                {errorField.website}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            País. Ex: Brasil.
                        </div>
                    </Col>
                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Select
                                options={segmento_options}
                                className="FornecedorEditProfile_fieldSelect"
                                value={segmento}
                                isDisabled={!areaAtuacao || segmento_options.length === 0}
                                onChange={(value) => {
                                    onChangeData('segmento', value)
                                }}
                                placeholder="Segmento"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.segmento && <div className="FornecedorEditProfile_fieldError">
                                {errorField.segmento}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: Maquinários Agrícolas
                        </div>
                    </Col>

                    <Col xs={24} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_groupText">
                            Endereço e Contato
                        </div>
                    </Col>
                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={zipCode}
                                onChange={(event) => {
                                    onChangeData('zipCode', event.target.value)
                                }}
                                placeholder="CEP"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.zipCode && <div className="FornecedorEditProfile_fieldError">
                                {errorField.zipCode}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: 48430-000
                        </div>
                    </Col>
                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={country}
                                onChange={(event) => {
                                    onChangeData('country', event.target.value)
                                }}
                                placeholder="country"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.country && <div className="FornecedorEditProfile_fieldError">
                                {errorField.country}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            País. Ex: Brasil.
                        </div>
                    </Col>
                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={number}
                                onChange={(event) => {
                                    onChangeData('number', event.target.value)
                                }}
                                type="number"
                                placeholder="Número"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                {/***/}
                            </div>
                        </div>
                        {
                            errorField.number && <div className="FornecedorEditProfile_fieldError">
                                {errorField.number}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: 100
                        </div>
                    </Col>

                    <Col xs={24} md={16} lg={16} xl={16} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={street}
                                onChange={(event) => {
                                    onChangeData('street', event.target.value)
                                }}
                                placeholder="Rua"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                *
                            </div>
                        </div>
                        {
                            errorField.street && <div className="FornecedorEditProfile_fieldError">
                                {errorField.street}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Exemplo: Rua Exemplo Nome da Rua. 191
                        </div>
                    </Col>
                    <Col xs={24} md={8} lg={8} xl={8} className="FornecedorEditProfile_col">
                        <div className="FornecedorEditProfile_fieldInputWrapper">
                            <Input
                                value={reference}
                                onChange={(event) => {
                                    onChangeData('reference', event.target.value)
                                }}
                                placeholder="Ponto de Referência"
                                className="FornecedorEditProfile_fieldInput"
                            />
                            <div className="FornecedorEditProfile_fieldRequired">
                                {/***/}
                            </div>
                        </div>
                        {
                            errorField.reference && <div className="FornecedorEditProfile_fieldError">
                                {errorField.reference}
                            </div>
                        }
                        <div className="FornecedorEditProfile_fieldExample">
                            Sobrado branco na esquina
                        </div>
                    </Col>

                    <Col xs={24} md={24} lg={16} xl={16} className="FornecedorEditProfile_col">
                        <Row>
                            <Col xs={24} md={12} lg={12} xl={12} className="FornecedorEditProfile_col">
                                <div className="FornecedorEditProfile_fieldInputWrapper">
                                    <Select
                                        options={state_options}
                                        className="FornecedorEditProfile_fieldSelect"
                                        value={state}
                                        onChange={(value) => {
                                            // console.log(value)
                                            onChangeData('state', value)
                                        }}
                                    />
                                    <div className="FornecedorEditProfile_fieldRequired">
                                        *
                                    </div>
                                </div>
                                {/*<div className="FornecedorEditProfile_fieldExample">*/}
                                {/*    Exemplo: LbeB Associados LTDA*/}
                                {/*</div>*/}
                            </Col>
                            <Col xs={24} md={12} lg={12} xl={12} className="FornecedorEditProfile_col">
                                <div className="FornecedorEditProfile_fieldInputWrapper">
                                    {/*<Input*/}
                                    {/*    value={nameCompany}*/}
                                    {/*    onChange={(event) => {*/}
                                    {/*        onChangeData('nameCompany', event.target.value)*/}
                                    {/*    }}*/}
                                    {/*    placeholder="Nome da Empresa"*/}
                                    {/*    className="FornecedorEditProfile_fieldInput"*/}
                                    {/*/>*/}
                                    <Select
                                        options={city_options}
                                        className="FornecedorEditProfile_fieldSelect"
                                        value={city}
                                        onChange={(value) => {
                                            // console.log(value)
                                            onChangeData('city', value)
                                        }}
                                    />
                                    <div className="FornecedorEditProfile_fieldRequired">
                                        *
                                    </div>
                                </div>
                                {
                                    errorField.city && <div className="FornecedorEditProfile_fieldError">
                                        {errorField.city}
                                    </div>
                                }
                                {/*<div className="FornecedorEditProfile_fieldExample">*/}
                                {/*    Exemplo: LbeB Associados LTDA*/}
                                {/*</div>*/}
                            </Col>
                            <Col xs={24} md={12} lg={12} xl={12} className="FornecedorEditProfile_col">
                                <div className="FornecedorEditProfile_fieldInputWrapper">
                                    <Input
                                        value={phone}
                                        onChange={(event) => {
                                            onChangeData('phone', event.target.value)
                                        }}
                                        placeholder="Telefone"
                                        className="FornecedorEditProfile_fieldInput"
                                    />
                                    <div className="FornecedorEditProfile_fieldRequired">

                                    </div>
                                </div>
                                {
                                    errorField.phone && <div className="FornecedorEditProfile_fieldError">
                                        {errorField.phone}
                                    </div>
                                }
                                <div className="FornecedorEditProfile_fieldExample">
                                    Exemplo: (79) 3279-2414
                                </div>
                            </Col>
                            <Col xs={24} md={12} lg={12} xl={12} className="FornecedorEditProfile_col">
                                <div className="FornecedorEditProfile_fieldInputWrapper">
                                    <Input
                                        value={whatsapp}
                                        onChange={(event) => {
                                            onChangeData('whatsapp', event.target.value)
                                        }}
                                        placeholder="Whatsapp"
                                        className="FornecedorEditProfile_fieldInput"
                                    />
                                    <div className="FornecedorEditProfile_fieldRequired">

                                    </div>
                                </div>
                                {
                                    errorField.whatsapp && <div className="FornecedorEditProfile_fieldError">
                                        {errorField.whatsapp}
                                    </div>
                                }
                                <div className="FornecedorEditProfile_fieldExample">
                                    Exemplo: (79) 9 9831-4471
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} md={24} lg={8} xl={8} className="FornecedorEditProfile_col FornecedorEditProfile_colBtn">
                        <Button className="FornecedorEditProfile_btnSubmit" onClick={() => {
                            onSave();
                        }}>
                            <AiOutlinePlus />
                            <div>Atualizar Dados</div>
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default FornecedorEditProfile;