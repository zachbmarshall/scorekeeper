var newPlayer = {
    "name": "N/A",
    "score": 0,
    "hist": ""
}

var player_list = [];
var pointSpread = [];
var lowScore = false;

function getNumPlayers() {
    var numPlayers = parseInt(document.getElementById("numPlayers").value);
    document.getElementById("winnerName").innerHTML = "";
    document.getElementById("winnerName").style.removeProperty("color");

    if (numPlayers < 1 || numPlayers > 12 || isNaN(parseInt(document.getElementById("numPlayers").value))) {
        document.getElementById("winnerName").innerHTML = "Please enter a number between 1-12";
        document.getElementById("winnerName").style = "color: red;";
        document.getElementById("numPlayers").value = "";

    }
    else {
        document.getElementById("numPlayers").style.display = "none";
        document.getElementById("btnGetNumPlayers").style.display = "none";

        let display = "";

        document.getElementById("heading").innerHTML = "Choose the point spread";

        for (var i = 0; i < numPlayers; i++) {
            //Displays all of the divs for the same number of players
            display += "<div id=\"player" + (i + 1) + "Div\">"
            display += "<div><label id=\"player" + (i + 1) + "Label\" class=\"text-respond\">Points for being #" + (i + 1) + "</label></div>";
            display += "<div><input type=\"number\" pattern=\"[0-9]*\" id=\"player" + (i + 1) + "Points\" class=\"text-respond\"></input></div>";
            display += "</div>"
            display += "<br>";
        }
        display += "<div class=\"centerBtn\"><div id=\"getNames\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"Select Names\" onclick=\"getPointSpread();\"></div>";
        document.getElementById("playerInfo").innerHTML = display;
        //Displays the Start Game button
        document.getElementById("getNames").style.display = "block";
    }
}

function getPointSpread() {
    var numPlayers = parseInt(document.getElementById("numPlayers").value);

    for (var i = 0; i < numPlayers; i++) {
        pointSpread.push(parseInt(document.getElementById("player" + (i + 1) + "Points").value));
    }

    document.getElementById("numPlayers").style.display = "none";
    document.getElementById("btnGetNumPlayers").style.display = "none";

    let display = "";

    document.getElementById("heading").innerHTML = "Enter the players names";

    for (var i = 0; i < numPlayers; i++) {
        //Displays all of the divs for the same number of players
        display += "<div id=\"player" + (i + 1) + "Div\">"
        display += "<div><label id=\"player" + (i + 1) + "Name\" class=\"text-respond\">Enter Player " + (i + 1) + "'s Name</label></div>";
        display += "<div><label id=\"player" + (i + 1) + "Total\" class=\"text-respond\" style=\"display: none\"></label></div>";
        display += "<div><label id=\"player" + (i + 1) + "Label\" class=\"text-respond\" style=\"display: none\">What place did they get?</label></div>";
        display += "<div><input type=\"text\" id=\"player" + (i + 1) + "Score\" class=\"text-respond\"></input></div>";
        display += "</div>"
        display += "<br>";
    }
    display += "<div class=\"centerBtn\"><div id=\"btnStartGame\" style=\"display: none\"><input type=\"checkbox\" id=\"lowScore\" name=\"lowScore\" value=\"lowScore\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"Start Game\" onclick=\"getScore();\"><br><br></div><div id=\"btnAddScore\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"Add Points\" onclick=\"addScore();\" href=\"#heading\"><br><br></div><div id=\"btnEndGame\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"End Game\" onclick=\"endGame();\" href=\"#heading\"><h4 id=\"standings\" class=\"text-respond\"></h4><div id=\"copyScore\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"Copy Score\" onclick=\"copyToClipboard();\" href=\"#heading\"></div></div></div>";
    document.getElementById("playerInfo").innerHTML = display;
    //Displays the Start Game button
    document.getElementById("btnStartGame").style.display = "block";

}

function getScore() {

    document.getElementById("btnStartGame").style.display = "none";
    var iNumPlayers = parseInt(document.getElementById("numPlayers").value);
    var sName = "";

    for (var i = 0; i < iNumPlayers; i++) {
        document.getElementById("player" + (i + 1) + "Label").style.display = "block";
    }

    for (var i = 0; i < iNumPlayers; i++) {
        sName = document.getElementById("player" + (i + 1) + "Score").value;
        newPlayer = {
            "name": sName,
            "score": 0,
            "hist": ""
        }
        player_list.push(newPlayer);

        document.getElementById("player" + (i + 1) + "Name").innerHTML = player_list[i]["name"];
        document.getElementById("player" + (i + 1) + "Total").innerHTML = player_list[i]["score"];
        document.getElementById("player" + (i + 1) + "Total").style.display = "block";
    }

    document.getElementById("btnAddScore").style.display = "block";
    document.getElementById("btnEndGame").style.display = "block";
    document.getElementById("copyScore").style.display = "block";
    for (var i = 0; i < iNumPlayers; i++) {
        document.getElementById("player" + (i + 1) + "Score").type = "number";
        document.getElementById("player" + (i + 1) + "Score").pattern = "[0-9]*";
        document.getElementById("player" + (i + 1) + "Score").placeholder = i + 1;
    }

    displayScore();
}

