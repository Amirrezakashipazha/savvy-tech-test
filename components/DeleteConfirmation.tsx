"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemTitle?: string;
}

export function DeleteConfirmation({
  open,
  onOpenChange,
  onConfirm,
  itemTitle,
}: DeleteConfirmationProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete
            {itemTitle && (
              <span className="font-semibold"> "{itemTitle}"</span>
            )}
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

