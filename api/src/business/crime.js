import axios from 'axios';
import { Crime } from '../model';

let count = 0;

const getUrl = (x1, y1, x2, y2) => {
	return `https://data.police.uk/api/crimes-street/all-crime?poly=${y1},${x1}:${y1},${x2}:${y2},${x2}:${y2},${x1}`;
};

export const getCrimes = async (x1, y1, x2, y2) => {
	let obj = {};
	try {
		count++;
		if (count < 10) {
			const { data } = await axios.get(getUrl(x1, y1, x2, y2));
			count--;
			obj = {
				data,
				len: data.length,
			};
		} else {
			throw { response: { status: 429 } };
		}
	} catch (e) {
		count--;
		if (e.response.status === 429) {
			obj = await new Promise(async resolve => {
				setTimeout(async () => {
					const obj = await getCrimes(x1, y1, x2, y2);
					resolve(obj);
				}, 500);
			});
		}
		if (e.response.status === 503) {
			const obj1 = await getCrimes(x1, y1, (x1 + x2) / 2, y2);
			const obj2 = await getCrimes((x1 + x2) / 2, y1, x2, y2);
			obj = {
				data: [...obj1.data, ...obj2.data],
				len: obj1.len + obj2.len,
			};
		}
	}
	return obj;
};

export const getCrimesLen = async id => {
	const crime = await Crime.findOne({ id });
	if (crime === null) {
		const { data, len } = await getCrimes(x, y, x + 0.1, y - 0.1);
		new Crime({ id, data, len }).save();
		return len;
	}
	return crime.len;
};

export const getCrimesData = async ({ topY, botY, leftX, rightX }) => {
	const data = [];

	const y1 = Math.floor(topY * 10 + 1) / 10;
	const y2 = Math.floor(botY * 10) / 10;
	const x1 = Math.floor(leftX * 10) / 10;
	const x2 = Math.ceil(rightX * 10) / 10;

	for (let i = x1; i < x2; i += 0.1) {
		let j = y1;
		for (j; j > y2; j -= 0.1) {
			const x = i.toFixed(1);
			const y = j.toFixed(1);
			const id = x + '' + y;
			const crime = await Crime.findOne({ id });
			if (crime === null) {
				const obj = await getCrimes(x, y, +x + 0.1, +y - 0.1);
				new Crime({ id, data: obj.data, len: obj.len }).save();
				data.push(...obj.data);
			} else {
				data.push(...crime.data);
			}
		}
	}
	return data.filter(item => {
		const x = item.location.longitude;
		const y = item.location.latitude;

		return x > leftX && x < rightX && y < topY && y > botY;
	});
};
