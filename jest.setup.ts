import '@testing-library/jest-dom/extend-expect';
import { loadEnvConfig } from '@next/env';

import '@/styles/global.css';

// jestPreviewConfigure({
//   // publicFolder: 'public',
//   autoPreview: true,
// });

export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
