console.log('test map')

class TestSchema {
	public idCode: string = '';
	public message: string = '';

	constructor(idCode: string) {
		this.idCode = idCode;
		this.message = `TestSchema constructor: ${idCode}`;
	}
}

const map = new Map<string, TestSchema>();
map.set('key1', new TestSchema('key1'));
map.set('key2', new TestSchema('key2'));
map.set('key3', new TestSchema('key3'));

console.log(map);

map.forEach((value, key) => {
	console.log(key, '->', value.message);
});

