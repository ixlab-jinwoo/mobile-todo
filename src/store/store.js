import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todoItems:[]
    },
    getters:{
        getTodos: state => {
            return state.todoItems;
        }
    },
    mutations:{
        addTodo: (state, value)=>{
            state.todoItems.push(value);
            localStorage.setItem(value, value);
        },
        removeTodo: (state, payload) => {            
            state.todoItems.splice(payload.index,1);
            localStorage.removeItem(payload.todoItem);
        },
        clearAll: state => {
            state.todoItems = [];
            localStorage.clear();
        }
    }
});

