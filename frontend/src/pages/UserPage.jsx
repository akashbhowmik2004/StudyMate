import React, { useEffect, useState } from "react";
import api from "../lib/api.js";
import {
  FaPlus,
  FaComment,
  FaThumbsUp,
  FaShare,
  FaPaperPlane,
  FaUsers,
  FaHome,
  FaSearch,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import UserPageNavbar from "../components/UserPageNavbar";
import toast from "react-hot-toast";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showComments, setShowComments] = useState({});
  const [tagInput, setTagInput] = useState("");
  const [posts, setPosts] = useState([]); // feed
  const [postForm, setPostForm] = useState({
    // form
    community: "",
    content: "",
    tags: [],
    likes: [],
  });
  const [commentsByPost, setCommentsByPost] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get("/api/post");
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      if (!postForm.community || !postForm.content) {
        return toast.error("Fill all fields");
      }
      const res = await api.post("/api/post", postForm);
      console.log(res);

      toast.success("Doubt created successfully");
      setShowPostModal(false);
      setPosts((prev) => [res.data, ...prev]);
      setPostForm({ community: "", content: "", tags: [], likes: [] });
      setTagInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !postForm.tags.includes(trimmedTag)) {
      setPostForm((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPostForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleComment = async (postId, e) => {
    e.preventDefault();

    const commentText = (commentInputs[postId] || "").trim();
    if (!commentText) {
      return toast.error("Comment cannot be empty");
    }

    try {
      const commentss = await api.post(`/api/post/${postId}/comment`, {
        comment: commentText,
      });
      console.log(commentss);

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [
          ...(prev[postId] || []),
          {
            _id: Date.now().toString(),
            user: { name: "You" },
            comment: commentText,
            time: "Just now",
          },
        ],
      }));

      setCommentInputs((prev) => ({
        ...prev,
        [postId]: "",
      }));

      setPosts((prev) =>
        prev.map((singlePost) =>
          (singlePost._id || singlePost.id) === postId
            ? {
                ...singlePost,
                commentCount: (singlePost.commentCount || 0) + 1,
              }
            : singlePost
        )
      );

      toast.success("Comment added");
    } catch (error) {
      console.log(error);
    }
  };

  const communities = [
    {
      id: 1,
      name: "Mathematics",
      members: 2543,
      description: "Discuss math problems and solutions",
    },
    {
      id: 2,
      name: "Physics",
      members: 1834,
      description: "Physics concepts and experiments",
    },
    {
      id: 3,
      name: "Technology",
      members: 3421,
      description: "Tech discussions and learning",
    },
    {
      id: 4,
      name: "Chemistry",
      members: 1256,
      description: "Chemistry topics and reactions",
    },
  ];


  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserPageNavbar />

      <div className="max-w-6xl mx-auto px-4 py-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">JD</span>
                </div>
                <h3 className="text-center font-semibold text-gray-900">
                  John Doe
                </h3>
                <p className="text-center text-sm text-gray-600">@johndoe</p>
              </div>

              <div className="border-t pt-4 space-y-2">
                <button
                  onClick={() => setActiveTab("feed")}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "feed"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaHome className="text-lg" />
                  Feed
                </button>
                <button
                  onClick={() => setActiveTab("communities")}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "communities"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaUsers className="text-lg" />
                  Communities
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "feed" && (
              <div>
                {/* Post Creation */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="text-white font-bold">JD</span>
                    </div>
                    <button
                      onClick={() => setShowPostModal(true)}
                      className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-left text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      What's your doubt today?
                    </button>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setShowPostModal(true)}
                      className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                    >
                      <FaPlus className="text-lg" />
                      Post Doubt
                    </button>
                  </div>
                </div>

                {/* Posts Feed */}
                <div className="space-y-4">
                  {posts.map((post) => {
                    const postId = post._id || post.id;
                    const postComments = commentsByPost[postId] || post.comments || [];

                    return (
                    <div
                      key={postId}
                      className="bg-white rounded-lg shadow p-4"
                    >
                      {/* Post Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {post.avatar}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {post.author}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <FaClock className="text-xs" />
                              {post.time}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {post.community}
                        </span>
                      </div>

                      {/* Post Content */}
                      <p className="text-gray-800 mb-4 leading-relaxed">
                        {post.content}
                      </p>

                      {/* Post Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium hover:bg-purple-200 transition-colors cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Post Stats */}
                      <div className="flex gap-4 text-sm text-gray-600 mb-3 pb-3 border-b border-gray-200">
                        <span>{Array.isArray(post.likes) ? post.likes.length : post.likes || 0} likes</span>
                        <span>{post.commentCount || post.comments || postComments.length || 0} comments</span>
                      </div>

                      {/* Post Actions */}
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium">
                          <FaThumbsUp className="text-lg" />
                          Like
                        </button>
                        <button
                          onClick={() => toggleComments(postId)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        >
                          <FaComment className="text-lg" />
                          Comment
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium">
                          <FaShare className="text-lg" />
                          Share
                        </button>
                      </div>

                      {/* Comments Section */}
                      {showComments[postId] && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="space-y-3 mb-4">
                            {postComments.map((comment) => (
                              <div key={comment._id || comment.id} className="flex gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex-shrink-0 flex items-center justify-center">
                                  <span className="text-white font-bold text-xs">
                                    {comment?.user?.name?.charAt(0)?.toUpperCase() || comment.avatar || "U"}
                                  </span>
                                </div>
                                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-semibold text-sm text-gray-900">
                                      {comment?.user?.name || comment.user || "User"}
                                    </h5>
                                    <span className="text-xs text-gray-500">
                                      {comment.time || "Just now"}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">
                                    {comment.comment || comment.text}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Comment Input */}
                          <div className="flex gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
                              <span className="text-white font-bold text-xs">
                                JD
                              </span>
                            </div>
                            <input
                              type="text"
                              name="comment"
                              value={commentInputs[postId] || ""}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({
                                  ...prev,
                                  [postId]: e.target.value,
                                }))
                              }
                              placeholder="Write a comment..."
                              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={(e) => handleComment(postId, e)}
                              className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                              aria-label="Send comment"
                            >
                              <FaPaperPlane className="text-sm" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )})}
                </div>
              </div>
            )}

            {activeTab === "communities" && (
              <div>
                {/* Create Community Button */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowCommunityModal(true)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    <FaPlus className="text-lg" />
                    Create New Community
                  </button>
                </div>

                {/* Communities Grid */}
                <div className="space-y-4">
                  {communities.map((community) => (
                    <div
                      key={community.id}
                      className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaUsers className="text-white text-xl" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">
                              {community.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {community.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {community.members.toLocaleString()} members
                            </p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-2 rounded-lg transition-colors">
                        Join Community
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Trending */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">
                Trending Topics
              </h3>
              <div className="space-y-3">
                <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="text-sm font-semibold text-gray-900">
                    # Calculus
                  </div>
                  <div className="text-xs text-gray-600">2.5K posts</div>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="text-sm font-semibold text-gray-900">
                    # Organic Chemistry
                  </div>
                  <div className="text-xs text-gray-600">1.8K posts</div>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="text-sm font-semibold text-gray-900">
                    # Programming
                  </div>
                  <div className="text-xs text-gray-600">3.2K posts</div>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="text-sm font-semibold text-gray-900">
                    # STEM
                  </div>
                  <div className="text-xs text-gray-600">4.1K posts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Post Your Doubt
              </h2>
              <button
                onClick={() => {
                  setShowPostModal(false);
                  setPostForm({ community: "", content: "", tags: [] });
                  setTagInput("");
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Community
                </label>
                <select
                  name="community"
                  onChange={handleChange}
                  value={postForm.community}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Community</option>
                  <option value={"Mathematics"}>Mathematics</option>
                  <option value={"Physics"}>Physics</option>
                  <option value={"Chemistry"}>Chemistry</option>
                  <option value={"Technology"}>Technology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Doubt
                </label>
                <textarea
                  name="content"
                  value={postForm.content}
                  onChange={handleChange}
                  placeholder="Describe your doubt clearly..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none h-32"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    name="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Enter a tag and press Enter or click Add..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
                {postForm.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {postForm.tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-blue-700 hover:text-blue-900 transition-colors ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowPostModal(false);
                    setPostForm({ community: "", content: "", tags: [] });
                    setTagInput("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => handlePost(e)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Post Doubt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Community Modal */}
      {showCommunityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Create Community
              </h2>
              <button
                onClick={() => setShowCommunityModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Community Name
                </label>
                <input
                  type="text"
                  placeholder="Enter community name..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe your community..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none h-24"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>Technology</option>
                  <option>Languages</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowCommunityModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCommunityModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
