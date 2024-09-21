export interface ConfigurationGeneratorSchema {
  project: string;
  config: 'Default' | 'Recommended';
  skipPackageJson?: boolean;
  skipFormat?: boolean;
  keepExistingVersions?: boolean;
}
