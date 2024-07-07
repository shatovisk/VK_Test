import { test, expect } from '@playwright/test';
import { IssuePage } from '../pageObjects/IssuePage';
import { allure } from 'allure-playwright';

test.describe('GitHub Issue Tests', () => {
  test.beforeEach(async ({ page }) => {
    allure.epic('GitHub Issues Management');
    allure.feature('Issue Creation');
    allure.story('Creating a new GitHub issue');
  });

  test('Create GitHub Issue', async ({ page }) => {
    const issuePage = new IssuePage(page);

    // Переход и авторизация на странице
    await issuePage.goto();

    // Создание issue
    await issuePage.createIssue('Test Issue', 'This is a test issue');

    // Проверка создания issue
    const issueTitle = await issuePage.getIssueTitle();
    expect(issueTitle).toBe('Test Issue');
  });
});
