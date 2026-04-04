export class TestClass {
	private name: string;
	private type: string;

	constructor(name: string, type: string = 'standard') {
		this.name = name;
		this.type = type;
		console.log(`TestClass instantiated: ${this.name} (${this.type})`);
		console.log('this was added dynamically'); // DFLINE::ex001before
		console.log('this was added dynamically'); // DFLINE::ex001before
		// DFMARKER::constructor
		console.log('this was added dynamically'); // DFLINE:ex001after
	}

	// DFMARKER::NEW_METHOD_AREA

	private getStatusCode(): string {
		switch (this.type) {
			case 'standard':
				return 'STAT_OK';
			case 'experimental':
				return 'STAT_BETA';
			case 'legacy':
				return 'STAT_DEPRECATED';
			default:
				return 'STAT_UNKNOWN';
		}
	}

	public getName(): string {
		return this.name;
	}
}
