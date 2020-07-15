var newPlayer = {
    "name": "N/A",
    "score": 0
}

var player_list = [];
var lowScore = false;

//gets the correct number of players and creates divs for all of the players
function getNumPlayers() {
    document.getElementById("btnDiv").style.display = "none";
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

        display += "<div id=\"playersInfo\">"
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
        display += "</div>";
        document.getElementById("playerInfo").innerHTML = display;
        document.getElementById("btnStartGame").style.display = "block";
    }
}

//gets the players names from the dom and displays correct divs
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

        var input_field = document.getElementById("player" + (i + 1) + "Score");
        input_field.type = ("number");
        input_field.placeholder = ("0");

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
    toTop();
}

//awards 0 points to any player that does not have a score input, else adds input score
function addScore() {
    for (var i = 0; i < player_list.length; i++) {
        if (isNaN(parseInt(document.getElementById("player" + (i + 1) + "Score").value))) {
            player_list[i].score += 0;
            document.getElementById("player" + (i + 1) + "Score").value = "";
        }
        else {
            player_list[i].score += parseInt(document.getElementById("player" + (i + 1) + "Score").value);
            document.getElementById("player" + (i + 1) + "Score").value = "";
        }
    }
    displayScore();
    toTop();
}

//sorts and displays the order of the players
function displayScore() {
    document.getElementById("heading").innerHTML = "Current Score";
    var temp_array = [];
    if (lowScore) {
        //bubble sorts the winners by score in ascending order
        for (var i = 0; i < player_list.length - 1; i++) {
            for (var j = i + 1; j < player_list.length; j++) {
                if (player_list[i].score > player_list[j].score) {
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
                if (player_list[i].score < player_list[j].score) {
                    temp_array[i] = player_list[i];
                    player_list[i] = player_list[j];
                    player_list[j] = temp_array[i];
                }
            }
        }
    }
    for (var i = 0; i < player_list.length; i++) {
        document.getElementById("player" + (i + 1) + "Name").innerHTML = player_list[i].name;
        document.getElementById("player" + (i + 1) + "Total").innerHTML = player_list[i].score;
    }
}

//declares winner of game and 
function endGame() {
    var output = "";
    document.getElementById("heading").innerHTML = "Game Over";
    document.getElementById("playersInfo").style.display = "none";
    document.getElementById("btnDiv").style.display = "block";
    output += "<br>" + player_list[0].name + " wins with a score of " + player_list[0].score + "!<br>";
    for(var i = 0; i < player_list.length; i++){
        output += player_list[i].name + " - " + player_list[i].score + "<br>";
    }
    document.getElementById("winnerName").innerHTML = output;
    toTop();
}

//plays the game again with the same players
function playAgain() {
    document.getElementById("btnDiv").style.display = "none";
    document.getElementById("winnerName").innerHTML = "";
    for (var i = 0; i < player_list.length; i++) {
        player_list[i].score = 0;
    }
    document.getElementById("playersInfo").style.display = "block";
    displayScore();
    toTop();
}

//scrolls to the top of the page
function toTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}