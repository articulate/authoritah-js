import generateJID from './generateJID'

export default function transformParams(context) {
  const {
    config,
    options: {
      secret,
      key,
      refresh,
      }
    } = context;

  if(refresh) { config.remove('jwt.created_at', 'jwt.uid'); }

  return generateJID({
                       key: key || config.get('auth0.key'),
                       secret: secret || config.get('auth0.secret'),
                       created_at: config.get('jwt.created_at', Date.now()),
                       uid: config.get('jwt.uid'),
                     });
}
