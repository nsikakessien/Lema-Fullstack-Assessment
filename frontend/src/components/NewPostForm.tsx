// src/components/NewPostForm.tsx
import { useState } from "react";

type NewPostFormProps = {
  onCancel: () => void;
  onPublish: (title: string, content: string) => void;
};

export function NewPostForm({ onCancel, onPublish }: NewPostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onPublish(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Post title
        </label>
        <input
          type="text"
          placeholder="Give your post a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Post content
        </label>
        <textarea
          rows={5}
          placeholder="Write something mind-blowing"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-900"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
