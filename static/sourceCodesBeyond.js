var sourceCodes = {"abcTraceback": "def a():\r\n    print(\'Start of a()\')\r\n    b()\r\n\r\ndef b():\r\n    print(\'Start of b()\')\r\n    c()\r\n\r\ndef c():\r\n    print(\'Start of c()\')\r\n    42 \/ 0\r\n\r\na()\r\n",
 "zeroDivideTraceback": "def spam(number1, number2):\r\n    return number1 \/ (number2 - 42)\r\n\r\nspam(101, 42)\r\n",
 "towerofhanoi": "\"\"\"THE TOWER OF HANOI, by Al Sweigart al@inventwithpython.com\r\nA stack-moving puzzle game.\"\"\"\r\n\r\nimport copy\r\nimport sys\r\n\r\nTOTAL_DISKS = 5  # More disks means a more difficult puzzle.\r\n\r\n# Start with all disks on tower A:\r\nSOLVED_TOWER = list(range(TOTAL_DISKS, 0, -1))\r\n\r\n\r\ndef main():\r\n    \"\"\"Runs a single game of The Tower of Hanoi.\"\"\"\r\n    print(\r\n        \"\"\"THE TOWER OF HANOI, by Al Sweigart al@inventwithpython.com\r\n\r\nMove the tower of disks, one disk at a time, to another tower. Larger\r\ndisks cannot rest on top of a smaller disk.\r\n\r\nMore info at https:\/\/en.wikipedia.org\/wiki\/Tower_of_Hanoi\r\n\"\"\"\r\n    )\r\n\r\n    \"\"\"The towers dictionary has keys \"A\", \"B\", and \"C\" and values\r\n    that are lists representing a tower of disks. The list contains\r\n    integers representing disks of different sizes, and the start of\r\n    the list is the bottom of the tower. For a game with 5 disks,\r\n    the list [5, 4, 3, 2, 1] represents a completed tower. The blank\r\n    list [] represents a tower of no disks. The list [1, 3] has a\r\n    larger disk on top of a smaller disk and is an invalid\r\n    configuration. The list [3, 1] is allowed since smaller disks\r\n    can go on top of larger ones.\"\"\"\r\n    towers = {\"A\": copy.copy(SOLVED_TOWER), \"B\": [], \"C\": []}\r\n\r\n    while True:  # Run a single turn on each iteration of this loop.\r\n        # Display the towers and disks:\r\n        displayTowers(towers)\r\n\r\n        # Ask the user for a move:\r\n        fromTower, toTower = getPlayerMove(towers)\r\n\r\n        # Move the top disk from fromTower to toTower:\r\n        disk = towers[fromTower].pop()\r\n        towers[toTower].append(disk)\r\n\r\n        # Check if the user has solved the puzzle:\r\n        if SOLVED_TOWER in (towers[\"B\"], towers[\"C\"]):\r\n            displayTowers(towers)  # Display the towers one last time.\r\n            print(\"You have solved the puzzle! Well done!\")\r\n            sys.exit()\r\n\r\n\r\ndef getPlayerMove(towers):\r\n    \"\"\"Asks the player for a move. Returns (fromTower, toTower).\"\"\"\r\n\r\n    while True:  # Keep asking player until they enter a valid move.\r\n        print(\'Enter the letters of \"from\" and \"to\" towers, or QUIT.\')\r\n        print(\"(e.g., AB to moves a disk from tower A to tower B.)\")\r\n        print()\r\n        response = input(\"> \").upper().strip()\r\n\r\n        if response == \"QUIT\":\r\n            print(\"Thanks for playing!\")\r\n            sys.exit()\r\n\r\n        # Make sure the user entered valid tower letters:\r\n        if response not in (\"AB\", \"AC\", \"BA\", \"BC\", \"CA\", \"CB\"):\r\n            print(\"Enter one of AB, AC, BA, BC, CA, or CB.\")\r\n            continue  # Ask player again for their move.\r\n\r\n        # Use more descriptive variable names:\r\n        fromTower, toTower = response[0], response[1]\r\n\r\n        if not len(towers[fromTower]):\r\n            # The \"from\" tower cannot be an empty tower:\r\n            print(\"You selected a tower with no disks.\")\r\n            continue  # Ask player again for their move.\r\n        elif len(towers[toTower]) == 0:\r\n            # Any disk can be moved onto an empty \"to\" tower:\r\n            return fromTower, toTower\r\n        elif towers[toTower][-1] < towers[fromTower][-1]:\r\n            print(\"Can\'t put larger disks on top of smaller ones.\")\r\n            continue  # Ask player again for their move.\r\n        else:\r\n            # This is a valid move, so return the selected towers:\r\n            return fromTower, toTower\r\n\r\n\r\ndef displayTowers(towers):\r\n    \"\"\"Display the three towers with their disks.\"\"\"\r\n\r\n    # Display the three towers:\r\n    for level in range(TOTAL_DISKS, -1, -1):\r\n        for tower in (towers[\"A\"], towers[\"B\"], towers[\"C\"]):\r\n            if level >= len(tower):\r\n                displayDisk(0)  # Display the bare pole with no disk.\r\n            else:\r\n                displayDisk(tower[level])  # Display the disk.\r\n        print()\r\n\r\n    # Display the tower labels A, B, and C:\r\n    emptySpace = \" \" * (TOTAL_DISKS)\r\n    print(\"{0} A{0}{0} B{0}{0} C\\n\".format(emptySpace))\r\n\r\n\r\ndef displayDisk(width):\r\n    \"\"\"Display a disk of the given width. A width of 0 means no disk.\"\"\"\r\n    emptySpace = \" \" * (TOTAL_DISKS - width)\r\n\r\n    if width == 0:\r\n        # Display a pole segment without a disk:\r\n        print(f\"{emptySpace}||{emptySpace}\", end=\"\")\r\n    else:\r\n        # Display the disk:\r\n        disk = \"@\" * width\r\n        numLabel = str(width).rjust(2, \"_\")\r\n        print(f\"{emptySpace}{disk}{numLabel}{disk}{emptySpace}\", end=\"\")\r\n\r\n\r\n# If this program was run (instead of imported), run the game:\r\nif __name__ == \"__main__\":\r\n    main()\r\n",
 "fourinarow": "\"\"\"FOUR IN A ROW, by Al Sweigart al@inventwithpython.com\r\nA tile-dropping game to get four in a row, similar to Connect Four.\"\"\"\r\n\r\nimport sys\r\n\r\n# Constants used for displaying the board:\r\nEMPTY_SPACE = \'.\'\r\nPLAYER_X = \'X\'\r\nPLAYER_O = \'O\'\r\n\r\n# The template string for displaying the board:\r\nBOARD_TEMPLATE = \"\"\"\r\n     1234567\r\n    +-------+\r\n    |{}{}{}{}{}{}{}|\r\n    |{}{}{}{}{}{}{}|\r\n    |{}{}{}{}{}{}{}|\r\n    |{}{}{}{}{}{}{}|\r\n    |{}{}{}{}{}{}{}|\r\n    |{}{}{}{}{}{}{}|\r\n    +-------+\"\"\"\r\n\r\ndef main():\r\n    \"\"\"Runs a single game of Four in a Row.\"\"\"\r\n    print(\"\"\"FOUR IN A ROW, by Al Sweigart al@inventwithpython.com\r\n\r\nTwo players take turns dropping tiles into one of seven columns, trying\r\nto make four in a row horizontally, vertically, or diagonally.\r\n\"\"\")\r\n\r\n    # Set up a new game:\r\n    gameBoard = getNewBoard()\r\n    playerTurn = PLAYER_X\r\n\r\n    while True: # Main game loop.\r\n        # Draw board and get player\'s move:\r\n        displayBoard(gameBoard)\r\n        playerMove = getPlayerMove(playerTurn, gameBoard)\r\n        gameBoard[playerMove] = playerTurn\r\n\r\n        # Check for a win or tie:\r\n        if isWinner(playerTurn, gameBoard):\r\n            displayBoard(gameBoard)\r\n            print(\'Player {} has won!\'.format(playerTurn))\r\n            break\r\n        elif isFull(gameBoard):\r\n            displayBoard(gameBoard)\r\n            print(\'There is a tie!\')\r\n            break\r\n\r\n        # Switch turns to other player:\r\n        if playerTurn == PLAYER_X:\r\n            playerTurn = PLAYER_O\r\n        elif playerTurn == PLAYER_O:\r\n            playerTurn = PLAYER_X\r\n\r\n\r\ndef getNewBoard():\r\n    \"\"\"Returns a dictionary that represents a Four in a Row board.\r\n\r\n    The keys are (x, y) tuples of two integers, and the values are one\r\n    of the \'X\', \'O\' or \'.\' (empty space) strings.\"\"\"\r\n    board = {}\r\n    for y in range(6):\r\n        for x in range(7):\r\n            board[(x, y)] = EMPTY_SPACE\r\n    return board\r\n\r\n\r\ndef displayBoard(board):\r\n    \"\"\"Display the board and its tiles on the screen.\"\"\"\r\n\r\n    # Prepare a list to pass to the format() string method for the board\r\n    # template. The list holds all of the board\'s tiles (and empty\r\n    # spaces) going left to right, top to bottom:\r\n    tileChars = []\r\n    for y in range(6):\r\n        for x in range(7):\r\n            tileChars.append(board[(x, y)])\r\n\r\n    # Display the board:\r\n    print(BOARD_TEMPLATE.format(*tileChars))\r\n\r\n\r\ndef getPlayerMove(playerTile, board):\r\n    \"\"\"Let the player select a column to drop a tile into. Returns a\r\n    tuple of the (column, row) that the tile ends up on.\"\"\"\r\n    while True:\r\n        print(f\'Player {playerTile}, enter 1 to 7 or QUIT:\')\r\n        move = input().upper().strip()\r\n\r\n        if move == \'QUIT\':\r\n            print(\'Thanks for playing!\')\r\n            sys.exit()\r\n\r\n        if move not in (\'1\', \'2\', \'3\', \'4\', \'5\', \'6\', \'7\'):\r\n            print(\'Enter a number from 1 to 7.\')\r\n            input(\'Press Enter to continue...\')\r\n            continue # Ask again for their move.\r\n\r\n        move = int(move) - 1 # The -1 adjusts for 0-based index.\r\n\r\n        # Starting from the bottom, find the first not-occupied space.\r\n        for i in range(5, -1, -1):\r\n            if board[(move, i)] == EMPTY_SPACE:\r\n                return (move, i)\r\n        # At this point, go back to the start of the loop.\r\n\r\n\r\ndef isFull(board):\r\n    \"\"\"Returns True if the `board` has no empty spaces, otherwise returns\r\n    False.\"\"\"\r\n    for y in range(6):\r\n        for x in range(7):\r\n            if board[(x, y)] != EMPTY_SPACE:\r\n                return False # Found an empty space, so return False.\r\n    return True # All spaces are full.\r\n\r\n\r\ndef isWinner(playerTile, board):\r\n    \"\"\"Returns True if `playerTile` has four tiles in a row on `board`,\r\n    otherwise returns False.\"\"\"\r\n    b = board # Syntactic sugar - a shorter name instead of `board`.\r\n\r\n    # Go through the entire board, checking for four-in-a-row:\r\n    for x in range(4):\r\n        for y in range(6):\r\n            # Check for four-in-a-row going across to the right:\r\n            space1 = b[(x, y)]\r\n            space2 = b[(x + 1, y)]\r\n            space3 = b[(x + 2, y)]\r\n            space4 = b[(x + 3, y)]\r\n            if space1 == space2 == space3 == space4 == playerTile:\r\n                return True\r\n\r\n    for x in range(7):\r\n        for y in range(3):\r\n            # Check for four-in-a-row going down:\r\n            space1 = b[(x, y)]\r\n            space2 = b[(x, y + 1)]\r\n            space3 = b[(x, y + 2)]\r\n            space4 = b[(x, y + 3)]\r\n            if space1 == space2 == space3 == space4 == playerTile:\r\n                return True\r\n\r\n    for x in range(4):\r\n        for y in range(3):\r\n            # Check for four-in-a-row going right-down diagonal:\r\n            space1 = b[(x, y)]\r\n            space2 = b[(x + 1, y + 1)]\r\n            space3 = b[(x + 2, y + 2)]\r\n            space4 = b[(x + 3, y + 3)]\r\n            if space1 == space2 == space3 == space4 == playerTile:\r\n                return True\r\n\r\n            # Check for four-in-a-row going left-down diagonal:\r\n            space1 = b[(x + 3, y)]\r\n            space2 = b[(x + 2, y + 1)]\r\n            space3 = b[(x + 1, y + 2)]\r\n            space4 = b[(x, y + 3)]\r\n            if space1 == space2 == space3 == space4 == playerTile:\r\n                return True\r\n    return False\r\n\r\n\r\n# If the program is run (instead of imported), run the game:\r\nif __name__ == \'__main__\':\r\n    main()\r\n",
 "wcexample1": "import wizcoin\r\n\r\npurse = wizcoin.WizCoins(2, 5, 99) # The ints are passed to __init__().\r\nprint(purse)\r\nprint(\'G:\', purse.galleons, \'S:\', purse.sickles, \'K:\', purse.knuts)\r\nprint(\'Total value:\', purse.value())\r\nprint(\'Weight:\', purse.weightInGrams(), \'grams\')\r\nprint()\r\n\r\ncoinJar = wizcoin.WizCoins(13, 0, 0) # The ints are passed to __init__().\r\nprint(coinJar)\r\nprint(\'G:\', coinJar.galleons, \'S:\', coinJar.sickles, \'K:\', coinJar.knuts)\r\nprint(\'Total value:\', coinJar.value())\r\nprint(\'Weight:\', coinJar.weightInGrams(), \'grams\')",
 "wcexample2": "import wizcoin\r\n\r\nchange = wizcoin.WizCoins(9, 7, 20)\r\nprint(change.sickles) # Prints 7.\r\nchange.sickles += 10\r\nprint(change.sickles) # Prints 17.\r\n\r\npile = wizcoin.WizCoins(2, 3, 31)\r\nprint(pile.sickles) # Prints 3.\r\npile.someNewAttribute = \'a new attr\' # A new attribute is created.\r\nprint(pile.someNewAttribute)\r\n",
 "privateExample": "class BankAccount:\r\n    def __init__(self, accountHolder):\r\n        # BankAccount methods can access self._balance, but code outside of\r\n        # this class should not:\r\n        self._balance = 0\r\n        self._name = accountHolder\r\n        with open(self._name + \'Ledger.txt\', \'w\') as ledgerFile:\r\n            ledgerFile.write(\'Balance is 0\\n\')\r\n\r\n    def deposit(self, amount):\r\n        if amount <= 0:\r\n            return # Don\'t allow negative \"deposits\".\r\n        self._balance += amount\r\n        with open(self._name + \'Ledger.txt\', \'a\') as ledgerFile:\r\n            ledgerFile.write(\'Deposit \' + str(amount) + \'\\n\')\r\n            ledgerFile.write(\'Balance is \' + str(self._balance) + \'\\n\')\r\n\r\n    def withdraw(self, amount):\r\n        if self._balance < amount or amount < 0:\r\n            return # Not enough in account, or withdraw is negative.\r\n        self._balance -= amount\r\n        with open(self._name + \'Ledger.txt\', \'a\') as ledgerFile:\r\n            ledgerFile.write(\'Withdraw \' + str(amount) + \'\\n\')\r\n            ledgerFile.write(\'Balance is \' + str(self._balance) + \'\\n\')\r\n\r\nacct = BankAccount(\'Alice\') # We create an account for Alice.\r\nacct.deposit(100) # _balance can affected through deposit()\r\nacct.withdraw(40) # _balance can affected through withdraw()\r\nprint(\'Balance is\', acct._balance)\r\n\r\n# Changing _name or _balance outside of BankAccount is impolite, but allowed:\r\nacct._balance = 1000000000\r\nacct.withdraw(100)\r\nprint(\'Balance is\', acct._balance)\r\n\r\nacct._name = \'Bob\' # Now we\'re modifying Bob\'s account ledger!\r\nacct.withdraw(100) # This withdrawal is recorded in BobLedger.txt!\r\n",
 "tictactoe": "# A non-OOP Tic-Tac-Toe game.\r\n# By Al Sweigart al@inventwithpython.com\r\n\r\n# Setting up constants:\r\nALL_SPACES = (\'1\', \'2\', \'3\', \'4\', \'5\', \'6\', \'7\', \'8\', \'9\')\r\nX, O, BLANK = \'X\', \'O\', \' \'\r\n\r\ndef main():\r\n    \"\"\"Runs a game of Tic-Tac-Toe.\"\"\"\r\n    print(\'Welcome to Tic-Tac-Toe!\')\r\n    gameBoard = getNewBoard()\r\n    turn, nextTurn = X, O\r\n\r\n    while True:\r\n        drawBoard(gameBoard)\r\n        move = getPlayerMove(gameBoard, turn)\r\n        setSpace(gameBoard, move, turn)\r\n\r\n        if isWinner(gameBoard, turn):\r\n            drawBoard(gameBoard)\r\n            print(turn + \' has won the game!\')\r\n            break\r\n        elif isBoardFull(gameBoard):\r\n            drawBoard(gameBoard)\r\n            print(\'The game is a tie!\')\r\n            break\r\n\r\n        turn, nextTurn = nextTurn, turn\r\n\r\ndef getNewBoard():\r\n    \"\"\"Create a new, blank tic-tac-toe board.\"\"\"\r\n    board = {}\r\n    for space in ALL_SPACES:\r\n        board[space] = BLANK\r\n    return board\r\n\r\ndef drawBoard(board):\r\n    \"\"\"Display a text-representation of the board.\"\"\"\r\n    print(f\'\'\'\r\n        {board[\'7\']}|{board[\'8\']}|{board[\'9\']}  7 8 9\r\n        -+-+-\r\n        {board[\'4\']}|{board[\'5\']}|{board[\'6\']}  4 5 6\r\n        -+-+-\r\n        {board[\'1\']}|{board[\'2\']}|{board[\'3\']}  1 2 3\'\'\')\r\n\r\ndef isWinner(board, mark):\r\n    \"\"\"Return True if mark is a winner on board.\"\"\"\r\n    bo, m = board, mark # Shorter names for \"syntactic sugar\".\r\n    # Check for 3 marks across the 3 rows, 3 columns, and 2 diagonals.\r\n    return ((bo[\'7\'] == m and bo[\'8\'] == m and bo[\'9\'] == m) or\r\n            (bo[\'4\'] == m and bo[\'5\'] == m and bo[\'6\'] == m) or\r\n            (bo[\'1\'] == m and bo[\'2\'] == m and bo[\'3\'] == m) or\r\n            (bo[\'7\'] == m and bo[\'4\'] == m and bo[\'1\'] == m) or\r\n            (bo[\'8\'] == m and bo[\'5\'] == m and bo[\'2\'] == m) or\r\n            (bo[\'9\'] == m and bo[\'6\'] == m and bo[\'3\'] == m) or\r\n            (bo[\'7\'] == m and bo[\'5\'] == m and bo[\'3\'] == m) or\r\n            (bo[\'9\'] == m and bo[\'5\'] == m and bo[\'1\'] == m))\r\n\r\ndef getPlayerMove(board, player):\r\n    \"\"\"Let the player type in their move.\"\"\"\r\n    space = None\r\n    while space not in ALL_SPACES or not board[space] == BLANK:\r\n        print(f\'What is {player}\\\'s move? (1-9)\')\r\n        space = input().upper()\r\n    return space\r\n\r\ndef isBoardFull(board):\r\n    \"\"\"Return True if every space on the board has been taken.\"\"\"\r\n    for space in ALL_SPACES:\r\n        if board[space] == BLANK:\r\n            return False\r\n    return True\r\n\r\ndef setSpace(board, space, mark):\r\n    \"\"\"Sets the space on the board to mark.\"\"\"\r\n    board[space] = mark\r\n\r\nif __name__ == \'__main__\':\r\n    main() # Call main() if this module is run, but not when imported.\r\n",
 "tictactoe_oop": "# An object-oriented Tic-Tac-Toe game.\r\n# By Al Sweigart al@inventwithpython.com\r\n\r\n# Setting up constants:\r\nALL_SPACES = (\'1\', \'2\', \'3\', \'4\', \'5\', \'6\', \'7\', \'8\', \'9\')\r\nX, O, BLANK = \'X\', \'O\', \' \'\r\n\r\ndef main():\r\n    \"\"\"Runs a game of Tic-Tac-Toe.\"\"\"\r\n    print(\'Welcome to Tic-Tac-Toe!\')\r\n    gameBoard = TicTacToeBoard()\r\n    turn, nextTurn = X, O\r\n\r\n    while True:\r\n        gameBoard.drawBoard()\r\n        move = gameBoard.getPlayerMove(turn)\r\n        gameBoard.setSpace(move, turn)\r\n\r\n        if gameBoard.isWinner(turn):\r\n            gameBoard.drawBoard()\r\n            print(turn + \' has won the game!\')\r\n            break\r\n        elif gameBoard.isBoardFull():\r\n            gameBoard.draw()\r\n            print(\'The game is a tie!\')\r\n            break\r\n\r\n        turn, nextTurn = nextTurn, turn\r\n\r\nclass TicTacToeBoard:\r\n    def __init__(self):\r\n        \"\"\"Create a new, blank tic-tac-toe board.\"\"\"\r\n        self._spaces = {}\r\n        for space in ALL_SPACES:\r\n            self._spaces[space] = BLANK\r\n\r\n    def drawBoard(self):\r\n        \"\"\"Display a text-representation of the board.\"\"\"\r\n        print(f\'\'\'\r\n          {self._spaces[\'7\']}|{self._spaces[\'8\']}|{self._spaces[\'9\']}  7 8 9\r\n          -+-+-\r\n          {self._spaces[\'4\']}|{self._spaces[\'5\']}|{self._spaces[\'6\']}  4 5 6\r\n          -+-+-\r\n          {self._spaces[\'1\']}|{self._spaces[\'2\']}|{self._spaces[\'3\']}  1 2 3\'\'\')\r\n\r\n    def isWinner(self, mark):\r\n        \"\"\"Return True if mark is a winner on this TicTacToeBoard.\"\"\"\r\n        bo, m = self._spaces, mark # Shorter names for \"syntactic sugar\".\r\n        # Check for 3 marks across the 3 rows, 3 columns, and 2 diagonals.\r\n        return ((bo[\'7\'] == m and bo[\'8\'] == m and bo[\'9\'] == m) or\r\n                (bo[\'4\'] == m and bo[\'5\'] == m and bo[\'6\'] == m) or\r\n                (bo[\'1\'] == m and bo[\'2\'] == m and bo[\'3\'] == m) or\r\n                (bo[\'7\'] == m and bo[\'4\'] == m and bo[\'1\'] == m) or\r\n                (bo[\'8\'] == m and bo[\'5\'] == m and bo[\'2\'] == m) or\r\n                (bo[\'9\'] == m and bo[\'6\'] == m and bo[\'3\'] == m) or\r\n                (bo[\'7\'] == m and bo[\'5\'] == m and bo[\'3\'] == m) or\r\n                (bo[\'9\'] == m and bo[\'5\'] == m and bo[\'1\'] == m))\r\n\r\n    def getPlayerMove(self, player):\r\n        \"\"\"Let the player type in their move.\"\"\"\r\n        space = None\r\n        while space not in ALL_SPACES or not self._spaces[space] == BLANK:\r\n            print(f\'What is {player}\\\'s move? (1-9)\')\r\n            space = input().upper()\r\n        return space\r\n\r\n    def isBoardFull(self):\r\n        \"\"\"Return True if every space on the board has been taken.\"\"\"\r\n        for space in ALL_SPACES:\r\n            if self._spaces[space] == BLANK:\r\n                return False\r\n        return True\r\n\r\n    def setSpace(self, space, mark):\r\n        \"\"\"Sets the space on the board to mark.\"\"\"\r\n        self._spaces[space] = mark\r\n\r\nif __name__ == \'__main__\':\r\n    main() # Call main() if this module is run, but not when imported.\r\n",
 "inheritanceExample": "class ParentClass:\r\n    def printHello(self):\r\n        print(\'Hello, world!\')\r\n\r\nclass ChildClass(ParentClass):\r\n    # ChildClass inherits all of ParentClass\'s methods, like printHello().\r\n    # No need to copy and paste!\r\n\r\n    def someNewMethod(self):\r\n        print(\'ParentClass objects don\\\'t have this method.\')\r\n\r\nclass GrandchildClass(ChildClass):\r\n    # GrandchildClass inherits all of ChildClass\'s methods.\r\n    # It also inherits all of ParentClass\'s methods.\r\n\r\n    def anotherNewMethod(self):\r\n        print(\'Only GrandchildClass objects have this method.\')\r\n\r\nprint(\'Create a ParentClass object and call its methods:\')\r\nparent = ParentClass() # Create a ParentClass object.\r\nparent.printHello() # Call a ParentClass method.\r\n\r\nprint(\'Create a ChildClass object and call its methods:\')\r\nchild = ChildClass() # Create a ChildClass object.\r\nchild.printHello() # The ChildClass object also has a printHello() method.\r\nchild.someNewMethod() # The ChildClass object has new methods too.\r\n\r\nprint(\'Create a GrandchildClass object and call its methods:\')\r\ngrandchild = GrandchildClass() # Create a GrandchildClass object.\r\ngrandchild.printHello() # The GrandhildClass object inherits this.\r\ngrandchild.someNewMethod() # The GrandhildClass object inherits this too.\r\ngrandchild.anotherNewMethod()\r\n\r\nprint(\'An error:\')\r\nparent.someNewMethod() # ParentClass objects don\'t have this method.\r\n",
 "flyingboat": "class Airplane:\r\n    def flyInTheAir(self):\r\n        print(\'Flying...\')\r\n\r\nclass Ship:\r\n    def floatOnWater(self):\r\n        print(\'Floating...\')\r\n\r\nclass FlyingBoat(Airplane, Ship):\r\n    pass\r\n",
 "regularAttributeExample": "class ClassWithRegularAttributes:\r\n    def __init__(self):\r\n        self.someAttribute = \'some initial value\'\r\n\r\nobj = ClassWithRegularAttributes()\r\nprint(obj.someAttribute) # Prints \'some initial value\'\r\nobj.someAttribute = \'changed value\'\r\nprint(obj.someAttribute) # Prints \'changed value\'\r\ndel obj.someAttribute # Deletes the someAttribute attribute.\r\n",
 "propertiesExample": "class ClassWithProperties:\r\n    def __init__(self):\r\n        self.someAttribute = \'some initial value\'\r\n\r\n    @property\r\n    def someAttribute(self): # The \"getter\" method.\r\n        return self._someAttribute\r\n\r\n    @someAttribute.setter\r\n    def someAttribute(self, value): # The \"setter\" method.\r\n        self._someAttribute = value\r\n\r\n    @someAttribute.deleter\r\n    def someAttribute(self): # The \"deleter\" method.\r\n        del self._someAttribute\r\n\r\nobj = ClassWithProperties()\r\nprint(obj.someAttribute) # Prints \'some initial value\'\r\nobj.someAttribute = \'changed value\'\r\nprint(obj.someAttribute) # Prints \'changed value\'\r\ndel obj.someAttribute # Deletes the _someAttribute attribute.\r\n",
 "badPropertyExample": "class ClassWithBadProperty:\r\n    def __init__(self):\r\n        self.someAttribute = \'some initial value\'\r\n\r\n    @property\r\n    def someAttribute(self): # This is the \"getter\" method.\r\n        # We forgot the _ underscore in `self._someAttribute here`, causing\r\n        # us to use the property and call the getter method again:\r\n        return self.someAttribute # ERROR: This calls the getter again!\r\n\r\n    @someAttribute.setter\r\n    def someAttribute(self, value): # This is the \"setter\" method.\r\n        self._someAttribute = value\r\n\r\nobj = ClassWithBadProperty()\r\nprint(obj.someAttribute) # Error because the getter calls the getter.\r\n\r\n\r\n"
};
