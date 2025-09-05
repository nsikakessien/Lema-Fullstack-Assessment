import { FaArrowLeft, FaRegTrashAlt } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { useAddPost, useDeletePost, usePosts } from "../hooks/usePosts";
import { useLocation, useNavigate, useParams } from "react-router";
import EllipsisLoader from "../components/EllipsisLoader";
import { useCallback, useState } from "react";
import { Modal } from "../components/Modal";
import { NewPostForm } from "../components/NewPostForm";
import { formatISO } from "date-fns";

function UserDetails() {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const { user } = useLocation().state || {};
  const { data: posts, isLoading: postsLoading } = usePosts({
    userId: userId as string,
  });
  const addPost = useAddPost();
  const deletePost = useDeletePost(userId as string);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onPublish = useCallback(
    (title: string, content: string) => {
      addPost.mutate({
        title,
        body: content,
        userId: userId as string,
        createdAt: formatISO(new Date(), { representation: "complete" }),
      });
    },
    [addPost, userId]
  );

  const onDelete = useCallback(
    (id: string) => {
      deletePost.mutate(id as string);
    },
    [deletePost]
  );

  if (postsLoading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        <EllipsisLoader />
      </div>
    );
  }

  return (
    <>
      <div className="md:py-[50px]">
        <div className="lg:max-w-4xl md:max-w-2xl max-w-96 p-6 md:p-0 mx-auto">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-[#535862] font-semibold hover:text-gray-700 mb-4 flex gap-2 items-center"
          >
            <FaArrowLeft size={16} color="#717680" />
            <p>Back to Users</p>
          </button>
          <h1 className="text-4xl font-medium text-[#181D27] mb-4">
            {user?.name || "User Name"}
          </h1>
          <p className="text-gray-600 mb-6">
            {user?.email} • {posts?.length} Posts
          </p>

          <div className="grid gap-6 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="flex flex-col gap-2 w-full cursor-pointer sm:w-[270px] items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-[#717680] hover:border-gray-400 hover:text-gray-700 transition"
            >
              <FiPlusCircle className="w-6 h-6 text-[#717680]" />
              New Post
            </button>

            {posts?.map((post) => {
              const isDeleting =
                deletePost.variables === post.id && deletePost.isPending;
              return (
                <div
                  key={post.id}
                  className={`relative bg-white rounded-lg shadow-sm border p-4 flex flex-col w-full sm:w-[270px] ${
                    isDeleting && "opacity-40 cursor-not-allowed"
                  }`}
                >
                  <button
                    onClick={() => {
                      onDelete(post.id);
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                  >
                    <FaRegTrashAlt className="w-4 h-4 text-[#F9566A] cursor-pointer" />
                  </button>

                  <h2 className="font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-4">
                    {post.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewPostForm
          onCancel={() => setIsModalOpen(false)}
          onPublish={onPublish}
          isPending={addPost.isPending}
          isError={addPost.isError}
          isSuccess={addPost.isSuccess}
        />
      </Modal>
    </>
  );
}

export default UserDetails;
