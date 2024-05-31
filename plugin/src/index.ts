import { ConfigPlugin, withPlugins, IOSConfig } from "@expo/config-plugins";

import { withConfig } from "./withConfig";
import { withAppClipEntitlements } from "./withAppClipEntitlements";
import { withPodfile } from "./withPodfile";
import { withAppClipPlist } from "./withAppClipPlist";
import { withXcode } from "./withXcode";

const withAppClip: ConfigPlugin<{
  name: string;
  groupIdentifier?: string;
  deploymentTarget?: string;
  requestEphemeralUserNotification?: boolean;
  requestLocationConfirmation?: boolean;
  appleSignin?: boolean;
  excludedPackages: string[];
  expoRuntimeVersion?: string;
}> = (
  config,
  {
    name = "Clip",
    groupIdentifier,
    deploymentTarget = "14.0",
    requestEphemeralUserNotification,
    requestLocationConfirmation,
    appleSignin = false,
    excludedPackages,
    expoRuntimeVersion,
  }
) => {
  const bundleIdentifier = `${config.ios?.bundleIdentifier}.Clip`;
  const targetName = `${IOSConfig.XcodeUtils.sanitizedName(config.name)}Clip`;

  config = withPlugins(config, [
    [
      withConfig,
      {
        bundleIdentifier,
        targetName,
        groupIdentifier,
        appleSignin,
      },
    ],
    [withAppClipEntitlements, { targetName, groupIdentifier, appleSignin }],
    [withPodfile, { targetName, excludedPackages }],
    [
      withAppClipPlist,
      {
        targetName,
        deploymentTarget,
        requestEphemeralUserNotification,
        requestLocationConfirmation,
        expoRuntimeVersion
      },
    ],
    [
      withXcode,
      {
        name,
        targetName,
        bundleIdentifier,
        deploymentTarget,
      },
    ],
  ]);

  return config;
};

export default withAppClip;
