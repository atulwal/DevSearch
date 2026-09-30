import pool from "./db.js";
import sanitizeHtml from "sanitize-html";

import he from "he";

async function normalizeDocument(rawRow) {
  const rawBody = rawRow.raw_data.body;

  const noTags = sanitizeHtml(rawBody, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const clean = he.decode(noTags);

  const tokens = clean.split(/\s+/);

  if (tokens.length < 20) {
    return null;
  }
  return {
    source: "stackoverflow",
    source_id: rawRow.raw_data.question_id.toString(),
    url: rawRow.raw_data.link,
    score: rawRow.raw_data.score,
    title: he.decode(rawRow.raw_data.title), 
    body: clean,
    author: rawRow.raw_data.owner?.display_name ?? null,
    created_at: new Date(rawRow.raw_data.creation_date * 1000), 
    metadata: {
      tags: rawRow.raw_data.tags,
      view_count: rawRow.raw_data.view_count,
      answer_count: rawRow.raw_data.answer_count,
      is_answered: rawRow.raw_data.is_answered,
    },
  };
}
