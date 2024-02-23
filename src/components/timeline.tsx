import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  /* width: 90%; */
  flex-grow: 1;
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-x: none;
  box-sizing: border-box;
  padding: 0 20px;
  border-radius: 20px;
`;

export default function Timeline() {
  //tweets는 ITweet 타입이다.
  const [tweets, setTweet] = useState<ITweet[]>([]);
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        //firestore에 tweets폴더에 있는 것들을 시간 최신순으로 불러온다.
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(30)
      );
      //실시간으로 쿼리를 가져온다.
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change.type);
          return;
        });
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setTweet(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.tweet} {...tweet} />
      ))}
    </Wrapper>
  );
}
