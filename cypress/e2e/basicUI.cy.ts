describe("profile page basic UI", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should have visible navigation buttons", () => {
    cy.get('a.btn[href="/generator/new"]')
      .should("be.visible")
      .and("contain", "New Job Post");
    cy.get('a.btn[href="/records"]')
      .should("be.visible")
      .and("contain", "View Records");
  });

  it("should display candidate profile", () => {
    cy.get(".card-img").should("be.visible");
    cy.get(".card-title").should("be.visible");
    cy.get(".card-subtitle").should("be.visible");
    cy.get(".card-text").should("be.visible");
  });

  it("should have a contact info section", () => {
    cy.get(".card-header")
      .contains("Contact Info")
      .should("be.visible")
      .click();
    cy.get(".list-group.list-group-flush").should("be.visible");
  });

  it("should have sections for Education, Work Experience, Projects, and Skills", () => {
    cy.get(".card-header").contains("Education").should("be.visible");
    cy.get(".card-header").contains("Work Experience").should("be.visible");
    cy.get(".card-header").contains("Projects").should("be.visible");
    cy.get(".card-header").contains("Skills").should("be.visible");
  });

  it("should have buttons to add new items to sections", () => {
    cy.get(".btn-light").should("have.length", 4).and("be.visible");
    cy.get(".bi.bi-plus").should("have.length", 4).and("be.visible");
  });
});

describe("generator page basic UI", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/generator/new");
  });

  it("should display configuration for AI", () => {
    cy.get('div:contains("Configure AI")').should("be.visible");
    cy.get('input[placeholder="Enter OpenAI Key"]').should("be.visible");
  });

  it("should have visible navigation buttons", () => {
    cy.get('a.btn:contains("View Profile")').should("be.visible");
    cy.get('a.btn:contains("View Records")').should("be.visible");
  });

  it("should display input for job post with editing toolbar", () => {
    cy.get('div:contains("Input Job Post")').should("be.visible");
    cy.get('button:contains("Resume")')
      .should("be.visible")
      .click({ multiple: true });

    cy.get('button[title="Bold"]').should("be.visible");
    cy.get('button[title="Italic"]').should("be.visible");
  });

  it("should display sections for Resume and Cover Letter with editing capabilities", () => {
    cy.get('div:contains("Resume")').should("be.visible");
    cy.get('div:contains("Cover Letter")').should("be.visible");

    cy.get('button:contains("Edit")')
      .should("have.length", 2)
      .and("be.visible");
  });

  it("should have a button to create resume & cover letter", () => {
    cy.get('button:contains("Create Resume & Cover Letter")').should(
      "be.visible"
    );
  });
});
