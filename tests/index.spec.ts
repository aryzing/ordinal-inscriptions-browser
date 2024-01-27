import { expect, test } from "@playwright/test";

test("page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Technical Assessment/);
});

test("search results are shown", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Owner Bitcoin Address:").click();
  await page
    .getByLabel("Owner Bitcoin Address:")
    .fill("bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs");
  await page.getByRole("button", { name: "Look up" }).click();
  await expect(
    page.getByRole("link", { name: "Inscription c0aa7e97" }),
  ).toBeVisible();
});

test("can navigate to inscription details page", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Owner Bitcoin Address:").click();
  await page
    .getByLabel("Owner Bitcoin Address:")
    .fill("bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs");
  await page.getByRole("button", { name: "Look up" }).click();
  await page.getByRole("link", { name: "Inscription c0aa7e97" }).click();
  await expect(page.getByText("Details")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Inscription 57079435" }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "c0aa7e9748e5d0c580f8000336b017f06bffc85579e19f3498f409fec6b5043ci1",
    ),
  ).toBeVisible();
});

test("can navigate back to search results", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Owner Bitcoin Address:").click();
  await page
    .getByLabel("Owner Bitcoin Address:")
    .fill("bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs");
  await page.getByRole("button", { name: "Look up" }).click();
  await page.getByRole("link", { name: "Inscription c0aa7e97" }).click();
  await expect(page.getByText("Details")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Inscription 57079435" }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "c0aa7e9748e5d0c580f8000336b017f06bffc85579e19f3498f409fec6b5043ci1",
    ),
  ).toBeVisible();
  await page.getByRole("banner").getByRole("button").click();
  await expect(page.getByText("Ordinal Inscription Lookup")).toBeVisible();
});

test.describe("handling different content types", () => {
  test("image", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Owner Bitcoin Address:").click();
    await page
      .getByLabel("Owner Bitcoin Address:")
      .fill("bc1q8kk3zp8n7vwxlna99eza4gkqcqcp06rdpkwkg2");
    await page.getByRole("button", { name: "Look up" }).click();
    await page.getByRole("link", { name: "Inscription b92bd576" }).click();
    await expect(page.locator("img")).toBeVisible();
  });

  test("text", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Owner Bitcoin Address:").click();
    await page
      .getByLabel("Owner Bitcoin Address:")
      .fill("bc1pjjhguef6zvz7cusz8gsztlzyqsy8rrm9xm3eh6w95mh66m53nvkqyp4e9a");
    await page.getByRole("button", { name: "Look up" }).click();
    await page.getByRole("link", { name: "Inscription d9740c06" }).click();
    await expect(page.locator("pre")).toContainText(
      "RSIC: A PEER-TO-PEER RUNE ALLOCATION SYSTEM",
    );
  });
});
