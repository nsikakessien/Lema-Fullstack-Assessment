import { useEffect, useState } from "react";

type NewPostFormProps = {
  onCancel: () => void;
  onPublish: (title: string, content: string) => void;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export function NewPostForm({
  onCancel,
  onPublish,
  isPending,
  isError,
  isSuccess,
}: NewPostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onPublish(title, content);
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setContent("");
      onCancel();
    }
  }, [isSuccess, onCancel]);

  return (
    <>
      <p className="mb-6 font-medium text-4xl text-[#181D27]">New Post</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[18px] font-medium text-[#535862] mb-[10px]">
            Post title
          </label>
          <input
            type="text"
            placeholder="Give your post a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border-[#E2E8F0] px-4 py-[10px] placeholder:text-[#94A3B8] placeholder:text-sm placeholder:font-normal shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-[18px] font-medium text-[#535862] mb-[10px]">
            Post content
          </label>
          <textarea
            rows={5}
            placeholder="Write something mind-blowing"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-md border-[#E2E8F0] px-4 py-[10px] placeholder:text-[#94A3B8] placeholder:text-sm placeholder:font-normal resize-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-[#E2E8F0] text-[#334155] text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title || !content || isPending}
            className="px-4 py-2 rounded-md bg-[#334155] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold hover:bg-gray-900"
          >
            {isPending ? "Publishing..." : "Publish"}
          </button>
        </div>
        {isError && <p style={{ color: "red" }}>Failed to add post</p>}
      </form>
    </>
  );
}
