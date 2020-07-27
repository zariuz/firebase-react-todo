import React from 'react';
import {
  Checkbox,
  Layout,
  List,
  ListItem,
  ListItemText,
  ListItemGraphic,
  TextField,
  Typography,
} from 'mdc-react';
// import moment from 'moment';

import './index.scss';

export default function TodoDetails({ todo }) {
  // console.log(moment(todo.dueDate.seconds * 1000).format('YYYY-MM-DD'));

  return (
    <aside className="todo-details">
      <Layout column>
        <TextField label="Название" value={todo.title} onChange={() => {}} />
        {todo.dueDate && (
          <TextField
            label="Дата выполнения"
            value={todo.dueDate.seconds}
            onChange={() => {}}
          />
        )}
      </Layout>

      <section className="todo-steps">
        <Typography variant="subtitle2" noMargin>
          Шаги
        </Typography>

        {todo.steps && todo.steps.length > 0 && (
          <List className="todo-step-list" dense>
            {todo.steps.map((step, index) => (
              <ListItem key={index}>
                <ListItemGraphic>
                  <Checkbox checked={step.completed} />
                </ListItemGraphic>

                {console.log(step)}

                <ListItemText>{step}</ListItemText>
              </ListItem>
            ))}
          </List>
        )}

        <TextField label="Новый шаг" value={''} onChange={() => {}} fullWidth />
      </section>
    </aside>
  );
}
