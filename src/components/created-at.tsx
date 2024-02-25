import { useEffect, useState } from "react";
import styled from "styled-components";

export default function CreatedAt({ time }: { time: number }) {
  const now = Date.now();
  const timeDate = new Date(time);

  const day = timeDate.getDate();
  const month = timeDate.getMonth() + 1;
  const year = timeDate.getFullYear();

  const diff = (now - time) / 1000;
  console.log(diff);

  const [timeState, setTimeState] = useState("");
  const [isOneday, setOneDay] = useState(false);

  const oneDayFunc = () => {
    if (diff / 60 < 1) {
      setTimeState("방금");
      setOneDay(true);
    } else if (diff / 60 < 60) {
      setTimeState(`${Math.round(diff / 60)}분`);
      setOneDay(true);
    } else if (diff / 60 < 24 * 60) {
      setTimeState(`${Math.round(diff / 60 / 60)}시간`);
      setOneDay(true);
    } else {
      return;
    }
  };

  useEffect(() => oneDayFunc(), []);

  const Time = styled.div`
    color: rgb(127, 136, 151);
    font-weight: 300;
  `;
  return (
    <Time>· {isOneday ? timeState : `${year}년 ${month}월 ${day}일`}</Time>
  );
}
