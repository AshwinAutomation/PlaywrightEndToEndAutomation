import { test, request, expect } from "@playwright/test";
import constant from "../../data/constants.json";
import TestData from "../../data/test-data";

test.describe("API Testing for Employee API", () => {
  let envConfig = undefined;
  test.beforeEach("get the env config ", async ({ request }, testInfo) => {
    envConfig = testInfo.project.use as any;
    const url = `${envConfig.apiBaseUrl}${constant.ENDPOINTS.getEmployees}`;
    console.log("FINAL URL:", url);
  });

  test("TC01: Verify that the API returns a list of employees", async ({ request }) => {
    const url = `${envConfig.apiBaseUrl}${constant.ENDPOINTS.getEmployees}`;
    console.log("FINAL URL:", url);
    // const response = await request.get(`${envConfig.apiBaseUrl}${constant.ENDPOINTS.getEmployees}`);
    // expect(response.status()).toBe(200);
    // const responseBody = await response.json();
    // expect(responseBody).toHaveProperty("data");
    // expect(Array.isArray(responseBody.data)).toBe(true);
    // console.log("List of Employees:", responseBody.data);
  });
  test("TC02: Verify that the API returns a specific employee by ID", async ({ request }) => {
    const employeeId = 2; // Example employee ID
    const response = await request.get(`https://dummy.restapiexample.com/api/v1/employee/${employeeId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("data");
    expect(responseBody.data).toHaveProperty("id", employeeId);
  });

  test("TC03: Verify that the API user creation", async ({ request }) => {
    console.log("API header:", process.env.API_HEADERS);
    const payload = TestData.apiEmployeesTestData()[0];

    const response = await request.post(`https://dummy.restapiexample.com/api/v1${constant.ENDPOINTS.createEmployee}`, {
      headers: { "Content-Type": process.env.API_HEADERS },
      data: payload,
    });
    let responseBody;

    try {
      responseBody = await response.json();
    } catch (error) {
      const text = await response.text();
      console.error("Response is not JSON:", text);
      throw error;
    }
  });
});
