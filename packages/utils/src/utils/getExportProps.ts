import * as traverse from '@umijs/bundler-utils/compiled/babel/traverse';
import { parse } from '../utils/parse';

export function getExportProps(code: string) {
  const ast = parse(code);

  const props: string[] = [];

  traverse.default(ast, {
    ExportNamedDeclaration(path) {
      const node = path.node.declaration;
      if (node?.type === 'VariableDeclaration') {
        node.declarations.forEach((declaration) => {
          props.push(declaration.id?.name);
        });
      } else if (node?.type === 'FunctionDeclaration') {
        props.push(node.id.name);
      }
    },
  });

  return props;
}
