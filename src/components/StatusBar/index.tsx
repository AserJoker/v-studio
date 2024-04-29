import React, { useState, useEffect } from "react";
import "./index.less";
import moment from "moment";
const StatusBar: React.FC = () => {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    let stop = false;
    const getTime = () => {
      setTime(Date.now());
      if (!stop) {
        setTimeout(() => {
          getTime();
        }, 1000);
      }
    };
    getTime();
    return () => {
      stop = true;
    };
  }, []);
  return (
    <div className="status-bar">
      <div className="clock">
        <span className="iconfont">&#xe948;</span>
        <span>{moment(time).format("HH:mm:ss")}</span>
      </div>
    </div>
  );
};
export default StatusBar;
