import axios from 'axios';

async function mongodbRetrieve() {
    const response = await axios.get('http://localhost:5000/mongodb-players/retrieve');
    console.log(response);
}

export default mongodbRetrieve;