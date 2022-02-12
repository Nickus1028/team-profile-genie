const Engineer = require('../lib/Engineer');

test('creates an engineer object', () => {
    const employee = new Engineer('Courtney O','35','employee@test.com','nickus1028');
    
    expect(employee.name).toBe('Courtney O');
    expect(employee.id).toBe('35');
    expect(employee.email).toBe('employee@test.com');
    expect(employee.github).toBe('nickus1028');
  });

  test("gets employee's Github", () => {
    const employee = new Engineer('Courtney O','35','employee@test.com', 'nickus1028');

    expect(employee.getGithub()).toEqual(expect.stringContaining(employee.github));
  });

  test("gets employee role", () => {
    const employee = new Engineer('Courtney O','35','employee@test.com', 'nickus1028');

    expect(employee.getRole()).toEqual(expect.stringContaining('Engineer'));
  });

  module.exports = Engineer;