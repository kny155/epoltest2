import { getCrimesLen, getCrimesData } from '../business/crime';

const crimeConroller = {
	readLen: async ctx => {
		const { x, y } = ctx.request.body;
		const id = x.toFixed(1) + '' + y.toFixed(1);
		const len = await getCrimesLen(id, x, y);
		ctx.body = {
			pos: [x, y],
			id,
			len,
		};
	},
	read: async ctx => {
		ctx.body = await getCrimesData(ctx.request.body);
	},
};

export default crimeConroller;
