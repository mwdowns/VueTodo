var list = [
    {id: 0, text: 'Learn JS', completed: false},
    {id: 1, text: 'Learn Vue', completed: true},
    {id: 2, text: 'Build something great', completed: false}
];

// var todoNotebook = [{id: 0, listName: "My List", list: list}];

var getNewID = function(array) {
    lastItemIndex = array.length - 1;
    if (lastItemIndex !== -1 ) {
        newid = (array[lastItemIndex].id) + 1;
    } else {
        newid = 0;
    }
    return newid;
};

const Hello = {template: '<div>HEYO</div>'};

const routes = [{path: '/hello', component: Hello}];

const router = new VueRouter({
    routes
});

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{todo}}</li>'
});

var todolist = new Vue({
    el: '#todolist',
    router,
    data: {
        // change this to listNotebook
        todoNotebook: typeof todoNotebook != 'undefined' ? todoNotebook : [],
        // change this to todoList going to be careful to find all the this.list calls
        list: [],
        listTitle: '',
        newtitle: '',
        newTitleWarning: false,
        newTitleButtonMessage: 'Create list title',
        newitem: '',
        // Change each of these to blahBlahToggle and change thier calls in the code
        newList: false,
        emptyTodoNotebook: true,
        // change this to removeTodoCheckToggle
        removeCheck: false,
        removeButtonMessage: 'Remove completed items from list',
        removeListCheckToggle: false,
        removeListButtonMessage: 'Delete this list and all of its todos'
        
    },
    methods: {
        getList: function() {
            console.log('getting list');
            if (this.todoNotebook.length > 0) {
                this.emptyTodoNotebook = false;
                this.list = this.todoNotebook[0].list;
                this.listTitle = this.todoNotebook[0].listName;
            } else {
                console.log('no lists in TodoNotebook');
                this.list = this.list;
                this.listTitle = '';
                this.emptyTodoNotebook = true;
            }
        },
        // here is where we want to implement routing so that we can go to a page where the removeList function below can access the params to get the id of the list
        chooseList: function(item) {
            // console.log(this.todoNotebook);
            // console.log(item);
            if (item) {
                this.list = this.todoNotebook[item.id].list;
                this.listTitle = this.todoNotebook[item.id].listName;
            } else {
                this.list = this.list;
            }
        },
        // change this to addNewList
        makeNewTodo: function() {
            console.log('gonna make a new list!');
            this.list = [];
            this.listTitle = '';
            this.newList = true;    
        },
        newTitle: function() {
            console.log('new title');
            newid = getNewID(this.todoNotebook);
            if (newid > 0 ) {
                titleArray = this.todoNotebook.map(function(object) {
                    return object.listName;
                });
                if (titleArray.indexOf(this.newtitle) != -1) {
                    console.log('warning part');
                    this.newTitleWarning = true;
                    this.newTitleButtonMessage = 'That list name is already in use';
                } else {
                    console.log('here?');
                    this.newTitleComplete();
                }
            } else {
                console.log('or here?');
                this.newTitleComplete();
            }
            
        },
        redoTitle: function() {
            this.newTitleWarning = false;
            this.newtitle = '';
        },
        newTitleComplete: function() {
            this.listTitle = this.newtitle;
            this.todoNotebook.push({id: newid, listName: this.newtitle, list: this.list});
            this.newList = false;
            this.newtitle = '';
            this.emptyTodoNotebook = false;
        },
        // change this addNewTodo
        addnew: function() {
            newid = getNewID(this.list);
            this.list.push({id: newid, text: this.newitem, completed: false});
            this.newitem = '';
            // this.listLen = this.list.length;
        },
        //change this markTodoCompleted
        markcompleted: function(item) {
            console.log('marking completed');
            object = this.list.find(function(object) {
                return object.id === item.id;
            });
            if (object.completed === false) {
                object.completed = true;
            } else {
                object.completed = false;
            }
        },
        //change this removeCheck
        removecheck: function() {
            console.log('checking');
            count = this.list.filter(function(object) {
                return object.completed === true;
            }).length;
            this.removeButtonMessage = "Remove " + count.toString() + " item(s)";
            this.removeCheck = true;
        },
        // change this to removeCompletedTodo
        removecompleted: function() {
            console.log('removing');
            array = this.list.filter(function(object) {
                return object.completed === true;
            }).map(function(item) {
                return item.id;
            });
            arrLen = array.length;
            for (var i = 0; i < arrLen; i++) {
                list = this.list.map(function(item) {
                    return item.id;
                });
                this.list.splice(list.indexOf(array[i]), 1);
            }
            this.removeCheck = false;
            this.removeButtonMessage = 'Remove completed items from list';
        },
        removeListCheck: function() {
            console.log('just checking');
            this.removeListButtonMessage = "Remove " + this.listTitle + " and all of its todos?";
            this.removeListCheckToggle = true;
        },
        // with this function we would rather use the unique id that would be in the router param to remove the list from the notebook, because then we don't need to worry about duplicate listnames
        removeList: function() {
            console.log('removing list');
            array = this.todoNotebook.map(function(object) {
                return object.listName;
            });
            this.todoNotebook.splice(array.indexOf(this.listTitle), 1);
            this.getList();
            this.removeListCheckToggle = false;
            this.removeListButtonMessage = "Remove this list and all of its todos";
        }
    },
    beforeMount() {
        this.getList();
    }
}).$mount('#todolist');

// todolist.$watch('listLen', function(newValue, oldValue) {
//     console.log('something changed');
//     console.log(oldValue);
//     console.log(newValue);
// });