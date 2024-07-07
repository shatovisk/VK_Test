import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    reporter: [
        ['list'],
        ['allure-playwright']
    ],
    use: {
        headless: false,
    },
    testDir: 'tests/testCases',
};

export default config;
