import app from './app';
import { env } from './shared/infra/configs/envs';

app.listen(env.PORT, () => {
  console.log(`server running at: http://localhost:${env.PORT}/`);
});
