import React, { FC, useEffect, useState, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import classnames from 'classnames';

interface TabsProps {
  defaultActiveKey: number,
  onChange?: () => void,
}

interface TabPaneProps {
  tab: string, // 每个tab名字
}

const TabsContainer = styled.div`
  width: 100%;
  .tabs-header {
    width: 100%;
    border-bottom: 1px solid #aaa;
    display: flex;
    .tabPane-content {
      cursor: pointer;
      width: 100px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin: 0 10px;
      &.active {
        color: ${props => props.theme.main};
        border-bottom: 1px solid #2f54eb;
      }
      &:hover {
        color: ${props => props.theme.active};
      }
    }
  }
  .tabs-content {
    padding: 20px;
  }
`;

const TabPane: FC<TabPaneProps> = (props: any) => {
  return (
    <>
    </>
  );
};

const Tabs: FC<TabsProps> = props => {
  const { defaultActiveKey, onChange, children } = props;
  const [Key, setKey] = useState(defaultActiveKey);
  const onChangeRef = useRef<any>();

  // 手动改defaultActiveKey 触发重新render;
  useEffect(() => {
    setKey(defaultActiveKey);
  }, [defaultActiveKey]);

  // useEffect 在didMount时也会执行  保证在KEY变化调用onChange
  useEffect(() => {
    // 在didMount 后 调用onChange方法
    if (onChangeRef.current) {
      // tslint:disable-next-line
      onChange && onChange();
    }
    onChangeRef.current = true;
  }, [Key]);

  const TabPaneContent = React.Children.map(children, o => {
    if (React.isValidElement(o)) {
      if ((o as any).props.tab) {
        return (o as any).props.tab;
      } else {
        throw new Error('There must be `tab` property on children of Tabs.');
      }
    } else {
      throw new Error('There must be React.Element in Tabs.');
    }
  });

  const tabActive = (index: number) => classnames({
    active: index === Key,
    "tabPane-content": true,
  });

  const handleClick = (i: number) => (e: React.MouseEvent<HTMLElement>): void => {
    setKey(i);
  };

  return (
    <ThemeProvider theme={{ main: '#2f54eb', active: '#597ef7' }}>
      <TabsContainer>
        <div className="tabs-header">
          {Array.isArray(TabPaneContent) && TabPaneContent.map((o, i) => (
            <div className={tabActive(i)} key={i} onClick={handleClick(i)}>{o}</div>
          ))}
        </div>
        <div className="tabPane-content">
          {children && children[Key].props.children}
        </div>
      </TabsContainer>
    </ThemeProvider>
  );
};

export { Tabs, TabPane }
