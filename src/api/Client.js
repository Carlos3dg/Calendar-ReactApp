const LOCAL_STORAGE_KEY = 'calendarFakeAuth';
const API_TOKEN = 'D3vC4L3nd4R4pp';

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
    },

    deleteTask: function(newState) {
        const success = true;
        return new Promise(function(resolve, reject) {
            setTimeout(()=>{
                if(!success) {
                    return reject(JSON.parse(localStorage.taskList || '[]'));
                }
                localStorage.taskList = JSON.stringify(newState);
                resolve('SUCCESS');
            }, 1500);
        })
    },

    //Get the token at the beggining of the app mount
    loadToken: async function() {
        //See if we have the token save in storage ()
        let calendarFakeAuth = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || null);
        //If we do, proceed to valid the token that is saved.
        if(calendarFakeAuth) {
            await this.validToken(calendarFakeAuth.token) //Here we compare the saved token with the real one that the server has.
                .then((resp) => {
                    //If they are different, change values of the saved token to null and also set a user property to null
                    if(!resp) {
                        calendarFakeAuth.token = null;
                        calendarFakeAuth.user = null;
                    }
                })//If the server throws an error, we set an error property to calendarFakeAuth, in order to know if is necessary to dispatch a fetchTokenFailure action inside our actions file
                .catch((resp) => {
                    console.error(resp);
                    calendarFakeAuth.error = resp
                });
        } else {
            //If we don't have any token saved, we set the token and user properties to null
            calendarFakeAuth = {
                token: null,
                user: null,
            }
        }
        return calendarFakeAuth;
    },
    //See if the token that our app had saved is equal to the one that the server has.
    validToken: function(token) {
        const success = true;
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                if(!success) {
                    return reject('Fail to valid credentials. There was an error when interfacing with the server');
                }

                if(API_TOKEN === token) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }, 700);
        })
    },
    //Set token in localStorage
    login: async function(user) {
        //Get the user email
        const calendarFakeAuth = {
            user
        }
        //Here we return the token if the user has assigned one
        await this.setToken()
            .then((resp) => { //Suppose that the user has a token so our request is resolved and return the token 
                calendarFakeAuth.token = resp; //Add the second property to our variable to be equal to the token
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(calendarFakeAuth)); //Set the variable in Storage
            }) //If the server throws an error, we set an error property to calendarFakeAuth, in order to know if is necessary to dispatch a setTokenFailure action inside our actions file
            .catch((resp) => {
                console.error(resp);
                calendarFakeAuth.user = null;
                calendarFakeAuth.token = null;
                calendarFakeAuth.error = resp;
            });
        return calendarFakeAuth;
    },
    //Return the token
    setToken: function(fakeAuth) {
        const success = true;
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                if(!success) {
                    return reject('Fail to access token. There was an error when interfacing with the server');
                }

                resolve(API_TOKEN); 
            }, 1500);
        });
    },
    //Remove the token from localStorage and set our variable properties to null, to pass them in a moment to our respective reducer propeties
    logout: function() {
        const calendarFakeAuth = {
            token: null,
            user: null,
        };

        localStorage.removeItem(LOCAL_STORAGE_KEY);

        return calendarFakeAuth
    }
}

export default apiClient;