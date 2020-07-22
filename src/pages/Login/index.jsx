import React, { useState, useStore } from 'react';
import {
  Button,
  Card,
  CardSection,
  CardActions,
  Layout,
  TextField,
  Typography,
} from 'mdc-react';

import { actions } from 'store';

import './index.scss';

export default function LoginPage({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    actions.loginUser(email, password);
  }

  console.log(actions);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          label="Электронная почта"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          label="Пароль"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </form>
      <button type="submit">Войти</button>
    </div>
  );
}
