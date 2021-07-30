export default () => ({
  name: process.env.NAME || 'gameserver',
  port: Number(process.env.PORT) || 6666,
  slots: Number(process.env.SLOTS) || 2,
});
