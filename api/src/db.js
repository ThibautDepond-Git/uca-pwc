import mongoose from 'mongoose';

export async function connect() {
	const dsn = process.env.DB_DSN || 'mongodb://127.0.0.1/project',
		user = process.env.DB_USER || 'root',
		password = process.env.DB_PASS || 'example';
	await mongoose.connect(
		dsn,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
			useCreateIndex: true,
			auth: {user, password},
			authMechanism: 'SCRAM-SHA-256',
		}
	);
}

export const PatientCount = mongoose.model('PatientCount', new mongoose.Schema({
	day: Date,
	name: String,
	number: Number,
	count: Number,
}));

export async function new_cases() {
	return PatientCount.aggregate([
		{$group: {_id: '$day', total: {$sum: '$count'}}},
		{$sort: {_id: 1}},
	]);
}

export async function stats() {
	const cases = await new_cases();
	return {
		'total-cases': (await PatientCount.aggregate([
			{$group: {_id: '$total', total: {$sum: '$count'}}},
		]))[0],
		'worst-day': (await PatientCount.aggregate([
			{$group: {_id: '$day', total: {$sum: '$count'}}},
			{$sort: {total: -1}},
			{$limit: 1},
		]))[0],
		'worst-region': (await PatientCount.aggregate([
			{$group: {_id: '$name', total: {$sum: '$count'}}},
			{$sort: {total: -1}},
			{$limit: 1},
		]))[0],
		'new-cases': cases,
		'period': [cases[0]._id, cases[cases.length - 1]._id],
	};
}
