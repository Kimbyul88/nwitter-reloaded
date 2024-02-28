import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 100%;
  height: 40vh;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Title = styled.div``;

const NameWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  /* height: 100%; */
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
`;
const NameBox = styled.div`
  padding: 5px 20px;
  box-sizing: border-box;
  /* background: rgba(255, 255, 255, 0.25); */
  background-image: linear-gradient(
    0.46turn,
    rgba(255, 255, 255, 0.35) 60%,
    rgba(0, 0, 0, 0.15)
  );
  border-radius: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 40px;
  &:hover {
    background: rgba(252, 213, 63, 1);
  }
  &:after {
    display: flex;
    justify-content: center;
    align-items: center;
    content: "팔로우";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    color: white;
    opacity: 0;
    font-weight: 600;
  }
  &:hover:after {
    opacity: 1;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const ProfileImage = styled.img`
  width: 25px;
  border-radius: 50%;
  /* background-color: rgba(0, 0, 0, 0.1); */
`;

const UserName = styled.div``;
export interface IUser {
  name: string;
  profile: string;
}

export default function AllUsers() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const usersData = querySnapshot.docs.map((doc) => doc.data() as IUser);
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <Wrapper>
      <Title>⭐ 등록된 유저들</Title>
      <NameWrapper>
        {users.map((user, index) => (
          <NameBox key={index}>
            <ProfileImage src={user.profile} />
            <UserName>{user.name}</UserName>
          </NameBox>
        ))}
      </NameWrapper>
    </Wrapper>
  );
}
