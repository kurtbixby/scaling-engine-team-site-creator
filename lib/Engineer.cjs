const Employee = require('./Employee.cjs');

class Engineer extends Employee {
    constructor({name, id, email, github} = {}) {
        if (!(name && id && email && github)) {
            throw new Error('missing Engineer constructor parameter');
        }
        super({name, id, email});
        this.github = github;
        this.role = 'Engineer';
    }
    
    getRole() {
        return this.role;
    }

    getGithub() {
        return this.github;
    }

    createHtmlCard() {
        let values = { name: this.name, role: this.role, id: this.id, email: this.email, github: this.github };
        return Employee._generateHtml('./src/engineerTemplate.html', values);
    }
}

module.exports = Engineer;