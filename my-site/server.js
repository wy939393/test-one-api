require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/api/todos', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*').order('id');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/todos', async (req, res) => {
  const { data, error } = await supabase
    .from('todos').insert({ title: req.body.title }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log('运行在端口', port));