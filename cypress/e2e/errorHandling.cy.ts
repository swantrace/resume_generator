describe("Error Handling Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/generator/new");
  });

  it("should alert when OpenAI Key is not filled", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get('button:contains("Create Resume & Cover Letter")')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Please input an OpenAI key");
      });
  });
});
