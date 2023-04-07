import { request } from 'valita';

export async function query(prames): Promise<any> {
  console.log(prames);
  return request('/hello');
}
