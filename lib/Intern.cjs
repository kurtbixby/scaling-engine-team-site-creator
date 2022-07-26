const Employee = require('./Employee.cjs');

// Child class of Employee with slightly different data
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

    // Override of the base createHtmlCard
    // Creates a different values object and uses a different template file
    createHtmlCard() {
        let values = { name: this.name, role: this.role, id: this.id, email: this.email, school: this.school };
        return Employee._generateHtml('./src/internTemplate.html', values);
    }
}

module.exports = Intern;