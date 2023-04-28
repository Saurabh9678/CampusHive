import React from 'react';
import '../Style/Leaderboard.css'
const Leaderboard = ({ players }) => {
    const sortedPlayers = Array.isArray(players) ? [...players].sort((a, b) => b.score - a.score) : [];
  
    return (
      <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <ol>
          {sortedPlayers.map((player, index) => (
            <li key={player.id}>
              <div className="player">
                <span className="rank">{index + 1}</span>
                <span className="name">{player.name}</span>
                <span className="score">{player.score}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  };


export default Leaderboard;