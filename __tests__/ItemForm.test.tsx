import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ItemForm } from "@/components/ItemForm";

describe("ItemForm", () => {
  const mockOnSubmit = vi.fn();
  const mockOnOpenChange = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnOpenChange.mockClear();
  });

  it("renders create form when mode is create", () => {
    render(
      <ItemForm
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    );

    expect(screen.getByText("Create New Item")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter subtitle")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("renders edit form when mode is edit", () => {
    render(
      <ItemForm
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        initialData={{ title: "Existing Title", subtitle: "Existing Subtitle" }}
        mode="edit"
      />
    );

    expect(screen.getByText("Edit Item")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Existing Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Existing Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    const { container } = render(
      <ItemForm
        open={false}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("shows validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(
      <ItemForm
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    );

    const submitButton = screen.getByText("Create");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Subtitle is required")).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with trimmed values when form is valid", async () => {
    const user = userEvent.setup();
    render(
      <ItemForm
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    );

    const titleInput = screen.getByPlaceholderText("Enter title");
    const subtitleInput = screen.getByPlaceholderText("Enter subtitle");

    await user.type(titleInput, "  Test Title  ");
    await user.type(subtitleInput, "  Test Subtitle  ");

    const submitButton = screen.getByText("Create");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Test Title",
        subtitle: "Test Subtitle",
      });
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("clears errors when user starts typing", async () => {
    const user = userEvent.setup();
    render(
      <ItemForm
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    );

    // Trigger validation error
    const submitButton = screen.getByText("Create");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });

    // Start typing
    const titleInput = screen.getByPlaceholderText("Enter title");
    await user.type(titleInput, "Test");

    await waitFor(() => {
      expect(screen.queryByText("Title is required")).not.toBeInTheDocument();
    });
  });

  it("calls onOpenChange when cancel is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ItemForm
        open={true}
        onOpenChange={mockOnOpenChange}
        onSubmit={mockOnSubmit}
        mode="create"
      />
    );

    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });
});

