import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import DeleteProfilesPopUp from "./delete-profiles-popup";

export default function DeleteProfilesButton() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        className="bg-[#AF0000] text-white hover:bg-red-900"
        type="button"
        onClick={() => setOpen(true)}
      >
        Hapus Akun
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <DeleteProfilesPopUp open={open} onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
