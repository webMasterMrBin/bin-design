import React, { FC, useState, useEffect, Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import classnames from 'classnames';
import { PageItem, PageTurning, PageContainer, PageJump } from './style';

enum defaultValue {
  defaultCurrent = 1,
  defaultPageSize = 5,
  defaultTotal = 100,
}

interface IpaginationProps {
  total?: number; // 数据总数
  current?: number; // 当前页数
  pageSize?: number; // 每页显示的条数
  onChange?: (current: number, pageSize: number) => void; // 切换页面干的事情
}

const Pagination: FC<IpaginationProps> = props => {
  const { total, pageSize, current, onChange } = props;
  const [currentPage, setCurrentPage] = useState(
    current || defaultValue.defaultCurrent
  );

  // 总页数
  const pageTotal = Math.ceil(
    (total || defaultValue.defaultTotal) /
      (pageSize || defaultValue.defaultPageSize)
  );

  useEffect(() => {
    onChange && onChange(currentPage, pageSize || defaultValue.defaultPageSize);
    if (currentPage > pageTotal) {
      setCurrentPage(pageTotal);
    }
    if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [currentPage, onChange, pageSize, pageTotal]);

  const itemActive = (i: number) =>
    classnames({
      active: currentPage === i,
    });

  const renderItem = (arr: number[]) => {
    if (currentPage <= 4) {
      return (
        <Fragment>
          {[1, 2, 3, 4].map(o => (
            <PageItem
              className={itemActive(o)}
              key={o}
              onClick={() => setCurrentPage(o)}
            >
              {o}
            </PageItem>
          ))}
          <div onClick={() => setCurrentPage(currentPage + 5)}>{'>>'}</div>
          <PageItem onClick={() => setCurrentPage(pageTotal)}>
            {pageTotal}
          </PageItem>
        </Fragment>
      );
    }

    if (currentPage >= pageTotal - 3) {
      return (
        <Fragment>
          <PageItem onClick={() => setCurrentPage(1)}>1</PageItem>
          <div onClick={() => setCurrentPage(currentPage - 5)}>{'<<'}</div>
          {[pageTotal - 3, pageTotal - 2, pageTotal - 1, pageTotal].map(o => (
            <PageItem
              className={itemActive(o)}
              key={o}
              onClick={() => setCurrentPage(o)}
            >
              {o}
            </PageItem>
          ))}
        </Fragment>
      );
    }

    return (
      <Fragment>
        <PageItem onClick={() => setCurrentPage(1)}>1</PageItem>
        <div onClick={() => setCurrentPage(currentPage - 5)}>{'<<'}</div>
        {[currentPage - 1, currentPage, currentPage + 1].map(o => (
          <PageItem
            className={itemActive(o)}
            key={o}
            onClick={() => setCurrentPage(o)}
          >
            {o}
          </PageItem>
        ))}
        <div onClick={() => setCurrentPage(currentPage + 5)}>{'>>'}</div>
        <PageItem onClick={() => setCurrentPage(pageTotal)}>
          {pageTotal}
        </PageItem>
      </Fragment>
    );
  };

  const arr: number[] = [];

  for (let i = 1; i <= pageTotal; i++) {
    arr.push(i);
  }

  return (
    <ThemeProvider
      theme={{ mode: 'light', activeColor: '#2f54eb', size: 'nomal' }}
    >
      <PageContainer>
        <PageTurning
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {'<'}
        </PageTurning>
        {renderItem(arr)}
        <PageTurning
          disabled={currentPage === pageTotal}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {'>'}
        </PageTurning>
        <PageJump>
          跳转至
          <input
            type="text"
            onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
              if (e.keyCode === 13) {
                let { value } = e.target as HTMLInputElement;
                if (parseFloat(value) >= 1 && parseFloat(value) <= 20) {
                  setCurrentPage(parseFloat(value));
                }
                if (parseFloat(value) > 20) {
                  setCurrentPage(20);
                }
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </PageJump>
      </PageContainer>
    </ThemeProvider>
  );
};

export default Pagination;
