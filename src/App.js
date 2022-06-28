import './App.css';
import PrivateRoute from "./routes/PrivateRoute";
import {Route, Routes, useNavigate} from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignIn from "./components/Auth/SignIn/SignIn";
import PublicRoute from "./routes/PublicRoute";
import Main from "./components/Layout/Main/Main";
import DashboardCanal from "./components/Main/Dashboard/DashboardCanal";
import * as links from "./utils/links"
import {CANAL, FORNECEDOR} from "./utils/constants";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import ActiveUser from "./components/Auth/ActiveUser/ActiveUser";
import DashboardFornecedor from "./components/Main/Dashboard/DashboardFornecedor";
import {FORNECEDOR_FAVORITES_PREMIUM, MAIN, SIGNIN} from "./utils/links";
import MainSite from "./components/Main/Main/MainSite";
import CanalFavorites from "./components/Main/Favorites/CanalFavorites";
import FornecedorFavorites from "./components/Main/Favorites/FornecedorFavorites";
import FornecedorSettings from "./components/Main/Settings/FornecedorSettings";
import CanalSettings from "./components/Main/Settings/CanalSettings";
import FornecedorSearchCanais from "./components/Main/SearchUser/FornecedorSearchCanais";
import CanalSearchFornecedores from "./components/Main/SearchUser/CanalSearchFornecedores";
// import FornecedorFavorites from "./components/Main/Favorites/FornecedorFavorites";
import FornecedorBuyPremium from "./components/Main/BuyPremium/FornecedorBuyPremium";
import FornecedorEditProfile from "./components/Main/EditProfile/FornecedorEditProfile";
import CanalEditProfile from "./components/Main/EditProfile/CanalEditProfile";
import MyFits from "./components/Main/MyFits/MyFits";
import {NotificationContainer, NotificationManager} from "react-notifications";
import React, {useContext, useEffect} from "react";
import {AuthContext} from "./contexts/AuthContext";
import FornecedorNotification from "./components/Main/Notification/FornecedorNotification";
import FornecedorFavoritesPremium from "./components/Main/Favorites/FornecedorFavoritesPremium";
import CanalBuyPremium from "./components/Main/BuyPremium/CanalBuyPremium";
import CanalFavoritesPremium from "./components/Main/Favorites/CanalFavoritesPremium";
import CanalMyFits from "./components/Main/MyFits/CanalMyFits";
function App() {
    const {
        setDataUser,
        loading,
        notiMessage,
        setNotiMessage,
        notiMessageInfo,
        setNotiMessageInfo
    } = useContext(AuthContext)

    useEffect(() => {
        if (notiMessage) {
            setNotiMessage(null)
            console.log(notiMessage.type)
            switch (notiMessage.type) {
                case "error":
                    NotificationManager.error(notiMessage.message, 'Hmm... ');
                    break;
                case "success":
                    NotificationManager.success(notiMessage.message, '... ');
                    break;
                case "info":
                    NotificationManager.info(notiMessage.message, '... ');
                    break;
                case "warning":
                    NotificationManager.warning(notiMessage.message, '... ');
                    break;
            }
        }
    }, [notiMessage])

    // useEffect(() => {
    //     if (notiMessageInfo) {
    //         setNotiMessageInfo(null)
    //         NotificationManager.info(notiMessageInfo, '... ');
    //     }
    // }, [notiMessageInfo])

    console.log(notiMessageInfo)
    return (
        <>
            <NotificationContainer/>
            <Routes>
                <Route
                    path={links.FORNECEDOR_NOTI}
                    element={
                        <PrivateRoute>
                            <Main>
                                <FornecedorNotification />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.FORNECEDOR_FAVORITES_PREMIUM}
                    element={
                        <PrivateRoute>
                            <Main>
                                <FornecedorFavoritesPremium />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.CANAL_FAVORITES_PREMIUM}
                    element={
                        <PrivateRoute>
                            <Main>
                                <CanalFavoritesPremium />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.FORNECEDOR_MY_FITS}
                    element={
                        <PrivateRoute>
                            <Main>
                                <MyFits />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.CANAL_MY_FITS}
                    element={
                        <PrivateRoute>
                            <Main>
                                <CanalMyFits />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.CANAL_EDIT_PROFILE}
                    element={
                        <PrivateRoute>
                            <Main>
                                <CanalEditProfile />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.FORNECEDOR_EDIT_PROFILE}
                    element={
                        <PrivateRoute>
                            <Main>
                                <FornecedorEditProfile />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.FORNECEDOR_BUY_PREMIUM}
                    element={
                        <PrivateRoute>
                            <Main>
                                <FornecedorBuyPremium />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.CANAL_BUY_PREMIUM}
                    element={
                        <PrivateRoute>
                            <Main>
                                <CanalBuyPremium />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.CANAL_SEARCH_FORNECEDORES}
                    element={
                        <PrivateRoute>
                            <Main>
                                <CanalSearchFornecedores />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.FORNECEDOR_SEARCH_CANAIS}
                    element={
                        <PrivateRoute>
                            <Main>
                                <FornecedorSearchCanais />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.CANAL_SETTINGS}
                    element={
                        <PrivateRoute>
                            <Main>
                                <CanalSettings />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.FORNECEDOR_SETTINGS}
                    element={
                        <PrivateRoute>
                            <Main>
                                <FornecedorSettings />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.CANAL_FAVORITES}
                    element={
                        <PrivateRoute>
                            <Main>
                                <CanalFavorites />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.FORNECEDOR_FAVORITES}
                    element={
                        <PrivateRoute>
                            <Main>
                                <FornecedorFavorites />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.DASHBOARD_CANAL}
                    element={
                        <PrivateRoute>
                            <Main>
                                <DashboardCanal />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.DASHBOARD_FORNECEDOR}
                    element={
                        <PrivateRoute>
                            <Main>
                                <DashboardFornecedor />
                            </Main>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={links.MAIN}
                    element={
                        <MainSite />

                    }
                />
                <Route
                    path={links.SIGNUP_CANAL}
                    element={
                        <PublicRoute>
                            <SignUp
                                type={CANAL}
                            />
                        </PublicRoute>
                    }
                />
                <Route
                    path={links.SIGNUP_FORNECEDOR}
                    element={
                        <PublicRoute>
                            <SignUp
                                type={FORNECEDOR}
                            />
                        </PublicRoute>
                    }
                />
                <Route
                    path={links.SIGNIN}
                    element={
                        <PublicRoute>
                            <SignIn />
                        </PublicRoute>
                    }
                />
                {/*<Route*/}
                {/*    path={links.SIGNIN_FORNECEDOR}*/}
                {/*    element={*/}
                {/*        <PublicRoute>*/}
                {/*            <SignIn*/}
                {/*                type={FORNECEDOR}*/}
                {/*            />*/}
                {/*        </PublicRoute>*/}
                {/*    }*/}
                {/*/>*/}
                <Route
                    path={links.FORGOTPASSWORD}
                    element={
                        <ForgotPassword />

                    }
                />
                <Route
                    path={links.RESETPASSWORD}
                    element={
                        <ResetPassword />

                    }
                />
                <Route
                    path={links.ACTIVEUSER}
                    element={
                        <ActiveUser />
                    }
                />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
