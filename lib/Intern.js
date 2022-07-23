const Employee = require('./Employee');

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.role = 'Intern';
    }

    getSchool() {
        return this.school;
    }

    createHtmlCard() {
        let values = { name: this.name, role: this.role, id: this.id, email: this.email, school: this.school };
        return Employee._generateHtml('../src/internTemplate.html', values);
    }
}

module.exports = Intern;