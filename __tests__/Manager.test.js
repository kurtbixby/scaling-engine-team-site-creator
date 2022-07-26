const fs = require('fs/promises');
const Employee = require('../lib/Employee');

const Manager = require('../lib/Manager');

jest.mock('fs/promises');

describe('Manager', () => {
    describe('constructor', () => {
        it('should throw an error', () => {
            expect(() => new Manager()).toThrow('missing Manager constructor parameter');
        });

        it('should construct successfully', () => {
            const [ name, id, email, officeNumber ] = [ 'Sam', 4, 'sam@job.com', 2 ];
            const employee = new Manager({name, id, email, officeNumber});

            expect(employee.name).toEqual(name);
            expect(employee.id).toEqual(id);
            expect(employee.email).toEqual(email);
            expect(employee.officeNumber).toEqual(officeNumber);
            expect(employee.role).toEqual('Manager');
        })
    });

    describe('getters', () => {
        const [ name, id, email, officeNumber ] = [ 'Sam', 4, 'sam@job.com', 2 ];
        const employee = new Manager({name, id, email, officeNumber});

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
            expect(employee.getRole()).toEqual('Manager');
        });
    });

    describe('createHtmlCard', () => {
        it('should fill in the template fields', async () => {
            const sam = new Manager({name: 'Sam', id: 4, email: 'sam@job.com', officeNumber: 2});
            const mock = jest.spyOn(Employee, '_generateHtml');

            fs.readFile = jest.fn().mockResolvedValue('Name:${values.name} Role:${values.role} Id:${values.id} Email:${values.email}');
            const filledTemplate = await sam.createHtmlCard();

            expect(mock).toBeCalledWith('./src/managerTemplate.html', { name: 'Sam', role:'Manager', id:4, email:'sam@job.com', office:2});
        });
    })
});