import configOptions from './common/config';
import app from './app';

const PORT = configOptions.PORT as string;
const start = async () => {
  try {
    await app.listen(PORT)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start();
