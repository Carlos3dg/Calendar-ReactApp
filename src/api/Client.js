const apiClient = {
    loadTasks: function() {
        const success = true;
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                if(!success) return reject('FAILURE');
                resolve(JSON.parse(localStorage.taskList || '[]'));
            }, 1500);
        });
    },

    saveTask: function(newState) {
        const success = true;
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                if(!success) {
                    return reject(JSON.parse(localStorage.taskList || '[]'));
                }
                localStorage.taskList = JSON.stringify(newState);
                resolve('SUCCESS');
            }, 1500);
        })
    }
}

export default apiClient;