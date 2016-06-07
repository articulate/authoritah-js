import { map, pick } from 'ramda'

export default function removeRules(context) {
  const { client, removes } = context;

  const removeRule = compose(client.rules.delete, pick('id'));

  return Promise.all(map(removeRule, removes));
}
