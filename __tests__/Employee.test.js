const Employee = require('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('Courtney O','35','employee@test.com');
    
    expect(employee.name).toBe('Courtney O');
    expect(employee.id).toBe('35');
    expect(employee.email).toBe('employee@test.com');
  });

  test("gets employee's name", () => {
    const employee = new Employee('Courtney O','35','employee@test.com');

    expect(employee.getName()).toEqual(expect.stringContaining(employee.name));
  });

  test("gets employee's id", () => {
    const employee = new Employee('Courtney O','35','employee@test.com');

    expect(employee.getId()).toEqual(expect.stringContaining(employee.id))
  });

  test("gets employee email", () => {
    const employee = new Employee('Courtney O','35','employee@test.com');

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email));
  });

  test("gets employee role", () => {
    const employee = new Employee('Courtney O','35','employee@test.com');

    expect(employee.getRole()).toEqual(expect.stringContaining('Employee'));
  });

  module.exports = Employee;