import React, { useState } from "react";
import useChapterStore from "../stores/ChapterStore";
import { IChapterFormProps, IChapter, IStory } from "../../@types/global";

export const ChapterForm: React.FC<IChapterFormProps> = () => {
  const { createChapter } = useChapterStore();
  const [title, setTitle] = useState("");
  const [story, setStory] = useState<IStory[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newChapter: IChapter = {
      _id: "", // Provide a value for _id or generate it on the server side
      title: title,
      story: [...story],
    };

    createChapter(newChapter);
    setTitle(""); // Clear the title input after submitting
    setStory([]); // Clear the story input after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Add other form fields for collecting necessary data */}

      <button type="submit">Create Chapter</button>
    </form>
  );
};
