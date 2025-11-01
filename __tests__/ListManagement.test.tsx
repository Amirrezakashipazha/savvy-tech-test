import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListManagement } from "@/components/ListManagement";
import { ListItem as ListItemType } from "@/lib/types";

// Mock the ItemForm and DeleteConfirmation components to simplify tests
vi.mock("@/components/ItemForm", () => ({
  ItemForm: ({ open, onSubmit, initialData, mode, onOpenChange }: any) => {
    if (!open) return null;
    return (
      <div data-testid="item-form">
        <h2>{mode === "create" ? "Create New Item" : "Edit Item"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ title: "Test Title", subtitle: "Test Subtitle" });
          }}
        >
          <input
            data-testid="form-title"
            defaultValue={initialData?.title || ""}
          />
          <input
            data-testid="form-subtitle"
            defaultValue={initialData?.subtitle || ""}
          />
          <button type="submit">
            {mode === "create" ? "Create" : "Update"}
          </button>
          <button type="button" onClick={() => onOpenChange(false)}>
            Cancel
          </button>
        </form>
      </div>
    );
  },
}));

vi.mock("@/components/DeleteConfirmation", () => ({
  DeleteConfirmation: ({ open, onConfirm, onOpenChange }: any) => {
    if (!open) return null;
    return (
      <div data-testid="delete-confirmation">
        <button onClick={onConfirm}>Confirm Delete</button>
        <button onClick={() => onOpenChange(false)}>Cancel</button>
      </div>
    );
  },
}));

describe("ListManagement", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders empty state when no items", async () => {
    render(<ListManagement />);
    await waitFor(() => {
      expect(screen.getByText("No items yet")).toBeInTheDocument();
    });
  });

  it("opens form when Create button is clicked", async () => {
    const user = userEvent.setup();
    render(<ListManagement />);

    const createButtons = screen.getAllByRole("button", { name: /Create/i });
    const headerButton = createButtons.find((btn) => btn.textContent === "Create");
    expect(headerButton).toBeInTheDocument();
    await user.click(headerButton!);

    await waitFor(() => {
      expect(screen.getByTestId("item-form")).toBeInTheDocument();
    });
  });

  it("creates a new item", async () => {
    const user = userEvent.setup();
    render(<ListManagement />);

    // Open form
    const createButtons = screen.getAllByRole("button", { name: /Create/i });
    const headerButton = createButtons.find((btn) => btn.textContent === "Create");
    await user.click(headerButton!);

    // Wait for form and submit
    await waitFor(() => {
      expect(screen.getByTestId("item-form")).toBeInTheDocument();
    });

    const submitButtons = screen.getAllByRole("button", { name: "Create" });
    const formSubmitButton = submitButtons.find((btn) => btn.type === "submit");
    expect(formSubmitButton).toBeInTheDocument();
    await user.click(formSubmitButton!);

    // Check item was created
    await waitFor(() => {
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    });
  });

  it("loads items from localStorage on mount", async () => {
    const mockItems: ListItemType[] = [
      {
        id: "1",
        title: "Saved Item",
        subtitle: "Saved Subtitle",
        dateCreated: new Date("2024-01-01"),
      },
    ];

    localStorage.setItem("listItems", JSON.stringify(mockItems));

    render(<ListManagement />);

    await waitFor(() => {
      expect(screen.getByText("Saved Item")).toBeInTheDocument();
      expect(screen.getByText("Saved Subtitle")).toBeInTheDocument();
    });
  });

  it("saves items to localStorage", async () => {
    const user = userEvent.setup();
    render(<ListManagement />);

    // Create an item
    const createButtons = screen.getAllByRole("button", { name: /Create/i });
    const headerButton = createButtons.find((btn) => btn.textContent === "Create");
    await user.click(headerButton!);

    await waitFor(() => {
      expect(screen.getByTestId("item-form")).toBeInTheDocument();
    });

    const submitButtons = screen.getAllByRole("button", { name: "Create" });
    const formSubmitButton = submitButtons.find((btn) => btn.type === "submit");
    expect(formSubmitButton).toBeInTheDocument();
    await user.click(formSubmitButton!);

    // Wait for item to be created
    await waitFor(() => {
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    // Check localStorage
    const saved = localStorage.getItem("listItems");
    expect(saved).toBeTruthy();
    const parsed = JSON.parse(saved!);
    expect(parsed.length).toBe(1);
    expect(parsed[0].title).toBe("Test Title");
  });
});

