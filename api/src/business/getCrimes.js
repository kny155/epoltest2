import axios from 'axios';

let k = 0;

const getCrimes = async (x1, y1, x2, y2) => {
	let len = 0;
	let crimes = [];
	try {
		const { data } = await new Promise((resolve, reject) => {
			const id = setInterval(() => {
				if (k < 8) {
					clearInterval(id);
					k++;
					axios
						.get(
							`https://data.police.uk/api/crimes-street/all-crime?poly=${y1},${x1}:${y1},${x2}:${y2},${x2}:${y2},${x1}`,
						)
						.then(data => resolve(data))
						.catch(e => reject(e));
				}
			}, 0.5);
		});
		k--;
		len = data.length;
		crimes = data;
	} catch (e) {
		k--;
		const obj1 = await getCrimes(x1, y1, (x1 + x2) / 2, y2);
		const obj2 = await getCrimes((x1 + x2) / 2, y1, x2, y2);
		crimes = [...obj1.data, ...obj2.data];
		len = obj1.len + obj2.len;
	}
	return { data: crimes, len };
};

export default getCrimes;
