fetch('https://iscale-backend.onrender.com/api/news&updates/public-single-news&updates/69f8429ff5e00f4f5c8beba7')
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d, null, 2)))
  .catch(console.error);
