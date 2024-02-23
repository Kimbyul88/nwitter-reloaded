import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { update } from "firebase/database";
import { ChangeEvent, useState } from "react";

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: rgb(237, 68, 62);
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const EditButton = styled.button`
  background-color: black;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;

const EditBox = styled.div`
  /* display: none; */
  position: absolute;
  right: 0;
  background-color: green;
  width: 50%;
  height: 100%;
  border-radius: 15px;
`;

const Title = styled.span`
  margin-top: 50px;
  font-weight: 800;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 20px;
  width: 90%;
  height: 40%;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background: none;
  &::placeholder {
    font-size: 16px;
    color: grey;
    font-weight: 200;
  }
  &:focus {
    outline: none;
    border: 2px solid rgb(249, 70, 68);
  }
`;

const EditButtons = styled.div`
  width: 70%;
  display: flex;
  gap: 5px;
  justify-content: end;
`;

const OkButton = styled.button`
  background-color: rgb(249, 70, 68);
  border: none;
  color: rgb(232, 236, 242);
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 1px 2px 0px black;
  /* border-bottom: 2px solid black; */
  &:hover {
    background-color: rgb(255, 231, 91);
    color: black;
  }
  &:active {
    box-shadow: none;
    /* border: 2px solid rgba(0, 0, 0, 0); */
    transform: translate(1px, 2px);
  }
`;

const CancelButton = styled.button`
  background-color: rgb(133, 133, 133);
  border: none;
  color: rgb(232, 236, 242);
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 1px 2px 0px black;

  &:hover {
    background-color: rgb(255, 231, 91);
    color: black;
  }
  &:active {
    box-shadow: none;
    /* border: 2px solid rgba(0, 0, 0, 0); */
    transform: translate(1px, 2px);
  }
`;

const ImgBox = styled.div`
  background-color: rgb(232, 236, 242);
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translate(-50%);
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [text, setText] = useState(tweet);
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
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
    const editbox = document.querySelector<HTMLElement>(".editbox");
    if (editbox != null) {
      editbox.style.backgroundColor = "red";
    }
    const changedTweet = prompt("수정할 사항을 입력해주세요");
    if (user?.uid !== userId) return;
    try {
      await updateDoc(doc(db, "tweets", id), {
        tweet: changedTweet,
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  return (
    <Wrapper>
      <EditBox className="editbox">
        {/* <ImgBox>
          <img
            width="94"
            height="94"
            src="https://img.icons8.com/3d-fluency/94/star-struck-2.png"
            alt="star-struck-2"
            style={{
              width: "130px",
              height: "130px",
            }}
          />
        </ImgBox> */}
        <Title>수정하기</Title>
        <Input type="text" defaultValue={text} onChange={onInput}></Input>
        <EditButtons>
          <OkButton>확인</OkButton>
          <CancelButton>취소</CancelButton>
        </EditButtons>
      </EditBox>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <Buttons>
            <DeleteButton onClick={onDelete}>삭제</DeleteButton>
            <EditButton onClick={onEdit}>수정</EditButton>
          </Buttons>
        ) : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
}
