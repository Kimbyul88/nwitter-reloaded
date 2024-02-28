import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
  display: flex;
  height: 95vh;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const ProfileHeader = styled.div`
  border-radius: 15px;
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 28vh;
  align-items: start;
  padding: 20px 20px 20px 20px;
  gap: 0px;
  box-sizing: border-box;
  overflow: hidden;
`;
const Circle = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.34);
  filter: blur(50px);
  border-radius: 50%;
  top: 70px;
  right: 50%;
  /* transform: translate(-50%, 0); */
  z-index: -1;
`;
const AvatarUpload = styled.label`
  width: 80px;
  /* overflow: hidden; */
  height: 80px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 17px;
  position: relative;
  svg {
    width: 50px;
  }
  &:before {
    z-index: -1;
    width: 110%;
    height: 110%;
    position: absolute;
    background: none;
    border-radius: 50%;
    content: "";
  }
`;

const AvatarImg = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  gap: 3px;
  align-items: center;
  padding-left: 5px;
  margin-bottom: 5px;
  img {
    width: 20px;
  }
`;
const ID = styled.div`
  color: rgb(127, 136, 151);
  padding-left: 5px;
  font-weight: 300;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Mail = styled.div`
  color: rgb(127, 136, 151);
  padding-left: 5px;
  font-weight: 300;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
  svg {
    width: 17px;
  }
`;

const Tweets = styled.div`
  height: 80vh;
  overflow-y: scroll;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
      await updateDoc(doc(db, "users", user.uid), {
        profile: avatarUrl,
      });
    }
  };
  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo, heartCount } =
        doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
        heartCount,
      };
    });
    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      <ProfileHeader>
        <Circle></Circle>
        <AvatarUpload htmlFor="avatar">
          {avatar ? (
            <AvatarImg src={avatar} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
            </svg>
          )}
        </AvatarUpload>
        <AvatarInput
          onChange={onAvatarChange}
          id="avatar"
          type="file"
          accept="image/*"
        />
        <Name>
          {user?.displayName ?? "Anonymous"}
          <img src="/check.svg" />
        </Name>
        <ID>@{user?.uid.slice(0, 8)}</ID>
        <Mail>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          {user?.email}
        </Mail>
      </ProfileHeader>
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
