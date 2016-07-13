import inquirer from 'inquirer'
import R from 'ramda'
import loadEnv from '../utils/loadEnv'
import say from '../utils/say'
import generateJWT from '../jwt/generateJWT'

const QUESTIONS = [
  { type: 'input', name: "auth0.env", message: "Enter your Auth0 domain (leave off the 'auth0.com'):" },
  { type: 'input', name: "auth0.key", message: "Auth0 client id:" },
  { type: 'password', name: "auth0.secret", message: "Auth0 client secret:" }
]

function saveAnswers(context) {
  const {config, options: { answers }} = context;

  config.sets(answers);
  return context;
}

export default function index(options) {
  const { ok, error } = say(options);

  inquirer.prompt(QUESTIONS)
    .then(R.curry(R.assoc)('answers', R.__, options))
    .then(loadEnv)
    .then(saveAnswers)
    .then(generateJWT)
    .then(jwt => ok(`New JWT generated: ${jwt}`))
    .catch(error);
}
