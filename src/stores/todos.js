import { defineStore } from 'pinia'
import { uuid } from 'vue-uuid'

export default defineStore('todos', {
  state: () => ({
    todosList: [
      { "id": uuid.v1(), "title": "Complete online JavaScript course", "completed": true },
      { "id": uuid.v1(), "title": "Jog around the park 3x", "completed": false },
      { "id": uuid.v1(), "title": "10 minutes meditation", "completed": false },
      { "id": uuid.v1(), "title": "Read for 1 hour", "completed": false },
      { "id": uuid.v1(), "title": "Pick up groceries", "completed": false },
      { "id": uuid.v1(), "title": "Complete Todo App on Frontend Mentor", "completed": false },
    ],
  }),
})