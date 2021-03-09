import { useState } from 'react';
import { ListUser } from './ListUsers.js';
import { ListScore } from './ListScores.js';

export function Leaderboard(props){
    
    const [show, changeShow] = useState(true);
    
    const scores = props.scores;
    const users = props.users;
    
    console.log(scores[0]);
    console.log(users[0]);

    const renderTable = scores.map((value, index) => {
        const score =users[index];
        return (
            <tr key={index}>
            <td><ListUser value={value}/></td>
            <td><ListScore value={score}/></td>
            </tr>
        );
    });

    
    function onClickButton(){

        console.log("i clicked button");
        if(show){
            console.log("im inside");
            return (
                <div>
                    <h1>Leaderboard</h1>
                    <table>
                        <thead key="leaderboard">
                            <tr>
                                <th>User</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody >
                            {renderTable}
                        </tbody>
                    </table>
                </div>
            );
        }
        
        changeShow(!show);
    }
    
    function leaderboard(){
        return <button onClick={() => onClickButton()}>Show/Hide Leaderboard</button>;
    }
    
    return leaderboard();

}

