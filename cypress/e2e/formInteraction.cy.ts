describe("Form Interaction Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should add information to the profile", () => {
    cy.get("img.card-img").should("be.visible").click();

    cy.get('input[placeholder="Candidate Name"]').type("John Doe");

    cy.get('input[placeholder="Candidate Title"]').type("Software Engineer");

    cy.get('input[placeholder="candidate@host.com"]').type(
      "john.doe@example.com"
    );

    cy.get('button:contains("Save")').click();

    cy.get(".card-title").should("contain", "John Doe");
    cy.get(".card-subtitle").should("contain", "Software Engineer");
    cy.get(".card-text").should("contain", "john.doe@example.com");

    it("the info should be saved to IndexedDB", () => {
      // @ts-ignore
      cy.checkProfileDB("keyvaluepairs", (data) => {
        const addedProfile = data.find(
          (profile) => profile.email === "john.doe@example.com"
        );
        expect(addedProfile).to.exist;
        expect(addedProfile.name).to.equal("John Doe");
        expect(addedProfile.title).to.equal("Software Engineer");
      });
    });
  });
});
