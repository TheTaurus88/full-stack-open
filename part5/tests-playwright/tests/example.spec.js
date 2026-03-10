const { test, expect, beforeEach, describe } = require('@playwright/test')

async function login(page, pwd) {
  await page.getByRole('textbox', { name: 'username' }).fill('testUser')
  await page.getByRole('textbox', { name: 'password' }).fill(pwd || 'testPwd')
  await page.getByRole('button', { name: 'login' }).click()
}

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
      await login(page)
      const welcomeMessage = page.getByRole('heading', { name: 'Welcome Marco' })
      await expect(welcomeMessage).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, "wrong")
      const wrongText = page.getByText('Login failed, wrong')
      await wrongText.waitFor()
      await expect(wrongText).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page)
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('testtitle')
      await page.getByLabel('author').fill('testauthor')
      await page.getByLabel('url').fill('testurl')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('testtitle testauthor view').waitFor()
      await expect(page.getByText('testtitle testauthor view')).toBeVisible()
    })
  })
})
