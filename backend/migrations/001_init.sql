 
CREATE TABLE raw_documents (
  id SERIAL PRIMARY KEY,
  source TEXT NOT NULL,
  source_id TEXT NOT NULL,
  raw_data JSONB NOT NULL,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    source TEXT NOT NULL,
    source_id TEXT NOT NULL,
    url TEXT,
    score INTEGER,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    author TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    metadata JSONB,
    UNIQUE (source, source_id)
);
