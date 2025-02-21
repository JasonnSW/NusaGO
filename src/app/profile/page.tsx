import NavbarProfile from "@/components/navbar-profile";
import ProfileForm from "@/features/profiles/component/profile-form";
import ProfileUpload from "@/features/profiles/component/profile-upload";
import { getProfile } from "@/features/profiles/server/action/profiles";
import React from "react";

export default async function Profile() {
  const profileData = await getProfile();

  return (
    <>
      <NavbarProfile />
      <div className="relative p-12 space-y-8 mt-20">
        <div className="bg-white border border-[#EFEFEF] p-4 rounded-lg shadow-sm w-full min-w-full flex items-center justify-center">
          <ProfileUpload />
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <div className="bg-white border border-[#EFEFEF] p-4 rounded-lg shadow-sm w-full min-w-full flex items-center justify-center">
            <ProfileForm initialData={profileData} />
          </div>
        </div>
      </div>
    </>
  );
}
