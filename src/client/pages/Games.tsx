import React, { useEffect } from "react";
import { IGamesProps, IGame } from "../../@types/global";
import { useGameStore } from "../stores/GameStore";
import { Link } from "react-router-dom";
import { captureRejectionSymbol } from "events";

export const Games: React.FC<IGamesProps> = (props) => {
  const { games, loading, getAllGames, createGame, updateGame, deleteGame } =
    useGameStore();

  useEffect(() => {
    // Fetch all games on component mount
    getAllGames();
  }, []);

  const handleCreateGame = () => {
    const newGame: IGame = {
      _id: "",
      title: "",
      campaigns: [ICampaign],
    };
    createGame(newGame);
  };

  const handleUpdateGame = async (id: string, game: IGame) => {
    // Update an existing game
    await updateGame(id, game);
  };

  const handleDeleteGame = async (id: string) => {
    // Delete a game
    await deleteGame(id);
  };

  return (
    <main className="min-h-screen">
      <div>
        <h1>Game Content</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {games.map((game) =>
              game.campaigns.map((campaign) =>
                campaign.chapters.map((chapter) => (
                  <li key={campaign._id}>
                    <Link to={"/toc"}>{game.title}</Link>
                    <button onClick={() => handleUpdateGame(game._id, game)}>
                      Update
                    </button>
                    <button onClick={() => handleDeleteGame(game._id)}>
                      Delete
                    </button>
                  </li>
                ))
              )
            )}
          </ul>
        )}
        <button onClick={handleCreateGame}>Create Game</button>
      </div>
    </main>
  );
};
