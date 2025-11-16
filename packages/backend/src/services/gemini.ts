import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
export const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });

// Generate embeddings for semantic search
export async function generateEmbedding(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

// Categorize document using AI
export async function categorizeDocument(content: string, filename: string) {
  const prompt = `Analyze this document and provide:
1. Main topic/category
2. Project name (if mentioned)
3. Team (marketing, sales, product, etc.)
4. 3-5 relevant tags

Document: ${filename}
Content: ${content.slice(0, 2000)}

Respond in JSON format:
{
  "category": "string",
  "project": "string or null",
  "team": "string",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  const result = await geminiModel.generateContent(prompt);
  const response = result.response.text();
  
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch {
    return null;
  }
}

// Smart search with context understanding
export async function enhanceSearchQuery(query: string): Promise<string[]> {
  const prompt = `Given this search query: "${query}"
Generate 3-5 related search terms or synonyms that would help find relevant marketing documents.
Return only the terms, one per line.`;

  const result = await geminiModel.generateContent(prompt);
  const response = result.response.text();
  return response.split('\n').filter(line => line.trim());
}
