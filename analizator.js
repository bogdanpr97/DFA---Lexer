var fs = require('fs');


// fs.writeFile("temp.txt", "123 \n 321", function(err, data) {
//   if (err) console.log(err);
//   console.log("Successfully Written to File.");
// });

let values = [];
const NO_NEXT_STATE = -1;

var data = require('./data.js');
const {
  TokenType,
  keywords,
  operators,
  separators,
  comments,
  states,
  acceptingStates,
  statesType
} = data;

const regexValues = {
  numbers: /[0-9]/g,
  characters: /[a-zA-Z]/g,
  rChar: /\r/g,
};

class Token {
  constructor(typeIndex, valueIndex) {
    this.typeIndex = typeIndex;
    this.valueIndex = valueIndex;
  }
}

class FSM {
  constructor(states, initialState, acceptingStates, statesType) {
    this.states = states;
    this.initialState = initialState;
    this.acceptingStates = acceptingStates;
    this.statesType = statesType;
  }

  nextState(currectState, input) {
    switch (currectState) {
      case 0:
        if (input.match(regexValues.numbers)) {
          return 1;
        } else if (input === '_' || input.match(regexValues.characters)) {
          return 6;
        } else if (input === '+') {
          return 7;
        } else if (input === '-') {
          return 10;
        } else if (input === '*') {
          return 13;
        } else if (input === '%') {
          return 15;
        } else if (input === '=') {
          return 17;
        } else if (input === '|') {
          return 19;
        } else if (input === '&') {
          return 22;
        } else if (input === '.') {
          return 25;
        } else if (input === '~') {
          return 26;
        } else if (input === '>') {
          return 27;
        } else if (input === '<') {
          return 31;
        } else if (input === '!') {
          return 35;
        } else if (input === '^') {
          return 37;
        } else if (separators.includes(input)) {
          return 39;
        } else if (input === '/') {
          return 40;
        } else if (input === "'") {
          return 49;
        } else if (input === '"') {
          return 53;
        } else if (input === '#') {
          return 57;
        }
        return NO_NEXT_STATE;
      // start numar
      case 1:
        if (input.match(regexValues.numbers)) {
          return 1;
        } else if (input === '.') {
          return 2;
        } else if (input === 'e') {
          return 3;
        }
        return NO_NEXT_STATE;
      case 2:
        if (input.match(regexValues.numbers)) {
          return 2;
        } else if (input === 'e') {
          return 3;
        }
        return NO_NEXT_STATE;
      case 3:
        if (input.match(regexValues.numbers)) {
          return 4;
        } else if (input === '-') {
          return 5;
        }
        return NO_NEXT_STATE;
      case 4:
        if (input.match(regexValues.numbers)) {
          return 4;
        }
        return NO_NEXT_STATE;
      case 5:
        if (input.match(regexValues.numbers)) {
          return 4;
        }
        return NO_NEXT_STATE;
      case 6:
        if (
          input === '_' ||
         input.match(regexValues.characters) || input.match(regexValues.numbers)
          )
         {
          return 6;
        }
      return NO_NEXT_STATE;  
      //  operatori
      case 7:
        if (input === '+') {
          return 8;
        } else if (input === '=') {
          return 9;
        }
        return NO_NEXT_STATE;
      case 10:
        if (input === '-') {
          return 11;
        } else if (input === '=') {
          return 12;
        }
        return NO_NEXT_STATE;
      case 13:
        if (input === '=') {
          return 14;
        }
        return NO_NEXT_STATE;
      case 15:
        if (input === '=') {
          return 16;
        }
        return NO_NEXT_STATE;
      case 17:
        if (input === '=') {
          return 18;
        }
        return NO_NEXT_STATE;
      case 19:
        if (input === '|') {
          return 20;
        } else if (input === '=') {
          return 21;
        }
        return NO_NEXT_STATE;
      case 22:
        if (input === '&') {
          return 23;
        } else if (input === '=') {
          return 24;
        }
        return NO_NEXT_STATE;
      case 27:
        if (input === '>') {
          return 28;
        } else if (input === '=') {
          return 30;
        }
        return NO_NEXT_STATE;
      case 28:
        if (input === '=') {
          return 29;
        }
        return NO_NEXT_STATE;
      case 31:
        if (input === '<') {
          return 32;
        } else if (input === '=') {
          return 34;
        }
        return NO_NEXT_STATE;
      case 32:
        if (input === '=') {
          return 33;
        }
        return NO_NEXT_STATE;
      case 35:
        if (input === '=') {
          return 36;
        }
        return NO_NEXT_STATE;
      case 37:
        if (input === '=') {
          return 38;
        }
        return NO_NEXT_STATE;
      //  INCEPUT COMENTARII
      //  BRANCH 1
      case 40:
        if (input === '*') {
          return 41;
        } else if (input === '/') {
          return 45;
        } else if (input === '=') {
          return 48;
        }
        return NO_NEXT_STATE;
      case 41:
        if (input !== '*') {
          return 42;
        } else if (input === '*') {
          return 43;
        }
        return NO_NEXT_STATE;
      case 42:
        if (input !== '*') {
          return 42;
        } else if (input === '*') {
          return 43;
        }
        return NO_NEXT_STATE;
      case 43:
        if (input !== '/') {
          return 42;
        } else if (input === '/') {
          return 44;
        }
        return NO_NEXT_STATE;
      //  BRANCH 2
      case 45:
        if (input !== '\\') {
          return 45;
        } else {
          return 46;
        }
      case 46:
        if (input !== 'n') {
          return 45;
        } else {
          return 47;
        }
      //  BRANCH 3 - ' '
      case 49:
        if (input !== "'" && input !== '\\' && input !== '\n') {
          return 49;
        } else if (input === "'") {
          return 50;
        } else if (input === '\\') {
          return 51;
        }
        return NO_NEXT_STATE;
      case 51:
        if (input !== '\n') {
          return 49;
        } else {
          return 52;
        }
      case 52:
        if (input === "'") {
          return 50;
        } else if (input !== '\\' && input !== "'") {
          return 49;
        } else if (input === '\\') {
          return 51;
        }
      // BRANCH 4
      case 53:
        if (input !== '"' && input !== '\\' && input !== '\n') {
          return 53;
        } else if (input === '"') {
          return 54;
        } else if (input === '\\') {
          return 55;
        }
        return NO_NEXT_STATE;
      case 55:
        if (input !== '\n') {
          return 53;
        } else {
          return 56;
        }
      case 56:
        if (input === '"') {
          return 54;
        } else if (input !== '\\' && input !== '"') {
          return 53;
        } else if (input === '\\') {
          return 55;
        }
      // GATA COMENTARII
      default:
        return NO_NEXT_STATE;
    }
  }
  checkForAcceptingStates(currentState, buffer) {
        // console.log('bufferul - ', buffer)
        if (this.acceptingStates.includes(currentState)) {
          if (
            statesType[currentState] === 'Identifier' &&
            keywords.includes(buffer)
          ) {
            return new Token(
              TokenType.indexOf('Keyword'),
              keywords.indexOf(buffer)
            );
          } else if (statesType[currentState] === 'Operator') {
            return new Token(
              TokenType.indexOf('Operator'),
              operators.indexOf(buffer)
            );
          } else if (statesType[currentState] === 'Separator') {
            return new Token(
              TokenType.indexOf('Separator'),
              separators.indexOf(buffer)
            );
          } else if (values.includes(buffer)) {
            return new Token(
              TokenType.indexOf(statesType[currentState]),
              values.indexOf(buffer)
            );
          } else {
            values.push(buffer);
            return new Token(
              TokenType.indexOf(statesType[currentState]),
              values.indexOf(buffer)
            );
          }
        } else {
        values.push(buffer);
        return new Token(
              TokenType.indexOf("Invalid"),
              buffer
            );
    }
  }

