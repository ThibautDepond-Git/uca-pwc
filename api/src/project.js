#!/usr/bin/env node
import {ArgumentParser} from "argparse";

import {importer, purger} from './importer.js';
import {main as server} from './server.js';

(async () => {
	const parser = new ArgumentParser({
		description: 'Covid-related stuff',
		add_help: true,
	})
	const commands = parser.add_mutually_exclusive_group({required: true});
	commands.add_argument('--import');
	commands.add_argument('--purge', {action: 'store_true'});
	commands.add_argument('--serve', {action: 'store_true'});
	const args = parser.parse_args();

	if (args.import) {
		await importer(args.import);
		process.exit(0);
	} else if (args.serve) {
		await server();
	} else if (args.purge) {
		await purger();
		process.exit(0);
	}
})().catch(console.error);
