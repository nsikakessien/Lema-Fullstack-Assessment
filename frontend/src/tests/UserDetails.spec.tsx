import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

vi.mock("../hooks/usePosts", () => {
  return {
    usePosts: vi.fn(),
    useAddPost: vi.fn(),
    useDeletePost: vi.fn(),
  };
});

import { usePosts, useAddPost, useDeletePost } from "../hooks/usePosts";
import { vi, type Mock } from "vitest";
import UserDetails from "../routes/UserDetails";

describe("UserDetails Page", () => {
  const mockPosts = [
    { id: "1", title: "First Post", body: "This is the first post" },
    { id: "2", title: "Second Post", body: "This is the second post" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderPage() {
    return render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/users/123",
            state: { user: { name: "John Doe", email: "john@example.com" } },
          },
        ]}
      >
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it("renders user details and posts", () => {
    (usePosts as Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
    });
    (useAddPost as Mock).mockReturnValue({ mutate: vi.fn() });
    (useDeletePost as Mock).mockReturnValue({ mutate: vi.fn() });

    renderPage();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com • 2 Posts")).toBeInTheDocument();
    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
  });

  it("opens modal and adds a new post", async () => {
    const mutateMock = vi.fn();
    (usePosts as Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
    });
    (useAddPost as Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
      isSuccess: false,
    });
    (useDeletePost as Mock).mockReturnValue({ mutate: vi.fn() });

    renderPage();

    fireEvent.click(screen.getByText("New Post"));

    fireEvent.change(screen.getByPlaceholderText("Give your post a title"), {
      target: { value: "My New Post" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Write something mind-blowing"),
      {
        target: { value: "Exciting new content!" },
      }
    );

    fireEvent.click(screen.getByText("Publish"));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "My New Post",
          body: "Exciting new content!",
          userId: "123",
        })
      );
    });
  });

  it("deletes a post", async () => {
    const deleteMock = vi.fn();
    (usePosts as Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
    });
    (useAddPost as Mock).mockReturnValue({ mutate: vi.fn() });
    (useDeletePost as Mock).mockReturnValue({ mutate: deleteMock });

    renderPage();

    const deleteButtons = screen.getAllByRole("button", { name: "" }); // trash icon buttons
    fireEvent.click(deleteButtons[1]); // delete "Second Post"

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith("2");
    });
  });
});
