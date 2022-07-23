const Employee = require('./Employee.cjs');

class Intern extends Employee {
    constructor({name, id, email, school} = {}) {
        if (!(name && id && email && school)) {
            throw new Error('missing Intern constructor parameter');
        }
        super({name, id, email});
        this.school = school;
        this.role = 'Intern';
    }
    
    getRole() {
        return this.role;
    }

    getSchool() {
        return this.school;
    }

    createHtmlCard() {
        let values = { name: this.name, role: this.role, id: this.id, email: this.email, school: this.school };
        return Employee._generateHtml('./src/internTemplate.html', values);
    }
}

module.exports = Intern;