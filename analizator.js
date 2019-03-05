var fs = require('fs');

// fs.readFile("temp.txt", function(err, buf) {
//   console.log(buf.toString());
// });
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
  characters: /[a-zA-Z]/g
};

class Token {
  constructor(typeIndex, valueIndex) {
    this.typeIndex = typeIndex;
    this.valueIndex = valueIndex;
  }
}

class Lexer {
  constructor(input) {
    this.input = input;
  }

  nextToken() {}
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
        } else if (separators.contains(input)) {
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
        break;
      // start numar
      case 1:
        if (input.match(regexValues.numbers)) {
          return 1;
        } else if (input === '.') {
          return 2;
        } else if (input === 'e') {
          return 3;
        }
        break;
      case 2:
        if (input.match(regexValues.numbers)) {
          return 2;
        } else if (input === 'e') {
          return 3;
        }
        break;
      case 3:
        if (input.match(regexValues.numbers)) {
          return 4;
        } else if (input === '-') {
          return 5;
        }
        break;
      case 4:
        if (input.match(regexValues.numbers)) {
          return 4;
        }
        break;
      case 5:
        if (input.match(regexValues.numbers)) {
          return 4;
        }
        break;
      case 6:
        if (
          input === '_' ||
          input.match(
            regexValues.characters || input.match(regexValues.numbers)
          )
        ) {
          return 6;
        }
        break;
      //  operatori
      case 7:
        if (input === '+') {
          return 8;
        } else if (input === '=') {
          return 9;
        }
        break;
      case 10:
        if (input === '-') {
          return 11;
        } else if (input === '=') {
          return 12;
        }
        break;
      case 13:
        if (input === '=') {
          return 14;
        }
        break;
      case 15:
        if (input === '=') {
          return 16;
        }
        break;
      case 17:
        if (input === '=') {
          return 18;
        }
        break;
      case 19:
        if (input === '|') {
          return 20;
        } else if (input === '=') {
          return 21;
        }
        break;
      case 22:
        if (input === '&') {
          return 23;
        } else if (input === '=') {
          return 24;
        }
        break;
      case 27:
        if (input === '>') {
          return 28;
        } else if (input === '=') {
          return 30;
        }
        break;
      case 28:
        if (input === '=') {
          return 29;
        }
        break;
      case 31:
        if (input === '<') {
          return 32;
        } else if (input === '=') {
          return 34;
        }
        break;
      case 32:
        if (input === '=') {
          return 33;
        }
        break;
      case 35:
        if (input === '=') {
          return 36;
        }
        break;
      case 37:
        if (input === '=') {
          return 38;
        }
        break;
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
        break;
      case 41:
        if (input !== '*') {
          return 42;
        } else if (input === '*') {
          return 43;
        }
        break;
      case 42:
        if (input !== '*') {
          return 42;
        } else if (input === '*') {
          return 43;
        }
        break;
      case 43:
        if (input !== '/') {
          return 42;
        } else if (input === '/') {
          return 44;
        }
        break;
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
        break;
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
        break;
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
        break;
    }
  }

  run(input) {
    let currentState = this.initialState;
    let length = input.length;
    let buffer = '';

    for (let i = 0; i < length; i++) {
      console.log(i, '   ');
      let character = input[i];
      let theNextState = this.nextState(currentState, character);
      if (theNextState === NO_NEXT_STATE) {
        if (this.acceptingStates.contains(currentState)) {
          if (
            statesType[currentState] === 'Identifier' &&
            keywords.contains(buffer)
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
              operators.indexOf(buffer)
            );
          } else if (values.contains(buffer)) {
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
        }
      }
      buffer = buffer + character;
      currentState = theNextState;
    }
  }
}

let dfa = new FSM([0, 1, 2, 3], 0, [1], 'red');
dfa.run('abc');
