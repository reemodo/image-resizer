import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // simple log
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
