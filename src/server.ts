import conf from './common/config';
import app from './app';

const start = async () => {
  try {
    await app.listen(conf.PORT)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start();
