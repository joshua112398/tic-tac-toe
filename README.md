# Tic-Tac-Toe
An impementation of the classic game tic-tac-toe, played locally with two players. 

# Features
- A clean user interface, allowing players to click to mark their move
- A restart button to restart the game
- Allows users to input their names
- Automatically detects if a player has won (three in a row) or if there is a tie

# Roadblocks
- The biggest hurdle and biggest source of confusion was object-oriented programming, more notably how exactly to split up the different methods and properties into separate factory functions or modules. 

I decided to go with modules for the Game Controller, the Start Screen where users can input their names and press a button to start the game, and the Board Display. I also created a factory function to create Player objects for each of the two players. There was a bit of back and forth in regards to deciding which factory function or module to place a certain method in. For example, I wasn't sure whether to put the logic/method for checking if a player has won in the Game Controller module or in the two Player objects.

- Another small roadblock is figuring out if there's a faster algorithm to detect that a player has won other than brute force (checking each possible winning pattern every time a player makes a move). I decided to go with brute force instead since there are only 8 winning patterns and so it shouldn't affect performance much. If this was on a much larger scale, then I would definitely look around and try to come up with a better algorithm. 