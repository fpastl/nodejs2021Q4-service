import configOptions from './common/config';
import app from './app';

const PORT = configOptions.PORT as string;

/**
 * start server listining
 */
const start = async () => {
  try {
    await app.listen(PORT)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start();
