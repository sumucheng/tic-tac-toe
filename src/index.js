import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Cell = function(props) {
  return (
    <div className="cell" onClick={props.onClick}>
      {props.text}
    </div>
  );
};

const Restart = function(props) {
  return (
    <div>
      <button className="restart" onClick={props.onClick}>
        Restart
      </button>
    </div>
  );
};

const Board = function() {
  const [n, setN] = useState(parseInt(localStorage.getItem("n")) || 0);
  const [over, setOver] = useState(
    localStorage.getItem("over") === "true" ? true : false || false
  );
  const [winner, setWinner] = useState(localStorage.getItem("winner") || "");
  const x =
    localStorage.getItem("cells") && localStorage.getItem("cells").split(",");
  const y = x && [
    [x[0], x[1], x[2]],
    [x[3], x[4], x[5]],
    [x[6], x[7], x[8]]
  ];
  const [cells, setCells] = useState(
    y || [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
  );

  const restart = () => {
    setCells([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    setN(0);
    setWinner("");
    setOver(false);
    localStorage.setItem("cells", [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    localStorage.setItem("n", 0);
    localStorage.setItem("winner", "");
    localStorage.setItem("over", false);
  };
  const judge = () => {
    for (let i = 0; i < 3; i++) {
      if (
        cells[i][0] &&
        cells[i][0] === cells[i][1] &&
        cells[i][1] === cells[i][2]
      ) {
        setWinner(cells[i][0]);
        localStorage.setItem("winner", cells[i][0]);
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        cells[0][i] &&
        cells[0][i] === cells[1][i] &&
        cells[1][i] === cells[2][i]
      ) {
        setWinner(cells[0][i]);
        localStorage.setItem("winner", cells[0][i]);
      }
    }
    if (
      cells[0][0] &&
      cells[0][0] === cells[1][1] &&
      cells[1][1] === cells[2][2]
    ) {
      setWinner(cells[1][1]);
      localStorage.setItem("winner", cells[1][1]);
    }
    if (
      cells[2][0] &&
      cells[2][0] === cells[1][1] &&
      cells[1][1] === cells[0][2]
    ) {
      setWinner(cells[1][1]);
      localStorage.setItem("winner", cells[1][1]);
    }
    if (n === 8) {
      setOver(true);
      localStorage.setItem("over", true);
    }
  };

  const onClickCell = (row, col) => {
    if (cells[row][col] !== "") return;
    cells[row][col] = n % 2 === 0 ? "x" : "o";
    setN(n + 1);
    setCells(JSON.parse(JSON.stringify(cells)));
    judge();
    localStorage.setItem("cells", cells);
    localStorage.setItem("n", n + 1);
  };

  return (
    <div className="wrapper">
      <div className="board">
        {cells.map((row, r) => (
          <div className="row">
            {row.map((cell, c) => (
              <div>
                <Cell text={cell} onClick={() => onClickCell(r, c)} />
              </div>
            ))}
          </div>
        ))}
        <div className="info">
          Next： <span className="nextPlayer">{n % 2 === 0 ? "x" : "o"}</span>
          <Restart onClick={restart} />
        </div>
      </div>

      {winner && (
        <div className="over">
          {winner} win !<Restart onClick={restart} />
        </div>
      )}
      {!winner && over && (
        <div className="over">
          Game Over
          <Restart onClick={restart} />
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<Board />, document.getElementById("root"));
