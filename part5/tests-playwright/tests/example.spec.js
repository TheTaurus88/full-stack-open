const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Marco',
        username: 'testUser',
        password: 'testPwd'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox', { name: 'username' }).fill('testUser');
      await page.getByRole('textbox', { name: 'password' }).fill('testPwd');
      await page.getByRole('button', { name: 'login' }).click()
      const welcomeMessage = page.getByRole('heading', { name: 'Welcome Marco' })
      await expect(welcomeMessage).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox', { name: 'username' }).fill('1');
      await page.getByRole('textbox', { name: 'password' }).fill('2');
      await page.getByRole('button', { name: 'login' }).click()
      const welcomeMessage = page.getByRole('heading', { name: 'Welcome Marco' })
      await expect(welcomeMessage).not.toBeVisible();
    })
  })
})