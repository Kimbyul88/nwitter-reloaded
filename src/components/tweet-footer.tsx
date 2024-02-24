import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Icon = styled.div`
  width: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    z-index: -1;
    content: "";
    position: absolute;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  svg {
    stroke: rgba(0, 0, 0, 0.7);
  }
  &.Fill {
    fill: ${({ color }) => color};
  }
  /* svg:hover {
    cursor: pointer;
    stroke: ${({ color }) => color};
  }
  @keyframes heartFill {
    10% {
      transform: scale(0.8);
      fill: ${({ color }) => color};
    }
    70% {
      transform: scale(1.2);
      fill: ${({ color }) => color};
    }
    100% {
      transform: scale(1);
      fill: ${({ color }) => color};
    }
  }
  svg:active {
    animation: 0.5s heartFill ease;
    animation-fill-mode: forwards;
  }
  &:hover:before {
    cursor: pointer;
    background: ${({ color }) => color};
    opacity: 0.2;
  } */
`;

const Number = styled.span``;

export default function TweetFooter() {
  const [heart, setHeart] = useState(0);
  const [isHover, setHover] = useState(false);
  const [isClicked, setClicked] = useState(false);

  const onHeart = (e: React.MouseEvent<HTMLDivElement>) => {
    setClicked(true);
    setHeart((c) => c + 1);
    console.log(isClicked);
  };
  return (
    <Wrapper>
      <IconBox onClick={onHeart}>
        <Icon color=" rgba(231, 0, 104, 1)">
          {/* {isClicked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="Fill"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          ) : ( */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="noFill"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          {/* )} */}
        </Icon>
        <Number>{heart}</Number>
      </IconBox>
    </Wrapper>
  );
}
