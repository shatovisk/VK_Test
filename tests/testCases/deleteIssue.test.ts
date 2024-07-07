import { test, expect } from '@playwright/test';
import { IssuePage } from '../pageObjects/IssuePage';
import { allure } from 'allure-playwright';

test.describe('GitHub Issue Tests', () => {
  test.beforeEach(async ({ page }) => {
    allure.epic('GitHub Issues Management');
    allure.feature('Delete Issue');
    allure.story('Deleting existing GitHub issue');
  });

  test('Check GitHub Issue', async ({ page }) => {
    const issuePage = new IssuePage(page);

    // Переход и авторизация на странице
    await issuePage.goto();

    // Открытие существующего issue
    await issuePage.openIssue();

    // Удалить существующую issue
    await issuePage.deleteIssue();

    // Проверка создания issue
    const issueTitle = await issuePage.getIssueById();
    expect(issueTitle).toBe(false);
  });

});