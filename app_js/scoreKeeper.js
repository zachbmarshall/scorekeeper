var newPlayer = {
    "name": "N/A",
    "score": 0
}

var player_list = [];
var lowScore = false;

function getNumPlayers() {
    var num_players = parseInt(document.getElementById("numPlayers").value);
    document.getElementById("winnerName").innerHTML = "";
    document.getElementById("winnerName").style.removeProperty("color");

    if (num_players < 1 || num_players > 100 || isNaN(parseInt(document.getElementById("numPlayers").value))) {
        document.getElementById("winnerName").innerHTML = "Please enter a number between 1-100";
        document.getElementById("winnerName").style = "color: red;";
        document.getElementById("numPlayers").value = "";

    }
    else {
        document.getElementById("numPlayers").style.display = "none";
        document.getElementById("btnGetNumPlayers").style.display = "none";

        let display = "";

        document.getElementById("heading").innerHTML = "Enter the players names";

        for (var i = 0; i < num_players; i++) {
            display += "<div id=\"player" + (i + 1) + "Div\">"
            display += "<div><label id=\"player" + (i + 1) + "Name\" class=\"text-respond\">Enter Player " + (i + 1) + "'s Name</label></div>";
            display += "<div><label id=\"player" + (i + 1) + "Total\" class=\"text-respond\" style=\"display: none\"></label></div>";
            display += "<div><input type=\"text\" id=\"player" + (i + 1) + "Score\" class=\"text-respond\"></input></div>";
            display += "</div>"
            display += "<br>";
        }
        //add low score check box, start game, add points, and end game button divs
        display += "<div class=\"centerBtn\"><div id=\"btnStartGame\" style=\"display: none\"><input type=\"checkbox\" id=\"lowScore\" name=\"lowScore\" value=\"lowScore\"><label for=\"lowScore\"> Lowest score wins</label><input type=\"button\" class=\"text-respond\" value=\"Start Game\" onclick=\"getPlayerNames();\"><br><br></div><div id=\"btnAddScore\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"Add Points\" onclick=\"addScore();\" href=\"#heading\"><br><br></div><div id=\"btnEndGame\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"End Game\" onclick=\"endGame();\" href=\"#heading\"></div></div>";
        document.getElementById("playerInfo").innerHTML = display;
        document.getElementById("btnStartGame").style.display = "block";
    }
}

function getPlayerNames() {
    lowScore = document.getElementById("lowScore").checked;
    document.getElementById("btnStartGame").style.display = "none";
    var num_players = parseInt(document.getElementById("numPlayers").value);
    var name = "";

    for (var i = 0; i < num_players; i++) {
        name = document.getElementById("player" + (i + 1) + "Score").value;
        newPlayer = {
            "name": name,
            "score": 0
        }
        player_list.push(newPlayer);

        var oInputField = document.getElementById("player" + (i + 1) + "Score");
        oInputField.type = ("number");
        oInputField.placeholder = ("0");

        document.getElementById("player" + (i + 1) + "Name").innerHTML = player_list[i]["name"];
        document.getElementById("player" + (i + 1) + "Total").innerHTML = player_list[i]["score"];
        document.getElementById("player" + (i + 1) + "Total").style.display = "block";
    }

    document.getElementById("btnAddScore").style.display = "block";
    document.getElementById("btnEndGame").style.display = "block";
    for(var i = 0; i < num_players; i++){
        document.getElementById("player" + (i + 1) + "Score").type = "number";
    }

    displayScore();
}

function addScore() {
    for (var i = 0; i < player_list.length; i++) {
        //awards 0 points to any player that does not have a score input, else adds input score
        if (isNaN(parseInt(document.getElementById("player" + (i + 1) + "Score").value))) {
            player_list[i]["score"] += 0;
            document.getElementById("player" + (i + 1) + "Score").value = "";
        }
        else {
            player_list[i]["score"] += parseInt(document.getElementById("player" + (i + 1) + "Score").value);
            document.getElementById("player" + (i + 1) + "Score").value = "";
        }
    }
    displayScore();
}

function displayScore() {
    document.getElementById("heading").innerHTML = "Current Score";
    var temp_array = [];
    if (lowScore) {
        //bubble sorts the winners by score in ascending order
        for (var i = 0; i < player_list.length - 1; i++) {
            for (var j = i + 1; j < player_list.length; j++) {
                if (player_list[i]["score"] > player_list[j]["score"]) {
                    temp_array[i] = player_list[i];
                    player_list[i] = player_list[j];
                    player_list[j] = temp_array[i];
                }
            }
        }
    }
    else {
        //bubble sorts the winners by score in descending order
        for (var i = 0; i < player_list.length - 1; i++) {
            for (var j = i + 1; j < player_list.length; j++) {
                if (player_list[i]["score"] < player_list[j]["score"]) {
                    temp_array[i] = player_list[i];
                    player_list[i] = player_list[j];
                    player_list[j] = temp_array[i];
                }
            }
        }
    }
    for (var i = 0; i < player_list.length; i++) {
        document.getElementById("player" + (i + 1) + "Name").innerHTML = player_list[i]["name"];
        document.getElementById("player" + (i + 1) + "Total").innerHTML = player_list[i]["score"];

    }
}

function endGame() {
    //changes title heading and hides add score and end game buttons
    document.getElementById("heading").innerHTML = "Game Over";
    document.getElementById("btnAddScore").style.display = "none";
    document.getElementById("btnEndGame").style.display = "none";

    //hide the player score input fields
    for (var iCount = 0; iCount < player_list.length; iCount++) {
        document.getElementById("player" + (iCount + 1) + "Score").style.display = "none";
    }

    //show the play again button
    //document.getElementById("btnPlayAgain").style.display = "block";
    document.getElementById("btnResetGame").style.display = "block";
    //declare winner of the game
    document.getElementById("winnerName").innerHTML = "<br>" + player_list[0].name + " wins with a score of " + player_list[0].score + "!<br>";
}

//plays the game again with the same players **needs adjustement
/*function playAgain() {
    //set all players scores to 0
    for (var i = 0; i < player_list.length; i++) {
        player_list[i].resetScore();
    }
    //displays both the add score and end game buttons
    document.getElementById("btnAddScore").style.display = "block";
    document.getElementById("btnEndGame").style.display = "block";
    //displays the input fields for each of the players again
    for (var i = 0; i < player_list.length; i++) {
        document.getElementById("player" + (i + 1) + "Score").style.display = "block";
    }
    //hides the play again and reset button
    document.getElementById("btnPlayAgain").style.display = "none";
    document.getElementById("btnResetGame").style.display = "none";
    displayScore();
    document.getElementById("winnerName").innerHTML = "";
    getPlayerNames();
}*/