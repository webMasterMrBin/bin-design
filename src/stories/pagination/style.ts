import styled, { css } from 'styled-components';
import theme from 'styled-theming';

const color = theme.variants('mode', 'variant', {
  default: {
    light: '#8c8c8c',
  },
});

const size = theme('size', {
  nomal: '30px',
  big: '100px',
});

interface PageTurningProps {
  variant?: string;
}

interface PageContainerProps {
  variant?: string;
}

interface PageItemProps {
  variant?: string;
}

const activeCss = css`
  color: ${props => props.theme.activeColor};
  border: 1px solid ${props => props.theme.activeColor};
`;

const staticCss = css`
  width: ${size};
  height: ${size};
  border: 1px solid ${color};
  border-radius: 4px;
  text-align: center;
  line-height: ${size};
`;

const PageTurning = styled.button<PageTurningProps>`
  ${staticCss}
  outline: none;
  cursor: pointer;
  &:hover {
    ${activeCss};
  }
  &:disabled {
    cursor: not-allowed;
    &:hover {
      border-color: ${color};
      color: ${color};
    }
  }
`;

const PageItem = styled.div<PageItemProps>`
  ${staticCss}
  cursor: pointer;
  &.active {
    ${activeCss}
  }
  &:hover {
    ${activeCss}
  }
`;

const PageContainer = styled.div<PageContainerProps>`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageJump = styled.div`
  input {
    width: 50px;
    outline: none;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-align: center;
    &:focus {
      ${activeCss}
    }
  }
`;

PageTurning.defaultProps = {
  variant: 'default',
};

PageContainer.defaultProps = {
  variant: 'default',
};

PageItem.defaultProps = {
  variant: 'default',
};

export { PageTurning, PageItem, PageContainer, PageJump };
