import { App } from "@octokit/app";
import { Octokit } from "@octokit/rest";

let app: App<{ Octokit: typeof Octokit }> | undefined;

function getApp() {
  if (!app) {
    app = new App({
      appId: process.env.GITHUB_APP_ID!,
      privateKey: process.env.GITHUB_PRIVATE_KEY!,
      Octokit,
    });
  }

  return app;
}

export async function getInstallationOctokit() {
  const app = getApp();
  const { data: installations } = await app.octokit.apps.listInstallations();

  const installation = installations[0];

  if (!installation) {
    throw new Error(
      "No GitHub App installations found. Install the app on your account first.",
    );
  }

  return app.getInstallationOctokit(installation.id);
}
