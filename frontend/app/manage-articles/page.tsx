"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiFilePlus } from "react-icons/fi";

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
}

const ManageArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all articles
  // useEffect(() => {
  //   fetch("/api/articles") // Adjust API route
  //     .then((res) => res.json())
  //     .then((data) => setArticles(data))
  //     .catch((err) => console.error("Error fetching articles:", err));
  // }, []);

  // Delete an article
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      await fetch(`/api/articles/${id}`, { method: "DELETE" });
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Update an article
  const handleUpdate = async () => {
    if (!selectedArticle) return;

    try {
      const res = await fetch(`/api/articles/${selectedArticle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedArticle),
      });

      if (res.ok) {
        setArticles(
          articles.map((article) =>
            article.id === selectedArticle.id ? selectedArticle : article
          )
        );
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          📄 Manage Articles
        </h1>
        <button className="btn btn-success flex items-center gap-2">
          <Link href="/"><FiFilePlus /></Link>
          New Article
        </button>
      </div>

      {/* Articles Table */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-gray-800 text-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-600 transition">
                  <td className="p-3">{article.title}</td>
                  <td className="p-3">{article.author}</td>
                  <td className="p-3">{article.category}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className="btn btn-primary btn-sm flex items-center gap-1"
                      onClick={() => {
                        setSelectedArticle(article);
                        setIsEditing(true);
                      }}
                    >
                      <FiEdit /> Edit
                    </button>

                    <button
                      className="btn btn-error btn-sm flex items-center gap-1"
                      onClick={() => handleDelete(article.id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditing && selectedArticle && (
        <div className="modal modal-open">
          <div className="modal-box bg-gray-800 text-white">
            <h2 className="text-2xl font-bold">Edit Article</h2>

            <label className="label mt-3">Title</label>
            <input
              type="text"
              value={selectedArticle.title}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
              className="input input-bordered w-full bg-gray-700 text-white"
            />

            <label className="label mt-3">Content</label>
            <textarea
              value={selectedArticle.content}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, content: e.target.value })}
              className="textarea textarea-bordered w-full bg-gray-700 text-white"
            ></textarea>

            <label className="label mt-3">Category</label>
            <input
              type="text"
              value={selectedArticle.category}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, category: e.target.value })}
              className="input input-bordered w-full bg-gray-700 text-white"
            />

            <label className="label mt-3">Author</label>
            <input
              type="text"
              value={selectedArticle.author}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, author: e.target.value })}
              className="input input-bordered w-full bg-gray-700 text-white"
            />

            <div className="modal-action">
              <button onClick={handleUpdate} className="btn btn-primary">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageArticles;
