// using native fetch
const API_URL = 'https://iscale-backend.onrender.com';

async function testReset() {
  console.log("Testing reset password API...");
  const res = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        mobile: 9109635876, 
        otp: "123456", 
        newPassword: "123", 
        password: "123",
        confirmPassword: "123"
    })
  });
  console.log("Response:", res.status, await res.json());
}

testReset().catch(console.error);
