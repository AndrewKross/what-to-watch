import * as React from 'react';
import {configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { comments, films, TABS_DATA } from '../../test-mocks';
import Tabs from './tabs';

configure({adapter: new Adapter()});

const [film] = films;

test(`Tabs state should change by the click on tab`, () => {
  const tabs = shallow(
    <Tabs film={film} comments={comments}/>,
  );

  TABS_DATA.forEach((tab, index) => {
    const currentTab = tabs.find(`.movie-nav__link`).at(index);

    currentTab.simulate(`click`);
    expect(tabs.state().activeTab).toBe(tab);
  });
});
