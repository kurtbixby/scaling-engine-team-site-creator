const fs = require('fs/promises');

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

    async createHtmlCard() {
        let values = { name:this.name, role:this.role, id:this.id, email:this.email };
        return await Employee._generateHtml('./src/employeeTemplate.html', values);
    }
}

module.exports = Employee;