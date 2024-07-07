import { test, expect } from '@playwright/test';
import { IssuePage } from '../pageObjects/IssuePage';
import { allure } from 'allure-playwright';

test.describe('GitHub Issue Tests', () => {
  test.beforeEach(async ({ page }) => {
    allure.epic('GitHub Issues Management');
    allure.feature('Issue Check');
    allure.story('Issue is exist');
  });

  test('Check GitHub Issue', async ({ page }) => {
    const issuePage = new IssuePage(page);

    // Переход и авторизация на странице
    await issuePage.goto();


    // Проверка создания issue
    const issueTitle = await issuePage.getIssueById();
    expect(issueTitle).toBe(true);
  });

});