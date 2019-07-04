import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pagination from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('snapshot test', () => {
  it('pagination snapshot', () => {
    expect(toJson(render(<Pagination total={50} />))).toMatchSnapshot();
  });

  it('pagination test', () => {
    const wrapper = mount(<Pagination />);
    // 默认显示1-4页码
    //expect(nodeText.slice(0, 4)).toEqual(['1', '2', '3', '4']);
    // 点击最后一个item 即默认的第20页面
    wrapper
      .find('.pageitem-test')
      .last()
      .simulate('click');
    const nodeText = wrapper.find('.pageitem-test').map(o => o.text());
    expect(nodeText.slice(0, 5)).toEqual(['1', '17', '18', '19', '20']);
  });
});
