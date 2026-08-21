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

const CONTRIBUTION_WINDOW_DAYS = 120;

// TODO: persist daily counts to the DB and read from there instead of
// recomputing from the GitHub API on every request.
export async function getContributionCounts(login: string) {
  const octokit = await getInstallationOctokit();
  const repos = await octokit.paginate(
    octokit.apps.listReposAccessibleToInstallation,
  );

  const since = new Date();
  since.setDate(since.getDate() - CONTRIBUTION_WINDOW_DAYS);

  const counts: Record<string, number> = {};

  function addContribution(date: string) {
    const day = date.slice(0, 10);
    counts[day] = (counts[day] ?? 0) + 1;
  }

  await Promise.all(
    repos.map(async (repo) => {
      const [commits, pulls] = await Promise.all([
        octokit
          .paginate(octokit.repos.listCommits, {
            owner: repo.owner.login,
            repo: repo.name,
            author: login,
            since: since.toISOString(),
          })
          .catch(() => []),
        octokit
          .paginate(octokit.pulls.list, {
            owner: repo.owner.login,
            repo: repo.name,
            state: "all",
          })
          .catch(() => []),
      ]);

      for (const commit of commits) {
        const date = commit.commit.author?.date;
        if (date) addContribution(date);
      }

      for (const pr of pulls) {
        if (pr.user?.login !== login) continue;
        if (new Date(pr.created_at) < since) continue;
        addContribution(pr.created_at);
      }
    }),
  );

  return counts;
}
