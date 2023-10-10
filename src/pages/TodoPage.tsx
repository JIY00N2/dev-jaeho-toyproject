import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Flex, ListItem, Text, UnorderedList } from '@chakra-ui/layout';
import { useState, useEffect } from 'react';
import type { FormEventHandler } from 'react';
import axios from 'axios';

const TodoPage = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/todos')
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('데이터 가져오기 실패', error);
        setLoading(false);
      });
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('/todos', todo, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        axios
          .get('/todos')
          .then((response) => {
            setTodo('');
            setTodos(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('데이터 가져오기 실패:', error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('데이터 전송 실패:', error);
        setLoading(false);
      });
  };

  return (
    <Flex flexDirection={'column'}>
      <Text>Todo</Text>
      <UnorderedList>
        {todos.map((todo, id) => (
          <ListItem key={id}>{todo}</ListItem>
        ))}
      </UnorderedList>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="todo"
          placeholder="new todo"
          disabled={loading}
          value={todo}
          onChange={({ target: { value } }) => setTodo(value)}
        />
        <Button type={'submit'} disabled={!todo}>
          <Text>추가</Text>
        </Button>
      </form>
    </Flex>
  );
};

export default TodoPage;
