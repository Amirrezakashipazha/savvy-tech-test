import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListItem } from "@/components/ListItem";
import { ListItem as ListItemType } from "@/lib/types";

describe("ListItem", () => {
  const mockItem: ListItemType = {
    id: "1",
    title: "Test Item",
    subtitle: "Test Subtitle",
    dateCreated: new Date("2024-01-15T10:30:00"),
  };

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    mockOnEdit.mockClear();
    mockOnDelete.mockClear();
  });

  it("renders item data correctly", () => {
    render(
      <table>
        <tbody>
          <ListItem
            item={mockItem}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText(/Jan 15, 2024/i)).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <table>
        <tbody>
          <ListItem
            item={mockItem}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>
    );

    const editButton = screen.getByLabelText("Edit item");
    await user.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockItem);
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <table>
        <tbody>
          <ListItem
            item={mockItem}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>
    );

    const deleteButton = screen.getByLabelText("Delete item");
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("formats date correctly", () => {
    const itemWithDate: ListItemType = {
      ...mockItem,
      dateCreated: new Date("2024-12-25T14:30:00"),
    };

    render(
      <table>
        <tbody>
          <ListItem
            item={itemWithDate}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText(/Dec 25, 2024/i)).toBeInTheDocument();
  });
});

