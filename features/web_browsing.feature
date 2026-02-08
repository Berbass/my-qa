@ui-only
Feature: Web Browsing

  Scenario: User browses the web
    Given Alex browses to "Playwright" at "https://playwright.dev/"
    When Alex clicks on "Docs"
    Then Alex should see the Playwright installation page
