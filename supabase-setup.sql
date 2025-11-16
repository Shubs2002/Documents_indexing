-- Enable pgvector extension
create extension if not exists vector;

-- Create documents table
create table documents (
  id text primary key,
  filename text not null,
  path text not null,
  content text,
  embedding vector(768),
  category text,
  project text,
  team text,
  tags text[],
  size bigint,
  modified_at timestamptz,
  created_at timestamptz default now()
);

-- Create index for vector similarity search (using HNSW for better performance)
create index on documents using hnsw (embedding vector_cosine_ops);

-- Create function for vector similarity search
create or replace function match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id text,
  filename text,
  path text,
  content text,
  embedding vector(768),
  category text,
  project text,
  team text,
  tags text[],
  size bigint,
  modified_at timestamptz,
  created_at timestamptz,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.filename,
    documents.path,
    documents.content,
    documents.embedding,
    documents.category,
    documents.project,
    documents.team,
    documents.tags,
    documents.size,
    documents.modified_at,
    documents.created_at,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;

-- Create indexes for faster queries
create index idx_documents_category on documents(category);
create index idx_documents_team on documents(team);
create index idx_documents_project on documents(project);
create index idx_documents_created_at on documents(created_at desc);

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant all on documents to anon, authenticated;
