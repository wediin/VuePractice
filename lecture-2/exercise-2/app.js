new Vue({
  el: '#exercise',
  data: {
    value: ''
  },
  methods: {
    showAlert: function() {
      alert('Alert!');
    },
    storeValue: function(event) {
      this.value = event.target.value;
    }
  }
});
