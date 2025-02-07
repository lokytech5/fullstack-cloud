"use client";
import React, { useState } from "react";

interface ArticleData {
  title: string;
  content: string;
  category: string;
  author: string;
}

const ArticlePage: React.FC = () => {
  const [formData, setFormData] = useState<ArticleData>({
    title: "",
    content: "",
    category: "",
    author: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Article Submitted:", formData);
  };

  return (
    <div className="w-full max-w-2xl shadow-lg rounded-lg p-8">
      {/* Header */}
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">📝 Submit an Article</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter article title..."
            className="input input-bordered w-full px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          />
        </div>

        {/* Content */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your article here..."
            className="textarea textarea-bordered w-full px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            rows={6}
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          >
            <option value="">Select a Category</option>
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>
            <option value="Books">Books</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        {/* Author Name */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter your name..."
            className="input input-bordered w-full px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-4">
          <button
            type="submit"
            className="btn btn-primary w-full text-lg px-6 py-3 rounded-md transition-all duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            🚀 Publish Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticlePage;
