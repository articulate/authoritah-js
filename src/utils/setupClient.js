import auth0 from 'auth0'
import { assoc } from 'ramda'
import generateJwt from '../jwt/generateJWT'

const { ManagementClient } = auth0;

export default function(context) {
  const { config, options: { domain }, say: { error } } = context;
  const token = generateJwt(context);
  const auth0Domain = config.get('auth0.domain', domain);

  if(!auth0Domain) {
    error("Auth0 domain required. Use the --domain flag or set in the config file.");
    process.exit(1);
  }

  const client = new ManagementClient({ token, domain: `${auth0Domain}.auth0.com` });
  return assoc('client', client, context);
}
