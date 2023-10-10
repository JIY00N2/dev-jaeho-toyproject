import { rest } from 'msw';

const todos = ['먹기', '자기', '놀기'];

const posts = [...Array(100).keys()].map((id) => {
  const date = new Date();
  date.setDate(date.getDate() + id + 1);
  return {
    id: id + 1,
    title: `게시물 제목 ${id + 1}`,
    content: `게시물 내용 ${id + 1}`,
  };
});

export const handlers = [
  // 할일 목록
  rest.get('/todos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  // 할일 추가
  rest.post('/todos', async (req, res, ctx) => {
    todos.push(await req.json());
    return res(ctx.status(201));
  }),

  rest.get('/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts));
  }),
];
