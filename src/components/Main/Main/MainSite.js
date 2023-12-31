import React from "react";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";
import * as links from "../../../utils/links"
import "./MainSite.css";
import LogoIcon from "./../../../assets/images/logo_fit2sell.png"
const MainSite = (props) => {
    return (
        // <div className="MainSite_container">
        //     <Link to={links.SIGNIN}>
        //         <Button>
        //             Login
        //         </Button>
        //     </Link>
        // </div>
        <>
            <div>
                {/* =====================================
    ==== Start Loading */}
                {/*<div className="loading">*/}
                {/*    <div className="text-center middle">*/}
                {/*        <div className="lds-ellipsis">*/}
                {/*            <div />*/}
                {/*            <div />*/}
                {/*            <div />*/}
                {/*            <div />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/* End Loading ====
    ======================================= */}
                {/* =====================================
    ==== Start Navbar */}
                <nav className="navbar nav-scroll change navbar-expand-lg">
                    <div className="container">
                        {/* Logo */}
                        <Link className="logo logoText"
                            to={links.SIGNIN}
                        >
                            <img src={LogoIcon} alt="" />
                        </Link>
                        {/*<a className="logo logoText" href="#">*/}
                        {/*    Fit2Sell*/}
                        {/*    /!*<img src="fula/logo-light.png" alt="logo" />*!/*/}
                        {/*</a>*/}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="icon-bar"><i className="fas fa-bars" /></span>
                        </button>
                        {/* navbar links */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#" data-scroll-nav={0}>
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" data-scroll-nav={1}>Sobre</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" data-scroll-nav={2}>Conheça</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#" data-scroll-nav={4}>Depoimentos</a>
                                </li>
                                {/*<li className="nav-item dropdown">*/}
                                {/*    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>*/}
                                {/*    <div className="dropdown-menu">*/}
                                {/*        <a className="dropdown-item" href="about us.html">About Us</a>*/}
                                {/*        <a className="dropdown-item" href="features.html">Features</a>*/}
                                {/*        <a className="dropdown-item" href="faq.html">FAQ</a>*/}
                                {/*        <a className="dropdown-item" href="blogs.html">Blogs</a>*/}
                                {/*    </div>*/}
                                {/*</li>*/}
                                <li className="nav-item">
                                    {/*<a className="nav-link butn butn-bg" href="contact.html"><span>Contact</span></a>*/}
                                    <Link className="nav-link butn butn-bg" to={links.SIGNIN}>
                                        <span>
                                            Login
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* End Navbar ====
    ======================================= */}
                {/* =====================================
    ==== Start Header */}
                <header className="header" data-scroll-index={0}>
                    <div className="background valign bg-img parallaxie" data-overlay-dark={9} data-background="fula/bg1.jpg">
                        <div className="container">
                            <div className="row">
                                <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10 text-center caption mt-80">
                                    <h1>FIT2SELL<br />Se deu FIT, deu Venda!</h1>
                                    <p>A primeira plataforma de relacionamento entre fornecedores e canais de vendas!
                                        2fit é a Inteligência Artificial da FIT2SELL que encontrará os parceiros com fit para o seu negócio!
                                        2fit encontra mercados e parceiros! Esta IA é fit, Esta IA é venda!</p>
                                    {/*<a href="#0" className="butn light mt-30">*/}
                                    {/*    <span>Contact Us<i className="pe-7s-paper-plane" /></span>*/}
                                    {/*</a>*/}
                                    {/*<a href="#0" className="butn butn-rgba mt-30">*/}
                                    {/*    <span>Watch Demo <i className="pe-7s-play" /></span>*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* End Header ====
    ======================================= */}
                {/* =====================================
    ==== Start About */}
                <section className="about section-padding pt-0" data-scroll-index={1}>
                    <div className="container top">
                        <div className="row">
                            <div className="col-lg-4 item">
                                <div className="text-center">
                                    {/*<span className="icon pe-7s-diamond" />*/}
                                    <i className="icon fa-solid fa-gem"></i>
                                    <h6>Crescimento Exponencial</h6>
                                    <p>As suas vendas não crescem na velocidade que você deseja porque somente 3% do seu mercado potencial conhece a sua empresa, os seus produtos e os seus serviços!
                                        Parceiros que se relacionam com o seu mercado reduzem os investimentos em marketing em até 68% e geram 27% de vendas a mais logo no primeiro ano!
                                        Sem contar a lucratividade que poderá aumentar em até 17%!</p>
                                </div>
                            </div>
                            <div className="col-lg-4 item">
                                <div className="text-center">
                                    <i className="icon fa-solid fa-box"></i>
                                    {/*<span className="icon pe-7s-box2" />*/}
                                    <h6>Pilares das Vendas</h6>
                                    <p>As vendas são consequências da nossa capacidade de chamar atenção, mostrar importância e utilidade!
                                        Em seguida precisamos de provas sociais!
                                        Estes dois pilares são complementados pela confiança e pelo relacionamento!
                                        Se você tem parceiros bem relacionados, você tem sustentação comercial!</p>
                                </div>
                            </div>
                            <div className="col-lg-4 item">
                                <div className="text-center">
                                    <i className="icon fa-solid fa-lightbulb"></i>
                                    {/*<span className="icon pe-7s-light" />*/}
                                    <h6>Escala</h6>
                                    <p>Qual a sua capacidade de crescimento atuando somente com a sua equipe comercial interna? Com uma rede de parceiros, a sua empresa alcançará as vendas e os resultados através de um custo menor, enquanto os recursos serão disponibilizados para investir em novas tecnologias, novos produtos e mercados!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="clients text-center">*/}
                    {/*    <div className="container">*/}
                    {/*        <span>Trusted By</span>*/}
                    {/*        <div className="row">*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    /!*<a href="#0">*!/*/}
                    {/*                    /!*    <img src="fula/clients-logo/1.png" alt="" />*!/*/}
                    {/*                    /!*</a>*!/*/}
                    {/*                    <Link*/}
                    {/*                          to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="fula/clients-logo/1.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    <Link*/}
                    {/*                          to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="fula/clients-logo/2.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    /!*<a href="#0">*!/*/}
                    {/*                    /!*    <img src="fula/clients-logo/3.png" alt="" />*!/*/}
                    {/*                    /!*</a>*!/*/}
                    {/*                    <Link*/}
                    {/*                        to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="fula/clients-logo/3.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    /!*<a href="#0">*!/*/}
                    {/*                    /!*    <img src="fula/clients-logo/4.png" alt="" />*!/*/}
                    {/*                    /!*</a>*!/*/}
                    {/*                    <Link*/}
                    {/*                        to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="fula/clients-logo/4.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    /!*<a href="#0">*!/*/}
                    {/*                    /!*    <img src="fula/clients-logo/5.png" alt="" />*!/*/}
                    {/*                    /!*</a>*!/*/}
                    {/*                    <Link*/}
                    {/*                        to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="fula/clients-logo/5.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    /!*<a href="#0">*!/*/}
                    {/*                    /!*    <img src="fula/clients-logo/6.png" alt="" />*!/*/}
                    {/*                    /!*</a>*!/*/}
                    {/*                    <Link*/}
                    {/*                        to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="fula/clients-logo/6.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </section>
                {/* End About ====
    ======================================= */}
                {/* =====================================
    ==== Start Banner */}
                <section className="banner section-padding bg-gray" data-scroll-index={2}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="img mb-sm50">
                                    <img src="fula/fornecedor.png" alt="" />
                                </div>
                            </div>
                            <div className="offset-md-1 col-md-6 valign">
                                <div className="content">
                                    <span className="sm-title">Fornecedor</span>
                                    <h3>Por que estas questões abaixo precisam ser analisadas por você, FORNECEDOR de produtos e serviços?</h3>
                                    <p><b>Crescimento Exponencial</b> As suas vendas não crescem na velocidade que você deseja porque somente 3% do seu mercado potencial conhece a sua empresa, os seus produtos e os seus serviços!
                                        Parceiros que se relacionam com o seu mercado reduzem os investimentos em marketing em até 68% e geram 27% de vendas a mais logo no primeiro ano!
                                        Sem contar a lucratividade que poderá aumentar em até 17%!
                                    </p>
                                    <p><b>Pilares das Vendas</b> As vendas são consequências da nossa capacidade de chamar atenção, mostrar importância e utilidade!
                                        Em seguida precisamos de provas sociais!
                                        Estes dois pilares são complementados pela confiança e pelo relacionamento!
                                        Se você tem parceiros bem relacionados, você tem sustentação comercial!

                                    </p>
                                    <p><b>Escala</b> Qual a sua capacidade de crescimento atuando somente com a sua equipe comercial interna? Com uma rede de parceiros, a sua empresa alcançará as vendas e os resultados através de um custo menor, enquanto os recursos serão disponibilizados para investir em novas tecnologias, novos produtos e mercados!
                                    </p>
                                    <p></p>
                                    {/*<a href="#0" className="butn butn-bg">*/}
                                    {/*    <span>View More <i className="pe-7s-angle-right" /></span>*/}
                                    {/*</a>*/}
                                    <Link
                                        to={links.SIGNUP_FORNECEDOR}
                                        className="butn butn-bg"
                                    >
                                        <span>CADASTRE-SE AGORA COMO FORNECEDOR
                                            <i className="fa-solid fa-angle-right"></i>
                                            {/*<i className="pe-7s-angle-right" />*/}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Banner ====
            ======================================= */}
                {/* =====================================
            ==== Start Banner */}
                <section className="banner section-padding" data-scroll-index={2}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 valign">
                                <div className="content mb-sm50">
                                    <span className="sm-title">Canal de Vendas</span>
                                    <h3>Por que estas questões abaixo precisam ser analisadas por você, EMPREENDEDOR que observa potencial em sua região e precisa gerar receitas crescentes?</h3>
                                    <p><b>O que o Google é para o mundo?</b> O Google é para o mundo uma tecnologia de disponibilização de dados e informações.
                                        Porém, é você EMPREENDEDOR o único capaz de transformar estes dados e informações em decisão!
                                        Como você faz isso? Mostrando aos seus clientes como usar os dados, as informações em conjunto com as soluções que você representa!
                                        A Informação está com o Google, mas o como decidir está com você!
                                        E você será cada vez mais eficiente no COMO tendo em seu portfólio os produtos e as soluções corretas!
                                    </p>
                                    <p><b>O que você pode ser para o seu cliente</b> <br />Há tanta tecnologia e produtos no mundo que o seu cliente passou a ter como principal necessidade transformar esta tecnologia em resultados!

                                        Como obter os melhores resultados é o que o seu cliente espera de você!

                                        Com um portfólio bem estruturado, além da fidelidade, sua base perceberá em você o parceiro ideal para a geração de resultados!

                                    </p>
                                    <p><b>Desenvolver Tecnologia ou Gerar Resultados</b> Não há uma resposta certa, mas quando observamos que o “COMO” é muito mais importante que “O QUE”, fica evidente que montar um bom portfólio de parcerias é a grande oportunidade que temos para a geração rápida, crescente e recorrente de receitas!

                                        Empreendedor, isso faz sentido para você? Já analisou o quanto vale a pena ser um canal? SEJA um integrador de soluções!

                                    </p>
                                    {/*<a href="#0" className="butn butn-bg">*/}
                                    {/*    <span>View More <i className="pe-7s-angle-right" /></span>*/}
                                    {/*</a>*/}
                                    <Link
                                        to={links.SIGNUP_CANAL}
                                        className="butn butn-bg"
                                    >
                                        <span>CADASTRE-SE AGORA COMO CANAL DE VENDAS
                                            <i className="fa-solid fa-angle-right"></i>
                                            {/*<i className="pe-7s-angle-right" />*/}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="offset-md-1 col-md-5">
                                <div className="img">
                                    <img src="fula/canal.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Banner ====
            ======================================= */}
                {/* =====================================
    ==== Start Process */}
                <section className="process">
                    <div className="section-padding background bg-img parallaxie" data-overlay-dark={9} data-background="fula/bg1.jpg">
                        <div className="container">
                            <div className="row">
                                <div className="section-head text-center col-sm-12">
                                    <h6 className="sm-title">Como funciona?</h6>
                                    <h4>Nosso Processo</h4>
                                </div>
                                <div className="col-lg-3 col-md-6 padding mb-md50">
                                    <div className="item text-center">
                                        <img src="fula/arrow1.png" className="tobotm" alt="" />
                                        {/*<span className="icon pe-7s-scissors" />*/}
                                        <span className="icon fa-solid fa-scissors"></span>
                                        <h6><span>01.</span>Dados</h6>
                                        <p>Você fornece os dados do seu negócio.</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 padding mb-md50">
                                    <div className="item text-center">
                                        <img src="fula/arrow1.png" alt="" />
                                        {/*<span className="icon pe-7s-diamond" />*/}
                                        <div className="iconWrapper">
                                            <span className="icon fa-solid fa-diamond"></span>
                                        </div>
                                        <h6><span>02.</span>Processamento</h6>
                                        <p>Nosso sistema faz uma análise automática.</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 padding mb-sm50">
                                    <div className="item text-center">
                                        <img src="fula/arrow1.png" className="tobotm" alt="" />
                                        {/*<span className="icon pe-7s-rocket" />*/}
                                        <div className="iconWrapper">
                                            <span className="icon fa-solid fa-rocket"></span>
                                        </div>
                                        <h6><span>03.</span>Fits</h6>
                                        <p>Encontramos seus potenciais parceiros.</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 padding">
                                    <div className="item text-center">
                                        {/*<span className="icon pe-7s-check" />*/}
                                        <div className="iconWrapper">
                                            <span className="icon fa-solid fa-check"></span>
                                        </div>
                                        <h6><span>03.</span>Resultado</h6>
                                        <p>Você encontra parcerias com mais facilidade.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Process ====
    ======================================= */}
                {/* =====================================
    ==== Start Price */}
                {/*<section className="price section-padding bg-gray" data-scroll-index={3}>*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="section-head text-center col-sm-12">*/}
                {/*                <h6 className="sm-title">The Best Offers</h6>*/}
                {/*                <h4>Our Pricing</h4>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 col-md-6">*/}
                {/*                <div className="item mb-md50">*/}
                {/*                    <div className="cont">*/}
                {/*                        <div className="type">*/}
                {/*                            <h6>Basic</h6>*/}
                {/*                        </div>*/}
                {/*                        <div className="value">*/}
                {/*                            <h4><span>$</span>10</h4>*/}
                {/*                            <p>Per Of Month</p>*/}
                {/*                        </div>*/}
                {/*                        <div className="feat">*/}
                {/*                            <ul>*/}
                {/*                                <li><span>10 GB Disk Space</span></li>*/}
                {/*                                <li><span>15 Domain Names</span></li>*/}
                {/*                                <li><span>4 Email Address</span></li>*/}
                {/*                                <li><span>Unlimited Support</span></li>*/}
                {/*                            </ul>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="order">*/}
                {/*                        /!*<a href="#0" className="butn butn-light">*!/*/}
                {/*                        /!*    <span>Order Now <i className="pe-7s-angle-right" /></span>*!/*/}
                {/*                        /!*</a>*!/*/}
                {/*                        <Link*/}
                {/*                            to={links.SIGNIN}*/}
                {/*                            className="butn butn-light"*/}
                {/*                        >*/}
                {/*                            <span>Order Now <i className="pe-7s-angle-right" /></span>*/}
                {/*                        </Link>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 col-md-6">*/}
                {/*                <div className="item active mb-md50">*/}
                {/*                    <div className="cont">*/}
                {/*                        <div className="type">*/}
                {/*                            <h6>Business</h6>*/}
                {/*                        </div>*/}
                {/*                        <div className="value">*/}
                {/*                            <h4><span>$</span>25</h4>*/}
                {/*                            <p>Per Of Month</p>*/}
                {/*                        </div>*/}
                {/*                        <div className="feat">*/}
                {/*                            <ul>*/}
                {/*                                <li><span>50 GB Disk Space</span></li>*/}
                {/*                                <li><span>20 Domain Names</span></li>*/}
                {/*                                <li><span>20 Email Address</span></li>*/}
                {/*                                <li><span>Unlimited Support</span></li>*/}
                {/*                            </ul>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="order">*/}
                {/*                        /!*<a href="#0" className="butn butn-bg">*!/*/}
                {/*                        /!*    <span>Order Now <i className="pe-7s-angle-right" /></span>*!/*/}
                {/*                        /!*</a>*!/*/}
                {/*                        <Link*/}
                {/*                            to={links.SIGNIN}*/}
                {/*                            className="butn butn-bg"*/}
                {/*                        >*/}
                {/*                            <span>Order Now <i className="pe-7s-angle-right" /></span>*/}
                {/*                        </Link>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">*/}
                {/*                <div className="item">*/}
                {/*                    <div className="cont">*/}
                {/*                        <div className="type">*/}
                {/*                            <h6>Premium</h6>*/}
                {/*                        </div>*/}
                {/*                        <div className="value">*/}
                {/*                            <h4><span>$</span>50</h4>*/}
                {/*                            <p>Per Of Month</p>*/}
                {/*                        </div>*/}
                {/*                        <div className="feat">*/}
                {/*                            <ul>*/}
                {/*                                <li><span>100 GB Disk Space</span></li>*/}
                {/*                                <li><span>30 Domain Names</span></li>*/}
                {/*                                <li><span>10 Email Address</span></li>*/}
                {/*                                <li><span>Unlimited Support</span></li>*/}
                {/*                            </ul>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="order">*/}
                {/*                        /!*<a href="#0" className="butn butn-light">*!/*/}
                {/*                        /!*    <span>Order Now <i className="pe-7s-angle-right" /></span>*!/*/}
                {/*                        /!*</a>*!/*/}
                {/*                        <Link*/}
                {/*                            to={links.SIGNIN}*/}
                {/*                            className="butn butn-light"*/}
                {/*                        >*/}
                {/*                            <span>Order Now <i className="pe-7s-angle-right" /></span>*/}
                {/*                        </Link>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}
                {/* End Price ====
    ======================================= */}
                {/* =====================================
    ==== Start Testimonials */}
                <section className="testimonials section-padding" data-scroll-index={4}>
                    <div className="container">
                        <div className="row">
                            <div className="section-head text-center col-sm-12">
                                <h6 className="sm-title">O que as pessoas dizem?</h6>
                                <h4>Depoimentos</h4>
                            </div>
                            <div className="col-lg-12">
                                <Row className="owl-carousel-2 owl-theme text-center">
                                    <Col xs={24} sm={24} md={8} style={{
                                        padding: 20,
                                    }}>
                                        <div className="item">
                                            <div className="client-area">
                                                <p>"Meu nome é Sérgio Tomasini, sou o Diretor da Exekon do Brasil. Através do canal de vendas aberto
                                                    pela Fit2Sell, já fechamos os primeiros negócios no Nordeste. Nosso objetivo agora é aumentar
                                                    a presença no Sudeste através de mais canais e assim continuar este processo de crescimento no Brasil.
                                                    A Fit2Sell é nossa parceira desde 2018 nos ajudando no processo de desenvolvimento dos canais de vendas e na gestão dos
                                                    processos comerciais!"</p>
                                                <div className="img">
                                                    <span className="icon"><img src="fula/left-quote.svg" alt="" /></span>
                                                    <span className="icon"><img src="fula/right-quote.svg" alt="" /></span>
                                                    <div className="author">
                                                        <img src="fula/1.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <h6>Sérgio Tomasini</h6>
                                                <span>Diretor da Exekon do Brasil</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} style={{
                                        padding: 20,
                                    }}>
                                        <div className="item">
                                            <div className="client-area">
                                                <p>Olá! Meu nome é Victor e sou Gerente Comercial na empresa RSData.
                                                    O Alexandre Maia está implantando estratégias comerciais utilizadas pelas Startups
                                                    aqui na empresa! Os resultados ocorrem muito rapidamente e hoje já estamos noutro patamar de operação!
                                                    Fique a vontade para me ligar, caso deseje mais informações sobre os trabalhos do Alexandre Maia!
                                                    Whatsapp <a href="https://wa.me/5551995220091" target={"_blank"}>+55 51 9 9522 0091</a>
                                                    - <a href="mailto:victor@rsdata.inf.br" target={"_blank"}>victor@rsdata.inf.br</a>
                                                </p>
                                                <div className="img">
                                                    <span className="icon"><img src="fula/left-quote.svg" alt="" /></span>
                                                    <span className="icon"><img src="fula/right-quote.svg" alt="" /></span>
                                                    <div className="author">
                                                        <img src="fula/2.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <h6>Victor</h6>
                                                <span>Gerente Comercial da RSData</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} style={{
                                        padding: 20,
                                    }}>
                                        <div className="item">
                                            <div className="client-area">
                                                <p>Olá! Meu nome é Danilo, sou desenvolvedor de negócios e estratégias comerciais.
                                                    Os treinamentos ministrados pelo Alexandre Maia sobre gestão comercial e gestão de canais de vendas
                                                    foram muito importantes para mim e me deram uma nova visão
                                                    sobre negócios!<br /> Para mais informações podem entrar em contato comigo, através dos meus contatos a seguir:
                                                    Whatsapp para contato:<br /> <a href="https://wa.me/5519993305895" target={"_blank"}>+55 19 9 9330-5895</a>
                                                </p>
                                                <div className="img">
                                                    <span className="icon"><img src="fula/left-quote.svg" alt="" /></span>
                                                    <span className="icon"><img src="fula/right-quote.svg" alt="" /></span>
                                                    <div className="author">
                                                        <img src="fula/3.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <h6>Danilo</h6>
                                                <span>Desenvolvedor de Negócios e Estratégias Comerciais</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Testimonials ====
    ======================================= */}
                {/* =====================================
    ==== Start Call Action */}
                <div className="call-action text-center">
                    <div className="background bg-img  parallaxie pt-80 pb-80" data-background="fula/bg2.jpg" data-overlay-dark={8}>
                        <div className="container">
                            <div className="row">
                                <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
                                    <div>
                                        <h3>CADASTRE-SE GRATUITAMENTE</h3>
                                        {/*<a href="#0" className="butn light mt-30">*/}
                                        {/*    <span>Contact Us<i className="pe-7s-paper-plane" /></span>*/}
                                        {/*</a>*/}
                                        <Link
                                            to={links.SIGNIN}
                                            className="butn light mt-30"
                                        >
                                            <span>Login
                                                <i className="fa-solid fa-paper-plane"></i>
                                                {/*<i className="pe-7s-paper-plane" />*/}
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Call Action ====
    ======================================= */}
                {/* =====================================
    ==== Start Blog */}
                {/*<section className="blog section-padding" data-scroll-index={7}>*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="section-head text-center col-sm-12">*/}
                {/*                <h6 className="sm-title">Latest News</h6>*/}
                {/*                <h4>Our Blog</h4>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 col-md-6">*/}
                {/*                <div className="item mb-sm50">*/}
                {/*                    <div className="post-img">*/}
                {/*                        <div className="img">*/}
                {/*                            <a href="#0"><span>6 Aug</span> 2019</a>*/}
                {/*                            <img src="fula/blog/1.jpg" alt="" />*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="cont">*/}
                {/*                        <div className="info">*/}
                {/*                            <a href="#0"><i className="pe-7s-user" /> <span>By</span> Admin</a>*/}
                {/*                            <a href="#0"><i className="pe-7s-ticket" /> WordPress</a>*/}
                {/*                        </div>*/}
                {/*                        <h5><a href="#0">Master These Awesome New Skills in May 2019</a></h5>*/}
                {/*                        <a href="#0" className="more">*/}
                {/*                            <span>Read More <i className="pe-7s-angle-right-circle" /></span>*/}
                {/*                        </a>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 col-md-6">*/}
                {/*                <div className="item">*/}
                {/*                    <div className="post-img">*/}
                {/*                        <div className="img">*/}
                {/*                            <a href="#0"><span>6 Aug</span> 2019</a>*/}
                {/*                            <img src="fula/blog/2.jpg" alt="" />*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="cont">*/}
                {/*                        <div className="info">*/}
                {/*                            <a href="#0"><i className="pe-7s-user" /> <span>By</span> Admin</a>*/}
                {/*                            <a href="#0"><i className="pe-7s-ticket" /> WordPress</a>*/}
                {/*                        </div>*/}
                {/*                        <h5><a href="#0">48 Best WordPress Themes On Envato</a></h5>*/}
                {/*                        <a href="#0" className="more">*/}
                {/*                            <span>Read More <i className="pe-7s-angle-right-circle" /></span>*/}
                {/*                        </a>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">*/}
                {/*                <div className="item">*/}
                {/*                    <div className="post-img">*/}
                {/*                        <div className="img">*/}
                {/*                            <a href="#0"><span>6 Aug</span> 2019</a>*/}
                {/*                            <img src="fula/blog/3.jpg" alt="" />*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="cont">*/}
                {/*                        <div className="info">*/}
                {/*                            <a href="#0"><i className="pe-7s-user" /> <span>By</span> Admin</a>*/}
                {/*                            <a href="#0"><i className="pe-7s-ticket" /> WordPress</a>*/}
                {/*                        </div>*/}
                {/*                        <h5><a href="#0">Why Good Designers Are Like Crocodiles</a></h5>*/}
                {/*                        <a href="#0" className="more">*/}
                {/*                            <span>Read More <i className="pe-7s-angle-right-circle" /></span>*/}
                {/*                        </a>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}
                {/* End Blog ====
    ======================================= */}
                {/* =====================================
    ==== Start Footer */}
                {/*<footer className="footer section-padding bg-gray">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-lg-4 col-md-4">*/}
                {/*                <div className="item">*/}
                {/*                    <a className="logo logoText" href="#">*/}
                {/*                        /!*<img src="fula/logo-dark.png" alt="logo" />*!/*/}
                {/*                        Fit2Sell*/}
                {/*                    </a>*/}
                {/*                    <p>Nulla metus metus sed euismod volutpat velit class aptent taciti ad litora torquent per*/}
                {/*                        conubia nostra.</p>*/}
                {/*                    <div className="social">*/}
                {/*                        <a href="#0" className="icon">*/}
                {/*                            <i className="fab fa-facebook-f" />*/}
                {/*                        </a>*/}
                {/*                        <a href="#0" className="icon">*/}
                {/*                            <i className="fab fa-twitter" />*/}
                {/*                        </a>*/}
                {/*                        <a href="#0" className="icon">*/}
                {/*                            <i className="fab fa-linkedin-in" />*/}
                {/*                        </a>*/}
                {/*                        <a href="#0" className="icon">*/}
                {/*                            <i className="fab fa-behance" />*/}
                {/*                        </a>*/}
                {/*                        <a href="#0" className="icon">*/}
                {/*                            <i className="fab fa-instagram" />*/}
                {/*                        </a>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="offset-lg-1 col-lg-3 col-md-3">*/}
                {/*                <div className="item">*/}
                {/*                    <h6>Useful Links</h6>*/}
                {/*                    <ul>*/}
                {/*                        <li><a href="#0"><i className="pe-7s-angle-right-circle" /> About Us</a></li>*/}
                {/*                        <li><a href="#0"><i className="pe-7s-angle-right-circle" /> Features</a></li>*/}
                {/*                        <li><a href="#0"><i className="pe-7s-angle-right-circle" /> Help</a></li>*/}
                {/*                        <li><a href="#0"><i className="pe-7s-angle-right-circle" /> How It Works?</a></li>*/}
                {/*                    </ul>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-4 col-md-5">*/}
                {/*                <div className="item">*/}
                {/*                    <h6>Subscribe to Our Newsletter</h6>*/}
                {/*                    <form>*/}
                {/*                        <input id="subscribe_email" type="email" name="email" placeholder="Your Email" />*/}
                {/*                        <button className="butn butn-bg"><span>Subscribe <i className="pe-7s-paper-plane" /></span></button>*/}
                {/*                    </form>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="sub-footer text-center">*/}
                {/*        <div className="container">*/}
                {/*            <div className="row">*/}
                {/*                <div className="col-lg-12">*/}
                {/*                    <p>Copyright © All Right Reserved By UI-ThemeZ - 2019</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</footer>*/}
                {/* End Footer ====
    ======================================= */}
            </div>
        </>
    )
}

export default MainSite;