  run(input) {
    let currentState = this.initialState;
    let length = input.length;
    let buffer = '';
    let r;
    for (let i = 0; i < length; i++) {
      let character = input[i];
      let theNextState = this.nextState(currentState, character);
      console.log(i, '   ', character, '   ',theNextState);
      if (theNextState === NO_NEXT_STATE) {
        r = this.checkForAcceptingStates(currentState, buffer);
        return r;
      }
      buffer = buffer + character; 
      currentState = theNextState;
    }
     r = this.checkForAcceptingStates(currentState, buffer);
     return r; 
  }
}

class Lexer {
  constructor(fsm, inputFile, position, line, column) {
    this.fsm = fsm;
    this.inputFile = inputFile;
    this.fileLength = inputFile.length;
    this.position = position;
    this.line = line;
    this.column = column;
  }

  setValues(values) {
    this.values = values;
  }

  checkEndOfLine() {
    if(this.position > this.fileLength) {
      return true;
    }
    return false;
  }

  getTokenType(token) {
    return TokenType[token.typeIndex];
  }

  getTokenValue(token) {
    switch(token.typeIndex) {
      case 0:
        return keywords[token.valueIndex];
      case 1:
        return operators[token.valueIndex];
      case 2:
        return separators[token.valueIndex];
      default:
        return values[token.valueIndex];
    }
  }

