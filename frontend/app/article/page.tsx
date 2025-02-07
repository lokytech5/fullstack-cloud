"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormData, schema } from "../schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";

interface ArticleData {
  title: string;
  content: string;
  category: string;
  author: string;
}

const ArticlePage = () => {
  const [formData, setFormData] = useState<ArticleData>({
    title: "",
    content: "",
    category: "",
    author: "",
  });

  const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const handleChange = () => {
    
  };

  const onSubmit: SubmitHandler<FormData> = (data, event) => {
    event?.preventDefault();
    console.log('Form submitted', data);
  }

  return (
    <div className="w-full max-w-2xl shadow-lg rounded-lg p-8">
      {/* Header */}
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">📝 Submit an Article</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700">Title</label>
          <input
          {...register('title')}
            type="text"
            placeholder="Enter article title..."
            className="input input-bordered w-full px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />{errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Content */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700">Content</label>
          <textarea
            {...register('content')}
            placeholder="Write your article here..."
            className="textarea textarea-bordered w-full px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            rows={6}
          >
          </textarea>{errors.content && <p className="text-red-500">{errors.content.message}</p>}
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
            placeholder="Enter your name..."
            className="input input-bordered w-full px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />{errors.author && <p className="text-red-500">{errors.author.message}</p>}
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
