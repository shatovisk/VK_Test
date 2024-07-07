import { test, expect } from '@playwright/test';
import { IssuePage } from '../pageObjects/IssuePage';
import { allure } from 'allure-playwright';

test.describe('GitHub Issue Tests', () => {
  test.beforeEach(async ({ page }) => {
    allure.epic('GitHub Issues Management');
    allure.feature('Issue Updating');
    allure.story('Updating existing GitHub issue');
  });

  test('Update GitHub Issue Description', async ({ page }) => {
    const issuePage = new IssuePage(page);

    // Переход и авторизация на странице
    await issuePage.goto();

    // Открытие существующего issue
    await issuePage.openIssue();

    // Обновление описания issue
    const newDescription = 'This is an updated description for the issue';
    await issuePage.updateDescription(newDescription);

    // Проверка обновления описания issue
    const updatedDescription = await issuePage.getDescription();
    expect(updatedDescription).toBe(newDescription);
  });
});
