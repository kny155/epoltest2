import axios from 'axios';
import getCrimes from '../business/getCrimes';

const crimeConroller = {
	readLen: async ctx => {
		const { x, y } = ctx.request.body;
		const { len, data } = await getCrimes(x, y, x + 0.1, y - 0.1);
		ctx.body = await {
			pos: [x, y],
			id: x.toFixed(1) + '' + y.toFixed(1),
			len,
		};
	},
	read: async ctx => {
		const { topY, botY, leftX, rightX } = ctx.request.body;
		//const {data} = await axios.get(`https://data.police.uk/api/crimes-street/all-crime?poly=${topY},${leftX}:${topY},${rightX}:${botY},${rightX}:${botY},${leftX}&date=2019-03`);
		const { data } = await getCrimes(leftX, topY, rightX, botY);
		ctx.body = data;
	},
};

export default crimeConroller;
