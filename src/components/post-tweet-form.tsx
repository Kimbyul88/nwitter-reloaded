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
  position: relative;
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
  padding-right: 120px;
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
  /* background-image: linear-gradient(
    0.4turn,
    rgba(255, 255, 255, 0.35) 50%,
    rgba(0, 0, 0, 0.25)
  ); */
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.85);
  }
  &:active {
    transform: scale(0.9);
  }
  svg {
    width: 30px;
    height: 30px;
  }
`;
const XButton = styled.div`
  position: absolute;
  width: 100px;
  height: 70px;
  right: 100px;
  top: 25px;
  div {
    position: relative;
    img {
      width: 100px;
      max-height: 130px;
      border-radius: 15px;
    }
    svg {
      cursor: pointer;
      width: 30px;
      height: 30px;
      position: absolute;
      top: -15px;
      right: -15px;
      fill: #ffffff81;
      stroke: #000000;
    }
  }
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
  /* background-image: linear-gradient(
    0.4turn,
    rgba(255, 255, 255, 0.35) 50%,
    rgba(0, 0, 0, 0.25)
  ); */
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.85);
  }
  &:active {
    transform: scale(0.9);
  }
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  //글쓰기 영역이 바뀔 때마다 그 글을 tweet으로 설정해준다.
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  //올린 이미지 파일을 한개만 file로 설정해준다.
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size <= 100000) {
        setFile(files[0]);
        setBackgroundImage(URL.createObjectURL(files[0]));
      } else {
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
        heartCount: 0,
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
  const onXButton = () => {
    setFile(null);
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
      <AttachFileButton htmlFor="file">
        {file ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="rgb(0, 0, 0)"
              d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 21H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6V13" />
              <path d="m3 16l7-3l5.5 2.5M16 10a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm0 9h3m3 0h-3m0 0v-3m0 3v3" />
            </g>
          </svg>
        )}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      {file ? (
        <XButton>
          <div>
            <img src={`${backgroundImage}`} alt="" />
            <svg
              onClick={onXButton}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </XButton>
      ) : null}
      <SubmitBtn type="submit" value={isLoading ? "💫" : "✍️"} />
    </Form>
  );
}
