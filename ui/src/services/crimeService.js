import axios from 'axios';

const getCrimesLen = async (x, y) => {
    const { data } = await axios.post('/crimeslen', { x, y });
    return data;
};

const getCrimes = async (topY, botY, leftX, rightX) => {
    const { data } = await axios.post('/crimes', { topY, botY, leftX, rightX });
    return data;
};

export const crimeService = {
    getCrimes,
    getCrimesLen,
};
