import { map, pick } from 'ramda'

export default function addRules(context) {
  const { client, changes } = context;

  return Promise.all(map(client.rules.update, adds));
}
