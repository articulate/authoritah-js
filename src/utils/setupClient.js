import auth0 from 'auth0'
import { assoc } from 'ramda'
import generateJwt from '../jwt/generateJWT'

const { ManagementClient } = auth0;

export default function(context) {
  const { config, options: { env }, say: { error } } = context;
  const token = generateJwt(context);
  const auth0Domain = config.get('auth0.env', env);

  if(!auth0Domain) {
    error("Auth0 environment required. Use the --env flag or set in the config file.");
    process.exit(1);
  }

  const client = new ManagementClient({ token, domain: `${auth0Domain}.auth0.com` });
  return assoc('client', client, context);
}
