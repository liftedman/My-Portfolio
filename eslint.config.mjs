import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// eslint-config-next still ships eslintrc-style configs, so they have to be
// bridged into flat config rather than spread directly.
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
