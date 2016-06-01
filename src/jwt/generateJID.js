import crypto from 'crypto'
import { compose, ifElse, isNil, prop, identity, assoc } from 'ramda'

const bufferToHexString = buff => buff.toString('hex');
const randomHex = compose(bufferToHexString, crypto.randomBytes);

const generateJID = ifElse(
  compose(isNil, prop('uid')),
  assoc('uid', randomHex(16)),
  identity
);

export default generateJID;

