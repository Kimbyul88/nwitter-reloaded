import { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
`;
const IconCheckBox = styled.input`
  display: none;
  /* &:checked + #check-label svg {
    animation: 0.9s heartFill ease;
    animation-fill-mode: forwards;
  }
  &:not(:checked) + #check-label svg {
    fill: none;
    stroke: rgba(0, 0, 0, 0.7);
  } */
`;
const Icon = styled.div`
  width: 18px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:before {
    z-index: -1;
    content: "";
    position: absolute;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  &:hover + span {
    color: ${({ color }) => color};
  }
  svg {
    stroke: rgba(0, 0, 0, 0.7);
    &.fill {
      fill: ${({ color }) => color};
      stroke: ${({ color }) => color};
    }
  }
  svg:hover {
    stroke: ${({ color }) => color};
    fill: ${({ color }) => color};
  }
  svg:hover g {
    stroke: ${({ color }) => color};
  }

  svg:hover g path {
    stroke: ${({ color }) => color};
  }
  svg:active {
    transform: scale(0.8);
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
  &:hover:before {
    background: ${({ color }) => color};
    opacity: 0.2;
  }
`;

const Number = styled.span`
  font-weight: 300;
  font-size: 14px;
`;

export default function TweetFooter({
  id,
  heartCount,
}: {
  id: string;
  heartCount: number;
}) {
  const [HEART, setHeart] = useState(heartCount);
  const [isClicked, setClicked] = useState(false);

  const onHeart = async () => {
    setClicked((c) => !c);
    const updatedHeart = isClicked ? HEART - 1 : HEART + 1;
    setHeart(updatedHeart);
    try {
      await updateDoc(doc(db, `tweets/${id}`), {
        heartCount: updatedHeart,
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Wrapper>
      <IconBox>
        <Icon id={isClicked ? "check-label" : ""} color=" rgb(53, 158, 255)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.4}
            stroke="currentColor"
            className="w-6 h-6"
            width="16.5px"
          >
            <path d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
          </svg>
        </Icon>
        <Number>0</Number>
      </IconBox>
      <IconBox>
        <Icon id={isClicked ? "check-label" : ""} color=" rgb(18, 210, 0)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 21 21"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="m13.5 13.5l3 3l3-3" />
              <path d="M9.5 4.5h3a4 4 0 0 1 4 4v8m-9-9l-3-3l-3 3" />
              <path d="M11.5 16.5h-3a4 4 0 0 1-4-4v-8" />
            </g>
          </svg>
        </Icon>
        <Number>0</Number>
      </IconBox>
      <IconBox onClick={onHeart}>
        <IconCheckBox id="checked" type="checkbox" />
        <Icon id={isClicked ? "check-label" : ""} color=" rgb(238, 72, 120)">
          {isClicked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.4}
              stroke="currentColor"
              className="fill"
            >
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.4}
              stroke="currentColor"
              className="nofill"
            >
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          )}
        </Icon>
        <Number>{HEART}</Number>
      </IconBox>
    </Wrapper>
  );
}
