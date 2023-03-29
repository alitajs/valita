import { BaseGenerator, yParser } from '@umijs/utils';
import { join } from 'path';

interface IArgs extends yParser.Arguments {
  default?: boolean;
  git?: boolean;
  install?: boolean;
}

interface IGeneratorOpts {
  cwd: string;
  args: IArgs;
}

export default async ({ cwd, args }: IGeneratorOpts) => {
  let [name] = args._;
  const target = name ? join(cwd, name) : cwd;
  const generator = new BaseGenerator({
    path: join(__dirname, '..', 'templates', 'app'),
    target,
    slient: true,
  });
  await generator.run();
};
