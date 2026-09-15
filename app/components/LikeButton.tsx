 "use client";

import { useState } from "react";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  function handleLike() {
    setLikes((currentLikes) => (liked ? currentLikes - 1 : currentLikes + 1));
    setLiked((currentLiked) => !currentLiked);
  }

  return (
    <button
      className={`like-button ${liked ? "like-button-active" : ""}`}
      type="button"
      onClick={handleLike}
      aria-pressed={liked}
      aria-label={liked ? "Bo like noi dung" : "Like noi dung"}
      title={liked ? "Bo like" : "Like"}
    >
      <span aria-hidden="true" className="like-icon">
        ♥
      </span>
      <span>{likes}</span>
    </button>
  );
}
