import fastify from 'fastify';
import {connect, stats} from "./db.js";
import fastify_cors from 'fastify-cors';

const server = fastify();

server.register(fastify_cors, {origin: '*'});

server.get('/api/summary', stats);

export async function main() {
	await connect();

	const address = await server.listen(Number(process.env.PORT || '8080'));
	console.log(`server started at ${address}`);
}
