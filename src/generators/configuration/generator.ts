import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ConfigurationGeneratorSchema } from './schema';
import initGenerator from '../init/generator';

export async function configurationGenerator(
  tree: Tree,
  options: ConfigurationGeneratorSchema
) {
  await initGenerator(tree, options);
  const projectRoot = readProjectConfiguration(tree, options.project).root;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    config: options.config.toLowerCase(),
  });

  await formatFiles(tree);
}

export default configurationGenerator;
