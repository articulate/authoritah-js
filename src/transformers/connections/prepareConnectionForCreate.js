import R from 'ramda'

// helpers for name formatting conventions
const dropUUID = R.dissoc('uuid');
const prepareForCreate = dropUUID;

export default prepareForCreate;