function addScore() {
    var badNum = false;
    for (var i = 0; i < player_list.length; i++) {
        if (isNaN(parseInt(document.getElementById("player" + (i + 1) + "Score").value)) || parseInt(document.getElementById("player" + (i + 1) + "Score").value) > player_list.length) {
            badNum = true;
        }
    }
    if (badNum) {
        for (var i = 0; i < player_list.length; i++) {
            player_list[i]["score"] += 0;
            document.getElementById("player" + (i + 1) + "Score").value = "";
        }
    }
    else {
        for (var i = 0; i < player_list.length; i++) {
            player_list[i]["hist"] = "";
            player_list[i]["hist"] += player_list[i]["name"] + ": " + player_list[i]["score"] + " + " + pointSpread[parseInt(document.getElementById("player" + (i + 1) + "Score").value) - 1];
            player_list[i]["score"] += pointSpread[parseInt(document.getElementById("player" + (i + 1) + "Score").value) - 1];
            player_list[i]["hist"] += " = " + player_list[i]["score"];
            document.getElementById("player" + (i + 1) + "Score").value = "";
        }
    }

    displayScore();
}

function displayScore() {
    document.getElementById("heading").innerHTML = "Current Score";
    var aoTempArray = [];
    var displayScore = "";

    if (lowScore) {
        //bubble sorts the winners by score in ascending order
        for (var i = 0; i < player_list.length - 1; i++) {
            for (var j = i + 1; j < player_list.length; j++) {
                if (player_list[i]["score"] > player_list[j]["score"]) {
                    aoTempArray[i] = player_list[i];
                    player_list[i] = player_list[j];
                    player_list[j] = aoTempArray[i];
                }
            }
        }
    }
    else {
        //bubble sorts the winners by score in descending order
        for (var i = 0; i < player_list.length - 1; i++) {
            for (var j = i + 1; j < player_list.length; j++) {
                if (player_list[i]["score"] < player_list[j]["score"]) {
                    aoTempArray[i] = player_list[i];
                    player_list[i] = player_list[j];
                    player_list[j] = aoTempArray[i];
                }
            }
        }
    }

    for (var i = 0; i < player_list.length; i++) {
        document.getElementById("player" + (i + 1) + "Name").innerHTML = player_list[i]["name"];
        document.getElementById("player" + (i + 1) + "Total").innerHTML = player_list[i]["score"];
        displayScore += player_list[i]["hist"] + "<br>";
        player_list[i]["hist"] = "";
    }
    document.getElementById("standings").innerHTML = displayScore;
}

function endGame() {
    //changes title heading and hides add score and end game buttons
    document.getElementById("heading").innerHTML = "Game Over";
    document.getElementById("btnAddScore").style.display = "none";
    document.getElementById("btnEndGame").style.display = "none";
    document.getElementById("copyScore").style.display = "none";

    //hide the player score input fields
    for (var i = 0; i < player_list.length; i++) {
        document.getElementById("player" + (i + 1) + "Score").style.display = "none";
    }

    //show the play again button
    //document.getElementById("btnPlayAgain").style.display = "block";
    document.getElementById("btnResetGame").style.display = "block";
    //declare winner of the game
    document.getElementById("winnerName").innerHTML = "<br>" + player_list[0].name + " wins with a score of " + player_list[0].score + "!<br>";

}

//plays the game again with the same players
function playAgain() {
    //set all players scores to 0
    for (var i = 0; i < player_list.length; i++) {
        player_list[i].resetScore();
    }
    //displays both the add score and end game buttons
    document.getElementById("btnAddScore").style.display = "block";
    document.getElementById("btnEndGame").style.display = "block";
    document.getElementById("copyScore").style.display = "block";
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
}

function copyToClipboard() {
    var textToCopy = document.getElementById("standings").innerText;
    console.log(textToCopy);
    var textArea;

    function isOS() {
        //can use a better detection logic here
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.readOnly = true;
        textArea.contentEditable = true;
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range, selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyTo() {
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    createTextArea(textToCopy);
    selectText();
    copyTo();
}