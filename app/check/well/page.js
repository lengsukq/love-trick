'use client'
import {useRef, useState} from 'react';
import './page.css'

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [result, setResult] = useState(false);
    const [count,setCount] = useState(0);
    const squaresRef = useRef(squares);
    const [xIsNext, setXIsNext] = useState(true);
    const [history,setHistory] = useState([]);
    const [historyList,setHistoryList] = useState([])

    function init(){
        setSquares(()=>Array(9).fill(null));
        setResult(false);
        setCount(0);
        setXIsNext(true);
        setHistory([]);
        setHistoryList([]);
        squaresRef.current=Array(9).fill(null)
    }
    function goBack(k){
        try{
            console.log('回溯',k,squares,'history',history)

            if(k===count){
                return false;
            }

            if (k===-1){
                init()
                return false;
            }

            let newHistory = history.slice(0,k+1);
            console.log('newHistory---',newHistory)
            setSquares(()=>{
                return newHistory[k];
            })
            squaresRef.current=newHistory[k];

            setHistory(newHistory)
            setHistoryList(()=>{
                return newHistory.map((item, index) =>
                    <li key={item} onClick={()=>goBack(index)}>第{index+1}步</li>
                )
            })
            setCount(k+1);
            setResult(false);
            setXIsNext(count%2===0);
        }catch (e){
            console.log('e--',e)
        }

    }
    function handleClick(i) {
        if (result){
            console.log('游戏结束');
            return false;
        }
        if (count === 9){
            console.log('平局')
            return  false;
        }
        if (squares[i]){
            console.log('该位置已被占用')
            return false;
        }

        console.log('i---',i,'count',count)
        const newSquares = squares.slice();
        let newHistory = history;
        setHistory(()=>{
            newHistory[count] = newSquares;
            console.log('newHistory',newHistory)
            return newHistory;
        });
        setHistoryList(()=>{
            return newHistory.map((item, index) =>
                <li key={item} onClick={()=>goBack(index)}>第{index+1}步</li>
            )
        })
        console.log('historyList---',historyList)
        newSquares[i] = xIsNext?'X':'O';
        setXIsNext(!xIsNext);
        squaresRef.current = newSquares;
        setSquares(newSquares);
        console.log(squares);
        over();
        setCount(count+1);

    }
    function over(){
        let result = calculateWinner(squaresRef.current);
        console.log(result === 'over')
        if (result === 'over'){
            setResult(true);
        }

    }

    return (
        <>
            {/*<h5>{!result?"下一步":"胜者"}：{xIsNext?'X':'O'}</h5>*/}
            <h5>{
                result?(<span>胜者：{!xIsNext?'X':'O'}</span>):(<span>下一步：{xIsNext?'X':'O'}</span>)
            }</h5>
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
            <ul>
                <li onClick={()=>goBack(-1)}>重新开始</li>
                {historyList}
            </ul>
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
