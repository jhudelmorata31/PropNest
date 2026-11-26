/** Resolve database settings from the environment without credential fallbacks. */
export function getDatabaseConfig(env: NodeJS.ProcessEnv = process.env) {
  const required = (name: string): string => {
    const value = env[name]?.trim();
    if (!value) {
      throw new Error(`Missing required database setting ${name}. Copy .env.example to .env and set it.`);
    }
    return value;
  };

  const portValue = required('DB_PORT');
  const port = Number(portValue);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DB_PORT must be an integer between 1 and 65535.');
  }

  return {
    host: required('DB_HOST'),
    port,
    username: required('DB_USERNAME'),
    password: required('DB_PASSWORD'),
    database: required('DB_DATABASE'),
  };
}
