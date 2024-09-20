import {
  CreateNodesContextV2,
  CreateNodesV2,
  TargetConfiguration,
  createNodesFromFiles,
} from '@nx/devkit';
import { readdirSync } from 'fs';
import { dirname, join } from 'path';

export interface SolhintPluginOptions {
  lintTargetName?: string;
}

const solhintConfigGlob = '**/.solhint.json';

export const createNodesV2: CreateNodesV2<SolhintPluginOptions> = [
  solhintConfigGlob,
  async (configFiles, options, context) => {
    return await createNodesFromFiles(
      (configFile, options, context) =>
        createNodesInternal(configFile, options, context),
      configFiles,
      options,
      context
    );
  },
];

async function createNodesInternal(
  configFilePath: string,
  options: SolhintPluginOptions,
  context: CreateNodesContextV2
) {
  const projectRoot = dirname(configFilePath);

  const siblingFiles = readdirSync(join(context.workspaceRoot, projectRoot));
  if (
    !siblingFiles.includes('package.json') &&
    !siblingFiles.includes('project.json')
  ) {
    return {};
  }

  const lintTarget: TargetConfiguration = {
    command: `solhint src/**/*.sol`,
    options: {
      cwd: projectRoot,
    },
  };

  return {
    projects: {
      [projectRoot]: {
        targets: {
          [options.lintTargetName]: lintTarget,
        },
      },
    },
  };
}
