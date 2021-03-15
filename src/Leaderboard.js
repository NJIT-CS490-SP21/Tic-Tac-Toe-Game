import { useState } from "react";

export function Leaderboard(props) {
  const scores = props.scores;
  const users = props.users;
  let currUserRow = "";
  const [showScore, setShow] = useState(true);
  
  const renderTable = scores.map((value, index) => {
    const score = users[index];
    if (props.user == value) {
      currUserRow = "curruser";
    } else {
      currUserRow = "";
    }
    return (
      <tr key={index} class={currUserRow}>
        <td>{value}</td>
        <td>{score}</td>
      </tr>
    );
  });
  
    function leaderboardButton() {
      return (
        <div>
          <button
            class="clickleader"
            onClick={() => {
              onClickLeaderboard();
            }}
          >
            Show/Hide Leaderboard
          </button>
        </div>
      );
  }

  function onClickLeaderboard() {
    setShow(!showScore);
  }

  function leaderboard() {
    if(showScore){
      return (
        <div>
          <h3>Leaderboard</h3>
          <table class="mytable">
            <thead>
              <tr>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{renderTable}</tbody>
          </table>
        </div>
      );
    }
  }

  return (
    <div>
      {leaderboardButton()}
      {leaderboard()}
    </div>
    );
}
