import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface DocumentRecord {
  id: string;
  filename: string;
  path: string;
  content: string;
  embedding: number[];
  category?: string;
  project?: string;
  team?: string;
  tags?: string[];
  size: number;
  modified_at: string;
  created_at?: string;
}

// Initialize database tables
export async function initializeDatabase() {
  // Check if tables exist by trying to query
  const { error } = await supabase.from('documents').select('id').limit(1);
  
  if (error) {
    console.log('⚠️  Database tables not found. Please run the SQL setup script.');
    console.log('📝 See SUPABASE-SETUP.md for instructions');
    return false;
  }
  
  console.log('✅ Database connected successfully');
  return true;
}

// Store document in Supabase
export async function storeDocument(doc: DocumentRecord) {
  const { data, error } = await supabase
    .from('documents')
    .upsert({
      id: doc.id,
      filename: doc.filename,
      path: doc.path,
      content: doc.content,
      embedding: doc.embedding,
      category: doc.category,
      project: doc.project,
      team: doc.team,
      tags: doc.tags,
      size: doc.size,
      modified_at: doc.modified_at
    })
    .select()
    .single();

  if (error) {
    console.error('Error storing document:', error);
    throw error;
  }

  return data;
}

// Get all documents
export async function getAllDocuments(): Promise<DocumentRecord[]> {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching documents:', error);
    return [];
  }

  return data || [];
}

// Search documents by vector similarity
export async function searchDocumentsByVector(
  queryEmbedding: number[],
  limit = 10
): Promise<DocumentRecord[]> {
  // Use pgvector's cosine similarity with balanced threshold
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.4, // Balanced threshold for relevant results
    match_count: limit
  });

  if (error) {
    console.error('Error searching documents:', error);
    return [];
  }

  // Sort by similarity score (highest first)
  return (data || []).sort((a: any, b: any) => (b.similarity || 0) - (a.similarity || 0));
}

// Get document statistics
export async function getDocumentStats() {
  const { data: documents } = await supabase
    .from('documents')
    .select('category, team, project');

  if (!documents) {
    return {
      totalDocuments: 0,
      categories: [],
      teams: [],
      projects: []
    };
  }

  return {
    totalDocuments: documents.length,
    categories: [...new Set(documents.map(d => d.category).filter(Boolean))],
    teams: [...new Set(documents.map(d => d.team).filter(Boolean))],
    projects: [...new Set(documents.map(d => d.project).filter(Boolean))]
  };
}

// Delete all documents (for re-indexing)
export async function clearAllDocuments() {
  const { error } = await supabase
    .from('documents')
    .delete()
    .neq('id', ''); // Delete all

  if (error) {
    console.error('Error clearing documents:', error);
    throw error;
  }
}

// Delete a single document
export async function deleteDocument(id: string) {
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

// Check document count
export async function getDocumentCount(): Promise<number> {
  const { count, error } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error getting count:', error);
    return 0;
  }

  return count || 0;
}
