import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { addProjectConfiguration, Tree } from '@nx/devkit';

import { configurationGenerator } from './generator';
import { ConfigurationGeneratorSchema } from './schema';

const PROJECT_NAME = 'my-project';

describe('configuration generator', () => {
  let tree: Tree;
  const options: ConfigurationGeneratorSchema = {
    project: PROJECT_NAME,
    config: 'default',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();

    addProjectConfiguration(tree, PROJECT_NAME, {
      root: PROJECT_NAME,
    });
  });

  it('should run successfully', async () => {
    await configurationGenerator(tree, options);

    expect(tree.isFile(`${PROJECT_NAME}/.solhint.json`));
  });
});
