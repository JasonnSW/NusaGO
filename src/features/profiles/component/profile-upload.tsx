/* eslint-disable */

"use client";
import { useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvatarDemo } from "@/components/AvatarDemo";

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: any) => {
    if (!event.target.files || !event.target.files[0]) return;

    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleRemove = () => {
    setImage(null);
  };
  return (
    <div className="flex items-center gap-6 p-2 rounded-lg w-full">
      {image ? (
        <img
          src={image}
          alt="profile"
          className="w-16 h-16 rounded-full object-cover"
        />
      ) : (
        <AvatarDemo
          alt="profile"
          src="/assets/male-user.svg"
        />
      )}
      <div className="flex gap-5">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <input
            id="imageUpload"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
          <Button
            variant="outline"
            className="flex items-center gap-2 text-primary-primary border-2 border-primary-primary hover:bg-gray-50 hover:text-primary-primary"
          >
            <Upload className="text-primary-primary" size={16} /> Upload
          </Button>
        </label>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-500 border-2"
          onClick={handleRemove}
          disabled={!image}
        >
          <Trash2 size={16} /> Remove
        </Button>
      </div>
    </div>
  );
}
