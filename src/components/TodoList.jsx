import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { addTodo, fetchTodos, removeTodo } from '../store/todosReducer'

// {
//     id: 1,
//     text: 'do hmw',
// }

const TodoList = () =>
{
    const [newTodo, setNewTodo] = useState('')
    const todos = useSelector(state => state.todos.items)
    const dispatch = useDispatch()
    const [full, setFull] = useState(false)

    useEffect(() =>
    {
        dispatch(fetchTodos())
    }, [dispatch])

    const onButtonClick = () =>
    {
        if (newTodo.trim() !== '') {
            dispatch(addTodo({
                id: new Date(),
                todo: newTodo
            }))
            setNewTodo('')
        }
    }
    const deleteTodo = (id) =>
    {
        dispatch(removeTodo(id))
    }
    return (
        <div className='TodoPage'>
            <h4>TodoList</h4>
            <input
                type="text"
                onChange={e => setNewTodo(e.target.value)}
                value={newTodo} />
            <button onClick={onButtonClick}>Добавить</button><br />
            <ul>{todos.reverse().slice(0, 6).map(t =>
                <li key={t.id}>
                    <p>{t.todo}</p>
                    <button onClick={() => deleteTodo(t.id)}>удалить</button>
                </li>
            )}</ul>

            <button onClick={() => setFull(!full)}>{full ? "Скрыть" : "Полный список"}</button>
            {
                full &&
                <ul>{todos.reverse().slice(6).map(t =>
                    <li key={t.id}>
                        <p>{t.todo}</p>
                        <button onClick={() => deleteTodo(t.id)}>удалить</button>
                    </li>
                )}</ul>
            }
        </div>
    )
}
export default TodoList
