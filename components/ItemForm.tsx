"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { title: string; subtitle: string }) => void;
  initialData?: { title: string; subtitle: string } | null;
  mode: "create" | "edit";
}

export function ItemForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: ItemFormProps) {
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [errors, setErrors] = React.useState<{
    title?: string;
    subtitle?: string;
  }>({});

  // Reset form when modal opens/closes or initialData changes
  React.useEffect(() => {
    if (open) {
      if (initialData) {
        setTitle(initialData.title);
        setSubtitle(initialData.subtitle);
      } else {
        setTitle("");
        setSubtitle("");
      }
      setErrors({});
    }
  }, [open, initialData]);

  const validate = (): boolean => {
    const newErrors: { title?: string; subtitle?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!subtitle.trim()) {
      newErrors.subtitle = "Subtitle is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({ title: title.trim(), subtitle: subtitle.trim() });
    onOpenChange(false);
  };

  const handleClose = () => {
    setTitle("");
    setSubtitle("");
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onClose={handleClose} className="w-[50dvw]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Item" : "Edit Item"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors((prev) => ({ ...prev, title: undefined }));
                }
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"
              placeholder="Enter title"
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subtitle"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Subtitle
            </label>
            <input
              id="subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => {
                setSubtitle(e.target.value);
                if (errors.subtitle) {
                  setErrors((prev) => ({ ...prev, subtitle: undefined }));
                }
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"
              placeholder="Enter subtitle"
              aria-invalid={!!errors.subtitle}
            />
            {errors.subtitle && (
              <p className="text-sm text-destructive">{errors.subtitle}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create" : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

