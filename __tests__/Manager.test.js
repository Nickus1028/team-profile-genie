const Manager = require('../lib/Manager');

test('creates an manager object', () => {
    const employee = new Manager('Courtney O','35','employee@test.com','Office 03B12');
    
    expect(employee.name).toBe('Courtney O');
    expect(employee.id).toBe('35');
    expect(employee.email).toBe('employee@test.com');
    expect(employee.officenumber).toBe('Office 03B12');
  });

  test("gets employee's office number", () => {
    const employee = new Manager('Courtney O','35','employee@test.com','Office 03B12');

    expect(employee.getofficeNumber()).toEqual(expect.stringContaining(employee.officenumber));
  });

  test("gets employee role", () => {
    const employee = new Manager('Courtney O','35','employee@test.com','Office 03B12');

    expect(employee.getRole()).toEqual(expect.stringContaining('Manager'));
  });

  module.exports = Manager;