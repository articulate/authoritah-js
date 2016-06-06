import { merge, pick, map, compose, assoc } from 'ramda';

const ATTRS = [
  'enabled',
  'stage',
  'script',
  'name',
];


const extractName = (uuidName) => {
  const [uuid, ...nameParts] = uuidName.split(' ');
  return { uuid, name: nameParts.join(' ') };
};

const transform = (attrs) => {
  const { name } = attrs;
  return merge(attrs, extractName(name));
};

export default function parseRules(context) {
  const { rules } = context;
  const parsed = map(compose(transform, pick(ATTRS)), rules);

  return assoc('rules', parsed, context);
}
