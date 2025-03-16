import React from "react";
import Layout from "../components/Layouts/Layout";
import UserInfo from "../components/UserInfo";
import ProfilePost from "../components/ProfilePost";

const Profile = () => {
  return (
    <Layout>
      <UserInfo />
      <div className="flex justify-center">
        <hr className="text-gray-300 w-5xl " />
      </div>
      <ProfilePost />
    </Layout>
  );
};

export default Profile;
