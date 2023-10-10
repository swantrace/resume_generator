describe("Navigation Tests", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("navigates to the records page", function () {
    cy.get('a.btn[href="/records"]').click();
    cy.url().should("include", "/records");
  });

  it("navigates to the records page", function () {
    cy.get('a.btn[href="/records"]').click();
    cy.url().should("include", "/records");
  });

  it("navigate to generator page", () => {
    cy.get("a.btn[href='/generator/new']").click();
    cy.url().should("include", "/generator/new");
  });
});
