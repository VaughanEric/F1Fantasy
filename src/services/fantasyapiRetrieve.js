import axios from 'axios';

async function fantasyapiRetrieve() {
    const response = await axios.get('http://localhost:5000/fantasyapi-players/retrieve');
    return response.data;
}

export default fantasyapiRetrieve;