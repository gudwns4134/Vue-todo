<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <!-- v-model로 data 값 연동 -->
    <span class="addContainer" v-on:click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>
    <!-- Modal 소스 추가 -->
    <Modal v-if="showModal" @close="showModal = false"> <!-- 등록한 컴포넌트를 사용한다. -->
      <h3 slot="header">  <!-- Modal.vue에 있는 slot을 맵핑? 오버라이딩? 해주는 것이다. -->
        경고! &nbsp;
        <i class="closeModalBtn fas fa-times" @click="showModal = false"></i> <!-- @ <- v-on 축약형이다. -->
      </h3>
      <div slot="body">
        아무것도 입력하지 않으셨습니다.
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./common/Modal.vue"; // 모달 import

export default {
  data: function () {
    return {
      newTodoItem: "",
      showModal: false, // 모달 기능
    };
  },
  methods: {
    addTodo: function () {
      // 저장만 하는 기능
      if (this.newTodoItem !== "") {
        this.$emit("addTodoItem", this.newTodoItem);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    }, // 기능을 따로 분할해서 설정
    clearInput: function () {
      // 지우는 기능
      this.newTodoItem = "";
    },
  },
  // 컴포넌츠? 추가
  components: {
    Modal: Modal, // import한 Modal을 등록한다.
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn {
  color: #42b983;
}
</style>