import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
  /* padding: 20px; */
  border-radius: 10px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const SearchBox = styled.div`
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
  padding: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid rgba(0, 0, 0, 0);
  position: relative;
`;

const SearchIcon = styled.label`
  width: 20px;
  position: absolute;
  left: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  padding-left: 35px;
  background: none;
  border-radius: 10px;
  &:focus {
    outline: none;
    border: 1.5px solid black;
  }
  &:focus + .xicon {
    opacity: 1;
    svg {
      fill: rgb(238, 72, 120);
    }
  }
  &:focus + .searchicon {
    svg {
      stroke: rgb(238, 72, 120);
    }
  }
  &::placeholder {
    font-weight: 200;
  }
`;

const XIcon = styled.div`
  width: 20px;
  position: absolute;
  right: 30px;
  opacity: 0;
  cursor: pointer;
`;

const TrendingList = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const Title = styled.div`
  padding: 0 35px;
  margin-bottom: 10px;
`;

const Trend = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  padding: 15px 35px;
  cursor: pointer;
  svg {
    width: 20px;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
  &:active {
    opacity: 0.5;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Theme = styled.div`
  color: rgba(120, 120, 120, 0.8);
  font-weight: 300;
  font-size: 14px;
`;
const Content = styled.div`
  font-weight: 700;
  font-size: 20px;
`;
const Posts = styled.div`
  color: rgba(120, 120, 120, 0.8);
  font-weight: 300;
  font-size: 14px;
`;

export default function Trending() {
  return (
    <Wrapper>
      <SearchBox>
        <SearchIcon className="searchicon" htmlFor="search-input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </SearchIcon>
        <SearchInput
          id="search-input"
          type="text"
          placeholder="검색어를 입력하세요"
        />
        <XIcon className="xicon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </svg>
        </XIcon>
      </SearchBox>
      <TrendingList>
        <Title>나를 위한 트렌드</Title>
        <Trend>
          <Column>
            <Theme>대한민국에서 트렌드 중</Theme>
            <Content>#Twitter_Challenge</Content>
            <Posts>2,024 posts</Posts>
          </Column>
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
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </Trend>
        <Trend>
          <Column>
            <Theme>IT · 실시간 트렌드</Theme>
            <Content>노마드코더 강의</Content>
            <Posts>17,693 posts</Posts>
          </Column>
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
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </Trend>
      </TrendingList>
    </Wrapper>
  );
}
