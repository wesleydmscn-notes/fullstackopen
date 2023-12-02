describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    const user = {
      name: "Wesley Damasceno",
      username: "wesleydmscn",
      password: "12345",
    }

    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:5173")
  })

  it("Login form is shown", function () {
    cy.contains("log in to application")
    cy.contains("username")
    cy.contains("password")

    cy.get("#username")
    cy.get("#password")
    cy.get("#btn-login")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in to application")
      cy.get("#username").type("wesleydmscn")
      cy.get("#password").type("12345")
      cy.get("#btn-login").click()

      cy.contains("blogs")
      cy.contains("Wesley Damasceno logged in")
      cy.contains("logout")
      cy.contains("new blog")
    })

    it("fails with wrong credentials", function () {
      cy.contains("log in to application")
      cy.get("#username").type("wesleydmscn")
      cy.get("#password").type("1234")
      cy.get("#btn-login").click()

      cy.get(".error").should("contain", "Wrong username or password")
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)")
    })
  })
})
