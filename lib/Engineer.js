const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        this.role = 'Engineer';
    }

    getGithub() {
        return this.github;
    }

    createHtmlCard() {
        let values = { name: this.name, role: this.role, id: this.id, email: this.email, github: this.github };
        return Employee._generateHtml('../src/engineerTemplate.html', values);
    }
}

module.exports = Engineer;