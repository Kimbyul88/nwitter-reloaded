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
    background-color: rgb(235, 233, 234);
    color:rgb(4, 24, 52);
    fill: rgb(4, 24, 52);
  }
`;

const Wrapper = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
`;

interface CircleProps {
  top: number;
  left: number;
  color: string;
}

const Circle = styled.div<CircleProps>`
  z-index: -1;
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  width: 310px;
  height: 310px;
  background: ${({ color }) => color};
  border-radius: 50%;
  filter: blur(150px);
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
      <Circle
        top={Math.round(Math.random() * 60) + 20}
        left={Math.round(Math.random() * 60) + 20}
        color={`rgba(${Math.round(Math.random() * 255)}, ${Math.round(
          Math.random() * 255
        )}, ${Math.round(Math.random() * 255)}, 0.7)`}
      />
      <Circle
        top={Math.round(Math.random() * 60) + 20}
        left={Math.round(Math.random() * 60) + 20}
        color={`rgba(${Math.round(Math.random() * 255)}, ${Math.round(
          Math.random() * 255
        )}, ${Math.round(Math.random() * 255)}, 0.7)`}
      />
      <Circle
        top={Math.round(Math.random() * 60) + 20}
        left={Math.round(Math.random() * 60) + 20}
        color={`rgba(${Math.round(Math.random() * 255)}, ${Math.round(
          Math.random() * 255
        )}, ${Math.round(Math.random() * 255)}, 0.7)`}
      />
      <Circle
        top={Math.round(Math.random() * 60) + 20}
        left={Math.round(Math.random() * 60) + 20}
        color={`rgba(${Math.round(Math.random() * 255)}, ${Math.round(
          Math.random() * 255
        )}, ${Math.round(Math.random() * 255)}, 0.7)`}
      />
      <GlobalStyles />
      {isLoding ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
