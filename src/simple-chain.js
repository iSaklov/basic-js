const { NotImplementedError } = require('../extensions/index.js');

/**
 *
 * @return {String} The finished chain is a string and looks like this: '( value1 )~~( value2 )~~( value3 )'
 *
 * @example
 * chainMaker.addLink(1).addLink(2).addLink(3).finishChain() => '( 1 )~~( 2 )~~( 3 )'
 *
 * chainMaker.addLink(1).addLink(2).removeLink(1).addLink(3).finishChain() => '( 2 )~~( 3 )'
 *
 * chainMaker.addLink(1).addLink(2).reverseChain().addLink(3).finishChain() => '( 2 )~~( 1 )~~( 3 )'
 *
 */
const chainMaker = {
  chain: [],

  getLength() {
    return this.chain.length;
  },

  addLink(value) {
    if (value === undefined) {
      this.chain.push('(  )');
    } else {
      this.chain.push(`( ${value} )`);
    }
    return this;
  },

  removeLink(position) {
    if (
      position < 1 ||
      position > this.chain.length ||
      !Number.isInteger(position)
    ) {
      this.chain = [];
      throw new Error("You can't remove incorrect link!");
    }
    this.chain.splice(position - 1, 1);
    return this;
  },

  reverseChain() {
    this.chain.reverse();
    return this;
  },

  finishChain() {
    const result = this.chain.join('~~');
    this.chain = [];
    return result;
  },
};

module.exports = {
  chainMaker
};
