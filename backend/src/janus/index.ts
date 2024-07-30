import { $ } from "bun";

export default async function startJanus(
  configDirPath: string,
  baseConfigPath: string,
) {
  const janusRoot = (await $`which janus`.text()).replace("/bin/janus", "");
  return Bun.spawn(
    [
      `${janusRoot}/bin/janus`,
      "-P",
      `${janusRoot}/lib/janus/plugins`,
      "-F",
      configDirPath,
      "-C",
      baseConfigPath,
    ],
    {
      cwd: "janus",
      stdout: "inherit",
    },
  );
}
