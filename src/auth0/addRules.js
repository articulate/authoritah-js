import { map, pick } from 'ramda'

export default function addRules(context) {
  const { client, adds } = context;

  return Promise.all(map(client.rules.create, adds));
}
