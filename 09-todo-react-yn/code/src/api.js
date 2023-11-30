const apiUrl = 'https://cse204.work/todos';
const apiKey = '54bb78-1606ae-f3ea12-b85bb3-11d822';
export async function getTodos() {
    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'x-api-key': apiKey }
    })

    return await res.json()
}

export async function addTodo(newTodo) {
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body: JSON.stringify(newTodo)
    })

    return await res.json()
}

export async function toggleTodoCompletion(id, completed) {
    return await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body: JSON.stringify({completed})
    })
}

export async function updateTodoText(id, newText) {
    return await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body: JSON.stringify({ text: newText })
    })
}

export async function deleteTodo(id) {
    return fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': apiKey }
    })
}