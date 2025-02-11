"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiFilePlus } from "react-icons/fi";
import useFetchList from "../useFetchList";
import useFetchUpdatedArticle from "../useFetchArticleUpdate";
import useFetchDeleteArticle from "../useFetchDeleteArticle";
import { ArticleListResponse } from "../types";

const ManageArticles: React.FC = () => {
  const { data: articles, isPending, error } = useFetchList();
  const mutationUpdate = useFetchUpdatedArticle();
  const mutationDelete = useFetchDeleteArticle();

  const [selectedArticle, setSelectedArticle] = useState<ArticleListResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isPending) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error Fetching articles: {error.message}</p>;

  const openModal = (article: ArticleListResponse) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleUpdate = () => {
    if (selectedArticle) {
      mutationUpdate.mutate(selectedArticle, {
        onSuccess: () => {
          closeModal();
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    mutationDelete.mutate(id, {
      onSuccess: () => {
        // Optimistically remove the article from UI
        window.location.reload(); // Refresh to get latest data (temporary fix)
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">📄 Manage Articles</h1>
        <Link href="/">
          <button className="btn btn-success flex items-center gap-2">
            <FiFilePlus />
            New Article
          </button>
        </Link>
      </div>

      {/* Articles Table */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-gray-800 text-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Category</th>
              <th className="p-3">Content</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles && articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article._id} className="hover:bg-gray-600 transition">
                  <td className="p-3">{article.title}</td>
                  <td className="p-3">{article.author}</td>
                  <td className="p-3">{article.category}</td>
                  <td className="p-3">{article.content}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className="btn btn-primary btn-sm flex items-center gap-1"
                      onClick={() => openModal(article)}
                    >
                      <FiEdit /> Edit
                    </button>

                    <button
                      className="btn btn-error btn-sm flex items-center gap-1"
                      onClick={() => handleDelete(article._id)}
                      disabled={mutationDelete.isPending}
                    >
                      {mutationDelete.isPending ? "Deleting..." : <><FiTrash2 /> Delete</>}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-400">
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Article</h2>

            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={selectedArticle.title}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
              className="input input-bordered w-full bg-gray-700 text-white mb-3"
            />

            <label className="block text-sm font-medium">Content</label>
            <textarea
              value={selectedArticle.content}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, content: e.target.value })}
              className="textarea textarea-bordered w-full bg-gray-700 text-white mb-3"
            ></textarea>

            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              value={selectedArticle.category}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, category: e.target.value })}
              className="input input-bordered w-full bg-gray-700 text-white mb-3"
            />

            <label className="block text-sm font-medium">Author</label>
            <input
              type="text"
              value={selectedArticle.author}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, author: e.target.value })}
              className="input input-bordered w-full bg-gray-700 text-white mb-3"
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleUpdate}
                className="btn btn-primary"
                disabled={mutationUpdate.isPending}
              >
                {mutationUpdate.isPending ? "Updating..." : "Save"}
              </button>
              <button onClick={closeModal} className="btn btn-secondary">
                Cancel
              </button>
            </div>

            {/* Mutation Feedback */}
            {mutationUpdate.error && <p className="text-red-500 mt-2">{mutationUpdate.error.message}</p>}
            {mutationUpdate.isSuccess && <p className="text-green-500 mt-2">Article updated successfully!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageArticles;
