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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("log in to application")
      cy.get("#username").type("wesleydmscn")
      cy.get("#password").type("12345")
      cy.get("#btn-login").click()
    })

    it("A blog can be created", function () {
      cy.contains("blogs")
      cy.contains("new blog").click()
      cy.contains("cancel")

      cy.contains("create new blog")
      cy.get("#input-title").type("Criando blog com Cypress")
      cy.get("#input-author").type("Cypress")
      cy.get("#input-url").type("https://wesleydmscn.co/blog")
      cy.get("#input-likes").type("10")

      cy.get("#create-new-blog").click()

      cy.get(".change").should("contain", "A new blog Criando blog com Cypress by Cypress added")
      cy.get(".change").should("have.css", "color", "rgb(0, 128, 0)")

      cy.contains("Criando blog com Cypress - Cypress")
      cy.contains("view")
    })
  })
})
