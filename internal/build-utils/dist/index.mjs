import { resolve } from 'path';

const projRoot = resolve(__dirname, "..", "..", "..");
const pkgRoot = resolve(projRoot, "packages");
const compRoot = resolve(pkgRoot, "components");
const themeRoot = resolve(pkgRoot, "theme-chalk");
const hookRoot = resolve(pkgRoot, "hooks");
const localeRoot = resolve(pkgRoot, "locale");
const directiveRoot = resolve(pkgRoot, "directives");
const epRoot = resolve(pkgRoot, "element-plus");
const utilRoot = resolve(pkgRoot, "utils");
const buildRoot = resolve(projRoot, "internal", "build");
const docsDirName = "docs";
const docRoot = resolve(projRoot, docsDirName);
const vpRoot = resolve(docRoot, ".vitepress");
const buildOutput = resolve(projRoot, "dist");
const epOutput = resolve(buildOutput, "element-plus");
const projPackage = resolve(projRoot, "package.json");
const compPackage = resolve(compRoot, "package.json");
const themePackage = resolve(themeRoot, "package.json");
const hookPackage = resolve(hookRoot, "package.json");
const localePackage = resolve(localeRoot, "package.json");
const directivePackage = resolve(directiveRoot, "package.json");
const epPackage = resolve(epRoot, "package.json");
const utilPackage = resolve(utilRoot, "package.json");
const docPackage = resolve(docRoot, "package.json");

export { buildOutput, buildRoot, compPackage, compRoot, directivePackage, directiveRoot, docPackage, docRoot, docsDirName, epOutput, epPackage, epRoot, hookPackage, hookRoot, localePackage, localeRoot, pkgRoot, projPackage, projRoot, themePackage, themeRoot, utilPackage, utilRoot, vpRoot };
