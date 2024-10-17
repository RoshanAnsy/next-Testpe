"use client";

import { useEffect, useState } from "react";
import { FaUserNurse } from "react-icons/fa";
import Image from "next/image";

const UserProfile = () => {
  const [userData, setUserData] = useState<{ name: string | null; email: string | null; image: string | null }>({
    name: null,
    email: null,
    image: null,
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const image = localStorage.getItem("image");
    setUserData({ name, email, image });
  }, []);

  return (
    <div className=" flex flex-col items-center gap-4 sm:gap-x-12 sm:flex-row ">
      {userData.image && userData.image !== "null" ? ( // Check if image is not null or the string "null"
        <Image src={userData.image} height={100} width={100} alt="user image" />
      ) : (
        <FaUserNurse size={100} color="gray" />
      )}
      <div className=" flex flex-col gap-y-4 w-full mx-auto">
        <h1 className=" text-xl font-bold bg-neutral-100 flex rounded-sm p-2 gap-4"><span className=" font-normal">Name</span>{userData.name || "User Name"}</h1>
        <p className="bg-neutral-100 rounded-sm p-2 flex gap-x-4" ><span>Email</span>{userData.email || "user@example.com"}</p>
      </div>
    </div>
  );
};

export default UserProfile;
