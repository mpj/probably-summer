
import {csvFormat, tsvParse} from "d3-dsv";
import {utcParse} from "d3-time-format";
/* 
call this a
curl --request GET \
	--url 'https://meteostat.p.rapidapi.com/stations/daily' \
	--header 'x-rapidapi-host: meteostat.p.rapidapi.com' \
	--header 'x-rapidapi-key: 3ed4058c79msh5b4bdbc6c42d271p150f31jsn32b9eb6981fb'
*/

import dotenv from 'dotenv';
dotenv.config();



let rapidAPIKey = process.env.RAPIDAPI_KEY;
if (!rapidAPIKey) {
	throw new Error('RAPIDAPI_KEY is not set');
}

const url = 'https://meteostat.p.rapidapi.com/point/daily?lat=59.3293&lon=18.0686&start=2018-01-01&end=2020-01-31&model=true';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': rapidAPIKey,
		'x-rapidapi-host': 'meteostat.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	let parsed = JSON.parse(result);
	let simplified = parsed.data.map(d => ({
		date: d.date,
		tavg: d.tavg,
		tmin: d.tmin,
		tmax: d.tmax
	}))
	process.stdout.write(JSON.stringify(simplified, null,2));
} catch (error) {
	console.error(error);
}

