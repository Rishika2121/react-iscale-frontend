fetch('https://iscale-backend.onrender.com/api/enrolled-courses/premium-courses', {
  headers: { 'Authorization': 'Bearer fake_token' }
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
