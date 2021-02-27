import parse from "csv-parse";
import {connect, PatientCount} from "./db.js";
import {createReadStream, existsSync} from "fs";
import iconv from "iconv-lite";

export async function process_dataset(stream) {
	const parser = stream.pipe(parse({
		delimiter: ';',
	}));

	let rows = [];
	const it = parser[Symbol.asyncIterator]();
	// Skipping first self-describing row
	await it.next();
	for await (const record of it) {
		const row = new PatientCount();

		row.day = new Date(record[0]);
		row.name = record[1];
		row.number = Number(record[2]);
		row.count = Number(record[3]);

		rows.push(row);
	}
	await PatientCount.insertMany(rows);
	console.log('done.');
}

export async function importer(file) {
	if (!existsSync(file)) {
		throw `path at ${file} isn't a readable file`;
	}

	await connect();

	await process_dataset(
		createReadStream(file)
			.pipe(iconv.decodeStream('ISO-8859-1'))
			.pipe(iconv.encodeStream('UTF-8')));
}

export async function purger() {
	await connect();

	await PatientCount.deleteMany();
}
