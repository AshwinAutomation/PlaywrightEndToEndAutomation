export default class TestData {
  static makeAppointmentTestData() {
    return [
      { testId: "TC101", facility: "Tokyo CURA Healthcare Center", hcp: "Medicare", visitDt: "05/10/2025" },
      { testId: "TC102", facility: "Hongkong CURA Healthcare Center", hcp: "Medicaid", visitDt: "05/10/2027" },
      { testId: "TC103", facility: "Seoul CURA Healthcare Center", hcp: "None", visitDt: "15/12/2029" },
    ];
  }

  static apiEmployeesTestData() {
    return [
      { name: "morpheusee111444", salary: "123455", age: "23" },
    ];
  }
}
