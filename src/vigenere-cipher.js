const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
		if (!message || !key) {
			throw new Error("Incorrect arguments!");
		}

    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = "";
    for (let i = 0, j = 0; i < message.length; i++) {
      if (message[i].match(/[A-Z]/)) {
        let messageCharCode = message[i].charCodeAt(0);
        let keyCharCode = key[j % key.length].charCodeAt(0);
        let encryptedCharCode = ((messageCharCode + keyCharCode) % 26) + 65;
        result += String.fromCharCode(encryptedCharCode);
        j++;
      } else {
        result += message[i];
      }
    }

    return this.isDirect ? result : result.split("").reverse().join("");
  }

  decrypt(message, key) {
    if (!message || !key) throw new Error("Incorrect arguments!");

    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = "";
    for (let i = 0, j = 0; i < message.length; i++) {
      if (message[i].match(/[A-Z]/)) {
        let messageCharCode = message[i].charCodeAt(0);
        let keyCharCode = key[j % key.length].charCodeAt(0);
        let decryptedCharCode = ((messageCharCode - keyCharCode + 26) % 26) + 65;
        result += String.fromCharCode(decryptedCharCode);
        j++;
      } else {
        result += message[i];
      }
    }

    return this.isDirect ? result : result.split("").reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine
};
