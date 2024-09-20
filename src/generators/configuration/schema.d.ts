export interface ConfigurationGeneratorSchema {
  project: string;
  config: 'default' | 'recommended';
  skipPackageJson?: boolean;
  skipFormat?: boolean;
  keepExistingVersions?: boolean;
}
