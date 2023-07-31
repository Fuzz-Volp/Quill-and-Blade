import React, { useEffect } from "react";
import { ITOCProps } from "../../@types/global";
import useChapterStore from "../stores/ChapterStore";
import { Link } from "react-router-dom";
import routes from "../config/routes";

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
      {chapters.map((chapter) => (
        <Link key={chapter._id} to={`/chapter/${chapter._id}`}>
          <div>{chapter.title}</div>
        </Link>
      ))}
    </div>
  );
};
