
let db;
const request = indexedDB.open('blitzListsDB', 1);

request.onerror = function (event) {
    console.error('Database error:', event.target.error);
};

request.onsuccess = function (event) {
    db = event.target.result;
};

request.onupgradeneeded = function (event) {
    let db = event.target.result;
    let objectStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('name', 'name', { unique: false });
};

function addTaskToDB(taskName) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(['tasks'], 'readwrite');
        let store = transaction.objectStore('tasks');
        let request = store.add({ name: taskName });

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function (event) {
            reject('Error adding task:', event.target.error);
        };
    });
}

function fetchTasksFromDB() {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(['tasks'], 'readonly');
        let store = transaction.objectStore('tasks');
        let request = store.getAll();

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function (event) {
            reject('Error fetching tasks:', event.target.error);
        };
    });
}

// Export functions if using modules
export { db, addTaskToDB, fetchTasksFromDB };
