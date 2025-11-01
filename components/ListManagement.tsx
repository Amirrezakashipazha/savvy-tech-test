"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ListItem as ListItemType } from "@/lib/types";
import { ListItem } from "@/components/ListItem";
import { ItemForm } from "@/components/ItemForm";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";

export function ListManagement() {
  // Always start with empty array to avoid hydration mismatch
  const [items, setItems] = React.useState<ListItemType[]>([]);
  const [mounted, setMounted] = React.useState(false);

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<ListItemType | null>(
    null
  );
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<{
    id: string;
    title: string;
  } | null>(null);

  // Load items from localStorage after mount (client-side only)
  React.useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("listItems");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const loadedItems = parsed.map((item: any) => ({
          ...item,
          dateCreated: new Date(item.dateCreated),
        }));
        setItems(loadedItems);
      } catch (e) {
        // Invalid data, start fresh
        setItems([]);
      }
    }
  }, []);

  // Save to localStorage whenever items change (but only after mount)
  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem("listItems", JSON.stringify(items));
    }
  }, [items, mounted]);

  const handleCreate = (data: { title: string; subtitle: string }) => {
    const newItem: ListItemType = {
      id: crypto.randomUUID(),
      title: data.title,
      subtitle: data.subtitle,
      dateCreated: new Date(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleEdit = (item: ListItemType) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleUpdate = (data: { title: string; subtitle: string }) => {
    if (!editingItem) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? { ...item, title: data.title, subtitle: data.subtitle }
          : item
      )
    );
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setItemToDelete({ id, title: item.title });
      setDeleteConfirmOpen(true);
    }
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setItems((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      setItemToDelete(null);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleFormSubmit = (data: { title: string; subtitle: string }) => {
    if (editingItem) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">List Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your items efficiently
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-muted/20 border-dashed">
          <div className="mx-auto max-w-md">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Plus className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">No items yet</h3>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first item
            </p>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Item
            </Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Subtitle
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Date Created
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((item) => (
                  <ListItem
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ItemForm
        open={isFormOpen}
        onOpenChange={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        mode={editingItem ? "edit" : "create"}
      />

      <DeleteConfirmation
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={confirmDelete}
        itemTitle={itemToDelete?.title}
      />
    </div>
  );
}

