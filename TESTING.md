# 🧪 Testing Guide

## Quick Test Checklist

### ✅ Backend Tests

1. **Health Check**
```bash
curl http://localhost:3001/api/health
```
Expected: `{"status":"running","timestamp":"...","documentsIndexed":0}`

2. **Index Documents**
```bash
curl -X POST http://localhost:3001/api/index
```
Expected: `{"success":true,"message":"Indexed X documents","count":X}`

3. **Search Test**
```bash
curl "http://localhost:3001/api/search?q=marketing"
```
Expected: JSON with results array

4. **Stats Check**
```bash
curl http://localhost:3001/api/stats
```
Expected: `{"totalDocuments":X,"categories":[...],"teams":[...],"projects":[...]}`

### ✅ Frontend Tests

1. **Open App**: http://localhost:5173
2. **Check Status**: Should show "✅ Connected"
3. **Index**: Click "🚀 Index Documents"
4. **Search**: Try these queries:
   - "sales presentation"
   - "marketing campaign"
   - "brand guidelines"
   - "product roadmap"
   - "email templates"

### ✅ AI Features Test

Test semantic search (finds by meaning, not exact words):

| Search Query | Should Find |
|--------------|-------------|
| "sales deck" | sales-deck.md |
| "Q4 plans" | sample-campaign.md |
| "company colors" | brand-guidelines.md |
| "future features" | product-roadmap.txt |
| "email marketing" | email-templates.html |
| "social media" | social-media-strategy.json |

### ✅ File Format Tests

Create test files in `documents/` folder:

**test.txt**
```
This is a plain text test document.
Team: Testing
Category: Test Files
```

**test.md**
```markdown
# Test Markdown
This tests markdown parsing.
```

**test.html**
```html
<h1>HTML Test</h1>
<p>Testing HTML parsing</p>
```

**test.json**
```json
{
  "title": "JSON Test",
  "content": "Testing JSON parsing"
}
```

For PDF/DOCX: Create sample files with any content and place in `documents/`

## Manual Testing Scenarios

### Scenario 1: New Document Added
1. Add a new file to `documents/`
2. Click 🔄 to re-index
3. Search for content from new file
4. Verify it appears in results

### Scenario 2: Large Document
1. Create a file with 10,000+ words
2. Index it
3. Search for specific terms
4. Verify preview is truncated properly

### Scenario 3: Multiple File Types
1. Add .txt, .md, .pdf, .docx files
2. Index all
3. Search across all types
4. Verify all formats work

### Scenario 4: Empty Search
1. Leave search box empty
2. Click Search
3. Should show message: "Please provide a search query"

### Scenario 5: No Results
1. Search for "xyzabc123"
2. Should show: "No results found"

## Performance Tests

### Indexing Speed
```bash
# Time the indexing
time curl -X POST http://localhost:3001/api/index
```

Expected: ~2-5 seconds per document (depends on Gemini API)

### Search Speed
```bash
# Time a search
time curl "http://localhost:3001/api/search?q=test"
```

Expected: <1 second for in-memory search

### Memory Usage
```bash
# Check backend memory
ps aux | grep bun
```

Expected: ~100-200MB for 10-20 documents

## Automated Testing (Future)

### Unit Tests Example

```typescript
// packages/backend/src/services/__tests__/indexer.test.ts
import { describe, test, expect } from 'bun:test';
import { cosineSimilarity } from '../indexer';

describe('Indexer', () => {
  test('cosine similarity calculation', () => {
    const a = [1, 0, 0];
    const b = [1, 0, 0];
    expect(cosineSimilarity(a, b)).toBe(1);
  });
  
  test('different vectors', () => {
    const a = [1, 0, 0];
    const b = [0, 1, 0];
    expect(cosineSimilarity(a, b)).toBe(0);
  });
});
```

### Integration Tests Example

```typescript
// packages/backend/src/__tests__/api.test.ts
import { describe, test, expect } from 'bun:test';

describe('API Endpoints', () => {
  test('health check', async () => {
    const res = await fetch('http://localhost:3001/api/health');
    const data = await res.json();
    expect(data.status).toBe('running');
  });
  
  test('search endpoint', async () => {
    const res = await fetch('http://localhost:3001/api/search?q=test');
    const data = await res.json();
    expect(data).toHaveProperty('results');
    expect(Array.isArray(data.results)).toBe(true);
  });
});
```

## Troubleshooting Tests

### Issue: "Backend not running"
**Solution**: Start backend with `bun run dev:backend`

### Issue: "No documents indexed"
**Solution**: Click "Index Documents" button or run `curl -X POST http://localhost:3001/api/index`

### Issue: "Search returns empty"
**Solution**: 
1. Check if documents are indexed
2. Verify Gemini API key is set
3. Check backend console for errors

### Issue: "PDF/DOCX not working"
**Solution**:
1. Verify `pdf-parse` and `mammoth` are installed
2. Check file is not corrupted
3. Look at backend logs for parsing errors

## CI/CD Testing (Future)

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test
```

## Load Testing

```bash
# Install Apache Bench
# Test search endpoint
ab -n 100 -c 10 "http://localhost:3001/api/search?q=test"
```

Expected: Handle 100 requests with <1s average response time

## Security Testing

- [ ] Test with malicious file names
- [ ] Test with very large files (>100MB)
- [ ] Test with special characters in search
- [ ] Test API without authentication (if added)
- [ ] Test CORS settings

## Success Criteria

✅ All endpoints respond correctly
✅ Documents index successfully
✅ Search returns relevant results
✅ All file formats parse correctly
✅ UI is responsive and functional
✅ No console errors
✅ Performance is acceptable
