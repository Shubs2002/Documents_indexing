// Test script for external path indexing
// Usage: node test-external-index.js "C:\path\to\folder"

const path = process.argv[2];

if (!path) {
  console.log('Usage: node test-external-index.js "C:\\path\\to\\folder"');
  console.log('Example: node test-external-index.js "C:\\Users\\Documents"');
  process.exit(1);
}

console.log(`Testing external path indexing for: ${path}`);

fetch('http://localhost:3001/api/index-path', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ path })
})
  .then(res => res.json())
  .then(data => {
    console.log('\n✅ Response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log(`\n🎉 Successfully indexed ${data.count || 1} document(s)!`);
    } else {
      console.log(`\n❌ Indexing failed: ${data.message}`);
    }
  })
  .catch(error => {
    console.error('\n❌ Error:', error.message);
    console.log('\nMake sure the backend is running on http://localhost:3001');
  });
