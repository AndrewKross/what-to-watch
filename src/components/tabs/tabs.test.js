import React from 'react';
import renderer from 'react-test-renderer';
import { comments, films } from '../../mocks/test-mocks';
import Tabs from './tabs.jsx';

const [film] = films;

test(`Tabs should render correctly all tabs`, () => {
  const component = renderer.create(
    <Tabs
      film={film}
      comments={comments}/>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component.root.findAllByType(`a`)[1].props.onClick();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component.root.findAllByType(`a`)[2].props.onClick();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
