import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

// Use a child so config modules see an isolated HOME before they are imported.
test("Pi 1.1 initializes the bridge and creates/restores sessions with one ModelRuntime", () => {
  const home = mkdtempSync(join(tmpdir(), "feishu-sdk-"));
  const agentDir = join(home, ".pi", "agent");
  mkdirSync(agentDir, { recursive: true });
  writeFileSync(join(agentDir, "settings.json"), JSON.stringify({
    extensions: [], packages: [], defaultTools: [],
    skills: [], prompts: [], themes: [],
  }));
  try {
    const result = spawnSync(process.execPath, [
      "--experimental-transform-types", "--import", "./test/register.mjs",
      "--input-type=module", "-e", `
        import assert from "node:assert/strict";
        import * as sdk from "@earendil-works/pi-coding-agent";
        import { ConversationManager } from "./.pi/extensions/feishu/conversation-manager.ts";
        globalThis.fetch = () => { throw new Error("Unexpected network request"); };
        assert.equal(sdk.AuthStorage, undefined);
        const manager = await ConversationManager.create(process.env.HOME);
        assert.ok(manager.getAvailableModels() instanceof Array);
        await manager.getSelectedModel("p2p:test");
        const session = await manager.getSession("p2p:test");
        assert.ok(session.modelRuntime instanceof sdk.ModelRuntime);
        assert.equal(session.modelRuntime, manager.modelRuntime);
        assert.equal(await manager.getSession("p2p:test"), session);
        session.sessionManager.appendMessage({ role: "user", content: "offline test", timestamp: Date.now() });
        const sessionFile = session.sessionFile;
        session.dispose();
        const restoredManager = await ConversationManager.create(process.env.HOME);
        const restored = await restoredManager.getSession("p2p:test");
        assert.equal(restored.sessionFile, sessionFile);
        assert.ok(restored.messages.some(m => m.role === "user" && m.content === "offline test"));
        assert.equal(restored.modelRuntime, restoredManager.modelRuntime);
        restored.dispose();
      `,
    ], {
      cwd: process.cwd(),
      env: { PATH: process.env.PATH, HOME: home, PI_CODING_AGENT_DIR: agentDir },
      encoding: "utf8",
      timeout: 30_000,
    });
    assert.equal(result.error, undefined, result.error?.message);
    assert.equal(result.status, 0, result.stderr || result.stdout);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});
