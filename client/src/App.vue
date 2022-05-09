<template>
<div>
  <!-- adding header field -->
  <div id="header">
    <p class="has-text-centered is-size-5 is-size-7-mobile">Todo List Application : Add, Update and Manage your daily tasks</p>
  </div>
  <!-- main app code -->
  <div id="app">
    <h1 class="subtitle is-size-5 has-text-light"><b>Enter your task title</b></h1>
      <div class="control is-expanded">
        <input class="input" v-model="description" type="text" placeholder="Add your task..." />
      </div>
      <br />
      <!-- save button block size -->
      <div class="control">
        <a class="button is-primary is-fullwidth" @click="addItem" :disabled="!description">Save</a>
      </div>
      <br/>
      <!-- displaying all tasks stored in database using for loop -->
    <div class="containerr" v-for="(item, itr) in items" :key="item._id">
      <!-- <div class="columns"> -->
        <input class="column input" v-if="isSelected(item)" v-model="editedDescription" />
        <p v-else class="column">
          <span class="is-dark has-text-weight-medium" style="margin-left: 7px;">Task - {{ itr + 1}}&nbsp;</span>
          <span class="has-text-weight-semibold" style="margin-left: 10px; font-size: 1.3rem; display: flex; align-items: center; justify-content: center;">{{ item.description }}</span>
          <br/>
          <span class="has-text-grey-dark" style="font-size: 0.95rem; display: flex; align-items: center; justify-content: center;">{{ formatDate(item.date) }}</span>
        </p>
      <!-- </div> -->
        <!-- buttons to perform action on particular task -->
        <div class="column is-narrow " style="margin-right: 10px; margin-top: 10px; display: flex; align-items: center; justify-content: center;">
          <span
            class="icon has-text-link"
            @click="isSelected(item) ?  unselect() : select(item)"
          >
            <i class="material-icons is-size-3">{{isSelected(item) ? 'close': 'edit_calendar'}}</i>
          </span>
          <span style="padding-left: 49px;"></span>
          <span
            class="icon has-text-success"
            @click="isSelected(item) ? updateItem(item, itr) : removeItem(item, itr)"
          >
            <i class="material-icons is-size-3">{{isSelected(item) ? 'save': 'done_outline'}}</i>
          </span>
        </div>
    </div>
  </div>
  <div style="padding-top: 15px;"></div>
</div>
</template>

<!-- including the javascript file -->
<script src="./components/script"></script>

<!-- style for web application -->
<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
html{
  background-color: black;
}
.icon {
  cursor: pointer;
}
input[type=text] {
  width: 100%;
  
  box-sizing: border-box;
  border: 3px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}

input[type=text]:focus {
  border: 3px solid forestgreen;
}


.containerr{
  border-radius: 9px;
  background-color: beige;
  margin: 2px;
  padding: 4px;
}

#header {
    
    bottom: 0;
    background: cadetblue;
    height: 60px;
    font-family: 'Open Sans', sans-serif;
    color: #FFFFFF;
    padding: 20px;
    width: auto;
}

</style>
