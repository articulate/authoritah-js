import crypto from 'crypto'
import { compose, ifElse, has, identity, assoc } from 'ramda'

const bufferToHexString = buff => buff.toString('hex');
const randomHex = compose(bufferToHexString, crypto.randomBytes);

const generateJID = ifElse(
  has('jid'),
  identity,
  assoc('jid', randomHex(16))
);

export default generateJID;

