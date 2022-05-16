(function(){ // google to find self executing function

    var playerX = 11;
    var playerY = 8;
    
    //map array
    //b = background
    //s = stone
    //w = woodCrate
    //p = player
    //f = food
    var tileMap = [["b", "b", "b", "b", "s", "s", "s", "s", "s", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
                   ["b", "b", "b", "b", "s", "b", "b", "b", "s", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
                   ["b", "b", "b", "b", "s", "w", "b", "b", "s", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
                   ["b", "b", "s", "s", "s", "b", "b", "w", "s", "s", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
                   ["b", "b", "s", "b", "b", "w", "b", "w", "b", "s", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
                   ["s", "s", "s", "b", "s", "b", "s", "s", "b", "s", "b", "b", "b", "s", "s", "s", "s", "s", "s"],
                   ["s", "b", "b", "b", "s", "b", "s", "s", "b", "s", "s", "s", "s", "s", "b", "b", "f", "f", "s"],
                   ["s", "b", "w", "b", "b", "w", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "f", "f", "s"],
                   ["s", "s", "s", "s", "s", "b", "s", "s", "s", "b", "s", "p", "s", "s", "b", "b", "f", "f", "s"],
                   ["b", "b", "b", "b", "s", "b", "b", "b", "b", "b", "s", "s", "s", "s", "s", "s", "s", "s", "s"],
                   ["b", "b", "b", "b", "s", "s", "s", "s", "s", "s", "s", "b", "b", "b", "b", "b", "b", "b", "b"]
    ];
   


//create all divs 
function drawmap(){
    var map = document.getElementById("map");
    
    for(var column=0; column < 11; column++)
    {
        for(var row=0; row < 19; row++)
        {
            var tile = document.createElement("div");
            map.appendChild(tile);
            tile.classList.add("tile");
            tile.classList.add(addIndex(row, column));
        }
    }
}
    
//addIndex(1,2) returns "x1y2"
function addIndex(x,y){
    return "x" + x + "y" + y;
}



function movePlayer(direction) { 
    
    if (direction == "up") {
        if (playerY > 0) { 
            playerY--;
        }
        movePlayerSpritesAndCrates(direction);

    } else if (direction == "down") {
        if (playerY < 10) { 
            playerY++;
        }
        movePlayerSpritesAndCrates(direction);

    } else if (direction == "left") {
        if (playerX > 0) { 
            playerX--;
        }
        movePlayerSpritesAndCrates(direction);

    }else if (direction == "right") {
        if (playerX < 18) { 
            playerX++;
        }
        movePlayerSpritesAndCrates(direction);
    }

}

    
    
function movePlayerSpritesAndCrates(direction) {
        const playerTileNew = document.getElementsByClassName(addIndex(playerX, playerY));

        //if we are walking into a stoneblock stop player from moving
        if (playerTileNew[0].classList.contains("stoneblock")) {
            walkingIntoStoneBlock(direction);
            return;

        //Player is walking into crate, then we have to move the crate as well
        } else if (playerTileNew[0].classList.contains("crate")) {

            switch (direction) {
                case "up":
                    const tileAboveIsWood = document.getElementsByClassName(addIndex(playerX, playerY - 1));
                    if (tileAboveIsWood[0].classList.contains("crate") || tileAboveIsWood[0].classList.contains("stoneblock")) {
                        console.log("crate above crate");
                        playerY++;
                        return; // cant put a crate in a crate or in a stoneblock
                    }
                    //remove old crate
                    playerTileNew[0].classList.toggle("crate");
                    //put crate above
                    tileAboveIsWood[0].classList.add( "crate");
                    break;
                
                 case "down":
                    const tileBelowIsWood = document.getElementsByClassName(addIndex(playerX, playerY + 1));
                    if (tileBelowIsWood[0].classList.contains("crate") || tileBelowIsWood[0].classList.contains("stoneblock")) {
                        console.log("crate above crate");
                        playerY--;
                        return; // cant put a crate in a crate or in a stoneblock
                    }
                    //remove old crate
                    playerTileNew[0].classList.toggle("crate");
                    //put crate above
                    tileBelowIsWood[0].classList.add( "crate");
                    break;
                
                 case "left":
                     const tileToLeftIsWood = document.getElementsByClassName(addIndex(playerX-1, playerY));
                    if (tileToLeftIsWood[0].classList.contains("crate") || tileToLeftIsWood[0].classList.contains("stoneblock")) {
                        console.log("crate above crate");
                        playerX++;
                        return; // cant put a crate in a crate or in a stoneblock
                    }
                    //remove old crate
                    playerTileNew[0].classList.toggle("crate");
                    //put crate above
                    tileToLeftIsWood[0].classList.add( "crate");
                    break;
                
                 case "right":
                    const tileToRightIsWood = document.getElementsByClassName(addIndex(playerX+1, playerY));
                    if (tileToRightIsWood[0].classList.contains("crate") || tileToRightIsWood[0].classList.contains("stoneblock")) {
                        console.log("crate above crate");
                        playerX--;
                        return; // cant put a crate in a crate or in a stoneblock
                    }
                    //remove old crate
                    playerTileNew[0].classList.toggle("crate");
                    //put crate above
                    tileToRightIsWood[0].classList.add( "crate");
                    break;
                
            }
            

        }

        //UPDATE player image: 
        //remove old image on tile
        var playerTile = document.getElementById("player");
        playerTile.removeAttribute("id");

        //add image  to new tile
        playerTileNew[0].setAttribute("id", "player");
    }



function walkingIntoStoneBlock(direction) {
//player is walking into a stoneblock, stop player from entering it by decreasing its coordinate again-        
           switch (direction) {
                 case "up":
                     playerY++;
                     break;
                 case "down":
                     playerY--;
                     break;
                 case "left":
                     playerX++;
                     break;
                 case "right":
                     playerX--;
                     break;
             }
   }

    
    
    
document.onkeydown = arrowKeys;//detects key input
    function arrowKeys(e) {
    
        e = e || window.event;

        checkIfPlayerWon();
        if (e.keyCode == '38') {
            // up arrow
            movePlayer("up");
            // prevent default behaviour
            e.preventDefault();
        }
        else if (e.keyCode == '40') {
            // down arrow
            movePlayer("down");
            // prevent default behaviour
            e.preventDefault();
        }
        else if (e.keyCode == '37') {
             // left arrow
            movePlayer("left");
            // prevent default behaviour
            e.preventDefault();
       
        }
        else if (e.keyCode == '39') {
            // right arrow
            movePlayer("right");
            // prevent default behaviour
            e.preventDefault();
        }


}
    function checkIfPlayerWon() {
        const crateOverFood = document.getElementsByClassName("food crate");
        if (crateOverFood.length == 6) {
            var h = document.createElement("H1");
            var t = document.createTextNode("Congrats, you won! ");
            h.appendChild(t);
            document.body.appendChild(h);

                //Resfreshes page after 5 seconds
                setTimeout(function timeout(){
                window.location.reload(1);
                }, 5000);
            
        }
    }




    function addSprite(map2DArr) {
         for(var column=0; column < 11; column++)
         {
            for(var row=0; row < 19; row++)
            {
                const currTile = document.getElementsByClassName(addIndex(row, column));
                //add all sprites to all tiles
                if (map2DArr[column][row] == "b") {
                    currTile[0].classList.add( "background");
                } else if (map2DArr[column][row] == "s") {
                    currTile[0].classList.add( "stoneblock");
                } else if (map2DArr[column][row] == "w") {
                    currTile[0].classList.add( "crate");
                    currTile[0].classList.add( "background");

                } else if (map2DArr[column][row] == "p") {
                    currTile[0].setAttribute("id", "player");
                    currTile[0].classList.add( "background");
                } else if (map2DArr[column][row] == "f") {
                    currTile[0].classList.add( "food");
                }


            }
    }
    
}
    drawmap(); //adds all divs
    addSprite(tileMap); //inserts img to all divs

})();

