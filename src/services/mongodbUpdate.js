import axios from 'axios';

async function mongodbUpdate(activeButtonIds, playerType) {
    const requestObj = {
        'buttons': activeButtonIds,
        'playerType': playerType
    }
    const response = await axios.post('http://localhost:5000/mongodb-players/update', requestObj);
    return response;
}

export default mongodbUpdate;