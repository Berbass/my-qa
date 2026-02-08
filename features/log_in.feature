@ui-skip
Feature: Login Feature

  Scenario: Successful login
    Given Ben has valid login credentials
    When Ben enters valid login credentials
    Then Ben should be logged in successfully
