import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: grid;
  grid-template-columns: 4fr 0.5fr;
  grid-template-rows: 1fr 1fr 0.2fr;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 20px;
`;

const TextArea = styled.textarea`
  grid-row: 1/-1;
  font-size: 18px;
  font-weight: 700;
  color: rgb(4, 24, 52);
  background: none;
  width: 100%;
  resize: none;
  border: none;
  &::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 16px;
    color: black;
    font-weight: 300;
  }
  &:focus {
    font-family: "Noto Sans KR", sans-serif;
    outline: none;
    /* background-color: white; */
  }
`;

const AttachFileButton = styled.label`
  color: black;
  text-align: center;
  border-radius: 50%;
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  &:hover,
  &:active {
    background: white;
  }
  transition: display 3s ease-in-out;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: none;
  color: black;
  border: none;
  border-radius: 50%;
  font-size: 30px;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  cursor: pointer;
  &:hover,
  &:active {
    background: white;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  //글쓰기 영역이 바뀔 때마다 그 글을 tweet으로 설정해준다.
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  //올린 이미지 파일을 한개만 file로 설정해준다.
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size <= 100000) setFile(files[0]);
      else {
        confirm("최대 1MB의 파일을 업로드 해주세요");
        setFile(null);
        return;
      }
    }
  };

  //트윗하기
  let url = "";
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //user는 현재 로그인 된 유저이다.
    const user = auth.currentUser;
    //로그인상태가 아니거나, 업로드 중이거나, 글을 안썻거나등등 하면 클릭해도 반응없다.
    if (
      !user ||
      isLoading ||
      (tweet === "" && file === null) ||
      tweet.length > 180
    ) {
      return;
    }
    //정상적일때, 트윗을 파이어베이스에 올린다.
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      //트윗에 사진을 업로드했다면~?
      if (file) {
        //이 경로로 스토리지에 저장
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        //업로드하는 코드
        const result = await uploadBytes(locationRef, file);
        //업로드한 url을 받아서 해당 트윗(doc)에 업데이트 하자.
        url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      //트윗이 잘 안됐을때
      console.log(e);
    } finally {
      //파이어베이스에 올리기가 완료되면 로딩을 끝낸다.
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="무슨 일이 일어나고 있나요?"
      ></TextArea>
      <AttachFileButton htmlFor="file">{file ? "✅" : "🖼️"}</AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn type="submit" value={isLoading ? "..." : "✍️"} />
    </Form>
  );
}
