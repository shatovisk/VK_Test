import { Page } from '@playwright/test';
import dotenv from 'dotenv';

// Загружаем переменные окружения из файла .env
dotenv.config();

const { YOUR_USERNAME, YOUR_PASSWORD, YOUR_REPO, ISSUE_NUMBER } = process.env;

if (!YOUR_USERNAME || !YOUR_PASSWORD || !YOUR_REPO) {
  throw new Error("Необходимо задать все переменные окружения: YOUR_USERNAME, YOUR_PASSWORD, YOUR_REPO");
}

export class IssuePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://github.com/login');
    await this.page.fill('input[name="login"]', YOUR_USERNAME!);
    await this.page.fill('input[name="password"]', YOUR_PASSWORD!);
    await this.page.click('input[name="commit"]');
    await this.page.goto(`https://github.com/${YOUR_USERNAME}/${YOUR_REPO}/issues`);
  }

  async createIssue(title: string, body: string) {
    await this.page.click(`a[href="/${YOUR_USERNAME}/${YOUR_REPO}/issues/new/choose"]`);
    await this.page.fill('input[name="issue[title]"]', title);
    await this.page.fill('textarea[name="issue[body]"]', body);
    await this.page.click('summary[data-menu-trigger="labels-select-menu"]')
    await this.page.click('div[data-name="7086394766"]')
    await this.page.click('summary[data-menu-trigger="labels-select-menu"]')
    await this.page.click('button[name="issue[user_assignee_ids][]"]')
    await this.page.click('button[class="btn-primary btn ml-2"]');
  }

  async getIssueTitle() {
    return this.page.textContent('bdi.js-issue-title');
  }

  async openIssue() {
    if (!ISSUE_NUMBER){
        throw new Error("Необходимо задать переменную окружения ISSUE_NUMBER");
    }
    await this.page.click(`a[href="/${YOUR_USERNAME}/${YOUR_REPO}/issues/${ISSUE_NUMBER}"]`);
  }

  async updateDescription(newDescription: string) {
    await this.page.click('svg[aria-label="Show options"]')
    await this.page.click('button[aria-label="Edit comment"]'); 
    await this.page.fill('textarea[name="issue[body]"]', newDescription);
    await this.page.click('button[class="Button--primary Button--medium Button"]'); 
    await this.page.waitForLoadState('networkidle');
  }

  async getDescription() {
    await this.page.waitForSelector('td.comment-body p', { state: 'visible' });
    return await this.page.textContent('td.comment-body p'); 
  }

  async getIssueById() {
    return this.page.isVisible(`a[id="issue_${ISSUE_NUMBER}_link"]`)
  }

  async deleteIssue() {
    await this.page.click('svg[class="octicon octicon-trash"]')
    await this.page.click('button[data-disable-with="Deleting issue…"]')
    await this.page.waitForLoadState('networkidle');
  }
}