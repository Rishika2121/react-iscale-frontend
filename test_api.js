fetch('https://iscale-backend.onrender.com/api/news&updates/public-all-news&updates?page=1&limit=1000')
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d, null, 2)))
  .catch(console.error);
