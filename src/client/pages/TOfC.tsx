import React, { useEffect } from "react";
import { ITOCProps } from "../../@types/global";
import useChapterStore from "../stores/ChapterStore";
import { Link } from "react-router-dom";

export const TOfC: React.FC<ITOCProps> = () => {
  const { chapters, loading, error, getAllChapters, createChapter } =
    useChapterStore();

  useEffect(() => {
    getAllChapters();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurned while fetching chapters</p>;
  }

  return (
    <div>
      <h2>Chapters</h2>
      <Link to={}>
        {chapters.map((chapter) => (
          <div key={chapter._id}>{chapter.title}</div>
        ))}
      </Link>
    </div>
  );
};
