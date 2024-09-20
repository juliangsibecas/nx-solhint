import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readNxJson } from '@nx/devkit';

import { initGenerator } from './generator';

describe('init generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should add plugin to nx.json', async () => {
    await initGenerator(tree, {});
    const nxJson = readNxJson(tree);

    expect(nxJson.plugins).toMatchObject([
      {
        plugin: 'nx-solhint',
        options: {
          lintTargetName: 'lint',
        },
      },
    ]);
  });
});
