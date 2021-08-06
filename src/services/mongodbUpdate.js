import axios from 'axios';

async function mongodbUpdate(activeButtonIds) {
    const requestObj = {
        "buttons": activeButtonIds
    }
    const response = await axios.post('http://localhost:5000/mongodb-players/update', requestObj);
}

export default mongodbUpdate;