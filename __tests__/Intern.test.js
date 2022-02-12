const Intern = require('../lib/Intern');

test('creates an intern object', () => {
    const employee = new Intern('Courtney O','35','employee@test.com','University of Michigan');
    
    expect(employee.name).toBe('Courtney O');
    expect(employee.id).toBe('35');
    expect(employee.email).toBe('employee@test.com');
    expect(employee.school).toBe('University of Michigan');
  });

  test("gets employee's school", () => {
    const employee = new Intern('Courtney O','35','employee@test.com','University of Michigan');

    expect(employee.getSchool()).toEqual(expect.stringContaining(employee.school));
  });

  test("gets employee role", () => {
    const employee = new Intern('Courtney O','35','employee@test.com','University of Michigan');

    expect(employee.getRole()).toEqual(expect.stringContaining('Intern'));
  });

  module.exports = Intern;