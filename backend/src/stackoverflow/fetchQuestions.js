import axios from 'axios';
const key = process.env.API_KEY;

const fetchQuestionsPage = async (page, pagesize = 100) => {
    const response = await axios.get(`https://api.stackexchange.com/2.3/questions`, {
        params: {
            site: 'stackoverflow',
            tagged: 'redis',
            page: page,
            pagesize: pagesize,
            key,
            filter: 'withbody'
        }
    });
    return response.data;
}

export {fetchQuestionsPage};