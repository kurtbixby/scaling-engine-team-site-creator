const fs = require('fs/promises');
const Employee = require('../lib/Employee');

const Engineer = require('../lib/Engineer');

jest.mock('fs/promises');

describe('Engineer', () => {
    describe('constructor', () => {
        it('should throw an error', () => {
            expect(() => new Engineer()).toThrow('missing Engineer constructor parameter');
        });

        it('should construct successfully', () => {
            const [ name, id, email, github ] = [ 'Sam', 4, 'sam@job.com', 'samiam' ];
            const employee = new Engineer(name, id, email, github);

            expect(employee.name).toEqual(name);
            expect(employee.id).toEqual(id);
            expect(employee.email).toEqual(email);
            expect(employee.github).toEqual(github);
            expect(employee.role).toEqual('Engineer');
        })
    });

    describe('getters', () => {
        const [ name, id, email, github ] = [ 'Sam', 4, 'sam@job.com', 'samiam' ];
        const employee = new Engineer(name, id, email, github);

        it('getName()', () => {
            expect(employee.getName()).toEqual(name);
        });

        it('getId()', () => {
            expect(employee.getId()).toEqual(id);
        });

        it('getEmail()', () => {
            expect(employee.getEmail()).toEqual(email);
        });

        it('getGithub()', () => {
            expect(employee.getGithub()).toEqual(github);
        });

        it('getRole()', () => {
            expect(employee.getRole()).toEqual('Engineer');
        });
    });

    describe('createHtmlCard', () => {
        it('should fill in the template fields', async () => {
            const sam = new Engineer('Sam', 4, 'sam@job.com', 'samiam');
            const mock = jest.spyOn(Employee, '_generateHtml');

            fs.readFile = jest.fn().mockResolvedValue('Name:${values.name} Role:${values.role} Id:${values.id} Email:${values.email}');
            const filledTemplate = await sam.createHtmlCard();

            expect(mock).toBeCalledWith('../src/engineerTemplate.html', { name: 'Sam', role:'Engineer', id:4, email:'sam@job.com', github:'samiam'});
        });
    })
});