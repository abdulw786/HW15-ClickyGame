import React, { Component } from 'react';
import PropTypes from 'prop-types';
import players from '../data/players.json';
import Card from './Card';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            players: players,
            clickedPlayers: []
        };
    };

    handleAddnCompare = player => {
        if (this.state.clickedPlayers.includes(player)) {
            this.setState({
                clickedPlayers: []
            });
            this.props.gameOver();
        }
        else {  
            if (this.state.clickedPlayers.length < this.state.players.length - 1) {
                
                let newPlayers = this.state.clickedPlayers.slice();
                newPlayers.push(player);
                this.setState({ clickedPlayers: newPlayers });
                this.props.scoreChange();
                this.shufflePlayers(this.state.players)
                console.log(this.state.players.length); 
            }
            else {
                this.setState({
                    clickedPlayers: []
                });
                this.props.uWin();
            }
        }
    } 

    shufflePlayers = arr => {
        let shuffledPlayers = arr.slice();
        // Randomize array using Durstenfeld shuffle algorithm
        for (let i = shuffledPlayers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = shuffledPlayers[i];
            shuffledPlayers[i] = shuffledPlayers[j];
            shuffledPlayers[j] = temp;
        }
        // Update the state
        this.setState({
            players: shuffledPlayers
        });
    }

    render() {
        let eachPlayers = this.state.players.map(player => 
            <Card 
                key={player.id}
                id={player.id} 
                image={player.image} 
                color={player.color}
                addCompare={this.handleAddnCompare}
            /> 
        );

        return (
            <div id="board" className={this.props.shake}>
                {eachPlayers}
            </div>
        );
    }
}

Board.propTypes = {
    shake: PropTypes.string,
    scoreChange: PropTypes.func,
    gameOver: PropTypes.func,
    uWin: PropTypes.func
};

export default Board;
