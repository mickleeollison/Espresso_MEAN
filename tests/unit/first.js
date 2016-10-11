var expect    = require("chai").expect;
var test    = require("chai").test;


describe('my first suite', function(){
	beforeEach(function(){
		console.log('setup');
	});
	
	afterEach(function(){
		console.log('teardown');
	});
	
	before(function(){
		console.log('First');
	});
	
	it('should be my firsttest', function(){
		expect(1).to.equal(1);
		console.log('test');
	});
	
	describe('inner suite', function(){
		it('should be my second test', function(){
			expect(2).to.equal(2);
			console.log('test 2');
		});
	});
});
