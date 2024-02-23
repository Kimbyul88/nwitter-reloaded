import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import EditModal from "./components/edit-modal";

const router = createBrowserRouter([
  {
    path: "/",
    //Layout이 감싸고 있는 Home과 Profile은
    //ProtectedRoute의 children으로 보내진다.
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    width: 100%;
    /* height: 100vh; */
    background-color: white;
    color:black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: relative;
  display: flex;
  justify-content: center;
`;

const EditModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

function App() {
  const [isLoding, setLoading] = useState(true);
  const init = async () => {
    //1) 사용자가 로그인을 했냐 안했냐를 확인한다. autoStateReady()
    await auth.authStateReady();
    setLoading(false);
  };
  //1-2) 한번만 실행!
  useEffect(() => {
    init();
  }, []);

  return (
    //1-3) 로그인 확인 중에는 로딩 페이지, 다 하면 메인 라우터로 보내진다.
    <Wrapper>
      {/* <EditModalWrapper>
        <EditModal />
      </EditModalWrapper> */}
      <GlobalStyles />
      {isLoding ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