  setValues(values) {
    this.values
  }

  nextToken() {
    if(this.position >= this.fileLength) {
      return null;
    }
    while(this.inputFile[this.position] === " " || this.inputFile[this.position] === '\n') {
      if (this.inputFile[this.position] === " ") {
        this.position += 1;
        this.column +=1;
      } else {
        this.position += 1;
        this.line += 1;
        this.column = 0;
      }
    }
    if(this.position >= this.fileLength) {
      return null;
    }
    // console.log('pos', this.position, 'len', this.fileLength);

    let token = this.fsm.run(this.inputFile.slice(this.position, this.fileLength));
    console.log('am gasit tokenul', token);
    if(token) {
      if(token.typeIndex !== 7) {
        let value = this.getTokenValue(token);
        for (let i = 0; i < value.length; i++) {
          if(value[i] === '\n') {
            this.position += 1;
            this.column = 0;
            this.line += 1;
          } else {
            this.position += 1;
            this.column += 1;
          }
        }
        if(token.typeIndex === 3) {
          return this.nextToken();
        }  
        token.valueIndex = parseInt(token.valueIndex, 10);      
        token.typeIndex = parseInt(token.typeIndex, 10);   
        return token;   
      } else {
        let value = token.valueIndex;
        for (let i = 0; i < value.length; i++) {
          if(value[i] === '\n') {
            this.position += 1;
            this.column = 0;
            this.line += 1;
          } else {
            this.position += 1;
            this.column += 1;
          }
        }
        return token;
      }
    }
    return null;
  }
}

fs.readFile("aici.txt", "utf8", function(err, fileString) {
  // console.log('am citit fisierul',fileString);
  let dfa = new FSM(states, 0, acceptingStates, statesType);
  fileString = fileString.replace(/\r/g,'\n');
  let analizer = new Lexer(dfa, fileString, 0, 1, 1);
  let fileToWrite = "";
  while(true) {
    token = analizer.nextToken();

    if(token !== null) {

      if(analizer.getTokenValue(token) === undefined) {

        fileToWrite = fileToWrite + "Invalid - (" + token.valueIndex + ")" + '\n';
      } else{
        fileToWrite = fileToWrite + analizer.getTokenType(token) + " - " + analizer.getTokenValue(token) + "\n";
        analizer.setValues(values);
      }
    } else {
      break;
    }
  }
  console.log('VALUES', values);

  console.log('fisierul', fileToWrite);
  // fs.writeFile("tempans.txt", "", function(err, data) {
  //         if (err) console.log(err);
  //         console.log("Successfully Written to File.");
  //       });
});
