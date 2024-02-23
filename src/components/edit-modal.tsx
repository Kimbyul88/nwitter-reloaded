import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import Tweet from "./tweet";

const EditBox = styled.div`
  width: 30vw;
  height: 30vh;
  border-radius: 10px;
  background-color: rgb(232, 236, 242);
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
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

const Buttons = styled.div`
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

export default function EditModal() {
  const [text, setText] = useState("godd");
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <EditBox>
      <ImgBox>
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
      </ImgBox>
      <Title>수정하기</Title>
      <Input type="text" defaultValue={text} onChange={onInput}></Input>
      <Buttons>
        <OkButton>확인</OkButton>
        <CancelButton>취소</CancelButton>
      </Buttons>
    </EditBox>
  );
}
