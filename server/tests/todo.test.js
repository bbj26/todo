const request = require("supertest");
const { app, server } = require("../index.js");
const { Todo, sequelize } = require("../models");

describe("Todo API", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    server.close();
  });

  // Test creating a new todo
  it("should create a new todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ text: "Test todo", done: false });
    expect(res.statusCode).toEqual(201);
    expect(res.body.text).toEqual("Test todo");
    expect(res.body.done).toEqual(false);
  });

  // Test getting all todos
  it("should get all todos", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test getting a todo by ID
  it("should get a todo by ID", async () => {
    const newTodo = await Todo.create({ text: "Test todo", done: false });
    const res = await request(app).get(`/api/todos/${newTodo.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.text).toEqual("Test todo");
    expect(res.body.done).toEqual(false);
  });

  // Test updating a todo
  it("should update a todo", async () => {
    const newTodo = await Todo.create({ text: "Test todo", done: false });
    const res = await request(app)
      .patch(`/api/todos/${newTodo.id}`)
      .send({ text: "Updated todo", done: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body.text).toEqual("Updated todo");
    expect(res.body.done).toEqual(true);
  });

  // Test deleting a todo
  it("should delete a todo", async () => {
    const newTodo = await Todo.create({ text: "Test todo", done: false });
    const res = await request(app).delete(`/api/todos/${newTodo.id}`);
    expect(res.statusCode).toEqual(204);
  });
});
