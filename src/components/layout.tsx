import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Left = styled.div`
  display: grid;
  grid-template-rows: 2fr 5fr 2.5fr;
  /* background-color: red; */
`;

const LogoBox = styled.div`
  /* background-color: blue; */
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 25px;
`;

const Logo = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8vw;
  height: 8vw;
  /* background: rgba(255, 255, 255, 0.35); */
  backdrop-filter: blur(10px);
  border-radius: 50%;
  @keyframes logo-scale {
    10% {
      transform: scale(1.1);
    }
    20% {
      transform: scale(1);
    }
  }
  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.55);
    animation: 3s logo-scale ease-in-out;
    /* animation-play-state: paused; */
  }
  &:after {
    content: "";
    position: absolute;
    width: 200%;
    height: 45%;
    background-color: rgba(255, 255, 255, 0.55);
    /* border-radius: 50%; */
    transform: translate(-40%, 50%) rotateZ(45deg);
    transition: all 0.7s ease-in-out;
  }
  &:hover:after {
    transform: translate(50%, -50%) rotateZ(45deg);
    animation-fill-mode: forwards;
  }
`;

const ProfileBox = styled.div`
  width: 70%;
  height: 50%;
  transform: translateX(14%);
  border-radius: 10px;
  margin-left: 10%;
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px 10px;
  @keyframes box-scale {
    0% {
      transform: translateX(14%);
    }
    10% {
      transform: translateX(14%) scale(1.1);
    }
    20% {
      transform: translateX(14%) scale(1);
    }
    100% {
      transform: translateX(14%);
    }
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.55);
    animation: 3s box-scale ease-in-out;
  }
`;

const AuthProfile = styled.img`
  width: 55px;
  height: 55px;
  background: black;
  /* border: 2px solid rgb(34, 139, 230); */
  border-radius: 50%;
  flex-shrink: 0;
`;

const AuthText = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding-top: 7px;
`;
const AuthUser = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  align-items: center;
  gap: 3px;
`;

const AuthId = styled.div`
  color: rgb(127, 136, 151);
  font-weight: 300;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  padding: 20px 0 0 70px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  padding: 10px 20px;
  background: none;
  border-radius: 20px;
  height: 45px;
  svg {
    width: 30px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const Name = styled.a`
  color: rgb(4, 24, 52);
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: 1.2fr 2fr 1.2fr;
  height: 100%;
  padding: 20px 0px;
  width: 100%;
  max-width: 1200px;
`;

const Right = styled.div`
  width: 100%;
  height: 100px;
  background-color: red;
`;
export default function Layout() {
  const user = auth.currentUser;
  const avatar = user?.photoURL;
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  const goHome = () => {
    navigate("/");
  };
  const goProfile = () => {
    navigate("/profile");
  };

  return (
    <Wrapper>
      <Left>
        <LogoBox onClick={goHome}>
          <Logo>
            <img
              width="100"
              height="100"
              src="https://img.icons8.com/3d-fluency/94/flushed.png"
              alt="flushed"
            />
          </Logo>
        </LogoBox>
        <Menu>
          <MenuItem onClick={goHome}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <Name>홈</Name>
          </MenuItem>
          <MenuItem onClick={goHome}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <Name>탐색하기</Name>
          </MenuItem>

          <MenuItem onClick={goProfile}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <Name>프로필</Name>
          </MenuItem>
          <MenuItem onClick={goHome}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <Name>설정</Name>
          </MenuItem>
          <MenuItem onClick={onLogOut} className="log-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
            <Name className="log-out">로그아웃</Name>
          </MenuItem>
        </Menu>
        <ProfileBox onClick={goProfile}>
          {avatar ? <AuthProfile src={avatar} /> : null}
          <AuthText>
            <AuthUser>
              {user?.displayName} <img width="20px" src="/check.svg" alt="" />
            </AuthUser>
            <AuthId>@{user?.uid.slice(0, 8)}</AuthId>
          </AuthText>
        </ProfileBox>
      </Left>
      <Outlet />
      <Right>fasdfasd</Right>
    </Wrapper>
  );
}
