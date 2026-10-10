import "dotenv/config";
import pool from "./db.js";
import { normalizeDocument } from "./normalize.js";

async function saveNormalizedDocument(normalized) {
  const query = `INSERT INTO documents (source, source_id, url, score, title, body, author, created_at, metadata)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (source, source_id)
      DO UPDATE SET
      metadata = EXCLUDED.metadata,
      score = EXCLUDED.score,
      updated_at = now()
      `;

  const {
    source,
    source_id,
    url,
    score,
    title,
    body,
    author,
    created_at,
    metadata,
  } = normalized;

  const values = [
    source,
    source_id,
    url,
    score,
    title,
    body,
    author,
    created_at,
    metadata,
  ];

  await pool.query(query, values);
}

async function normalizationPipeline() {
  const result = await pool.query("SELECT * FROM raw_documents");
  for (let i = 0; i < result.rows.length; i++) {
    const row = result.rows[i];
    const normalized = await normalizeDocument(row);

    if (normalized === null) {
      console.log(`Skipping document due to normalization failure.`);
      continue;
    }
    await saveNormalizedDocument(normalized);
  }
}

normalizationPipeline();
