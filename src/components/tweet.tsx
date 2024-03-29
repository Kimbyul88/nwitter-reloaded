import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import TweetFooter from "./tweet-footer";
import CreatedAt from "./created-at";
import { IUser } from "./all-users";

const Wrapper = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  display: flex;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 100%;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const Column = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  /* flex-grow: 0; */
`;

const Photo = styled.img`
  width: 100%;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
  display: flex;
  gap: 3px;
  align-items: center;
  img {
    width: 17px;
    height: 17px;
  }
`;

const Name = styled.span``;
const ID = styled.span`
  color: rgb(127, 136, 151);
  font-weight: 300;
`;

const Payload = styled.p`
  line-height: 19px;
  margin: 10px 0px;
  padding-left: 0px;
  font-size: 15px;
  font-weight: 300;
  flex-grow: 0;
`;

const DeleteButton = styled.button`
  background: none;
  color: white;
  font-weight: 600;
  border: none;
  font-size: 14px;
  padding: 5px 10px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    color: rgb(4, 24, 52);
    background: white;
  }
`;

const EditButton = styled.button`
  background: none;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 14px;
  padding: 5px 10px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    color: rgb(4, 24, 52);
    background: white;
  }
`;

const Buttons = styled.div`
  overflow: hidden;
  position: absolute;
  right: 30px;
  top: 19px;
  display: flex;
  justify-content: center;
  gap: 5px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 1);
  height: 40px;
  transform: translate(-30px, 0);
  z-index: 1;
`;

const EditBox = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgb(233, 235, 242);
  width: 100%;
  height: 100%;
  border-radius: 15px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  padding: 10px;
`;

const Input = styled.textarea`
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 10px;
  resize: none;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 80%;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background: none;
  font-size: 16px;
  &::placeholder {
    font-size: 16px;
    color: grey;
    font-weight: 200;
  }
  &:focus {
    font-family: "Noto Sans KR", sans-serif;
    outline: none;
  }
`;

const EditButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  justify-content: center;
  align-items: center;
`;

const OkButton = styled.button`
  cursor: pointer;
  height: 40px;
  width: 40px;
  font-size: 13px;
  border: none;
  background-color: rgb(0, 0, 0);
  color: white;
  font-weight: 600;
  border-radius: 50%;
  &:hover {
    background-color: rgb(255, 255, 255);
    color: #000000;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const CancelButton = styled.button`
  cursor: pointer;
  height: 40px;
  width: 40px;
  font-size: 13px;
  border: none;
  background-color: rgb(0, 0, 0);
  color: white;
  font-weight: 600;
  border-radius: 50%;
  &:hover {
    background-color: rgb(255, 255, 255);
    color: #000000;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  margin-top: 10px;
  background: none;
  border-radius: 50%;
  flex-shrink: 0;
`;

const HeaderBox = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px 0 0 0px;
  width: 100%;
  height: 30px;
  justify-content: space-between;
  align-items: end;
  background: none;
`;
const MoreIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    cursor: pointer;
    opacity: 1;
    width: 28px;
    stroke: rgb(4, 24, 52);
    position: relative;
    &:hover,
    &:active {
      stroke: #ffffff;
    }
  }
  &:before {
    content: "";
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
  }
  &:hover:before {
    background: rgba(74, 74, 74, 0.15);
    backdrop-filter: blur(10px);
  }
`;
export default function Tweet({
  username,
  photo,
  tweet,
  userId,
  id,
  createdAt,
  heartCount,
}: ITweet) {
  const [isMore, setmore] = useState(false);
  const user = auth.currentUser;
  const [text, setText] = useState(tweet);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FK8JnM%2FbtsFgRbe10F%2FtoYMkkCD48wZFzIKIPAWu1%2Fimg.png"
  );
  const [users, setUsers] = useState<IUser[]>([]);
  const getProfilePictureURL = async () => {
    try {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const usersData = querySnapshot.docs.map((doc) => doc.data() as IUser);
      setUsers(usersData);
      {
        users.forEach((user) => {
          if (username === user.name) {
            setAvatar(user.profile);
          }
        });
      }
      console.log("getProfliw");
    } catch (error) {
      return;
    }
  };
  useEffect(() => {
    getProfilePictureURL();
  }, []);

  useEffect(() => {
    users.forEach((user) => {
      if (username === user.name) {
        setAvatar(user.profile);
      }
    });
  }, [users]);

  const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const onDelete = async () => {
    const ok = confirm("게시물을 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const onEdit = async () => {
    setIsEditing(true);
    setmore(false);
  };
  const onOkButton = async () => {
    if (user?.uid !== userId) return;
    try {
      await updateDoc(doc(db, "tweets", id), {
        tweet: text,
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const onCancleButton = () => {
    setIsEditing(false);
  };
  const onSVG = () => {
    setmore((current) => !current);
  };

  const timeValue: number = createdAt;
  // console.log(avatar);
  return (
    <Wrapper>
      {user?.uid === userId && isEditing ? (
        <EditBox className="editbox" id={tweet}>
          <Input defaultValue={text} onChange={onInput}></Input>
          <EditButtons>
            <OkButton onClick={onOkButton}>확인</OkButton>
            <CancelButton onClick={onCancleButton}>취소</CancelButton>
          </EditButtons>
        </EditBox>
      ) : null}
      <ProfileImage src={avatar} />
      <Column>
        <HeaderBox>
          <Username>
            <Name>{username}</Name>
            <img src="/check.svg" alt="" />
            <ID>@{userId.slice(0, 8)}</ID>
            <CreatedAt time={timeValue} />
          </Username>
          {user?.uid === userId && !isEditing ? (
            <MoreIcon>
              <svg
                onClick={onSVG}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
              </svg>
            </MoreIcon>
          ) : null}
        </HeaderBox>

        <Payload>{tweet}</Payload>
        {photo ? <Photo src={photo} /> : null}
        {isEditing ? null : <TweetFooter id={id} heartCount={heartCount} />}
      </Column>

      {user?.uid === userId && isMore ? (
        <Buttons>
          <EditButton onClick={onEdit}>수정</EditButton>
          <DeleteButton onClick={onDelete}>삭제</DeleteButton>
        </Buttons>
      ) : null}
    </Wrapper>
  );
}
