import { useEffect } from 'react';
import { Project } from 'screens/project-list/list';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...res } = useAsync<Project[]>();
  // console.log(`${apiUrl}/projects?$${qs.stringify(cleanObject(param))}`);
  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return res;
};
