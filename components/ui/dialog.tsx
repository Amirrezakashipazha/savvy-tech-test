"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClose?: () => void;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

const DialogContent = ({
  className,
  children,
  onClose,
  ...props
}: DialogContentProps) => {
  return (
    <div
      className={cn(
        "relative z-50 w-full max-w-lg bg-card text-card-foreground shadow-lg rounded-lg border p-6 mx-4",
        "animate-in fade-in-0 zoom-in-95 duration-200",
        className
      )}
      {...props}
    >
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-6 w-6 rounded-full"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {children}
    </div>
  );
};

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}
      {...props}
    />
  );
};

const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
};

const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
      {...props}
    />
  );
};

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};

