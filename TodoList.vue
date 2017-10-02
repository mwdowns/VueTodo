<template v-if="emptyTodoNotebook === false">
    <h1>{{listTitle}}</h1>
    <ol>
        <todo-item 
            v-for="item in list" 
            :todo="item.text" 
            :key="item.text"
            :class="[{notdone: !item.completed}, {done: item.completed}]"
            @click.native="markcompleted(item)">
        </todo-item>
    </ol>
    <p>What else would you like to do today?</p>
    <form
        @submit.prevent="addnew">
        <input 
            v-model="newitem">
        <button>add item</button>
    </form>
    
    <template v-if="removeCheck === false">
        <button
            @click="removecheck">
            {{removeButtonMessage}}
        </button>
    </template>
    <template v-else>
        <button
            @click="removecompleted"
            :class="{finalmessage: removeCheck}">
            {{removeButtonMessage}}
        </button>
    </template><br>
    <template v-if="removeListCheckToggle === false">
        <button
            @click="removeListCheck">
            {{removeListButtonMessage}}
        </button>
    </template>
    <template v-else>
        <button
            @click="removeList"
            :class="{finalmessage: removeListCheck}">
            {{removeListButtonMessage}}
        </button>
    </template>
</template>

<script>
  export default {
    name: 'list',
    data () {
      return {
      msg: 'TodoList'
    }
  }
}
</script>