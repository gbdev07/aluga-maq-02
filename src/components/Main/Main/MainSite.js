import React from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";
import * as links from "../../../utils/links"
import "./MainSite.css";
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
                <div className="loading">
                    <div className="text-center middle">
                        <div className="lds-ellipsis">
                            <div />
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>
                </div>
                {/* End Loading ====
    ======================================= */}
                {/* =====================================
    ==== Start Navbar */}
                <nav className="navbar change navbar-expand-lg">
                    <div className="container">
                        {/* Logo */}
                        <Link className="logo logoText"
                              to={links.SIGNIN}
                        >
                            Fit2Sell
                        </Link>
                        {/*<a className="logo logoText" href="#">*/}
                        {/*    Fit2Sell*/}
                        {/*    /!*<img src="https://fulax.netlify.app/img/logo-light.png" alt="logo" />*!/*/}
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
                                    <a className="nav-link" href="#" data-scroll-nav={1}>About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" data-scroll-nav={2}>Features</a>
                                </li>
                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link" href="#" data-scroll-nav={3}>Price</a>*/}
                                {/*</li>*/}
                                <li className="nav-item">
                                    <a className="nav-link" href="#" data-scroll-nav={4}>Testimonials</a>
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
                    <div className="background valign bg-img parallaxie" data-overlay-dark={9} data-background="img/bg1.jpg">
                        <div className="container">
                            <div className="row">
                                <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10 text-center caption mt-80">
                                    <h1>Everything you need to increase your Business</h1>
                                    <p>We design and develop mobile apps that delight your users and grow your business.<br />
                                        Enterprise grade development combined with outstanding design.</p>
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
                                    <h6>Awesome Design</h6>
                                    <p>It has survived not only five centuries, but also the leap into remaining.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 item">
                                <div className="text-center">
                                    <i className="icon fa-solid fa-box"></i>
                                    {/*<span className="icon pe-7s-box2" />*/}
                                    <h6>Unlimited Features</h6>
                                    <p>It has survived not only five centuries, but also the leap into remaining.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 item">
                                <div className="text-center">
                                    <i className="icon fa-solid fa-lightbulb"></i>
                                    {/*<span className="icon pe-7s-light" />*/}
                                    <h6>Powerful &amp; Simple</h6>
                                    <p>It has survived not only five centuries, but also the leap into remaining.</p>
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
                    {/*                    /!*    <img src="https://fulax.netlify.app/img/clients-logo/1.png" alt="" />*!/*/}
                    {/*                    /!*</a>*!/*/}
                    {/*                    <Link*/}
                    {/*                          to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="https://fulax.netlify.app/img/clients-logo/1.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    <Link*/}
                    {/*                          to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="https://fulax.netlify.app/img/clients-logo/2.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    /!*<a href="#0">*!/*/}
                    {/*                    /!*    <img src="https://fulax.netlify.app/img/clients-logo/3.png" alt="" />*!/*/}
                    {/*                    /!*</a>*!/*/}
                    {/*                    <Link*/}
                    {/*                        to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="https://fulax.netlify.app/img/clients-logo/3.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    /!*<a href="#0">*!/*/}
                    {/*                    /!*    <img src="https://fulax.netlify.app/img/clients-logo/4.png" alt="" />*!/*/}
                    {/*                    /!*</a>*!/*/}
                    {/*                    <Link*/}
                    {/*                        to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="https://fulax.netlify.app/img/clients-logo/4.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    /!*<a href="#0">*!/*/}
                    {/*                    /!*    <img src="https://fulax.netlify.app/img/clients-logo/5.png" alt="" />*!/*/}
                    {/*                    /!*</a>*!/*/}
                    {/*                    <Link*/}
                    {/*                        to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="https://fulax.netlify.app/img/clients-logo/5.png" alt="" />*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-lg-2 col-md-3 col-sm-4">*/}
                    {/*                <div className="brand">*/}
                    {/*                    /!*<a href="#0">*!/*/}
                    {/*                    /!*    <img src="https://fulax.netlify.app/img/clients-logo/6.png" alt="" />*!/*/}
                    {/*                    /!*</a>*!/*/}
                    {/*                    <Link*/}
                    {/*                        to={links.SIGNIN}*/}
                    {/*                    >*/}
                    {/*                        <img src="https://fulax.netlify.app/img/clients-logo/6.png" alt="" />*/}
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
                                    <img src="https://fulax.netlify.app/img/v1.svg" alt="" />
                                </div>
                            </div>
                            <div className="offset-md-1 col-md-6 valign">
                                <div className="content">
                                    <span className="sm-title">Awesome Tools</span>
                                    <h3>We Provide Almost Every Kind Of Business Solution.</h3>
                                    <p>Fusce imperdiet justo vitae dui eleifend imperdiet sed ac massa. Eu scelerisque felis
                                        imperdiet proin fermentum. Odio pellentesque diam volutpat commodo sed.</p>
                                    {/*<a href="#0" className="butn butn-bg">*/}
                                    {/*    <span>View More <i className="pe-7s-angle-right" /></span>*/}
                                    {/*</a>*/}
                                    <Link
                                        to={links.SIGNIN}
                                        className="butn butn-bg"
                                    >
                                        <span>View More
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
                                    <span className="sm-title">Awesome Tools</span>
                                    <h3>We Provide Almost Every Kind Of Business Solution.</h3>
                                    <p>Fusce imperdiet justo vitae dui eleifend imperdiet sed ac massa. Eu scelerisque felis
                                        imperdiet proin fermentum. Odio pellentesque diam volutpat commodo sed.</p>
                                    {/*<a href="#0" className="butn butn-bg">*/}
                                    {/*    <span>View More <i className="pe-7s-angle-right" /></span>*/}
                                    {/*</a>*/}
                                    <Link
                                        to={links.SIGNIN}
                                        className="butn butn-bg"
                                    >
                                        <span>View More
                                            <i className="fa-solid fa-angle-right"></i>
                                            {/*<i className="pe-7s-angle-right" />*/}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="offset-md-1 col-md-5">
                                <div className="img">
                                    <img src="https://fulax.netlify.app/img/v3.svg" alt="" />
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
                    <div className="section-padding background bg-img parallaxie" data-overlay-dark={9} data-background="img/bg1.jpg">
                        <div className="container">
                            <div className="row">
                                <div className="section-head text-center col-sm-12">
                                    <h6 className="sm-title">How It's Work</h6>
                                    <h4>Our Process</h4>
                                </div>
                                <div className="col-lg-3 col-md-6 padding mb-md50">
                                    <div className="item text-center">
                                        <img src="https://fulax.netlify.app/img/arrow1.png" className="tobotm" alt="" />
                                        {/*<span className="icon pe-7s-scissors" />*/}
                                        <span className="icon fa-solid fa-scissors"></span>
                                        <h6><span>01.</span>Analyze</h6>
                                        <p>Fusce imperdiet justo vitae ac massa scelerisque.</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 padding mb-md50">
                                    <div className="item text-center">
                                        <img src="https://fulax.netlify.app/img/arrow1.png" alt="" />
                                        {/*<span className="icon pe-7s-diamond" />*/}
                                        <span className="icon fa-solid fa-diamond"></span>
                                        <h6><span>02.</span>Strategy</h6>
                                        <p>Fusce imperdiet justo vitae ac massa scelerisque.</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 padding mb-sm50">
                                    <div className="item text-center">
                                        <img src="https://fulax.netlify.app/img/arrow1.png" className="tobotm" alt="" />
                                        {/*<span className="icon pe-7s-rocket" />*/}
                                        <span className="icon fa-solid fa-rocket"></span>                                        <h6><span>03.</span>lounch</h6>
                                        <p>Fusce imperdiet justo vitae ac massa scelerisque.</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 padding">
                                    <div className="item text-center">
                                        {/*<span className="icon pe-7s-check" />*/}
                                        <span className="icon fa-solid fa-check"></span>
                                        <h6><span>03.</span>Result</h6>
                                        <p>Fusce imperdiet justo vitae ac massa scelerisque.</p>
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
                                <h6 className="sm-title">What Peapole Says?</h6>
                                <h4>Testimonials</h4>
                            </div>
                            <div className="col-lg-12">
                                <div className="owl-carousel owl-theme text-center">
                                    <div className="item">
                                        <div className="client-area">
                                            <p>Nulla metus metus sed euismod volutpat velit class aptent taciti sociosqu ad litora
                                                torquent per conubia
                                                nostra.</p>
                                            <div className="img">
                                                <span className="icon"><img src="https://fulax.netlify.app/img/left-quote.svg" alt="" /></span>
                                                <span className="icon"><img src="https://fulax.netlify.app/img/right-quote.svg" alt="" /></span>
                                                <div className="author">
                                                    <img src="https://fulax.netlify.app/img/clients/1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <h6>Alex Smith</h6>
                                            <span>Envato Customer</span>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="client-area">
                                            <p>Nulla metus metus sed euismod volutpat velit class aptent taciti sociosqu ad litora
                                                torquent per conubia
                                                nostra.</p>
                                            <div className="img">
                                                <span className="icon"><img src="https://fulax.netlify.app/img/left-quote.svg" alt="" /></span>
                                                <span className="icon"><img src="https://fulax.netlify.app/img/right-quote.svg" alt="" /></span>
                                                <div className="author">
                                                    <img src="https://fulax.netlify.app/img/clients/2.jpg" alt="" />
                                                </div>
                                            </div>
                                            <h6>Sam Smith</h6>
                                            <span>Envato Customer</span>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="client-area">
                                            <p>Nulla metus metus sed euismod volutpat velit class aptent taciti sociosqu ad litora
                                                torquent per conubia
                                                nostra.</p>
                                            <div className="img">
                                                <span className="icon"><img src="https://fulax.netlify.app/img/left-quote.svg" alt="" /></span>
                                                <span className="icon"><img src="https://fulax.netlify.app/img/right-quote.svg" alt="" /></span>
                                                <div className="author">
                                                    <img src="https://fulax.netlify.app/img/clients/3.jpg" alt="" />
                                                </div>
                                            </div>
                                            <h6>Alex Martin</h6>
                                            <span>Envato Customer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Testimonials ====
    ======================================= */}
                {/* =====================================
    ==== Start Call Action */}
                <div className="call-action text-center">
                    <div className="background bg-img  parallaxie pt-80 pb-80" data-background="img/bg2.jpg" data-overlay-dark={8}>
                        <div className="container">
                            <div className="row">
                                <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8">
                                    <div>
                                        <h3>Do You Have Any Project? Contact Us</h3>
                                        {/*<a href="#0" className="butn light mt-30">*/}
                                        {/*    <span>Contact Us<i className="pe-7s-paper-plane" /></span>*/}
                                        {/*</a>*/}
                                        <Link
                                            to={links.SIGNIN}
                                            className="butn light mt-30"
                                        >
                                            <span>Contact Us
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
                {/*                            <img src="https://fulax.netlify.app/img/blog/1.jpg" alt="" />*/}
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
                {/*                            <img src="https://fulax.netlify.app/img/blog/2.jpg" alt="" />*/}
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
                {/*                            <img src="https://fulax.netlify.app/img/blog/3.jpg" alt="" />*/}
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
                {/*                        /!*<img src="https://fulax.netlify.app/img/logo-dark.png" alt="logo" />*!/*/}
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
