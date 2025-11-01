"use client";

import { ListItem as ListItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface ListItemProps {
  item: ListItemType;
  onEdit: (item: ListItemType) => void;
  onDelete: (id: string) => void;
}

export function ListItem({ item, onEdit, onDelete }: ListItemProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <tr className="hover:bg-accent/50 transition-colors">
      <td className="px-6 py-4 font-medium">{item.title}</td>
      <td className="px-6 py-4 text-muted-foreground">{item.subtitle}</td>
      <td className="px-6 py-4 text-sm text-muted-foreground">
        {formatDate(item.dateCreated)}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(item)}
            aria-label="Edit item"
            className="h-8 w-8"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(item.id)}
            aria-label="Delete item"
            className="h-8 w-8"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

