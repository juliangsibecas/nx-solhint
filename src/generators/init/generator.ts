import {
  addDependenciesToPackageJson,
  formatFiles,
  readNxJson,
  removeDependenciesFromPackageJson,
  Tree,
  updateNxJson,
} from '@nx/devkit';

import { nxSolhintVersion, solhintVersion } from '../../utils';

import { InitGeneratorSchema } from './schema';

const updateDependencies = (tree: Tree, options: InitGeneratorSchema) => {
  removeDependenciesFromPackageJson(tree, ['nx-solhint'], []);

  return addDependenciesToPackageJson(
    tree,
    {},
    {
      'nx-solhint': nxSolhintVersion,
      solhint: solhintVersion,
    },
    undefined,
    options.keepExistingVersions
  );
};

const setupTargets = (tree: Tree) => {
  const nxJson = readNxJson(tree) || {};

  const hasPlugin = nxJson.plugins?.some((p) =>
    typeof p === 'string' ? p === 'nx-solhint' : p.plugin === 'nx-solhint'
  );

  if (!hasPlugin) {
    if (!nxJson.plugins) {
      nxJson.plugins = [];
    }

    nxJson.plugins = [
      ...nxJson.plugins,
      {
        plugin: 'nx-solhint',
        options: {
          lintTargetName: 'lint',
        },
      },
    ];
  }

  updateNxJson(tree, nxJson);
};

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  setupTargets(tree);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return !options.skipPackageJson
    ? updateDependencies(tree, options)
    : () => null;
}

export default initGenerator;
