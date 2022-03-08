import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';


        let board = [];
        const NBR_OF_DICES = 5;
        const NBR_OF_TURNS = 6;
        const NBR_OF_THROWS = 3
        const WINNING_BONUS = 20;

        let bottomNumbers =  ["numeric-1-circle","numeric-2-circle","numeric-3-circle","numeric-4-circle","numeric-5-circle","numeric-6-circle"];
    
    
export default function Gameboard() {

    const [numberOfThrowsLeft, setNumberOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [numberOfTurnsLeft, setNumberOfTurnsLeft] = useState(0);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState('');
    const [selectedNumbers, setSelectedNumbers] = 
    useState(new Array(NBR_OF_TURNS).fill(false));
    const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedPoints, setSelectedPoints] = 
    useState(new Array(NBR_OF_TURNS).fill(false));
    
    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
            key={"row" + i}
            onPress={() => selectDice(i)}>
            <MaterialCommunityIcons
                name={board[i]}
                key={"row" + i}
                size={50}
                color={getDiceColor(i)}>
            </MaterialCommunityIcons>
            </Pressable>
        );
    }
    const bottomrow = [];
    for (let i = 0; i < 6; i++) {
        bottomrow.push(
            <Pressable
            key={"bottomrow" + i}
            onPress={() => selectNumber(i)} >
            <MaterialCommunityIcons
            name={bottomNumbers[i]}
            key={"bottomrow" + i}
            size={30}
            color={getNumberColor(i)}>

            </MaterialCommunityIcons>
            </Pressable>
        )
    }
    
    
    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function selectPoints() {
        let point = [...selectedPoints];
        point[i] = selectedPoints[i] ? false : true;
        setSelectedDices(point);
        let pointsFromDice = 0;

        for (let j = 0; j < board.length; j++) {
            if (board[j] == ("dice-" + (i + 1))){
                pointsFromDice += (i+1);
            }
        }
        //if (point[i] == true) {
        //    point[i] += pointsFromDice;
           // addPointsToBonus();
         //   setRoundEnded(true)

       // })
    }
    
    function getDiceColor(i){
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        }
        else {
            return selectedDices[i] ? "black" : "steelblue";
        }
    }

    function selectNumber(i) {
        let numbers = [...selectedNumbers];
        numbers[i] = selectedNumbers[i] ? false : true;
        setSelectedNumbers(numbers);
    }

    function getNumberColor(i){
        if( selectedNumbers[i] === true){
            return "black";
        } else {
            return "steelblue"
        }
        
    }
    function throwDices() {
        let total = 0;
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                total+= randomNumber;
            }
        }
        setNumberOfThrowsLeft(numberOfThrowsLeft-1);
        setTotal(total)
    }

    function checkWinner() {
        if (board.every((val, i, arr) => val === arr[0]) && numberOfThrowsLeft > 0) {
            setStatus('You won');
        }
        else if (board.every((val, i, arr) => val === arr[0]) && numberOfThrowsLeft === 0) {
            setStatus('You won, game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }else if (numberOfThrowsLeft === 0) {
            setStatus('Game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            setSelectedNumbers(new Array(NBR_OF_THROWS).fill(false));
        }
        else {
            setStatus('Keep on throwing');
        }
    }

    useEffect(() => {
        checkWinner();
        if (numberOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Game has not started');
        }
        if (numberOfThrowsLeft < 0) {
            setNumberOfThrowsLeft(NBR_OF_THROWS-1);
        }
    }, [numberOfThrowsLeft]);

    
    return(
        <View style={styles.gameboard}>
        <View style={styles.flex}>{row} </View>
        <Text style={styles.gameinfo}>Throws left: {numberOfThrowsLeft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        <Text style={styles.gameinfo}>Throw dices </Text>
        <Pressable style={styles.button}
            onPress={() => throwDices()}>
                <Text  style={styles.buttonText}>
                    Throw dices
                </Text>
        </Pressable>
        <Text style={styles.gameinfo}>Total: {total}</Text>
        <Text style={styles.pointsText}>You are {63-total} points away from bonus!</Text>
        <View style={styles.flex}>{bottomrow} </View>
    </View>
    )
}