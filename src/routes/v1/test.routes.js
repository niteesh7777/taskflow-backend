import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('test working fine bro');
  console.log("reached test route")
});

export default router;
