import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  width: 30vw;
  height: 95vh;
  display: grid;
  gap: 10px;
  grid-template-rows: 1fr 5fr;
  overflow: none;
`;
const SubWrapper = styled.div`
  width: 100%;
  height: 95vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    /* width: 10px;
    background-color: orange; */
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    /* background-color: white; */
    display: none;
  }
`;
export default function Home() {
  return (
    <Wrapper>
      <SubWrapper>
        <PostTweetForm />
        <Timeline />
      </SubWrapper>
    </Wrapper>
  );
}
