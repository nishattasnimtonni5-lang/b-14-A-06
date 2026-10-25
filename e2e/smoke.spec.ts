import { expect, test } from "@playwright/test";

test("browse the library, open a lift, add it to today's plan", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("FitLog — Workout Library");

  // The library renders all 12 lifts fetched from the remote API.
  await expect(page.locator('a[href^="/apps/"]')).toHaveCount(12);

  // next/image must actually serve the remote workout photos — this is what
  // guards the tightened images.remotePatterns in next.config.ts.
  const cardImage = page.locator('img[alt="workoutImg"]').first();
  await expect(cardImage).toBeVisible();
  await expect
    .poll(() => cardImage.evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0);

  await page.locator('a[href="/apps/1"]').click();
  await expect(page).toHaveURL(/\/apps\/1$/);
  await expect(page).toHaveTitle("Barbell Bench Press — FitLog");

  await page.getByRole("button", { name: /add to today's plan/i }).click();
  await expect(
    page.getByText("Barbell Bench Press added to today's plan.")
  ).toBeVisible();

  // Plan state must survive navigation AND a full reload (localStorage).
  await page.goto("/apps");
  await expect(
    page.getByRole("heading", { name: "Barbell Bench Press" })
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Barbell Bench Press" })
  ).toBeVisible();
});

test("deep-links to the saved tab", async ({ page }) => {
  await page.goto("/apps?tab=saved");
  await expect(page.getByText("No saved plan")).toBeVisible();
});
