
/**
 * 通过文件绝对路径，获取文件名
 */
export function getFileName(fileUrl: string) {
  let url = '';
  const list = fileUrl.split('/');
  url = list[list.length - 1];
  url = url.split('.')[0];
  return url;
};