const Employee = require('./Employee.cjs');

// Child class of Employee with slightly different data
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

    // Override of the base createHtmlCard
    // Creates a different values object and uses a different template file
    createHtmlCard() {
        let values = { name: this.name, role: this.role, id: this.id, email: this.email, github: this.github };
        return Employee._generateHtml('./src/engineerTemplate.html', values);
    }
}

module.exports = Engineer;