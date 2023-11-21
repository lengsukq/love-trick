'use client'
import { useState,useRef } from 'react';
import './page.css'
export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [result, setResult] = useState(false);

    const squaresRef = useRef(squares)
    const [xIsNext, setXIsNext] = useState(true);
    function handleClick(i) {
        if (result){
            console.log('游戏结束');
            return false;
        }
        console.log('i---',i)
        const newSquares = squares.slice();
        newSquares[i] = xIsNext?'X':'O';
        setXIsNext(!xIsNext)
        squaresRef.current = newSquares;
        setSquares(newSquares);
        console.log(squares)
        over();
    }
    function over(){
        setResult(calculateWinner(squaresRef.current) === 'over'?true:false);

    }

    return (
        <>
            <h5>{!result?"下一步":"胜者"}：{xIsNext?'X':'O'}</h5>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
            </div>
        </>
    );
}

function Square({value,onSquareClick}) {
    return <div className="square" onClick={onSquareClick}>{value}</div>;
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            console.log('已有赢家')
            return 'over';
        }
    }
    return '';
}
