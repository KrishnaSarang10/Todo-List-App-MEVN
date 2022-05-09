import axios from "axios";
import moment from 'moment';

//module for todo list app
export default {
  name: "App",
  //data function
  data() {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {}
    };
  },
  //displays data on load of web page
  async mounted() {
    const response = await axios.get("api/todoListItems/");
    response.data
    .map((res)=>{
        const date = moment(res.date).format('MM/DD/YYYY hh:mm');
        res.date = date;
    })
    this.items = response.data;
  },
  //functions for sending request to backend server
  methods: {
      //fetch add the data and display in JSON format
    async Alldata(){
        const response = await axios.get("api/todoListItems/data");
        this.items = JSON.stringify(response.data);
    },
    //remove the selected task by sending request to server
    async removeItem(task, i) {
      if(confirm('✅🎉 Yayy !! You have completed your task. Do you want to remove this task from list ?'))  {
        await axios.delete("api/todoListItems/" + task._id);
        this.items.splice(i, 1);
      }
    },
    //add the selected task to selected variable in data function
    select(task) {
      this.selected = task;
      this.editedDescription = task.description;
    },
    isSelected(task) {
      return task._id === this.selected._id;
    },
    formatDate(date){
        return moment(date).format('MM/DD/YYYY hh:mm');
    },
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },
    //update the selected task
    async updateItem(task, i) {
      const response = await axios.put("api/todoListItems/" + task._id, {
        description: this.editedDescription
      });
      this.items[i] = response.data;
      this.unselect();
    },
    //add the task to todo list and database
    async addItem() {
        const response = await axios.post("api/todoListItems/", {
          description: this.description
        });
        this.items.unshift(response.data);
        this.description = "";
    }
  }
};