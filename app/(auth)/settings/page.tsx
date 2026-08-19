import { AppearanceSettings } from "@/components/appearance-settings";

export default async function Settings() {
  return (
    <div className="p-6">
      <section>
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className="text-muted-foreground text-sm">
          Customize how the app looks on your device.
        </p>
        <div className="mt-4">
          <AppearanceSettings />
        </div>
      </section>
    </div>
  );
}
