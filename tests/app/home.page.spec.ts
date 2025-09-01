import test, { expect } from '@playwright/test'

test.describe('home page', () => {
  test('go to request user activation page', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Click me' }).dblclick()

    await expect(page.getByText('You clicked 2 times')).toBeVisible()
  })
})
