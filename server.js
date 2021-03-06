const express = require('express');
// const { static } = express;
const path = require('path');

const app = express();
app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/users', async(req, res, next)=> {
    try {
      res.status(201).send(await User.create(req.body));
    }
    catch(ex){
      next(ex);
    }
  });

app.delete('/api/users/:id', async(req, res, next)=> {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  }  
    catch(ex){
      next(ex);
    }
  });

  app.put('/api/users/:id', async(req, res, next)=> {
    try {
      const user = await User.findByPk(req.params.id);
      res.send( await user.update(req.body));
    }
    catch(ex){
      console.log('put error');
      next(ex);
    }
  }); 

  app.use((err, req, res, next)=> {
    res.status(500).send({ error: err });
  })

const init = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/acme_db');

const User = conn.define('user', {
  name: {
    type: STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  } 
});
const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  await Promise.all([
    User.create({ name: 'moe' }),
    User.create({ name: 'larry' }),
    User.create({ name: 'lucy' })
  ]);
};

init();