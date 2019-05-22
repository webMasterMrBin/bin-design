import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Tabs, TabPane } from '../index';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('snapshot test', () => {
  it('basic use', () => {
    const wrapper = render(
      <Tabs defaultActiveKey={0}>
        <TabPane tab="tab1">TabContent1</TabPane>
        <TabPane tab="tab2">Tabcontent222</TabPane>
      </Tabs>
    );
    
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  
  it('add onChange', () => {
    const wrapper = render(
      <Tabs defaultActiveKey={0} onChange={() => console.log('now onchange')}>
        <TabPane tab="tab1">TabContent1</TabPane>
        <TabPane tab="tab2">Tabcontent222</TabPane>
      </Tabs>
    );
    
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
