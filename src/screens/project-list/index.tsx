import React, { useState } from 'react';

import { useDebounce } from 'utils';

import { SearchPanel } from './search-panel';
import { List, Project } from './list';
import styled from '@emotion/styled';
import { useProject } from 'utils/project';
import { useUser } from 'utils/user';
import { Typography } from 'antd';

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });

  const debounceParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProject(debounceParam);
  const { data: users } = useUser();
  // console.log(`${apiUrl}/projects?$${qs.stringify(cleanObject(param))}`);
  const addKey = (list: Project[]) => {
    list.forEach((item) => {
      item.key = item.id;
    });
    return list;
  };

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={addKey(list || [])} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
