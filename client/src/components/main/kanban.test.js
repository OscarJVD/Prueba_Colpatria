import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Kanban from './kanban';
import { configureStore } from "@reduxjs/toolkit"
import DataProvider from '../../redux/store';
import { useDispatch } from 'react-redux';
import taskReducer from '../../redux/reducers/taskReducer';

test('renders content', () => {
  const store = configureStore({
    loading: false,
    tasks: []
  });

  const wrapper = ({ children }) => (
    <DataProvider reduxStore={store}>{children}</DataProvider>
  );

  const { result } = renderHook(() => {
    useSaveAuthenticationDataToStorages(useDispatch());
  }, { wrapper });

  console.log(result);
  const cmp = render(<Kanban />)

  console.log(cmp);
})