<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- <TodoInput v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 메서드 명"></TodoInput> -->
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <!-- <TodoList v-bind:내려보낼 프롭스 속성 이름="현재 위치의 컴포넌트 데이터 속성"></TodoList> -->
    <TodoList
      v-bind:propsdata="todoItems"
      v-on:removeItem="removeOneItem"
      v-on:toggleItem="toggleOneItem"
    >
    </TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  data: function () {
    // TodoList.vue에 있던 코드를 들고 옴
    return {
      todoItems: [],
    };
  },
  methods: {
    addOneItem: function (todoItem) {
      // 추가 된 method
      // TodoInput.vue 에서 가져온 code
      var obj = { completed: false, item: todoItem }; // completed를 list에서 사용하기 위해 이런 식으로 한다.
      localStorage.setItem(todoItem, JSON.stringify(obj)); // Object를 String으로 변환해서 저장한다.

      if(!this.todoItems.some(data => data.item == todoItem)) { // 중복 입력 방지
        this.todoItems.push(obj);
      }
    
      
    },

    removeOneItem: function (todoItem, index) {
      //추가 됨
      localStorage.removeItem(todoItem.item); //TodoList.vue에서 가져 옴  받아온 obj에 있는 item을 지운다
      this.todoItems.splice(index, 1); // api 참고
    },

    toggleOneItem: function (todoItem, index) {
      // 추가 됨
      // todoItem.completed = !todoItem.completed;  이렇게 하면 내려 보낸 props를 다시 사용하는 방법이라 좋지 못하다?
      this.todoItems[index].completed = !this.todoItems[index].completed; //컴포넌트 경계를 조금 더 명확하게 한다.

      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },

    clearAllItems: function () {  // 추가 됨
      localStorage.clear();
      this.todoItems = [];  //배열 초기화
    },
  },
  created: function () {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          // loglevel:webpack-dev-server 같지 않은 것들만 축력
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
  },

  components: {
    // 컴포넌트 태그명 : 컴포넌트 내용
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter,
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
