import { Platform } from "react-native";
import ReactNativeAppClipModule from "./ReactNativeAppClipModule";

function isAndroid () { return Platform.OS === 'android' };

export function isClip(): boolean {
  if(isAndroid()) return false;

  const bundleIdentifier = ReactNativeAppClipModule.getBundleIdentifier() as
    | string
    | undefined;
  const isClip =
    bundleIdentifier?.slice(bundleIdentifier.lastIndexOf(".") + 1) === "Clip";
  return isClip;
}

export function getContainerURL(groupIdentifier: string): string | undefined {
  if(isAndroid()) return undefined;

  return ReactNativeAppClipModule.getContainerURL(groupIdentifier);
}

export function getBundleIdentifier(): string | undefined {
  if(isAndroid()) return undefined;

  return ReactNativeAppClipModule.getBundleIdentifier();
}

export function displayOverlay(): void {
  if(isAndroid()) return;

  return ReactNativeAppClipModule.displayOverlay();
}

export function setSharedCredential(
  groupIdentifier: string,
  credential: string
): void {
  if(isAndroid()) return;

  return ReactNativeAppClipModule.setSharedCredential(
    groupIdentifier,
    credential
  );
}

export function getSharedCredential(groupIdentifier: string): string | undefined {
  if(isAndroid()) return undefined;

  return ReactNativeAppClipModule.getSharedCredential(groupIdentifier);
}
