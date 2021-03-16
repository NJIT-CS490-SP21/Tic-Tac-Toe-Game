import { React, useState } from 'react';

export default function Leaderboard(props) {
  const { scores } = props;
  const { users } = props;
  let currUserRow = '';
  const [showScore, setShow] = useState(true);

  const renderTable = scores.map((value, index) => {
    const score = users[index];
    if (props.user === value) {
      currUserRow = 'curruser';
    } else {
      currUserRow = '';
    }
    return (
      <tr key={index} className={currUserRow}>
        <td>{value}</td>
        <td>{score}</td>
      </tr>
    );
  });

  function onClickLeaderboard() {
    setShow(!showScore);
  }

  function leaderboardButton() {
    return (
      <div>
        <button
          className="clickleader"
          type="button"
          onClick={() => {
            onClickLeaderboard();
          }}
        >
          Show/Hide Leaderboard
        </button>
      </div>
    );
  }

  function leaderboard() {
    if (showScore) {
      return (
        <div>
          <h3>Leaderboard</h3>
          <table className="mytable">
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

    return null;
  }

  return (
    <div>
      {leaderboardButton()}
      {leaderboard()}
    </div>
  );
}
