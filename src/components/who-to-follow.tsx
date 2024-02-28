import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* gap: 25px; */
  padding-top: 30px;
  border-radius: 10px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 5px;
`;

const Title = styled.div`
  padding: 0 35px;
  margin-bottom: 15px;
`;

const Trend = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 30px;
  cursor: pointer;
  svg {
    width: 20px;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ProflieImage = styled.div`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  overflow: hidden;
  margin-right: 12px;
  img {
    width: 45px;
    height: 45px;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ID = styled.div`
  color: rgb(127, 136, 151);
  font-weight: 300;
  font-size: 14px;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 16px;
  display: flex;
  gap: 2px;
  align-items: center;
  svg {
    transform: scale(0.8);
    fill: rgb(255, 255, 255);
  }
`;

const FollowBtn = styled.div`
  color: white;
  background-color: black;
  padding: 8px 10px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: 600;
  &.following {
    background: none;
    color: black;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export default function WhoToFollow() {
  const [isFollowing, setFollowing] = useState(false);
  const [isFollowing2, setFollowing2] = useState(false);

  const onFollow = () => {
    setFollowing((c) => !c);
  };
  const onFollow2 = () => {
    setFollowing2((c) => !c);
  };
  return (
    <Wrapper>
      <Title>팔로우 추천</Title>
      <Trend>
        <Column>
          <ProflieImage>
            <img
              src="https://pbs.twimg.com/profile_images/1321163587679784960/0ZxKlEKB_400x400.jpg"
              alt=""
            />
          </ProflieImage>
          <User>
            <Name>
              NASA
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" />
              </svg>
            </Name>
            <ID>@NASA</ID>
          </User>
        </Column>
        {isFollowing ? (
          <FollowBtn className="following" onClick={onFollow}>
            팔로잉
          </FollowBtn>
        ) : (
          <FollowBtn className="follow" onClick={onFollow}>
            팔로우
          </FollowBtn>
        )}
      </Trend>
      <Trend>
        <Column>
          <ProflieImage>
            <img
              src="https://yt3.googleusercontent.com/ytc/AIf8zZRXYy5ZWPudv4kJ0MPNEeGWb6Lu-QCgg4rCQ1k3fQ=s176-c-k-c0x00ffffff-no-rj"
              alt=""
            />
          </ProflieImage>
          <User>
            <Name>
              Nomad Coders
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" />
              </svg>
            </Name>
            <ID>@nomad_coders</ID>
          </User>
        </Column>
        {isFollowing2 ? (
          <FollowBtn className="following" onClick={onFollow2}>
            팔로잉
          </FollowBtn>
        ) : (
          <FollowBtn className="follow" onClick={onFollow2}>
            팔로우
          </FollowBtn>
        )}
      </Trend>
    </Wrapper>
  );
}
