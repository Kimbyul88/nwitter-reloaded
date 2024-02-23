import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth, storage } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
  Form,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //어떤 인풋요소가 변경되었을때 => 타겟을 그 인풋의 name과 value로 잡는다.
    const {
      target: { name, value },
    } = e;
    //이름인풋이 변경되는 대로 인풋의 value값을 이름으로 설정
    if (name === "name") {
      setName(value);
    }
    //이메일인풋이 변경되는 대로 인풋의 value값을 이메일으로 설정
    else if (name === "email") {
      setEmail(value);
    }
    //비번인풋이 변경되는 대로 인풋의 value값을 비번으로 설정
    else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
        photoURL:
          "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FK8JnM%2FbtsFgRbe10F%2FtoYMkkCD48wZFzIKIPAWu1%2Fimg.png",
      });
      navigate("/");
    } catch (e) {
      //오류는 게정이 이미 있거나 비밀번호 형식이 맞지 않을때
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join Twitter</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account?
        <Link to="/login">Log In &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
