import React, { useEffect, useState } from "react";
import userStore from "../stores/user.store";
import { getAuthCookies } from "../utilities/cookies";

const UserInfo = () => {
  const [userData, setUserData] = useState({});
  const { userInfo, userInfoRequest } = userStore();
  useEffect(() => {
    (async () => {
      await userInfoRequest(getAuthCookies());
      setUserData(userStore.getState().userInfo);
    })();
  }, [userInfoRequest]);
  return (
    <div className="flex justify-center items-center my-7 w-full">
      <div className="pr-5">
        <img
          src="https://avatar.iran.liara.run/public/35"
          className="w-26 sm:w-36"
          alt=""
        />
      </div>
      <div>
        <div className="name">
          <h3 className="text-2xl">{userData.name}</h3>
        </div>
        <div className="email">
          <h3 className="text-1xl">{userData.email}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
