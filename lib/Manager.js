const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        if (!(name && id && email && officeNumber)) {
            throw new Error('missing Manager constructor parameter');
        }
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = 'Manager';
    }

    createHtmlCard() {
        let values = { name: this.name, role: this.role, id: this.id, email: this.email, office: this.officeNumber };
        return Employee._generateHtml('../src/managerTemplate.html', values);
    }
}

module.exports = Manager;