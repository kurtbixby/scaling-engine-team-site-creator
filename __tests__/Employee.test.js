const fs = require('fs/promises');

const Employee = require('../lib/Employee');

jest.mock('fs/promises');

describe('Employee', () => {
    describe('constructor', () => {
        it('should throw an error', () => {
            expect(() => new Employee()).toThrow('missing Employee constructor parameter');
        });

        it('should construct successfully', () => {
            const [ name, id, email ] = [ 'Sam', 4, 'sam@job.com' ];
            const employee = new Employee(name, id, email);

            expect(employee.name).toEqual(name);
            expect(employee.id).toEqual(id);
            expect(employee.email).toEqual(email);
            expect(employee.role).toEqual('Employee');
        })
    });

    describe('getters', () => {
        const [ name, id, email ] = [ 'Sam', 4, 'sam@job.com' ];
        const employee = new Employee(name, id, email);

        it('getName()', () => {
            expect(employee.getName()).toEqual(name);
        });

        it('getId()', () => {
            expect(employee.getId()).toEqual(id);
        });

        it('getEmail()', () => {
            expect(employee.getEmail()).toEqual(email);
        });

        it('getRole()', () => {
            expect(employee.getRole()).toEqual('Employee');
        });
    });

    describe('generateHtml', () => {
        it('should fill in the template fields', async () => {
            const testValues = {name:'Sam', role:'Employee'};
            fs.readFile = jest.fn().mockResolvedValue('Name:${values.name} Role:${values.role}');

            const filledTemplate = await Employee._generateHtml('../src/employeeTemplate.html', testValues);

            expect(filledTemplate).toEqual('Name:Sam Role:Employee')
        });
    });

    describe('createHtmlCard', () => {
        it('should fill in the template fields', async () => {
            const sam = new Employee('Sam', 4, 'sam@job.com');
            const mock = jest.spyOn(Employee, '_generateHtml');

            fs.readFile = jest.fn().mockResolvedValue('Name:${values.name} Role:${values.role} Id:${values.id} Email:${values.email}');
            const filledTemplate = await sam.createHtmlCard();

            expect(mock).toBeCalledWith('../src/employeeTemplate.html', { name: 'Sam', role:'Employee', id:4, email:'sam@job.com'});
        });
    })
});