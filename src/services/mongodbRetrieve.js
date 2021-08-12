import axios from 'axios';

async function mongodbRetrieve(playerType, names) {
    const requestObj = {
        'playerType': playerType,
        'names': names
    }
    const response = await axios.post('http://localhost:5000/mongodb-players/retrieve', requestObj );
    return response;
}

export default mongodbRetrieve;