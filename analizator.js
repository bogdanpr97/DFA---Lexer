let values = [];

import {
  TokenType,
  Keyword,
  operators,
  separators,
  comments,
  states,
  acceptingStates,
  statesType
} from './data.js';

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
  }

  nextState(currectState, character) {
    switch (currectState) {
      case 0:
        break;
      case 1:
        break;
    }
  }

  run(input) {
    let currectState = this.initialState;

    for (let i = 0, length = input.length; i < length; i++) {
      let character = input.charAt(i);
      let nextState = this.nextState(currectState, character);

      if (this.acceptingStates.has(nextState)) {
        return true;
      }

      if (nextState === null) {
        break;
      }

      currectState = nextState;
    }

    return this.acceptingStates.has(currectState);
  }
}
