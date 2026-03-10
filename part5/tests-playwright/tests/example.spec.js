const { test, expect, beforeEach, describe } = require('@playwright/test')

async function login(page, user, pwd) {
  await page.getByRole('textbox', { name: 'username' }).fill(user || 'testUser')
  await page.getByRole('textbox', { name: 'password' }).fill(pwd || 'testPwd')
  await page.getByRole('button', { name: 'login' }).click()
}

async function createBlog(page) {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByLabel('title').fill('testtitle')
  await page.getByLabel('author').fill('testauthor')
  await page.getByLabel('url').fill('testurl')
  await page.getByRole('button', { name: 'create' }).click()
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Marco', username: 'testUser', password: 'testPwd'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Marco2', username: 'testUser2', password: 'testPwd2'
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
      await createBlog(page)
      await page.getByText('testtitle testauthor view').waitFor()
      await expect(page.getByText('testtitle testauthor view')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page)
      await page.getByRole('button', { name: 'view' }).click()
      const likes0 = page.getByText('likes 0')
      await expect(likes0).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      const likes1 = page.getByText('likes 1')
      await expect(likes1).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      await createBlog(page)
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('testtitle testauthor view')).not.toBeVisible()
    })
  })

  describe('Different user cannot delete', () => {
    beforeEach(async ({ page }) => {
      await login(page)
      await createBlog(page)
      await page.getByRole('button', { name: 'logout' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await login(page, 'testUser2', 'testPwd2')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
})
