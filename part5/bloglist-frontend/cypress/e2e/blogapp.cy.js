describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    const user1 = {
      name: "Wesley Damasceno",
      username: "wesleydmscn",
      password: "12345",
    }

    const user2 = {
      name: "George Hotz",
      username: "geohot",
      password: "12345",
    }

    cy.request("POST", "http://localhost:3003/api/users/", user1)
    cy.request("POST", "http://localhost:3003/api/users/", user2)

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

      cy.get(".change").should(
        "contain",
        "A new blog Criando blog com Cypress by Cypress added"
      )
      cy.get(".change").should("have.css", "color", "rgb(0, 128, 0)")

      cy.contains("Criando blog com Cypress - Cypress")
      cy.contains("view")
    })

    it("Users can like a blog", function () {
      cy.contains("blogs")
      cy.contains("new blog").click()
      cy.contains("cancel")

      cy.contains("create new blog")
      cy.get("#input-title").type("Criando blog com Cypress")
      cy.get("#input-author").type("Cypress")
      cy.get("#input-url").type("https://wesleydmscn.co/blog")
      cy.get("#input-likes").type("10")

      cy.get("#create-new-blog").click()

      cy.contains("Criando blog com Cypress - Cypress")
      cy.contains("view").click()

      cy.contains("likes: 10")
      cy.get("#like-a-blog").click()
      cy.contains("likes: 11")
    })

    it("User who created a blog can delete it", function () {
      cy.contains("blogs")
      cy.contains("new blog").click()
      cy.contains("cancel")

      cy.contains("create new blog")
      cy.get("#input-title").type("Criando blog com Cypress")
      cy.get("#input-author").type("Wesley Damasceno")
      cy.get("#input-url").type("https://wesleydmscn.co/")
      cy.get("#input-likes").type("20")

      cy.get("#create-new-blog").click()

      cy.contains("Criando blog com Cypress - Wesley Damasceno")
      cy.contains("view").click()

      cy.get("#delete-a-blog").click()
    })

    it("Only the creator can see the delete button of a blog", function () {
      cy.contains("blogs")
      cy.contains("new blog").click()
      cy.contains("cancel")

      cy.contains("create new blog")
      cy.get("#input-title").type("Um blog qualquer")
      cy.get("#input-author").type("Wesley Damasceno")
      cy.get("#input-url").type("https://wesleydmscn.co/")
      cy.get("#input-likes").type("32")

      cy.get("#create-new-blog").click()
      cy.contains("Um blog qualquer - Wesley Damasceno")

      cy.contains("logout").click()

      cy.contains("log in to application")
      cy.get("#username").type("geohot")
      cy.get("#password").type("12345")
      cy.get("#btn-login").click()

      cy.contains("Um blog qualquer - Wesley Damasceno")
      cy.contains("view").click()

      cy.get("#delete-a-blog").should("not.exist")
    })

    it("The blogs are ordered according to likes with the blog with the most likes being first", function () {
      cy.contains("blogs")
      cy.contains("new blog").click()
      cy.contains("cancel")

      cy.contains("create new blog")
      cy.get("#input-title").type("Criando blog com Cypress")
      cy.get("#input-author").type("Wesley Damasceno")
      cy.get("#input-url").type("https://wesleydmscn.co/")
      cy.get("#input-likes").type("20")

      cy.get("#create-new-blog").click()

      cy.get(".change").should(
        "contain",
        "A new blog Criando blog com Cypress by Wesley Damasceno added"
      )
      cy.get(".change").should("have.css", "color", "rgb(0, 128, 0)")

      cy.get("#input-title").type("Criando blog com Cypress 2")
      cy.get("#input-author").type("Wesley Damasceno")
      cy.get("#input-url").type("https://wesleydmscn.co/")
      cy.get("#input-likes").type("30")

      cy.get("#create-new-blog").click()

      cy.get(".blog-post")
        .eq(0)
        .should("contain", "Criando blog com Cypress 2 - Wesley Damasceno")

      cy.get(".blog-post")
        .eq(1)
        .should("contain", "Criando blog com Cypress - Wesley Damasceno")
    })
  })
})
