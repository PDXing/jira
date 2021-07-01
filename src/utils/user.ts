import { useEffect } from 'react';
import { User } from 'screens/project-list/search-panel';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useUser = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...res } = useAsync<User[]>();
  // console.log(`${apiUrl}/projects?$${qs.stringify(cleanObject(param))}`);
  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return res;
};
