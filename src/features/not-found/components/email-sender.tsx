"use client";
import { InputWithButton } from "@/components/input-with-button";
import Modal from "@/components/modal";
import React, { useState } from "react";
import PopUp from "./pop-up";

export default function EmailSender() {
  const [open, setOpen] = useState(false);
  // const { mutate: deleteProfile, isPending } = useEmailSender();

  return (
    <>
      <InputWithButton onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <PopUp open={open} onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
