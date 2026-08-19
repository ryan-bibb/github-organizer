import { AppearanceSettings } from "@/components/appearance-settings";

export default async function Settings() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <section>
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className="text-muted-foreground text-sm">
          Customize how the app looks on your device.
        </p>
        <div className="mt-4">
          <AppearanceSettings />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">GitHub connection</h2>
        <p className="text-muted-foreground text-sm">
          Manage the GitHub account linked to this app, review granted access,
          or disconnect it.
        </p>
        <div className="mt-4 text-muted-foreground text-sm italic">
          Coming soon.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Repo sync</h2>
        <p className="text-muted-foreground text-sm">
          Choose which organizations and repositories to sync, how often, and
          whether to include archived or forked repos.
        </p>
        <div className="mt-4 text-muted-foreground text-sm italic">
          Coming soon.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-muted-foreground text-sm">
          Control alerts for things like stale pull requests or newly assigned
          issues, and how they&apos;re delivered.
        </p>
        <div className="mt-4 text-muted-foreground text-sm italic">
          Coming soon.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Account</h2>
        <p className="text-muted-foreground text-sm">
          Update your profile details or delete your account.
        </p>
        <div className="mt-4 text-muted-foreground text-sm italic">
          Coming soon.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-destructive">Danger zone</h2>
        <p className="text-muted-foreground text-sm">
          Revoke GitHub access and clear all synced data from this app.
        </p>
        <div className="mt-4 text-muted-foreground text-sm italic">
          Coming soon.
        </div>
      </section>
    </div>
  );
}
