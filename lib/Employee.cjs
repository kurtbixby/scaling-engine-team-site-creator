const fs = require('fs/promises');

// Base class that represents an employee
// Has static method to fill in a template
// Has a method to create an HTML card of itself
class Employee {
    constructor({name, id, email} = {}) {
        if (!(name && id && email)) {
            throw new Error('missing Employee constructor parameter');
        }
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = 'Employee';
    }

    // Takes in a file name to open and an object of values to fill in the template
    // Uses eval to replace the fields with values from the values object
    static async _generateHtml(fileName, values) {
        let template = await fs.readFile(fileName);
        return eval('`'+template+'`');
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }
    
    getEmail() {
        return this.email;
    }
    
    getRole() {
        return this.role;
    }

    // Creates a values object with the correct values to fill in
    // Passes values object & the template file into generateHtml
    // Returns the content of the filled in template
    async createHtmlCard() {
        let values = { name:this.name, role:this.role, id:this.id, email:this.email };
        return await Employee._generateHtml('./src/employeeTemplate.html', values);
    }
}

module.exports = Employee;