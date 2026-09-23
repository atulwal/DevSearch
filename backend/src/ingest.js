import 'dotenv/config';          
import pool from './db.js';
import { fetchQuestionsPage } from './stackoverflow/fetchQuestions.js';

console.log('DATABASE_URL:', process.env.DATABASE_URL);


async function saveRawDocument(question){
    const query = `
    INSERT INTO raw_documents (source, source_id, raw_data)
    VALUES ($1, $2, $3)
    `;
    const values = ['stackoverflow', question.question_id.toString(), question];
    await pool.query(query, values);
}

async function runIngestion(){
    let page = 1;
    let hasMore = true;
    let quotaRemaining = 10000; 
    const quotaThreshold = 50;

    while(hasMore && quotaRemaining > quotaThreshold){
        const data = await fetchQuestionsPage(page);

        for (const question of data.items){
            await saveRawDocument(question);
        }

        hasMore = data.has_more;
        quotaRemaining = data.quota_remaining;
        console.log(`Page ${page} processed. Quota remaining: ${quotaRemaining}`);
        page++;
    }
}

runIngestion();