import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { Button } from '@storybook/react/demo';
import Button from './button';
import { action } from '@storybook/addon-actions';
import { text, boolean, number } from '@storybook/addon-knobs';
import { Tabs, TabPane } from './tabs';

const CenterDecorator = (storyFn: any) => <div>{storyFn()}</div>;

const propsComponent = (data: any) =>  {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr style={{ textAlign: 'left' }}>
          <th style={{ width: '25%', padding: '20px' }}>参数</th>
          <th style={{ width: '25%', padding: '20px' }}>说明</th>
          <th style={{ width: '25%', padding: '20px' }}>类型</th>
          <th style={{ width: '25%', padding: '20px' }}>默认值</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({ param, description, type, defaultValue }: any) => {
            return (
              <tr key={param}>
                <td style={{ width: '25%', padding: '20px' }}>
                  {param}
                </td>
                <td style={{ width: '25%', padding: '20px' }}>{description}</td>
                <td style={{ width: '25%', padding: '20px' }}>{type}</td>
                <td style={{ width: '25%', padding: '20px' }}>{defaultValue}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

storiesOf('Button', module)
  .addDecorator(CenterDecorator)
  .add('with text', () => (
    <Button disabled={boolean('disabled', false)} onClick={action('button-click')}>
      {text('Label1', 'hello world')}
    </Button>
  ))

storiesOf('Tabs', module)
  .add('Tabs',
    () => {
      const TabContent = text('tab1', 'tab1');
      const defaultActiveKey = number('defaultActiveKey', 0, { range: true, min:0, max: 10, step: 1 });
      const handleChange = () => console.log('now onChange');
      
      return (
        <Tabs defaultActiveKey={defaultActiveKey} onChange={handleChange}>
          <TabPane tab={TabContent}>{TabContent}</TabPane>
          <TabPane tab="tab2">Tabcontent222</TabPane>
        </Tabs>
      );
    },
    {
      info: {
        text: 'Tabs 标签页组件',
        TableComponent: (props: any) => propsComponent([
          { param: 'tab(TabPane)', description: 'description', type: 'number', defaultValue: '' },
          { param: 'onChange(Tabs)', description: '切换tab触发事件', type: 'Function', defaultValue: '默认不绑定' }
        ])
      }
    })
