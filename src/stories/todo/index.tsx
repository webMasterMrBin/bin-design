import React, { FC, useReducer, Reducer } from 'react';
import { Tabs, TabPane } from '../tabs';
import shortid from 'shortid';

// Todo 组件的state 
// [
//   {id: '',
//   content: '',
//   completed: '',}
// ]

interface Istate {
  id: string;
  content: string;
  completed: boolean;
}

enum ActionType {
  AddTodo = 'AddTodo',
  DeleteTodo = 'DeleteTodo',
  ToggleActive = 'ToggleActive'
}

interface Iaction {
  type: ActionType;
  content: string; // 任务名
  id?: string;
}

const initState: Istate[] = [];

const reducer: Reducer<Istate[], Iaction> = (state, action) => {
  switch (action.type) {
    case ActionType.AddTodo:
      return [...state, { id: shortid.generate(), content: action.content, completed: false }];
    case ActionType.DeleteTodo: {
      return state.filter(o => o.id !== action.id);
    }
    case ActionType.ToggleActive: 
      return state.map(o  => o.id === action.id ? { id: o.id, content: o.content, completed: !o.completed } : o)
  }
}

function renderItem(key: string, completed: boolean, content: string, dispatch: (param: object) => void) {
  return (
    <Item
      key={key}
      completed={completed}
      content={content}
      toggleActive={() => dispatch({ type: ActionType.ToggleActive, id: key, content })}
      deleteTodo={() => dispatch({ type: ActionType.DeleteTodo, id: key, content })}
    />
  )
}

const Todo: FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div>
      <input
        type="text"
        onKeyDown={
          (e: React.KeyboardEvent<HTMLElement>) => {
            if (e.keyCode === 13) {
              dispatch({ type: ActionType.AddTodo, content: (e.target as HTMLInputElement).value })
            }
          }
        }
      />
      <Tabs defaultActiveKey={0}>
        <TabPane tab="all">
          {state.map(o => (
            renderItem(o.id, o.completed, o.content, dispatch)
          ))}
        </TabPane>
        <TabPane tab="active">
          {state.filter(o => !o.completed).map(o => (
            renderItem(o.id, o.completed, o.content, dispatch)
          ))}
        </TabPane>
        <TabPane tab="completed">
          {state.filter(o => o.completed).map(o => (
            renderItem(o.id, o.completed, o.content, dispatch)
          ))}
        </TabPane>
      </Tabs>
    </div>
  )
}

interface IitemProps {
  content: string;
  completed: boolean;
  toggleActive: () => void;
  deleteTodo: () => void;
}

const Item: FC<IitemProps> = props => {
  const { content, toggleActive, completed, deleteTodo } = props;
  return (
    <div>
      <input type="checkbox" onChange={toggleActive} checked={completed} />
      {content}
      <button type="button" onClick={deleteTodo}>删除</button>
    </div>
  )
}

export default Todo;
