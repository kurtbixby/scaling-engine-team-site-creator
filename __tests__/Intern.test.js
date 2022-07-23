const fs = require('fs/promises');
const Employee = require('../lib/Employee');

const Intern = require('../lib/Intern');

jest.mock('fs/promises');

describe('Intern', () => {
    describe('constructor', () => {
        it('should throw an error', () => {
            expect(() => new Intern()).toThrow('missing Intern constructor parameter');
        });

        it('should construct successfully', () => {
            const [ name, id, email, school ] = [ 'Sam', 4, 'sam@job.com', 'UT' ];
            const employee = new Intern(name, id, email, school);

            expect(employee.name).toEqual(name);
            expect(employee.id).toEqual(id);
            expect(employee.email).toEqual(email);
            expect(employee.school).toEqual(school);
            expect(employee.role).toEqual('Intern');
        })
    });

    describe('getters', () => {
        const [ name, id, email, school ] = [ 'Sam', 4, 'sam@job.com', 'UT' ];
        const employee = new Intern(name, id, email, school);

        it('getName()', () => {
            expect(employee.getName()).toEqual(name);
        });

        it('getId()', () => {
            expect(employee.getId()).toEqual(id);
        });

        it('getEmail()', () => {
            expect(employee.getEmail()).toEqual(email);
        });

        it('getSchool()', () => {
            expect(employee.getSchool()).toEqual(school);
        });

        it('getRole()', () => {
            expect(employee.getRole()).toEqual('Intern');
        });
    });

    describe('createHtmlCard', () => {
        it('should fill in the template fields', async () => {
            const sam = new Intern('Sam', 4, 'sam@job.com', 'UT');
            const mock = jest.spyOn(Employee, '_generateHtml');

            fs.readFile = jest.fn().mockResolvedValue('Name:${values.name} Role:${values.role} Id:${values.id} Email:${values.email}');
            const filledTemplate = await sam.createHtmlCard();

            expect(mock).toBeCalledWith('../src/internTemplate.html', { name: 'Sam', role:'Intern', id:4, email:'sam@job.com', school:'UT'});
        });
    })
});